import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Box } from '@tidbits/react-tidbits';
import { Text as TextInput } from '@tidbits/react-tidbits/Input';
import { TR, TD } from '@tidbits/react-tidbits/Table';
import RightIcon from '@tidbits/react-tidbits/Icons/RightIcon';
import SearchAltIcon from '@tidbits/react-tidbits/Icons/SearchAltIcon';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import { format } from 'date-fns';
import StatusText from '../../../../components/StatusText';
import Priority from '../../../../components/Priority';
import Table from '../../../../components/Wrappers/Table';
import { TaskList } from '../../../../api/types';
import dashboard from '../../../../store/reducers/dashboard';
import projectsReducer from '../../../../store/reducers/projects';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { FilterOperators, URLParams } from '../../../../types/params';
import Filters from '../../../../components/Filters';
import If from '../../../../components/If';
import { Column } from '../../../../components/Wrappers/Table/Table';
import MultipleChoice from '../../../../components/Filters/components/MultipleChoice';
import Range from '../../../../components/Filters/components/Range';
import { Option } from '../../../../components/Filters/types';
import transformMapsToOptions from '../../../../components/Filters/tools';
import AdvancedSearchModal from '../AdvancedSearchModal';
import AdvancedSearchFilters from '../AdvancedSearchFilters';
import AvailabilityStatus from '../../../TaskDetails/components/StoreFrontList/components/AvailabilityStatus';

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

interface Row extends TaskList {
  worldwide: {
    status: string;
    multipleCountries: number;
  };
}

const HEADER_STYLE: React.CSSProperties = {
  top: '0px',
  whiteSpace: 'nowrap',
};
const TABLE_PADDING = 20;

const TABLE_COLUMNS: Column[] = [
  { name: 'Task ID', sortValue: 'id', style: HEADER_STYLE },
  { name: 'Task Status', sortValue: 'status', style: HEADER_STYLE },
  { name: 'Parked End Date', sortValue: 'parkedDate', style: HEADER_STYLE },
  { name: 'Adam ID', sortValue: 'adamId', style: HEADER_STYLE },
  { name: 'Song Title', sortValue: 'songName', style: HEADER_STYLE },
  { name: 'Artist', sortValue: 'artistName', style: HEADER_STYLE },
  { name: 'Service', sortValue: 'service', style: HEADER_STYLE },
  { name: 'Project', sortValue: 'projectId', style: HEADER_STYLE },
  { name: 'Source', sortValue: 'source', style: HEADER_STYLE },
  { name: 'Researcher', sortValue: 'assignee', style: HEADER_STYLE },
  {
    name: 'Priority',
    sortValue: 'priority',
    style: HEADER_STYLE,
    tooltip: 'The number of Research Requests is shown in brackets',
  },
  { name: 'Worldwide', sortValue: 'worldwideStatus', style: HEADER_STYLE, disableSort: true },
];

