import { Box, Icon, Tooltip, TooltipProps } from '@chakra-ui/react';
import { SolidHelp } from '../../styles/icons/solid';
import { iconStyle, tooltipStyle } from './InfoTooltip.styles.ts';

export const InfoTooltip = ({ children, ...rest }: TooltipProps) => (
  <Tooltip {...tooltipStyle} label={children} {...rest}>
    <Box display="flex">
      <Icon as={SolidHelp} {...iconStyle} />
    </Box>
  </Tooltip>
);
