import React, { useCallback, useMemo, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../../store/store';
import ModalComponent from '../../../../../../components/Modal';
import SvgSolidPlus from '../../../../../../design/styles/icons/solid/SolidPlus';
import { createSkill } from '../../../../../../store/slices/organizationSkills/organizationSkills';
import { InputField } from '../../../../../../design/components/InputField/InputField';
import { AutocompleteField } from '../../../../../../design/components/AutocompleteField/AutocompleteField';
import { useToast } from '../../../../../../design/hooks/useToast';

const skillNameAlreadyExists = 'Skill already exists!';

const CreateNewSkillModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isInfoLinkValid, setIsInfoLinkValid] = useState<boolean>(true);

  const {
    control,
    watch,
    setValue,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<any>({
    mode: 'onChange',
  });

  const skillNameInput = watch('skillNameInput');
  const infoLinkInput = watch('infoLinkInput');

  const clearInputs = useCallback(() => {
    setValue('skillNameInput', '');
    setValue('infoLinkInput', '');
    clearErrors(['skillNameInput', 'infoLinkInput']);
  }, [clearErrors, setValue]);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    setIsInfoLinkValid(true);
    clearInputs();
  }, [clearInputs]);

  const toastMessage = useMemo(() => {
    return {
      title: '',
      description: '',
    };
  }, []);

  const setToastMessage = useCallback(
    (status: string) => {
      switch (status) {
        case 'success':
          toastMessage.title = 'Successfully created a new skill';
          toastMessage.description = 'A new skill was created.';
          return toastMessage;
        case 'error':
          toastMessage.title = 'Failed!';
          toastMessage.description = 'The creation of a new skill failed.';
          return toastMessage;
      }
    },
    [toastMessage]
  );

  const saveActions = useCallback(
    (res: any) => {
      const responseStatus = !res.error ? 'success' : 'error';
      clearInputs();
      setIsInfoLinkValid(true);
      setToastMessage(responseStatus);
      toast({
        position: 'top',
        title: toastMessage.title,
        status: responseStatus,
        description: toastMessage.description,
        isClosable: true,
        duration: 7000,
        variant: 'subtle',
      });
    },
    [
      clearInputs,
      setToastMessage,
      toast,
      toastMessage.description,
      toastMessage.title,
    ]
  );

  const handleSaveDispatch = useCallback(
    (saveAndCreate?: boolean) => {
      const skill = {
        skillName: skillNameInput,
        infoLink: infoLinkInput,
      };
      dispatch(createSkill(skill)).then((res: any) => {
        const errors = res?.payload?.response?.data?.errors;
        if (errors?.includes(skillNameAlreadyExists)) {
          setError('skillNameInput', {
            message: 'A skill with this name already exists',
          });
        } else {
          saveActions(res);
          !saveAndCreate && handleClose();
        }
      });
    },
    [
      dispatch,
      handleClose,
      infoLinkInput,
      saveActions,
      setError,
      skillNameInput,
    ]
  );

  const handleSave = useCallback(() => {
    handleSaveDispatch();
  }, [handleSaveDispatch]);

  const handleSaveAndCreate = useCallback(() => {
    handleSaveDispatch(true);
  }, [handleSaveDispatch]);

  const isValidHttpUrl = useCallback((e: any) => {
    try {
      const url = new URL(e);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        setIsInfoLinkValid(true);
        return true;
      }
    } catch (err) {
      setIsInfoLinkValid(false);
      return false;
    }
  }, []);

  const isDisabled = useMemo(() => {
    return !skillNameInput || !infoLinkInput || !isInfoLinkValid;
  }, [infoLinkInput, isInfoLinkValid, skillNameInput]);

  const createNewSkillModalProps = {
    isModalOpen: isModalOpen,
    onCloseFunc: handleClose,
    headerTitle: 'Create new skill',
    confirmButtonTitle: 'Save',
    confirmButtonFunc: handleSave,
    isDisabled,
    dataTestIdModal: 'organization-create-new-skill-modal',
    dataTestIdModalOverlay: 'organization-create-new-skill-modal-overlay',
    dataTestIdFooterCancelButton:
      'organization-create-new-skill-modal-footer-cancel-button',
    dataTestIdFooterConfirmButton:
      'organization-create-new-skill-modal-footer-save-button',
    showSecondConfirmButton: true,
    secondConfirmButtonTitle: 'Save and create new',
    secondConfirmButtonFunc: handleSaveAndCreate,
    isDisabledSecondConfirm: isDisabled,
    dataTestIdFooterSecondConfirmButton:
      'organization-create-new-skill-modal-footer-saveAndCreateNew-button',
  };

  const openTheModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const inputArgs = {
    fontSize: 'lg',
    autoComplete: 'off',
  };

  return (
    <>
      <Button
        leftIcon={<SvgSolidPlus width="20px" height="20px" />}
        colorScheme="primary"
        variant="solid"
        size="md"
        fontWeight="600"
        iconSpacing="4px"
        ml={3}
        onClick={openTheModal}
        data-testid="organization-create-new-skill-button"
        data-qa="organization-create-new-skill-button"
      >
        Create new
      </Button>
      <ModalComponent {...createNewSkillModalProps}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center"></Box>
        </Box>
        <Box>
          <InputField
            label="Skill name"
            placeholder="e.g. Javascript"
            isRequired
            errors={errors}
            {...register('skillNameInput', {
              required: 'Skill name field is required',
            })}
            className={`form-control ${
              errors.skillNameInput ? 'is-invalid' : ''
            }`}
            {...inputArgs}
            data-qa="organization-create-new-skill-modal-skill-name-input"
            data-testid="organization-create-new-skill-modal-skill-name-input"
          />
        </Box>
        <Box mt="24px">
          <InputField
            label="Info link"
            placeholder="Insert a website link"
            isRequired
            errors={errors}
            {...register('infoLinkInput', {
              required: 'Info link field is required',
              validate: {
                ValidityState: (v) =>
                  isValidHttpUrl(v) || 'Please enter a valid link',
              },
            })}
            {...inputArgs}
            data-qa="organization-create-new-skill-modal-info-link-input"
            data-testid="organization-create-new-skill-modal-info-link-input"
          />
        </Box>
        <Box mt="24px">
          <AutocompleteField
            label="Skill group"
            placeholder="Search for groups"
            numOfLabels={15}
            isMulti
            options={[]}
            name="skillGroupAutocompleteInput"
            control={control}
            isClearable={false}
            isDisabled
          />
        </Box>
      </ModalComponent>
    </>
  );
};

export default CreateNewSkillModal;
