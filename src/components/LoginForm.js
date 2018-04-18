import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const LoginForm = ({ open, actions, onRequestClose }) => (
    <div>
        <Dialog
            title='Đăng nhập'
            actions={actions}
            modal={false}
            open={open}
            onRequestClose={onRequestClose}
            style={{ width: '40%', marginLeft: '30%' }}
        >
            <TextField
                hintText="Username"
                floatingLabelText="Username"
            />
            <br/>
            <TextField
                hintText="Password"
                floatingLabelText="Password"
                type="password"
            />
        </Dialog>
    </div>
);

export default LoginForm
