import React, { useState } from 'react';

import {
  Box,
  Button,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { LineTab as Tab } from '../../design/components/Tabs/LineTab';
import { colors } from '../../design/styles/foundations/colors';
import SvgSolidPlus from '../../design/styles/icons/solid/SolidPlus';
import If from '../../components/If';
import { OrganizationTabs } from '../../api/types';
import EmployeesTable from './components/EmployeesTable';
import CreateNewSkillModal from './components/SkillsTable/components/CreateNewSkillModal/CreateNewSkillModal';
import InviteEmployeesModal from './components/EmployeesTable/components/InviteEmployeesModal/InviteEmployeesModal';
import CreateNewSkillGroupsModal from './components/SkillGroupsTable/components/CreateNewSkillGroupsModal';

const tabList = [
  { title: OrganizationTabs.Skills, value: OrganizationTabs.Skills },
  { title: OrganizationTabs.SkillGroups, value: OrganizationTabs.SkillGroups },
  { title: OrganizationTabs.Employees, value: OrganizationTabs.Employees },
  {
    title: OrganizationTabs.EmployeeGroups,
    value: OrganizationTabs.EmployeeGroups,
  },
];

const tabProps = {
  p: '4px',
  mr: 3,
  color: colors.greySolid[800],
  fontSize: 'xl',
};

const Organization = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <Box bg={colors.light.appBg} height="calc(100vh - 62px)">
        <Tabs isLazy index={selectedTab} onChange={setSelectedTab}>
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
                Organization
              </Heading>
              <Box display="flex">
                <If condition={selectedTab === 0}>
                  <CreateNewSkillModal />
                </If>
                <If condition={selectedTab === 1}>
                  <CreateNewSkillGroupsModal />
                </If>
                <If condition={selectedTab === 2}>
                  <InviteEmployeesModal />
                </If>
                <If condition={selectedTab === 3}>
                  <Button
                    leftIcon={<SvgSolidPlus width="20px" height="20px" />}
                    colorScheme="primary"
                    variant="solid"
                    size="md"
                    fontWeight="600"
                    iconSpacing="4px"
                    ml={3}
                    data-testid="organization-create-new-employee-groups-button"
                    data-qa="organization-create-new-employee-groups-button"
                  >
                    Create new
                  </Button>
                </If>
              </Box>
            </Box>
            <Box>
              <TabList px="40px">
                {tabList.map((item) => (
                  <Tab
                    key={item.value}
                    {...tabProps}
                    data-testid={`organization-tab-${item.value}`}
                    data-qa={`organization-tab-${item.value}`}
                  >
                    {item.title}
                  </Tab>
                ))}
              </TabList>
            </Box>
          </Box>
          <Box>
            <TabPanels>
              <TabPanel>
                <p>Skills content here</p>
              </TabPanel>
              <TabPanel>
                <p>Skills groups content here</p>
              </TabPanel>
              <TabPanel>
                <EmployeesTable />
              </TabPanel>
              <TabPanel>
                <p>Employee groups content here</p>
              </TabPanel>
            </TabPanels>
          </Box>
        </Tabs>
      </Box>
    </>
  );
};

export default Organization;
