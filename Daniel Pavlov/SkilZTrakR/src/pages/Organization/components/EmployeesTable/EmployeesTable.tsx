import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Tr,
  Td,
  Tag,
  TagLabel,
  Flex,
  Avatar,
  Text,
  Wrap,
  WrapItem,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import { Checkbox } from '../../../../design/components/Checkbox/Checkbox';
import Table from '../../../../components/Wrappers/Table';
import { Column } from '../../../../components/Wrappers/Table/Table';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { URLParams } from '../../../../types/params';
import {
  getAll,
  organizationEmployeeSlice,
} from '../../../../store/slices/organizationEmployees/organizationEmployees';
import { AppDispatch, RootState } from '../../../../store/store';
import { Employee } from '../../../../api/types';
import { colors } from '../../../../design/styles/foundations/colors';
import SvgSolidStar from '../../../../design/styles/icons/solid/SolidStar';
import SvgRegularStar from '../../../../design/styles/icons/regular/RegularStar';
import SvgSolidDelete from '../../../../design/styles/icons/solid/SolidDelete';
import { ReactComponent as Edit } from '../../../../assets/icons/edit.svg';
import './EmployeesTable.scss';
import If from '../../../../components/If';

const HEADER_STYLE: React.CSSProperties = {
  top: '0px',
};

const TABLE_PADDING = 20;

const TABLE_COLUMNS: Column[] = [
  {
    name: 'Employee',
    sortValue: 'email',
    style: HEADER_STYLE,
  },
  {
    name: 'Completed skills',
    sortValue: '',
    style: HEADER_STYLE,
    disableSort: true,
  },
  {
    name: 'Pending skills',
    sortValue: 'pendingSkills',
    style: HEADER_STYLE,
    disableSort: true,
  },
  {
    name: 'Status',
    sortValue: 'employeeStatus',
    style: HEADER_STYLE,
  },
];

