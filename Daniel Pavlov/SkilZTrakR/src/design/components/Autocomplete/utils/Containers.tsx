import { Box, Icon, Text } from '@chakra-ui/react';
import { ReactNode, useCallback, useMemo } from 'react';
import {
  MultiValueGenericProps,
  MultiValueRemoveProps,
  ValueContainerProps,
} from 'react-select';
import { GroupBase, components } from 'react-select';

import { SolidClose } from '../../../styles/icons/solid';

export const MultiValueRemove = ({
  children,
  ...props
}: MultiValueRemoveProps<unknown, boolean, GroupBase<unknown>>) => (
  <components.MultiValueRemove {...props}>
    <Icon
      as={SolidClose}
      color="greySolid.900"
      w={3.5}
      h={3.5}
      _hover={{ bg: 'primary.300', borderRadius: 'base' }}
    />
    {children}
  </components.MultiValueRemove>
);

export const MultiValueContainer = ({
  children,
  ...props
}: MultiValueGenericProps<unknown, boolean, GroupBase<unknown>>) => {
  const multiLabelIcon = props.selectProps.multiLabelIcon;
  return (
    <components.MultiValueContainer {...props}>
      <Box display="flex" margin="auto">
        {multiLabelIcon ? multiLabelIcon : null} {children}
      </Box>
    </components.MultiValueContainer>
  );
};

export const ValueContainer = ({
  children,
  ...props
}: ValueContainerProps<unknown, boolean, GroupBase<unknown>>) => {
  const numOfLabels = props.selectProps.numOfLabels ?? 2;
  const isMulti = props.selectProps.isMulti;
  const [values, events] = children as ReactNode[];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const itemsLength = (values as ReactNode[])?.length;

  const remainingItems = useMemo(() => {
    return (
      <Text
        textStyle="bodyM"
        fontWeight="semibold"
        color="primary.500"
        paddingLeft={2}
      >
        {`+${itemsLength - numOfLabels}`}
      </Text>
    );
  }, [itemsLength, numOfLabels]);

  const calculateChildren = useCallback(() => {
    if (!isMulti) {
      return children;
    }

    const isMenuOpen = props.selectProps.menuIsOpen;
    const closeMenuOnSelect = props.selectProps.closeMenuOnSelect;

    if (!isMenuOpen && itemsLength > numOfLabels && !closeMenuOnSelect) {
      return [
        [...(values as ReactNode[]).splice(0, numOfLabels), remainingItems],
        events,
      ] as ReactNode;
    }

    return children;
  }, [
    children,
    events,
    isMulti,
    itemsLength,
    numOfLabels,
    props.selectProps.closeMenuOnSelect,
    props.selectProps.menuIsOpen,
    remainingItems,
    values,
  ]);

  return (
    <components.ValueContainer {...props}>
      {calculateChildren()}
    </components.ValueContainer>
  );
};
