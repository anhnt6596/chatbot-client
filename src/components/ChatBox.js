import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SendIcon from 'material-ui/svg-icons/content/send';
import CircularProgress from 'material-ui/CircularProgress';

const width = 350;
const height = 500;
const headerHeight = 50;
const textFieldHeight = 50;
const messHeight = height - (headerHeight + textFieldHeight);

const styles = {
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -height/2,
        marginLeft: -width/2,
        width,
        height,
    },
}

const BoxHeader = () => (
    <RaisedButton
        style={{ height: headerHeight, width: 50 }}
        label='Chatbot'
        labelStyle={{ fontSize: 26 }}
        fullWidth
        primary
        disabled
    />
);

const MessageField = ({ listChatTexts, that }) => (
    <div
        style={{
            height: messHeight,
            overflowY: 'scroll',
            overflowX: 'hidden',
        }}
        ref={ref => that.scroll = ref}
    >
        {
            listChatTexts.map((item, i) => <MessageItem
                key={`_${i}`}
                isYours={item.user==='user'}
                text={item.text}
            />)
            
        }
    </div>
)

const MessageItem = ({ isYours, text }) => (
    <Paper
        style={{
            marginTop: 5,
            marginBottom: 5,
            marginLeft: isYours ? 80 : 10,
            fontSize: 24,
            width: 250,
            padding: '5px 8px',
            color: '#FFFFFF',
            backgroundColor: isYours ? '#9C27B0' : '#E91E63',
            borderRadius: 8,
        }}
    >{text}</Paper>
);

const ChatField = ({ texting, changeChatText, sendText, onKeyDown }) => (
    <div
        style={{
            borderTop: '1px solid #aaa', 
            width: '100%',
            height: textFieldHeight,
            float: 'left',
        }}
    >
        <TextField
            style={{
                width: 250,
                fontSize: 20,
                marginLeft: 5,
            }}
            value={texting}
            onChange={changeChatText}
            onKeyDown={onKeyDown}
            underlineShow={false}
            hintText="Write something..."
        />
        <FlatButton
            style={{ height: 40 }}
            icon={<SendIcon color={'#666'} />}
            onClick={sendText}
        />
        
    </div>
)

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listChatTexts: [],
            loading: false,
            texting: '',
        }
    }

    changeChatText = e => {
        this.setState({ texting: e.target.value });
    }

    onKeyDown = e => {
        if (e.keyCode === 13) this.sendText();
    }

    sendText = () => {
        const text = this.state.texting;
        const that = this;
        if (text.trim() !== '') {
            const { listChatTexts } = this.state;
            listChatTexts.push({ user: 'user', text });
            this.setState({ texting: '', loading: true });
            try {
                fetch('http://localhost:5002/getans', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: text,
                    }),
                }).then(response => response.json())
                .then(responseJson => {
                    const answer = responseJson.confidence > 0.6 ? responseJson.answer : '"Tôi không hiểu lắm, bạn có thể dạy tôi!"';
                    listChatTexts.push({ user: 'bot', text: answer });
                    that.setState({ listChatTexts, loading: false });
                    that.scroll.scrollTop = that.scroll.scrollHeight;
                })
                .catch(e => console.log('-AnhNT-', e))
            } catch (error) {
                console.log('-AnhNT-', error);
            }
        }
    }

    render() {
        const { listChatTexts, texting, loading } = this.state;
        return (
            <div>
                <Paper
                    zDepth={5}
                    style={styles.container}
                >
                    <BoxHeader/>
                    <MessageField
                        listChatTexts={listChatTexts}
                        that={this}
                    />
                   {loading && <CircularProgress size={25} style={{ position: 'absolute', bottom: 55, right: 20 }} thickness={2} />}
                    <ChatField
                        texting={texting}
                        changeChatText={this.changeChatText}
                        sendText={this.sendText}
                        onKeyDown={this.onKeyDown}
                    />
                </Paper>
            </div>
        );
    }
}