function EmployeesTable() {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector(
    (state: RootState) => state.organizationEmployees.list
  );
  const hasMore = useSelector(
    (state: RootState) => state.organizationEmployees.hasMore
  );
  const loading = useSelector<any, boolean>(
    (state: RootState) => state.organizationEmployees.loading
  );
  const params = useSelector<any, URLParams>(
    (state: RootState) => state.organizationEmployees.params
  );
  const containerRef: any = useRef<HTMLHtmlElement>();

  const handleCall = useCallback(
    ({ page }: any) => {
      dispatch(getAll(params));
      dispatch(
        organizationEmployeeSlice.actions.updateParams({
          prop: 'page',
          value: page + 1,
        })
      );
    },
    [dispatch, params]
  );

  const handleSort = useCallback(
    (srt: any) => {
      dispatch(
        organizationEmployeeSlice.actions.updateParams({
          prop: 'sort',
          value: srt,
        })
      );
      dispatch(organizationEmployeeSlice.actions.resetTable());
    },
    [dispatch]
  );

  useEffect(() => {
    return () => {
      dispatch(organizationEmployeeSlice.actions.resetTable());
    };
  }, [dispatch]);

  const { Trigger } = useInfiniteScroll({
    rows: employees,
    next: handleCall,
    container: containerRef.current,
    hasMore,
    loading,
    page: params.page,
    size: params.size,
    sort: params.sort,
  });

  const tableHeight = useCallback(() => {
    return (
      containerRef?.current?.getBoundingClientRect().top + TABLE_PADDING || 0
    );
  }, []);

  const employeeStatus: any = useMemo(
    () => ({
      ACTIVE: {
        bgColor: colors.green[100],
        circleBgColor: colors.green[500],
        circleBorderColor: colors.green[700],
      },
      INVITED: {
        bgColor: colors.yellow[100],
        circleBgColor: colors.yellow[500],
        circleBorderColor: colors.yellow[700],
      },
      DEACTIVATED: {
        bgColor: colors.greyAlpha[100],
        circleBgColor: colors.greyAlpha[500],
        circleBorderColor: colors.greyAlpha[700],
      },
    }),
    []
  );

  const showMoreIndicator = useCallback((index: number, skillsType: string) => {
    const el: any = document.getElementById(
      `organization-employees-table-row-${skillsType}-skills-${index}`
    );
    if (el) {
      const listContainer = el.childNodes[0];
      const skillTagsGap = 8;
      const numberIndicatorWidth = 32;
      let listTotalWidth = numberIndicatorWidth;
      const list = listContainer.childNodes[0].childNodes[0].childNodes;
      list.forEach((item: any, i: number) => {
        list[i].removeAttribute('style');
        list[i].classList.remove(
          `organization-employees-table-row-${skillsType}-skills-hide-${index}`
        );
        if (
          listTotalWidth + item.offsetWidth + skillTagsGap >
          listContainer.offsetWidth
        ) {
          list[i].classList.add(
            `organization-employees-table-row-${skillsType}-skills-hide-${index}`
          );
          list[i].style.display = 'none';
        } else {
          listTotalWidth += item.offsetWidth + skillTagsGap;
        }
      });
      const nonVisibleElements = document.getElementsByClassName(
        `organization-employees-table-row-${skillsType}-skills-hide-${index}`
      );
      return nonVisibleElements.length > 0
        ? `+${nonVisibleElements.length}`
        : '';
    }
  }, []);

  const handleShowDeactivatedUsers = useCallback(
    (e: React.BaseSyntheticEvent) => {
      const value = e.target.checked;
      dispatch(
        organizationEmployeeSlice.actions.updateParams({
          prop: 'includeDeactivated',
          value,
        })
      );
      dispatch(organizationEmployeeSlice.actions.resetTable());
    },
    [dispatch]
  );

  const skillTagBgColor = useCallback(
    (rowStatus: string, skillType: string) => {
      if (rowStatus === 'DEACTIVATED') {
        return colors.greySolid[300];
      } else if (skillType === 'completed') {
        return colors.green[300];
      } else {
        return colors.yellow[300];
      }
    },
    []
  );

  const skillTagColor = useCallback((rowStatus: string, skillType: string) => {
    if (rowStatus === 'DEACTIVATED') {
      return colors.greySolid[600];
    } else if (skillType === 'completed') {
      return colors.green[700];
    } else {
      return colors.yellow[700];
    }
  }, []);

  const renderWrapItem = useCallback(
    (skill: any, row: any, skillType: string) => {
      return (
        <WrapItem key={skill.name}>
          <Tooltip
            p="2"
            borderRadius="6px"
            placement="top"
            colorScheme={colors.greySolid[900]}
            label={
              <Box display="flex" flexDirection={'column'}>
                <Box display="flex" alignItems="center">
                  {[
                    `${skillType}1st`,
                    `${skillType}2nd`,
                    `${skillType}3rd`,
                    `${skillType}4th`,
                    `${skillType}5th`,
                  ].map((val, i) => (
                    <Icon
                      boxSize={7}
                      as={i < skill.assessment ? SvgSolidStar : SvgRegularStar}
                      key={val}
                      color={`${colors.primary[500]}`}
                    />
                  ))}
                </Box>
                <Text p={'1'}>{skill.comment}</Text>
              </Box>
            }
          >
            <Tag
              variant="subtle"
              bg={skillTagBgColor(row.status, skillType)}
              color={skillTagColor(row.status, skillType)}
              p="4px 8px"
              borderRadius="3px"
              fontSize="sm"
              fontWeight="normal"
            >
              {skill.name}
            </Tag>
          </Tooltip>
        </WrapItem>
      );
    },
    [skillTagBgColor, skillTagColor]
  );

  const renderRow = useCallback(
    (row: Employee, index: number) => {
      return (
        <Tr
          key={index}
          data-testid="organization-employees-table-row"
          data-qa="organization-employees-table-row"
          height="80px"
          className="organization-employees-table-row"
        >
          <Td width="280px">
            <Flex alignItems="center">
              <Avatar src={row.image} w="32px" h="32px" />
              <Box
                ml="12px"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <If condition={row.status === 'ACTIVE'}>
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    color={colors.primary[800]}
                  >
                    {`${row.firstName} ${row.lastName}`}
                  </Text>
                  <Text fontSize="11px" color={colors.greySolid[600]}>
                    Software engineer
                  </Text>
                </If>
                <If condition={row.status === 'DEACTIVATED'}>
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    color={colors.greySolid[600]}
                  >
                    {`${row.firstName} ${row.lastName}`}
                  </Text>
                  <Text fontSize="11px" color={colors.greySolid[600]}>
                    Software engineer
                  </Text>
                </If>
                <If condition={row.status === 'INVITED'}>
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    color={colors.greySolid[900]}
                  >
                    {row.email}
                  </Text>
                </If>
              </Box>
            </Flex>
          </Td>
          <Td
            maxWidth="250px"
            id={`organization-employees-table-row-completed-skills-${index}`}
          >
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Wrap height="24px">
                {row.skills
                  .filter((item: any) => item.status === 'COMPLETED')
                  .map((skill: any, i: number) =>
                    renderWrapItem(skill, row, 'completed')
                  )}
              </Wrap>
              <Box ml="5px">
                <Text
                  color={colors.green[700]}
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  {showMoreIndicator(index, 'completed')}
                </Text>
              </Box>
            </Box>
          </Td>
          <Td
            maxWidth="250px"
            id={`organization-employees-table-row-pending-skills-${index}`}
          >
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Wrap height="24px">
                {row.skills
                  .filter((item: any) => item.status === 'PENDING')
                  .map((skill: any) => renderWrapItem(skill, row, 'pending'))}
              </Wrap>
              <Box ml="5px">
                <Text
                  color={colors.yellow[700]}
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  {showMoreIndicator(index, 'pending')}
                </Text>
              </Box>
            </Box>
          </Td>
          <Td width="210px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Tag
                size="sm"
                variant="subtle"
                color={colors.greyAlpha[600]}
                backgroundColor={employeeStatus[row?.status]?.bgColor}
                borderRadius="4px"
              >
                <Box
                  style={{
                    width: '9px',
                    height: '9px',
                    backgroundColor: employeeStatus[row?.status]?.circleBgColor,
                    borderRadius: '50%',
                    border: `${
                      employeeStatus[row?.status]?.circleBorderColor
                    } solid 1px`,
                    marginRight: '6.5px',
                  }}
                ></Box>
                <TagLabel fontSize="sm" fontWeight="normal">
                  {row.status.charAt(0) + row.status.slice(1).toLowerCase()}
                </TagLabel>
              </Tag>
              <Box display="flex" alignItems="center">
                <Icon
                  as={Edit}
                  w="16px"
                  h="16px"
                  color={`${colors.greySolid[800]}`}
                  _hover={{ color: colors.primary[500], cursor: 'pointer' }}
                  className="organization-employees-table-row-edit-icon"
                />
                <Icon
                  as={SvgSolidDelete}
                  w="20px"
                  h="22px"
                  color={`${colors.greySolid[800]}`}
                  _hover={{ color: colors.primary[500], cursor: 'pointer' }}
                  className="organization-employees-table-row-delete-icon"
                  ml="12px"
                />
              </Box>
            </Box>
          </Td>
        </Tr>
      );
    },
    [employeeStatus, renderWrapItem, showMoreIndicator]
  );
  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        px="25px"
        mt="40px"
        mb="25px"
      >
        <Checkbox
          isChecked={params.includeDeactivated}
          isDisabled={!employees.length}
          onChange={handleShowDeactivatedUsers}
          data-testid="organization-employees-table-show-deactivated-checkbox"
          data-qa="organization-employees-table-show-deactivated-checkbox"
          className="chkbox-shadow"
        >
          <Text fontSize="lg" fontWeight="semibold" color={colors.primary[500]}>
            Show deactivated users
          </Text>
        </Checkbox>
      </Box>
      <Box
        px="25px"
        overflow="auto"
        height={`calc(100vh - ${tableHeight()}px)`}
        ref={containerRef}
      >
        <Table
          data-testid="organization-employees-table"
          data-qa="organization-employees-table"
          columns={TABLE_COLUMNS}
          rows={employees}
          sort={params.sort}
          onSort={handleSort}
          Trigger={Trigger}
          stickyHeader
          renderRow={renderRow}
        />
      </Box>
    </>
  );
}

export default EmployeesTable;
