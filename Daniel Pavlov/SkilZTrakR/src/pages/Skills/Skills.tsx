import React from 'react';
import {
  Badge,
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { LineTab as Tab } from '../../design/components/Tabs/LineTab';
import { colors } from '../../design/styles/foundations/colors';
import If from '../../components/If';
import { SkillsTabs } from '../../api/types';
import SkillsPendingTable from './components/SkillsPendingTable/SkillsPendingTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const tabList = [
  { title: SkillsTabs.Pending, value: SkillsTabs.Pending },
  { title: SkillsTabs.Completed, value: SkillsTabs.Completed },
  { title: SkillsTabs.All, value: SkillsTabs.All },
];

const tabProps = {
  p: '4px',
  mr: 3,
  color: colors.greySolid[800],
  fontSize: 'xl',
};

const Skills = () => {
  const skills = useSelector((state: RootState) => state.skillsPending.list);

  return (
    <Box bg={colors.light.appBg} height="calc(100vh - 62px)">
      <Tabs isLazy>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          bg="white"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="28px 40px 20px 40px"
          >
            <Heading as="h1" size="4xl" fontWeight="700">
              Skills
            </Heading>
          </Box>
          <Box>
            <TabList px="40px">
              {tabList.map((item) => (
                <Tab
                  key={item.value}
                  {...tabProps}
                  data-testid={`skills-tab-${item.value}`}
                  data-qa={`skills-tab-${item.value}`}
                >
                  {item.title}
                  <If
                    condition={
                      item.value === SkillsTabs.Pending && skills?.length
                    }
                  >
                    <Badge
                      colorScheme="yellow"
                      variant="solid"
                      borderRadius="4px"
                      fontWeight="600"
                      lineHeight="12px"
                      ml="6px"
                      p={1}
                      height="20px"
                      width="21px"
                    >
                      {skills?.length}
                    </Badge>
                  </If>
                </Tab>
              ))}
            </TabList>
          </Box>
        </Box>
        <Box>
          <TabPanels>
            <TabPanel>
              <SkillsPendingTable />
            </TabPanel>
            <TabPanel>
              <p>Completed skills content here</p>
            </TabPanel>
            <TabPanel>
              <p>All skills content here</p>
            </TabPanel>
          </TabPanels>
        </Box>
      </Tabs>
    </Box>
  );
};

export default Skills;
