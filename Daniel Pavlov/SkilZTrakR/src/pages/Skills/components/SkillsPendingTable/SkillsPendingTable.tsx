import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  chakra,
  Tag,
  TagLabel,
  Box,
  Tr,
  Td,
  Icon,
  WrapItem,
  Wrap,
} from '@chakra-ui/react';
import { Checkbox } from '../../../../design/components/Checkbox/Checkbox';
import Table from '../../../../components/Wrappers/Table';
import { Column } from '../../../../components/Wrappers/Table/Table';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { URLParams } from '../../../../types/params';
import {
  getAll,
  skillsPendingSlice,
} from '../../../../store/slices/skillsPending/skillsPending';
import { AppDispatch, RootState } from '../../../../store/store';
import { Skill } from '../../../../api/types';
import { colors } from '../../../../design/styles/foundations/colors';
import { Button } from '../../../../design/components/Button/Button';
import { ReactComponent as PlayIcon } from '../../../../assets/icons/play.svg';
import SvgSolidStar from '../../../../design/styles/icons/solid/SolidStar';
import SvgLightStar from '../../../../design/styles/icons/light/LightStar';
import './SkillsPendingTable.scss';

const HEADER_STYLE: React.CSSProperties = {
  top: '0px',
};

const TABLE_PADDING = 20;

const TABLE_COLUMNS: Column[] = [
  {
    name: 'Skill',
    sortValue: 'name',
    style: HEADER_STYLE,
  },
  {
    name: 'Level of expertise',
    sortValue: 'level',
    style: HEADER_STYLE,
    disableSort: true,
  },
  {
    name: 'Skill groups',
    sortValue: 'skillGroups',
    style: HEADER_STYLE,
    disableSort: true,
  },
  {
    name: 'Status',
    sortValue: 'assessmentStatus',
    style: HEADER_STYLE,
    disableSort: true,
  },
];

const SKILL_STATUS_STYLES: any = {
  PENDING: {
    color: colors.greyAlpha[600],
    bgColor: colors.yellow[100],
    circleBgColor: colors.yellow[500],
    circleBorderColor: colors.yellow[700],
  },

  COMPLETED: {
    color: colors.greyAlpha[600],
    bgColor: colors.green[100],
    circleBgColor: colors.green[500],
    circleBorderColor: colors.green[700],
  },

  'NOT STARTED': {
    color: colors.greyAlpha[600],
    bgColor: colors.greyAlpha[100],
    circleBgColor: colors.greyAlpha[400],
    circleBorderColor: colors.greySolid[900],
  },
};

