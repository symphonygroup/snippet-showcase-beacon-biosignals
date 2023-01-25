import { Box, FormLabel, Icon } from '@chakra-ui/react';
import { InfoTooltip } from '../InfoTooltip/InfoTooltip';
import { SolidStar } from '../../styles/icons/solid';
import { boxWrapperStyle, formLabelStyle, iconStyle } from './Label.styles';

type LabelProps = {
  label: string;
  info?: string;
};
export const Label = ({ label, info, ...rest }: LabelProps) => (
  <Box {...boxWrapperStyle} {...rest}>
    <FormLabel
      {...formLabelStyle}
      requiredIndicator={<Icon as={SolidStar} {...iconStyle} />}
    >
      {label}
    </FormLabel>
    {info ? <InfoTooltip>{info}</InfoTooltip> : null}
  </Box>
);
