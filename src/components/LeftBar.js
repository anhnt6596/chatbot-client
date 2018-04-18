import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class LeftBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            outputText: '',

            errInput: '',
            errOutput: '',

            disTrainBtn: false,
        };
    }

    change = e => this.setState({ [e.target.name]: e.target.value, errInput: '', errOutput: '' })

    trainAll = () => {
        try {
            fetch('http://localhost:5002/train', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
            .then(responseJson => {
                if (responseJson.status === 1) {
                    this.props.alert('Training Success!');
                    this.props.toggleLeftBar();
                    this.setState({ disTrainBtn: true });
                }
                else this.props.alert('Training Failure!')
            })
            .catch(e => console.log('-AnhNT-', e))
        } catch (error) {
            console.log('-AnhNT-', error);
        }
    }

    train = () => {
        const { inputText, outputText } = this.state;
        let validate = true;
        if (inputText === '') {
            this.setState({ errInput: 'This field is required!' });
            validate = false;
        }
        if (outputText === '') {
            this.setState({ errOutput: 'This field is required!' });
            validate = false;
        }
        if (validate) this.fetchTrain();
    }

    fetchTrain = () => {
        this.setState({ inputText: '', outputText: '' });        
        const { inputText, outputText } = this.state;
        const body = {
            inputText,
            outputText,
        }
        try {
            fetch('http://localhost:5002/trainlist', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }).then(response => response.json())
            .then(responseJson => {
                if (responseJson.status === 1) {
                    this.props.alert('Training Success!');
                    this.props.toggleLeftBar();
                }
                else this.props.alert('Training Failure!')
            })
            .catch(e => console.log('-AnhNT-', e))
        } catch (error) {
            console.log('-AnhNT-', error);
        }
        this.setState({ inputText: '', outputText: '' });        
    }

    render() {
        const { inputText, outputText, errInput, errOutput, disTrainBtn } = this.state;
        const { open, toggleLeftBar } = this.props;
        return (
            <div>
                <Drawer docked={false} open={open} onRequestChange={toggleLeftBar}>
                    <RaisedButton label={'Training Bar'} primary fullWidth />
                    <br />                    
                    <TextField
                        hintText="Điền input"
                        floatingLabelText="Đầu vào"
                        value={inputText}
                        name={'inputText'}
                        onChange={this.change}
                        errorText={errInput}
                    /><br />
                    <TextField
                        hintText="Điền output"
                        floatingLabelText="Đầu ra"
                        value={outputText}
                        name={'outputText'}
                        onChange={this.change}
                        errorText={errOutput}
                    /><br /><br />                    
                    <div style={{ width: '50%', textAlign: 'center', margin: '0px auto' }}>
                        <RaisedButton label={'Train'} secondary fullWidth onClick={this.train} />
                    </div>
                    <br/>
                    <div style={{ width: '90%', textAlign: 'center', margin: '0px auto' }}>
                        <RaisedButton label={'Train From Database'} secondary fullWidth onClick={this.trainAll} disabled={disTrainBtn} />
                    </div>
                    <br />
                    <br />
                    <br />
                    <div style={{ width: '50%', textAlign: 'center', marginLeft: '50%' }}>
                        <RaisedButton label={'Close'} onClick={toggleLeftBar} />
                    </div>
                </Drawer>
            </div>
        );
    }
}
