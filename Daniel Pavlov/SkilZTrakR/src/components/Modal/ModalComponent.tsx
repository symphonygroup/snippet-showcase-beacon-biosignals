import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Divider,
  Box,
} from '@chakra-ui/react';
import { colors } from '../../design/styles/foundations/colors';
import If from '../If';

interface ModalProps {
  isModalOpen: boolean;
  onCloseFunc: any;
  headerTitle: string;
  confirmButtonTitle: string;
  confirmButtonFunc: any;
  isDisabled?: boolean;
  dataTestIdModal: string;
  dataTestIdModalOverlay: string;
  dataTestIdFooterCancelButton: string;
  dataTestIdFooterConfirmButton: string;
  showSecondConfirmButton?: boolean;
  secondConfirmButtonTitle?: string;
  secondConfirmButtonFunc?: any;
  isDisabledSecondConfirm?: boolean;
  dataTestIdFooterSecondConfirmButton?: string;
  children: React.ReactNode;
}

const ModalComponent = ({
  headerTitle,
  confirmButtonTitle,
  confirmButtonFunc,
  isModalOpen,
  isDisabled,
  onCloseFunc,
  dataTestIdModal,
  dataTestIdModalOverlay,
  dataTestIdFooterCancelButton,
  dataTestIdFooterConfirmButton,
  showSecondConfirmButton = false,
  secondConfirmButtonTitle,
  secondConfirmButtonFunc,
  isDisabledSecondConfirm,
  dataTestIdFooterSecondConfirmButton,
  children,
}: ModalProps) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onCloseFunc}
      isCentered
      size="sm"
      data-qa={dataTestIdModal}
      data-testid={dataTestIdModal}
    >
      <ModalOverlay
        data-qa={dataTestIdModalOverlay}
        data-testid={dataTestIdModalOverlay}
      />
      <ModalContent borderRadius="8px">
        <ModalHeader
          bg={colors.primary[500]}
          fontWeight="700"
          color="white"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="7px 7px 0 0 "
          fontSize="3xl"
          width="100%"
          py={5}
        >
          {headerTitle}
        </ModalHeader>
        <ModalBody padding="24px">{children}</ModalBody>
        <Divider orientation="horizontal" borderColor="#E4E5E7" />
        <ModalFooter>
          <Box
            display="flex"
            width="100%"
            justifyContent={
              showSecondConfirmButton ? 'space-between' : 'flex-end'
            }
            alignItems="center"
          >
            <If condition={showSecondConfirmButton}>
              <Button
                isDisabled={isDisabledSecondConfirm}
                border="1px"
                borderColor="gray.200"
                variant="ghost"
                onClick={secondConfirmButtonFunc}
                data-qa={dataTestIdFooterSecondConfirmButton}
                data-testid={dataTestIdFooterSecondConfirmButton}
              >
                {secondConfirmButtonTitle}
              </Button>
            </If>
            <Box display="flex" alignItems="center">
              <Button
                border="1px"
                borderColor="gray.200"
                variant="ghost"
                mr={3}
                onClick={onCloseFunc}
                data-qa={dataTestIdFooterCancelButton}
                data-testid={dataTestIdFooterCancelButton}
              >
                Cancel
              </Button>
              <Button
                isDisabled={isDisabled}
                colorScheme="primary"
                onClick={confirmButtonFunc}
                data-qa={dataTestIdFooterConfirmButton}
                data-testid={dataTestIdFooterConfirmButton}
              >
                {confirmButtonTitle}
              </Button>
            </Box>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
