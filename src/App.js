import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import LoginForm from './components/LoginForm';
import Main from './components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSnackbarOpen: false,
      snackbarMessage: 'snackbarMessage',

      dialogTitle: 'dialogTitle',
      isLoginOpen: false,

      isLogedIn: false,
    }
  }

  snackBarAlert = (message) => {
    this.setState({ isSnackbarOpen: true, snackbarMessage: message });
  }

  handleOpenSnackbar = () => {
    this.setState({ isSnackbarOpen: true });
  };

  handleRequestCloseSnackbar = () => {
    this.setState({ isSnackbarOpen: false });
  };

  handleOpenLogin = () => {
    this.setState({ isLoginOpen: true });
  };

  handleCloseLogin = () => {
    this.setState({ isLoginOpen: false });
  };

  loginAction = () => {
    this.setState({ isLoginOpen: false, isLogedIn: true });
    this.snackBarAlert('Login Success!')
  }

  render() {
    const { isSnackbarOpen, snackbarMessage, isLoginOpen, isLogedIn } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseLogin}
      />,
      <FlatButton
        label="Login"
        primary={true}
        keyboardFocused={true}
        onClick={this.loginAction}
      />,
    ];

    return (
      <div
        style={{
          backgroundColor: isLogedIn ? '#fff' : '#fff',
        }}
      >
        {
          isLogedIn
          ? <Main alert={this.snackBarAlert} />
          : <RaisedButton
              primary
              style={styles.loginButton}
              label='Login'
              onClick={this.handleOpenLogin}
            />
        }
        <LoginForm
          open={isLoginOpen}
          actions={actions}
          onRequestClose={this.handleCloseLogin}
        />
        <Snackbar
          open={isSnackbarOpen}
          message={snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestCloseSnackbar}
        />
      </div>
    );
  }
}

const styles = {
  loginButton: {
    margin: 'auto', 
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -50,
    marginLeft: -50,
  }
}

export default App;
