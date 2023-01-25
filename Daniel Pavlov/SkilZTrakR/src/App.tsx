import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import Router from './router/Router';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './design/styles/theme';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Router />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
