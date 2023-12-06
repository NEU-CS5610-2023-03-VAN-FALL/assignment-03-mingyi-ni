// App.js
import React from 'react';
import AppRouter from './AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Helmet } from 'react-helmet';

const App = () => {
  return (
      <div>
          <Helmet>
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          </Helmet>
        <AppRouter />
      </div>
  );
};

export default App;
