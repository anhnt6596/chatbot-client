import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const AppM = () => (
    <MuiThemeProvider>
        <App/>
    </MuiThemeProvider>
)

ReactDOM.render(<AppM />, document.getElementById('root'));
registerServiceWorker();
