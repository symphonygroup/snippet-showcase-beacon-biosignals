import '@fontsource/inter/100.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

import {
  extendTheme,
  theme,
  type ThemeConfig,
  withDefaultColorScheme,
} from '@chakra-ui/react';

import * as foundations from './foundations';
import * as components from './components';

// Chakra Configuration on Initial Mode
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const symphonyTheme = extendTheme(
  {
    config,
    ...foundations,
    components: {
      ...components,
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' }),
  theme
);

export default symphonyTheme;