function TaskListTable() {
  const dispatch = useDispatch();
  const tasks = useSelector<any, Row[]>((state) => state.dashboard.tasks);
  const hasMore = useSelector<any, boolean>((state) => state.dashboard.hasMore);
  const loading = useSelector<any, boolean>((state) => state.dashboard.loading);
  const params = useSelector<any, URLParams>((state) => state.dashboard.params);
  const maps = useSelector<any, any>((state) => state.maps);
  const users = useSelector<any, any>((state) => state.users);
  const taskActiveProjects = useSelector<any, any>((state) => state.projects.taskActiveProjects);
  const history = useHistory();
  const containerRef = useRef<HTMLHtmlElement>();

  const handleCall = useCallback(
    async ({ page }) => {
      batch(() => {
        dispatch(dashboard.actions.all.initial());
        dispatch(dashboard.actions.updateParams({ prop: 'page', value: page + 1 }));
      });
    },
    [dispatch]
  );

  const handleSort = useCallback(
    (srt) => {
      batch(() => {
        const sort = [...srt];
        const hasPrioritySort = sort.find((s) => s.name === 'priority');
        const hasRequestsSort = sort.find((s) => s.name === 'requests');
        const isRequestsIndex = sort.findIndex((s) => s.name === 'requests');
        if (hasPrioritySort) {
          if (hasRequestsSort) {
            sort[isRequestsIndex] = { name: 'requests', value: 'desc' };
          } else {
            sort.push({ name: 'requests', value: 'asc' });
          }
        }
        if (!hasPrioritySort && hasRequestsSort) {
          sort.splice(isRequestsIndex, 1);
        }
        dispatch(dashboard.actions.updateParams({ prop: 'sort', value: sort }));
        dispatch(dashboard.actions.resetTable());
      });
    },
    [dispatch]
  );

  const handleSearch = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        batch(() => {
          dispatch(dashboard.actions.updateParams({ prop: 'search', value: e.target.value }));
          dispatch(dashboard.actions.resetTable());
        });
      }, 250),
    [dispatch]
  );

  const handleFiltersChange = useCallback(
    (filters) => {
      batch(() => {
        dispatch(dashboard.actions.updateParams({ prop: 'filters', value: filters }));
        dispatch(dashboard.actions.resetTable());
      });
    },
    [dispatch]
  );

  const { Trigger } = useInfiniteScroll({
    rows: tasks,
    next: handleCall,
    container: containerRef.current,
    hasMore,
    loading,
    page: params.page,
    size: params.size,
    sort: params.sort,
  });

  const redirectToTask = useCallback(
    (taskId) => () => {
      history.push(`/tasks/${taskId}`);
    },
    [history]
  );

  useEffect(() => {
    dispatch(projectsReducer.actions.taskActiveProjects.initial());
    return () => {
      dispatch(dashboard.actions.resetTable());
      // dispatch(projectsReducer.actions.reset());
    };
  }, [dispatch]);

  const isClosedStatusFilterSelected = useMemo((): boolean => {
    if (params.filters.length === 0) {
      return false;
    }

    const statusFilter = params.filters.find((f) => f.value === 'status');

    if (!statusFilter || statusFilter.values.length !== 1) {
      return false;
    }
    return !!statusFilter.values.find((sf) => sf.value === 'CLOSED');
  }, [params.filters]);

  const columns = useMemo(() => {
    if (!isClosedStatusFilterSelected) {
      return TABLE_COLUMNS.filter((c) => c.sortValue !== 'parkedDate');
    }
    return TABLE_COLUMNS;
  }, [isClosedStatusFilterSelected]);

  const tableHeight = useCallback(() => {
    return containerRef?.current?.getBoundingClientRect().top + TABLE_PADDING || 0;
  }, []);

  const filterOptions = useMemo(
    () => [
      {
        value: 'status',
        title: 'Status',
        operator: FilterOperators.IN,
        options: transformMapsToOptions(maps?.statuses?.items, 'name'),
        component: MultipleChoice,
      },
      {
        value: 'service',
        title: 'Service',
        operator: FilterOperators.IN,
        options: transformMapsToOptions(maps?.services?.items, 'name'),
        component: MultipleChoice,
      },
      {
        value: 'projectId',
        title: 'Project',
        operator: FilterOperators.IN,
        options: transformMapsToOptions(taskActiveProjects, 'name'),
        component: MultipleChoice,
      },
      {
        value: 'source',
        title: 'Source',
        operator: FilterOperators.IN,
        options: transformMapsToOptions(maps?.sources?.items, 'name'),
        component: MultipleChoice,
      },
      {
        value: 'assignee',
        title: 'Researcher',
        enableSearchOn: 'title',
        operator: FilterOperators.IN,
        options: transformMapsToOptions(users?.list, 'fullName'),
        component: MultipleChoice,
      },
      {
        value: 'requests',
        title: 'Requests',
        operator: FilterOperators.RANGE,
        options: [{ title: '', value: [] }],
        component: Range,
        validator: (option: Option) => {
          if (option.value === '' || Number(option.value) < 0) {
            return { ...option, value: '0' };
          }

          if (Number(option.value) > 100000000) {
            return { ...option, value: '100000000' };
          }
          return option;
        },
      },
      {
        value: 'priority',
        title: 'Priority',
        operator: FilterOperators.IN,
        options: transformMapsToOptions(maps?.priorities?.items, 'priority'),
        component: MultipleChoice,
      },
    ],
    [maps, users, taskActiveProjects]
  );

  return (
    <Box pb="20px">
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        bg="white"
        pt="20px"
        px="25px"
        top="120px"
        zIndex="5"
        height="100%"
      >
        <Box mt="4px">
          <Filters
            filters={params.filters}
            filterOptions={filterOptions}
            onChange={handleFiltersChange}
            popperProps={{
              placement: 'bottom',
              modifiers: {
                offset: 0,
                flip: {
                  behavior: ['bottom', 'top', 'bottom'],
                },
              },
            }}
          />
        </Box>
        <Box ml={15} display="flex" alignItems="center">
          <TextInput
            data-testid="task-list-table-search"
            onChange={handleSearch}
            clearable
            IconComponent={SearchAltIcon}
            type="text"
            width="350px"
            placeholder="Task ID, Song Title, Artist or ADAM ID"
            defaultValue={params.search}
          />
          <AdvancedSearchModal advancedFilterParams={params.advancedFilters} />
        </Box>
      </Box>
      <AdvancedSearchFilters />
      <Box px="25px" overflow="auto" height={`calc(100vh - ${tableHeight()}px)`} ref={containerRef}>
        <Table
          data-testid="table-task-list"
          columns={columns}
          rows={tasks}
          sort={params.sort}
          onSort={handleSort}
          Trigger={Trigger}
          stickyHeader
          renderRow={(row, index) => (
            <TR
              data-testid="task-list-table-row"
              onClick={redirectToTask(row.id)}
              key={index}
              style={{ cursor: 'pointer' }}
              hoverBg="tableRowHoverColor"
            >
              <TD>{row.id}</TD>
              <TD>
                <Box display="flex" alignItems="center">
                  <StatusText status={row.taskStatus} hideText />
                  {row.isParked && row.taskStatus === 'Closed' ? (
                    <Box mr={1} bg="parkedColor" p="5px" width={5} height={5} borderRadius={5} />
                  ) : (
                    ''
                  )}
                  {row.taskStatus}
                </Box>
              </TD>
              <If condition={isClosedStatusFilterSelected}>
                <TD>
                  {row.parkedDate
                    ? format(
                        new Date(`${new Date(row.parkedDate).toLocaleString('en-US', { timeZone })} UTC`),
                        'MMM dd yyyy'
                      )
                    : ''}
                </TD>
              </If>
              <TD>{row.adamId}</TD>
              <TD>{row.songTitle}</TD>
              <TD>{row.artist}</TD>
              <TD>{row.service}</TD>
              <TD>{row.project}</TD>
              <TD>{row.source}</TD>
              <TD>{row.researcher}</TD>
              <TD>
                <Box display="flex" alignItems="center" justifyContent="flex-start" whiteSpace="nowrap">
                  <Priority priority={row.priority} mr="3px" />({row.requests})
                </Box>
              </TD>
              <TD>
                <Box display="flex" justifyContent="space-between" alignItems="center" whiteSpace="nowrap">
                  <If
                    condition={
                      row.worldwide && row.worldwide?.status !== 'NONE' && row.worldwide?.status !== 'Multiple'
                    }
                  >
                    <AvailabilityStatus status={row.worldwide?.status} />
                  </If>
                  <If condition={row.worldwide?.status === 'Multiple'}>
                    <Box display="flex" alignItems="center">
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="14px"
                        height="14px"
                        backgroundColor="ctrl"
                        color="bg"
                        borderRadius="50%"
                        fontSize="9px"
                        textStyle="bodyEmph"
                      >
                        {row.worldwide?.multipleCountries}
                      </Box>
                      <Box ml="spacer5">Multiple</Box>
                    </Box>
                  </If>
                  <RightIcon display="flex" height="15px" width="10px" ml="auto" color="clrBlue" />
                </Box>
              </TD>
            </TR>
          )}
        />
      </Box>
    </Box>
  );
}

export default TaskListTable;
