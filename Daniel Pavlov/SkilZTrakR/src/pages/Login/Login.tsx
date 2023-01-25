import React, { useCallback } from 'react';
import { Box, Heading, Image, Button, Text } from '@chakra-ui/react';
import { colors } from '../../design/styles/foundations/colors';
import loginBackground from './../../assets/images/login.svg';
import logo from './../../assets/images/logo.svg';
import { ReactComponent as GoogleLogo } from '../../assets/icons/google.svg';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { signIn } from '../../store/slices/user/user';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loginUser = useCallback(
    (role?: string) => {
      dispatch(signIn({ role })).then(() => {
        navigate('/skills');
      });
    },
    [dispatch, navigate]
  );

  const loginAsUser = useCallback(
    () => {
      loginUser('user')
    }, [loginUser]
  )

  const loginAsAdmin = useCallback(
    () => {
      loginUser('admin')
    }, [loginUser]
  )

  const loginWithGoogle = useCallback(
    () => {
      loginUser()
    }, [loginUser]
  )

  return (
    <Box
      bg={colors.light.appBg}
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          bgImg={`url(${loginBackground})`}
          bgSize="contain"
          bgRepeat="repeat-x"
          bgPosition="left top"
          width="100%"
          height="102px"
        ></Box>
      </Box>
      <Box
        height="calc(100vh - 190px)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={logo} alt="Logo" data-qa="login-logo" />
        <Heading
          as="h3"
          size="2xl"
          fontWeight="700"
          my="32px"
          color={colors.greySolid[900]}
          data-qa="login-welcome-text"
        >
          Welcome to SkilZTrakR
        </Heading>

        <Box display="flex">
          <Button
            leftIcon={
              <GoogleLogo
                width="52px"
                height="52px"
                style={{ borderRadius: '4px' }}
              />
            }
            iconSpacing="0"
            variant="solid"
            width="242px"
            height="56px"
            fontSize="15px"
            display="flex"
            justifyContent="space-between"
            paddingLeft="2px"
            onClick={loginWithGoogle}
            data-testid="login-google-button"
            data-qa="login-google-button"
          >
            <Text mr="15px" fontWeight="600">
              Sign in with Google
            </Text>
          </Button>
          <Button
            leftIcon={
              <GoogleLogo
                width="52px"
                height="52px"
                style={{ borderRadius: '4px' }}
              />
            }
            iconSpacing="0"
            variant="solid"
            width="242px"
            height="56px"
            fontSize="15px"
            display="flex"
            justifyContent="space-between"
            paddingLeft="2px"
            onClick={loginAsAdmin}
            data-testid="login-admin-button"
            data-qa="login-admin-button"
            ml="5px"
          >
            <Text mr="25px" fontWeight="600">
              Sign in as Admin
            </Text>
          </Button>
          <Button
            leftIcon={
              <GoogleLogo
                width="52px"
                height="52px"
                style={{ borderRadius: '4px' }}
              />
            }
            iconSpacing="0"
            variant="solid"
            width="242px"
            height="56px"
            fontSize="15px"
            display="flex"
            justifyContent="space-between"
            paddingLeft="2px"
            onClick={loginAsUser}
            data-testid="login-employee-button"
            data-qa="login-employee-button"
            ml="5px"
          >
            <Text mr="12px" fontWeight="600">
              Sign in as Employee
            </Text>
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb="24px">
        <Text
          fontSize="lg"
          width="330px"
          textAlign="center"
          fontWeight="300"
          color={colors.greySolid[700]}
          data-qa="login-terms-text"
        >
          By signing up, you agree to the{' '}
          <span style={{ fontWeight: '600' }}>
            Terms of Service and Data Processing Agreement.
          </span>
        </Text>
      </Box>
    </Box>
  );
}

export default Login;
