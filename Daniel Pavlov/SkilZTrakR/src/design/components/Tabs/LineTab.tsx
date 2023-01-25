import { Flex, Tab, useTab } from '@chakra-ui/react';
import { ReactNode, forwardRef } from 'react';

import { lineTabContentStyle } from './LineTab.styles';

export type LineTabProps = {
  children: ReactNode;
};
export const LineTab = forwardRef<HTMLElement, LineTabProps>(
  ({ children, ...rest }, ref) => {
    const tabProps = useTab({ ...rest, ref });
    const isSelected = !!tabProps['aria-selected'];

    return (
      <Tab {...tabProps}>
        <Flex
          {...lineTabContentStyle}
          _hover={{
            borderRadius: 'base',
            backgroundColor: isSelected ? 'primary.100' : 'greyAlpha.100',
          }}
        >
          {children}
        </Flex>
      </Tab>
    );
  }
);

LineTab.displayName = 'LineTab';
