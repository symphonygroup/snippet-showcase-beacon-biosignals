import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Box,
  Icon,
  Text,
} from '@chakra-ui/react';
import { Checkbox } from '../../../design/components/Checkbox/Checkbox';
import SvgSolidHelp from '../../../design/styles/icons/solid/SolidHelp';
import { isEmpty, noop } from 'lodash';
import { SortField } from '../../../types/params';
import './styles.scss';

import If from '../../If';
import { colors } from '../../../design/styles/foundations/colors';
import { ReactComponent as ArrowsAscending } from '../../../assets/icons/tableArrowsAscending.svg';
import { ReactComponent as ArrowsDescending } from '../../../assets/icons/tableArrowsDescending.svg';
import { ReactComponent as ArrowsDefault } from '../../../assets/icons/tableArrowsDefault.svg';

export interface NextCall {
  page: number;
  size: number;
  sort?: SortField[];
}

export interface Column {
  name: string;
  sortValue?: string;
  style?: React.CSSProperties;
  tooltip?: string;
  disableSort?: boolean;
}

interface Props<R> {
  columns: Column[];
  rows: R[];
  renderRow: (row: R, index: number) => JSX.Element;
  onSort?: (fields: SortField[]) => void;
  sort?: SortField[];
  stickyHeader?: boolean;
  Trigger?: any;
  showCheckbox?: boolean;
  isCheckboxDisabled?: boolean;
  isSelectedAll?: boolean;
  onSelectAll?: (isSelected: boolean) => void;
}

function TableComponent<R>({
  columns,
  rows,
  renderRow,
  onSort,
  sort = [],
  stickyHeader,
  Trigger,
  showCheckbox = false,
  isCheckboxDisabled = false,
  isSelectedAll = false,
  onSelectAll,
  ...rest
}: Props<R>) {
  const [columnWidths, setColumnWidths] = useState<number[]>([]);
  const tableHeadRef: any = useRef<HTMLHtmlElement>();

  const updateColumnWidths = useCallback(() => {
    if (tableHeadRef.current) {
      setColumnWidths(
        Array.from(tableHeadRef.current.querySelectorAll('th')).map(
          (th: any) => th.getBoundingClientRect().width
        )
      );
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(rows)) {
      updateColumnWidths();
    }
  }, [rows, updateColumnWidths]);

  useEffect(() => {
    window.addEventListener('resize', updateColumnWidths);

    return () => window.removeEventListener('resize', updateColumnWidths);
  }, [updateColumnWidths]);

  const handleSort = useCallback(
    (sortValue: string) => () => {
      const onSortFn = onSort || noop;

      let newSort: Array<SortField | null> = [];
      if (sort.some((field) => field.name === sortValue)) {
        newSort = sort
          .map((field): SortField | null => {
            if (field.name === sortValue) {
              if (field.value === 'asc') {
                return { ...field, value: 'desc' };
              }
              return null;
            }
            return field;
          })
          .filter(Boolean);
      } else {
        newSort = [...sort, { name: sortValue, value: 'asc' }];
      }
      onSortFn(newSort);
    },
    [onSort, sort]
  );

  const handleOrder = useMemo(
    () => (sortValue: string) => {
      return (
        sort
          .filter((field) => field.name === sortValue)
          .map((f) => f.value)[0] || ''
      );
    },
    [sort]
  );

  const handleSelectAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isSelected = e.target.checked;
      const onSelectAllFn = onSelectAll || noop;
      onSelectAllFn(isSelected);
    },
    [onSelectAll]
  );

  return (
    <TableContainer>
      <Table
        {...rest}
        className={stickyHeader ? 'sticky-table-header' : ''}
        size="sm"
      >
        <Thead data-testid="table-header" borderTop="none" ref={tableHeadRef}>
          <Tr>
            <If condition={showCheckbox}>
              <Th width="0" pr="0" mr="0">
                <Checkbox
                  data-testid="table-header-checkbox"
                  data-qa="table-header-checkbox"
                  isChecked={isSelectedAll}
                  isDisabled={isCheckboxDisabled}
                  onChange={handleSelectAll}
                  className="chkbox-shadow"
                />
              </Th>
            </If>
            {columns.map(
              ({ name, sortValue, style, tooltip, disableSort }, index) => (
                <Th
                  data-testid="table-header-item"
                  key={name}
                  minWidth={
                    isEmpty(rows) && columnWidths[index]
                      ? columnWidths[index].toString()
                      : ''
                  }
                  cursor="default"
                  style={{
                    userSelect: 'none',
                    borderColor: colors.greySolid[200],
                    height: '40px',
                    ...style,
                  }}
                  order={handleOrder(sortValue || '')}
                  textStyle="bodyMedium"
                  {...(!disableSort
                    ? { onClick: handleSort(sortValue || '') }
                    : {})}
                >
                  <Box display="flex" alignItems="center">
                    <Text
                      fontSize="md"
                      fontWeight="500"
                      color={colors.greySolid[900]}
                      textTransform="none"
                    >
                      {name}
                    </Text>
                    <If condition={!disableSort}>
                      <If condition={handleOrder(sortValue || '') === ''}>
                        <Icon as={ArrowsDefault} w="16px" h="16px" ml="2px" />
                      </If>
                      <If condition={handleOrder(sortValue || '') === 'asc'}>
                        <Icon as={ArrowsAscending} w="16px" h="16px" ml="2px" />
                      </If>
                      <If condition={handleOrder(sortValue || '') === 'desc'}>
                        <Icon
                          as={ArrowsDescending}
                          w="16px"
                          h="16px"
                          ml="2px"
                        />
                      </If>
                    </If>
                    <If condition={Boolean(tooltip && tooltip !== '')}>
                      <Tooltip label={tooltip} fontSize="md">
                        <span style={{ display: 'flex', marginLeft: '5px' }}>
                          <SvgSolidHelp
                            color={colors.primary[500]}
                            width="16px"
                            height="16px"
                            overflow="visible"
                          />
                        </span>
                      </Tooltip>
                    </If>
                  </Box>
                </Th>
              )
            )}
          </Tr>
        </Thead>
        <Tbody overflow="auto">
          {rows.map(renderRow)}
          <If condition={Boolean(Trigger)}>
            <Tr>
              <Td
                style={{
                  padding: '0px',
                  borderBottom: '0px',
                  minHeight: '40px',
                  fontSize: '13px',
                  fontWeight: '500',
                }}
                colSpan={columns.length}
              >
                {Trigger ? <Trigger px="25px" /> : null}
              </Td>
            </Tr>
          </If>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
