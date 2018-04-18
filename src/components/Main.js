import React from 'react';
import ChatBox from './ChatBox';
import LeftBar from './LeftBar';
import RaisedButton from 'material-ui/RaisedButton';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenLeftBar: false,
        }
    }
    
    toggleLeftBar = () => this.setState(prevState => ({ isOpenLeftBar: !prevState.isOpenLeftBar }))

    render() {
        const { isOpenLeftBar } = this.state;
        const { alert } = this.props;
        return (
            <div>
                <RaisedButton label={'Open'} onClick={this.toggleLeftBar}/>
                <LeftBar open={isOpenLeftBar} toggleLeftBar={this.toggleLeftBar} alert={alert} />
                <ChatBox />
            </div>
        );
    }
}
