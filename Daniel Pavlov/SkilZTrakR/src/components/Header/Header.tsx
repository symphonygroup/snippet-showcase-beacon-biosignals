import React, { useCallback, useMemo } from 'react';
import {
  Box,
  Text,
  Divider,
  Center,
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import HeaderLink from './HeaderLink';
import SecureHeaderLink from './SecureHeaderLink';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo/logo.svg';
import { ReactComponent as Person } from '../../assets/icons/person.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import SvgSolidBell from '../../design/styles/icons/solid/SolidBell';
import SvgSolidSettingsGear from '../../design/styles/icons/solid/SolidSettingsGear';
import SvgSolidArrowChevronDown from '../../design/styles/icons/solid/SolidArrowChevronDown';
import { colors } from '../../design/styles/foundations/colors';
import { UserRole } from '../../api/types';
import { signOut } from '../../store/slices/user/user';

export enum Type {
  sticky = 'sticky',
}

interface Props {
  type?: Type;
}

function Header({ type }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const userName = useMemo(() => {
    let fullName = 'Guest';
    if (user.firstName !== '' && user.lastName !== '') {
      fullName = `${user.firstName} ${user.lastName}`;
    }
    return fullName;
  }, [user.firstName, user.lastName]);

  const logout = useCallback(() => {
    dispatch(signOut()).then(() => {
      navigate('/login');
    });
  }, [dispatch, navigate]);

  const userMenuItems = [
    {
      title: 'Profile',
      icon: Person,
      dataTestId: 'headerUserMenuItemProfile',
      dataQa: 'headerUserMenuItemProfile',
      onClickFunc: null,
    },
    {
      title: 'Log out',
      icon: Logout,
      dataTestId: 'headerUserMenuItemLogout',
      dataQa: 'headerUserMenuItemLogout',
      onClickFunc: logout,
    },
  ];

  return (
    <Box
      bg={colors.primary[500]}
      w="100%"
      p="20px 40px"
      color="white"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="62px"
      data-qa="header"
    >
      <Box display="flex" alignItems="center">
        <Link
          to="/skills"
          style={{ display: 'flex', alignItems: 'center' }}
          data-testid="headerLogo"
          data-qa="headerLogo"
        >
          <Logo data-testid="logo" width="50px" />
          <Text as="b" fontSize="16px" fontWeight="500" mr="5">
            SkilZTrakR
          </Text>
        </Link>
        <Center height="24px">
          <Divider orientation="vertical" borderColor="#F9F9FA" m="5" />
        </Center>
        <HeaderLink path="/skills" name="Skills" dataQa="headerLinkSkills" />
        <SecureHeaderLink
          path="/organization"
          name="Organization"
          dataQa="headerLinkOrganization"
          isAdmin={user.role === UserRole.Admin}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <Icon as={SvgSolidBell} w="20px" h="24px" />
        <Icon as={SvgSolidSettingsGear} w="20px" h="20px" ml="4" />
        <Box display="flex" flexDirection="column" alignItems="end" ml="10">
          <Text
            fontSize="2xl"
            fontWeight="500"
            data-testid="userName"
            data-qa="userName"
          >
            {userName}
          </Text>
          <Text
            fontSize="md"
            fontWeight="400"
            data-testid="userRole"
            data-qa="userRole"
          >
            {user.role === UserRole.Admin ? 'Admin' : 'Employee'}
          </Text>
        </Box>
        <Avatar
          size="md"
          name={userName}
          src={user.image}
          ml="2"
          width="40px"
          height="40px"
          data-testid="userImage"
          data-qa="userImage"
          showBorder
        />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Header User Menu"
            icon={<SvgSolidArrowChevronDown />}
            variant="outline"
            border="none"
            color="white"
            _hover={{ bg: 'transparent' }}
            _expanded={{ bg: 'transparent' }}
            _focus={{ bg: 'transparent' }}
            data-testid="headerUserMenuButton"
            data-qa="headerUserMenuButton"
          />
          <MenuList mt="7px" borderRadius="10px" zIndex="999">
            {userMenuItems.map((item: any) => (
              <MenuItem
                key={item.title}
                padding="0 10px"
                color={colors.primary[500]}
                _focus={{ bg: 'transparent' }}
                data-testid={item.dataTestId}
                data-qa={item.dataQa}
                onClick={item.onClickFunc}
              >
                <Box
                  display="flex"
                  width="100%"
                  padding="5px"
                  _hover={{
                    bg: colors.light.appBg,
                    borderRadius: '5px',
                  }}
                >
                  <Icon
                    as={item.icon}
                    w="20px"
                    h="20px"
                    _hover={{ color: colors.primary[500] }}
                  />
                  <Text fontSize="md" color={colors.greySolid[600]} ml="3px">
                    {item.title}
                  </Text>
                </Box>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
}

export default Header;
