import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../store/store';
import ModalComponent from '../../../../../../components/Modal';
import SvgSolidPlus from '../../../../../../design/styles/icons/solid/SolidPlus';
import {
  getAllSkillNames,
  createSkillGroup,
} from '../../../../../../store/slices/organizationSkillGroups/organizationSkillGroups';
import { InputField } from '../../../../../../design/components/InputField/InputField';
import { AutocompleteField } from '../../../../../../design/components/AutocompleteField/AutocompleteField';
import { useToast } from '../../../../../../design/hooks/useToast';

const skillGroupNameAlreadyExists = 'Skill group already exists!';

const CreateNewSkillGroupsModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const skills = useSelector(
    (state: RootState) => state.organizationSkills.skillNames
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const skillGroupNameInput = watch('skillGroupNameInput');
  const skillsAutocompleteInput = watch('skillsAutocompleteInput');

  useEffect(() => {
    if (isModalOpen) {
      dispatch(getAllSkillNames());
    }
  }, [dispatch, isModalOpen]);

  const clearInputs = useCallback(() => {
    setValue('skillGroupNameInput', '');
    setValue('skillsAutocompleteInput', '');
    clearErrors(['skillGroupNameInput', 'skillsAutocompleteInput']);
  }, [clearErrors, setValue]);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
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
          toastMessage.title = 'Successfully created a new skill group';
          toastMessage.description = 'A new skill group was created.';
          return toastMessage;
        case 'error':
          toastMessage.title = 'Failed!';
          toastMessage.description =
            'The creation of a new skill group failed.';
          return toastMessage;
      }
    },
    [toastMessage]
  );

  const saveActions = useCallback(
    (res: any) => {
      const responseStatus = !res.error ? 'success' : 'error';
      clearInputs();
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

  const handleCreate = useCallback(() => {
    const group = {
      skillGroupName: skillGroupNameInput,
      skills: skillsAutocompleteInput?.map((item: any) => item.value),
    };
    dispatch(createSkillGroup(group)).then((res: any) => {
      const error = res?.payload?.response?.data?.error;
      if (error === skillGroupNameAlreadyExists) {
        setError('skillGroupNameInput', {
          message: 'A group with this name already exists',
        });
      } else {
        saveActions(res);
        handleClose();
      }
    });
  }, [
    dispatch,
    handleClose,
    skillsAutocompleteInput,
    saveActions,
    setError,
    skillGroupNameInput,
  ]);

  const isDisabled = useMemo(() => {
    return !skillGroupNameInput;
  }, [skillGroupNameInput]);

  const CreateNewSkillGroupsModalProps = {
    isModalOpen: isModalOpen,
    onCloseFunc: handleClose,
    headerTitle: 'Create new skill group',
    confirmButtonTitle: 'Create',
    confirmButtonFunc: handleCreate,
    isDisabled,
    dataTestIdModal: 'organization-create-new-skill-group-modal',
    dataTestIdModalOverlay: 'organization-create-new-skill-group-modal-overlay',
    dataTestIdFooterCancelButton:
      'organization-create-new-skill-group-modal-footer-cancel-button',
    dataTestIdFooterConfirmButton:
      'organization-create-new-skill-group-modal-footer-create-button',
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
        data-testid="organization-create-new-skill-group-button"
        data-qa="organization-create-new-skill-group-button"
      >
        Create new
      </Button>
      <ModalComponent {...CreateNewSkillGroupsModalProps}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center"></Box>
        </Box>
        <Box>
          <InputField
            label="Skill group name"
            placeholder="e.g. front-end"
            isRequired
            errors={errors}
            {...register('skillGroupNameInput', {
              required: 'Skill name field is required',
            })}
            className={`form-control ${
              errors.skillGroupNameInput ? 'is-invalid' : ''
            }`}
            {...inputArgs}
            data-qa="organization-create-new-skill-group-modal-skill-group-name-input"
            data-testid="organization-create-new-skill-group-modal-skill-group-name-input"
          />
        </Box>
        <Box mt="24px">
          <AutocompleteField
            label="Skills"
            placeholder="Search for skills"
            numOfLabels={15}
            isMulti
            options={skills?.map((e: any) => ({
              value: e.name,
              label: e.name,
            }))}
            name="skillsAutocompleteInput"
            control={control}
            isClearable={false}
            data-qa="organization-create-new-skill-group-modal-skills-input"
            data-testid="organization-create-new-skill-group-modal-skills-input"
          />
        </Box>
      </ModalComponent>
    </>
  );
};

export default CreateNewSkillGroupsModal;