function SkillsPendingTable() {
  const dispatch = useDispatch<AppDispatch>();
  const skills = useSelector((state: RootState) => state.skillsPending.list);
  const userEmail = useSelector((state: RootState) => state.user.email);

  const [ratings, setRatings] = useState(
    skills.map((skill: Skill) => skill.levelOfExpertise)
  );

  useEffect(() => {
    const ratings = skills.map((skill: Skill) => skill.levelOfExpertise)
    setRatings(ratings);
  }, [skills])

  const hasMore = useSelector(
    (state: RootState) => state.skillsPending.hasMore
  );
  const loading = useSelector<any, boolean>(
    (state: RootState) => state.skillsPending.loading
  );
  const params = useSelector<any, URLParams>(
    (state: RootState) => state.skillsPending.params
  );

  const containerRef: any = useRef<HTMLHtmlElement>();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCall = useCallback(
    ({ page }: any) => {
      const newParams = { ...params, email: userEmail }
      dispatch(getAll(newParams));
      dispatch(
        skillsPendingSlice.actions.updateParams({
          prop: 'page',
          value: page + 1,
        })
      );
    },
    [dispatch, params, userEmail]
  );

  const handleSort = useCallback(
    (srt: any) => {
      dispatch(
        skillsPendingSlice.actions.updateParams({ prop: 'sort', value: srt })
      );
      dispatch(skillsPendingSlice.actions.resetTable());
    },
    [dispatch]
  );

  useEffect(() => {
    return () => {
      dispatch(skillsPendingSlice.actions.resetTable());
    };
  }, [dispatch]);

  const { Trigger } = useInfiniteScroll({
    rows: skills,
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

  const handleSelectAll = useCallback(
    (isSelected: boolean) => {
      if (isSelected) {
        const checkedItemsList: string[] = [];
        skills.forEach((item: Skill) => checkedItemsList.push(item.name));
        setCheckedItems(checkedItemsList);
      } else {
        setCheckedItems([]);
      }
    },
    [skills]
  );

  const handleSetCheckedItems = useCallback(
    (e: React.BaseSyntheticEvent) => {
      const name = e.target.parentNode.dataset.rowname;
      const isChecked = e.target.checked;

      let checkedItemsList: string[] = [...checkedItems];
      if (isChecked) {
        checkedItemsList.push(name);
      } else {
        checkedItemsList = checkedItemsList.filter((item) => {
          return item !== name;
        });
      }
      setCheckedItems(checkedItemsList);
    },
    [checkedItems]
  );

  const updateHoverRating = (index: number, score: number) => {
    setRatings((prevState: number[]) => {
      const nextRatings = prevState.map((r, i) => {
        if (i === index) {
          return score;
        } else {
          return r;
        }
      });

      return nextRatings;
    });
  };

  const handleStarMouseEnter = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      if (!(e.target instanceof HTMLDivElement)) {
        return;
      }
      if (
        typeof e.target.dataset.index === 'undefined' ||
        typeof e.target.dataset.starindex === 'undefined'
      ) {
        return;
      }
      const index = parseInt(e.target.dataset.index);
      const starIndex = parseInt(e.target.dataset.starindex);

      updateHoverRating(index, starIndex + 1);
    },
    []
  );

  const handleStarMouseLeave = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      if (!(e.target instanceof HTMLDivElement)) {
        return;
      }
      if (
        typeof e.target.dataset.index === 'undefined' ||
        typeof e.target.dataset.expertiselevel === 'undefined'
      ) {
        return;
      }
      const index = parseInt(e.target.dataset.index);
      const levelOfExpertise = parseInt(e.target.dataset.expertiselevel);

      updateHoverRating(index, levelOfExpertise);
    },
    []
  );

  const renderRow = useCallback(
    (row: Skill, index: number) => {
      return (
        <Tr
          key={index}
          data-testid="skills-pending-table-row"
          data-qa="skills-pending-table-row"
          bgColor={checkedItems.includes(row.name) ? colors.primary[100] : ''}
        >
          <Td width="0" pr="0" mr="0">
            <Checkbox
              isChecked={checkedItems.includes(row.name)}
              onChange={handleSetCheckedItems}
              data-testid={`skills-pending-table-row-checkbox-${row.name}`}
              data-qa={`skills-pending-table-row-checkbox-${row.name}`}
              data-rowname={row.name}
              className="chkbox-shadow"
            />
          </Td>
          <Td>{row.name}</Td>
          <Td>
            <Box display="flex">
              {[
                'firstStar',
                'secondStar',
                'thirdStar',
                'fourthStar',
                'fifthStar',
              ].map((val, starIndex) => {
                return (
                  <Box
                    data-testid={`skills-pending-table-update-hover-rating-${row.name}-${starIndex}`}
                    data-qa={`skills-pending-table-update-hover-rating-${row.name}-${starIndex}`}
                    key={val}
                    data-index={index}
                    data-starindex={starIndex}
                    data-expertiselevel={row.levelOfExpertise}
                    onMouseEnter={handleStarMouseEnter}
                    onMouseLeave={handleStarMouseLeave}
                    cursor="pointer"
                  >
                    <Icon
                      as={
                        starIndex + 1 > ratings[index] || starIndex === -1
                          ? SvgLightStar
                          : SvgSolidStar
                      }
                      boxSize={7}
                      color={
                        row.levelOfExpertise === 0 && ratings[index] < 1
                          ? colors.primary[300]
                          : colors.primary[500]
                      }
                      pointerEvents="none"
                    />
                  </Box>
                );
              })}
            </Box>
          </Td>

          <Td>
            <Wrap>
              {row.skillGroups.map((skillGroup: string) => {
                return (
                  <WrapItem key={skillGroup}>
                    <Tag
                      color={colors.primary[800]}
                      backgroundColor={colors.primary[200]}
                      borderRadius="3px"
                      px={2}
                      py="3px"
                      fontWeight="400"
                    >
                      <TagLabel>{skillGroup}</TagLabel>
                    </Tag>
                  </WrapItem>
                );
              })}
            </Wrap>
          </Td>

          <Td>
            <Tag
              color={SKILL_STATUS_STYLES[row.assessmentStatus]?.color}
              backgroundColor={SKILL_STATUS_STYLES[row.assessmentStatus]?.bgColor}
              minHeight="22px"
            >
              <div
                style={{
                  width: '9px',
                  height: '9px',
                  backgroundColor:
                    SKILL_STATUS_STYLES[row.assessmentStatus]?.circleBgColor,
                  borderRadius: '50%',
                  border: `${SKILL_STATUS_STYLES[row.assessmentStatus]?.circleBorderColor
                    } solid 1px`,
                  marginRight: '6.5px',
                }}
              ></div>

              <TagLabel>
                {row.assessmentStatus.charAt(0).toUpperCase() + row.assessmentStatus.toLowerCase().slice(1)}
              </TagLabel>
            </Tag>
          </Td>
        </Tr>
      );
    },
    [
      checkedItems,
      handleSetCheckedItems,
      handleStarMouseEnter,
      handleStarMouseLeave,
      ratings,
    ]
  );

  return (
    <>
      <Box
        px="25px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        overflow="auto"
        height={`calc(100vh - ${tableHeight()}px)`}
        ref={containerRef}
      >
        <Table
          data-testid="skills-pending-table"
          data-qa="skills-pending-table"
          columns={TABLE_COLUMNS}
          rows={skills}
          sort={params.sort}
          onSort={handleSort}
          Trigger={Trigger}
          stickyHeader
          showCheckbox
          isCheckboxDisabled={!skills.length}
          isSelectedAll={
            checkedItems.length === skills.length && skills.length > 0
          }
          onSelectAll={handleSelectAll}
          renderRow={renderRow}
        />
        <Box display="flex">
          <Button
            pr="16px"
            py="9px"
            size="lg"
            isDisabled={!skills.length || (skills.length && !checkedItems.length)}
            leftIcon={chakra(PlayIcon, {
              baseStyle: {
                width: '10px!important',
                ml: '8px',
                mr: '6px',
              },
            })}
          >
            Complete now
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default SkillsPendingTable;
