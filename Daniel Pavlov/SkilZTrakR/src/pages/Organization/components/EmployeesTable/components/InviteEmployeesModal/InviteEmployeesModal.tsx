import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import { Box, Text, Button, Icon, Tooltip } from '@chakra-ui/react';
import ModalComponent from '../../../../../../components/Modal';
import { ReactComponent as Person } from '../../../../../../assets/icons/person.svg';
import SvgSolidHelp from '../../../../../../design/styles/icons/solid/SolidHelp';
import SvgSolidClose from '../../../../../../design/styles/icons/solid/SolidClose';
import { colors } from '../../../../../../design/styles/foundations';
import { inviteEmployees } from '../../../../../../store/slices/organizationEmployees/organizationEmployees';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../../store/store';
import If from '../../../../../../components/If';
import { ErrorMessage } from '../../../../../../design/components/ErrorMessage/ErrorMessage';
import { useToast } from '../../../../../../design/hooks/useToast';

const InviteEmployeesModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const domainRegex = useMemo(
    () => /^([a-z][a-z0-9!%*+\-_.]+(@symphony\.is))$/,
    []
  );
  const [borderStyle, setBorderStyle] = useState('');
  const [borderShadow, setBorderShadow] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [emails, setEmails] = useState<string[]>([]);
  const emailLimit = 100;

  const handleClose = useCallback(() => {
    setEmails([]);
    setIsModalOpen(false);
  }, []);

  const toastMessage = useMemo(() => {
    return {
      title: '',
      description: '',
    };
  }, []);

  const setToastMessage = useCallback(
    (status: string, numberOfValidEmails: number) => {
      switch (status) {
        case 'success':
          toastMessage.title = 'Successfully sent invitations:';
          toastMessage.description = `Email invitations were successfully sent to ${
            emails.length
          } ${emails.length > 1 ? 'emails.' : 'email.'} `;
          return toastMessage;
        case 'warning':
          toastMessage.title = 'Successfully sent invitations:';
          toastMessage.description = `Email invitations were successfully sent to ${numberOfValidEmails} out of ${emails.length} emails.`;
          return toastMessage;
        case 'error':
          toastMessage.title = 'Failed!';
          toastMessage.description = 'The emails that were added are invalid.';
          return toastMessage;
      }
    },
    [emails.length, toastMessage]
  );

  const sendInvite = useCallback(() => {
    dispatch(inviteEmployees(emails)).then((res: any) => {
      const status = res?.payload?.status?.toLowerCase() || 'error';
      const numberOfValidEmails = res?.payload?.numberOfValidEmails;
      setToastMessage(status, numberOfValidEmails);
      toast({
        position: 'top',
        title: toastMessage.title,
        status: status,
        description: toastMessage.description,
        isClosable: true,
        duration: 7000,
        variant: 'subtle',
      });
      handleClose();
    });
  }, [
    dispatch,
    emails,
    handleClose,
    setToastMessage,
    toast,
    toastMessage.description,
    toastMessage.title,
  ]);

  const handleFocus = useCallback(() => {
    if (emails.length > emailLimit) {
      setBorderStyle(`1px solid ${colors.red[500]}`);
      setBorderShadow('0px 0px 0px 3px rgba(254, 116, 117, 0.2)');
      setBackgroundColor(colors.red[100]);
    } else {
      setBorderStyle(`1px solid ${colors.primary[500]}`);
      setBorderShadow('0px 0px 0px 3px rgba(108, 105, 255, 0.2)');
      setBackgroundColor('transparent');
    }
  }, [emails.length]);

  useEffect(() => {
    handleFocus();
  }, [emails, handleFocus]);

  const handleBlur = useCallback(() => {
    setBorderStyle(`1px solid ${colors.greySolid[500]}`);
    setBorderShadow('none');
  }, []);

  const setFilteredEmails = useCallback(
    (emails: string[]) => {
      const filteredEmails = emails.filter((email) => domainRegex.test(email));
      setEmails(filteredEmails);
    },
    [domainRegex]
  );

  const inviteEmployeesModalProps = {
    isModalOpen: isModalOpen,
    onCloseFunc: handleClose,
    headerTitle: 'Invite employees',
    confirmButtonTitle: 'Send invite',
    confirmButtonFunc: sendInvite,
    isDisabled: emails.length < 1 || emails.length > emailLimit,
    dataTestIdModal: 'organization-invite-employees-modal',
    dataTestIdModalOverlay: 'organization-invite-employees-modal-overlay',
    dataTestIdFooterCancelButton:
      'organization-invite-employees-modal-footer-cancel-button',
    dataTestIdFooterConfirmButton:
      'organization-invite-employees-modal-footer-sendInvite-button',
  };

  const openTheModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const renderLabel = useCallback(
    (email: string, index: number, removeEmail: Function) => {
      return (
        <div
          data-tag
          key={index}
          style={{
            backgroundColor: '#F0F0FF',
            color: '#33333C',
            height: '24px',
            padding: '4px 8px',
            gap: '8px',
            borderRadius: '3px',
            fontSize: '12px',
            fontWeight: '400',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div data-tag-item>{email}</div>
          <span
            style={{ display: 'flex' }}
            data-tag-handle
            onClick={() => removeEmail(index)}
          >
            <Icon
              as={SvgSolidClose}
              fontSize="sm"
              cursor="pointer"
              _hover={{
                backgroundColor: colors.primary[300],
                borderRadius: '3px',
              }}
            />
          </span>
        </div>
      );
    },
    []
  );

  return (
    <>
      <Button
        leftIcon={<Person width="20px" height="20px" />}
        colorScheme="primary"
        variant="solid"
        size="md"
        fontWeight="600"
        onClick={openTheModal}
        data-testid="organization-invite-employees-button"
        data-qa="organization-invite-employees-button"
      >
        Invite employees
      </Button>
      <ModalComponent {...inviteEmployeesModalProps}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Text
              fontSize="md"
              lineHeight="taller"
              py={1}
              color={colors.greySolid[900]}
              fontWeight="500"
            >
              Email address
            </Text>
            <Tooltip
              label="To create multiple tags use comma to separate two or more independent tags"
              placement="right"
              bg={colors.greySolid[900]}
              borderRadius="6px"
              p={2}
              height="52px"
              width="260px"
              fontSize="sm"
              display="flex"
              data-qa="organization-invite-employees-modal-tooltip"
              data-testid="organization-invite-employees-modal-tooltip"
            >
              <span style={{ display: 'flex' }}>
                <Icon
                  as={SvgSolidHelp}
                  width="15px"
                  height="15px"
                  ml={1}
                  color={'#808087'}
                  data-qa="organization-invite-employees-modal-helpIcon"
                  data-testid="organization-invite-employees-modal-helpIcon"
                />
              </span>
            </Tooltip>
          </Box>
          <Text
            fontSize="xs"
            color={
              emails.length <= emailLimit
                ? colors.greySolid[600]
                : colors.red[500]
            }
          >{`${emails.length}/100`}</Text>
        </Box>
        <Box
          data-qa="organization-invite-modal-inputContainer"
          data-testid="organization-invite-modal-inputContainer"
        >
          <ReactMultiEmail
            placeholder={
              <span style={{ color: colors.greySolid[500], fontSize: '14px' }}>
                email@symphony.is
              </span>
            }
            emails={emails}
            onChange={setFilteredEmails}
            onFocus={handleFocus}
            onBlur={handleBlur}
            delimiter={'[/,; ]'}
            style={{
              maxHeight: '147px',
              overflow: 'auto',
              fontSize: '14px',
              border: borderStyle,
              boxShadow: borderShadow,
              backgroundColor: backgroundColor,
            }}
            getLabel={renderLabel}
          />
        </Box>
        <If condition={emails.length > emailLimit}>
          <ErrorMessage
            message={'Maximum number of selected employees is 100.'}
            data-qa="organization-invite-employees-modal-limitWarning"
            data-testid="organization-invite-employees-modal-limitWarning"
          />
        </If>
      </ModalComponent>
    </>
  );
};

export default InviteEmployeesModal;
