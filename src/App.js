import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/modules/dashboard-360/components/GlobalStyles';
import 'src/modules/dashboard-360/mixins/chartjs';
import theme from 'src/modules/dashboard-360/theme';
import { Provider } from 'react-redux';
import rootStore from './modules/dashboard-360/redux/store';
import RouteSwitch from './components/RouteSwitch';
import routes from './routes';

const App = () => {
  return (
    <Provider store={rootStore}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <RouteSwitch routes={routes} isRoot />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
