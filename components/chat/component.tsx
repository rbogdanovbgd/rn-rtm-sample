// Importing package modules.
import * as React from 'react';
import { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Keyboard,
  Alert,
  Button,
} from 'react-native';
import { Icon } from 'native-base';
import moment from 'moment';

import Stylesheet from './stylesheet';

const axios = require('../../config/axios');

import { AgoraRTM, IMessage } from '../../modules/rtm';

interface IProps {
  user: any;
  companion: any;
  screenComponentId?: string;
  isLogMode: boolean;
  channel: string;
  barTitle: string;
}

interface IState {
  messages: IMessage[];
  messageText: string;
  isLoading: boolean;
}

const ChatMessage = (message: IMessage) => {
  return (
    <View style={[Stylesheet.message, message.isLocal && Stylesheet.messageLocal]}>
      <Text>{message.text}</Text>
      <Text style={[Stylesheet.messageTime]}></Text>
    </View>
  );
};

class Chat extends Component<IProps, IState> {
  private _flatListRef: any;
  private _flatListTopOffset: number = 0;
  private _flatListHeight: number = 0;
  private _oldestMessage?: IMessage;
  private _channel: string = '';

  constructor(props: IProps) {
    super(props);

    this.state = {
      messages: [],
      messageText: '',
      isLoading: false,
    };
  }

  public initAgora() {

    axios({
      baseURL: 'https://api-dev-1.vivook.com/api',
      url: `/--chat/11192/token/Channel/chat`,
      method: 'GET',
    })
      .then(async (response: any) => {
        console.log(response.data);
        AgoraRTM.init({
          uid: '11192',
          channel: 'Channel',
          token: response.data.token,
          onMessageReceived: this.handleMessageReceived,
        });
        await AgoraRTM.login();
        await AgoraRTM.join();
        await this.loadHistory(true);
      })
      .catch((error: any) => {
        this.setState({ isLoading: false });
        console.log(error);
        Alert.alert(
          'Error',
          'No se ha podido recibir la información.',
          [
            {
              text: 'OK',
            },
          ],
          {
            cancelable: false,
          },
        );
      });
  }

  public async componentDidMount() {
    //Keyboard.addListener('keyboardDidShow', () => this.scrollChatToEnd());
    this.initAgora();
    /*await AgoraRTM.login();
    await AgoraRTM.join();
    await this.loadHistory(true);*/
  }

  public async componentWillUnmount() {
    await AgoraRTM.leave();
    await AgoraRTM.destroy();
    //Keyboard.removeAllListeners('keyboardDidShow');
  }

  public async componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this.state.messages.length !== prevState.messages.length) {
      this._oldestMessage = this.state.messages.sort((a, b) => (a.dateTime.isBefore(b.dateTime) ? -1 : 1))[0];
    }
  }

  // Handlers

  private async handleCall() {
  }

  private handleMessageChange(messageText: string) {
    this.setState({ messageText });
  }

  private async handleMessageSubmit() {
    const message = await AgoraRTM.sendMessage(this.state.messageText);
    if(!message) { return; }
    this.setState(
      {
        messageText: '',
        messages: [...this.state.messages, message],
      },
      () => {
        this.scrollChatToEnd();
      },
    );
  }

  private scrollChatToEnd(skipCheck: boolean = false) {
    if (skipCheck || Math.floor(this._flatListHeight) <= Math.floor(this._flatListTopOffset) + 20) {
      setTimeout(() => {
        this._flatListRef?.scrollToEnd({ animated: true });
      }, 200);
    }
  }

  private handleMessageReceived = (message: IMessage) => {
    if (message) {
      this.setState({ messages: [...this.state.messages, message] });
    }
  };

  private async handleRefresh() {
    await this.loadHistory();
  }

  private handleFlatListScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    this._flatListHeight = e.nativeEvent.contentSize.height;
    this._flatListTopOffset = e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;
  }

  private handleFlatListLayout(e: LayoutChangeEvent) {
    this._flatListHeight = e.nativeEvent.layout.height;
    this._flatListTopOffset = e.nativeEvent.layout.y;
  }

  private async loadHistory(skipScrollCheck: boolean = false) {
    this.setState({ isLoading: true }, async () => {
      const messages = await AgoraRTM.getHistoryMessages(this._oldestMessage?.dateTime);
      if(!messages) { 
        console.log('No messages');
        return []; 
      }
      console.log('LOAD HISTORY');
      console.log(messages);
      this.setState({ messages: [...this.state.messages, ...messages], isLoading: false }, () => {
        this.scrollChatToEnd(skipScrollCheck);
      });
    });
  }

  private groupMessagesByDate(messages: IMessage[]) {
    const groups = new Map<string, IMessage[]>();
    messages
      .sort((a, b) => (a.dateTime.isBefore(b.dateTime) ? -1 : 1))
      .forEach(m => {
        const key = m.dateTime.clone().startOf('D').format();
        const group = groups.get(key);
        if (group) {
          group.push(m);
        } else {
          groups.set(key, [m]);
        }
      });
    return groups;
  }

  private getIsToday(key: string) {
    return moment().isSame(moment(key), 'D');
  }

  private getMessageGroupDate(key: string) {
    return key; //this.getIsToday(key) ? 'Ahora' : dateFormat(key);
  }

  // CALL KEEP SETUP

  private setupCallKeep() {
  }

  // CALL KEEP END

  // Renders

  public render() {
    return (
      <View style={Stylesheet.container}>
        {this.renderMessageGroupList(this.state.messages)}
        <View style={Stylesheet.controls}>
          <TextInput
            style={Stylesheet.messageInput}
            placeholder="Escribe un mensaje aqui"
            placeholderTextColor="#C3C1C1"
            returnKeyType="send"
            blurOnSubmit={false}
            value={this.state.messageText}
            onSubmitEditing={() => this.handleMessageSubmit()}
            onChangeText={text => this.handleMessageChange(text)}
          />
          <Button title="LoadHistory" onPress={() => this.loadHistory()}/>
        </View>
      </View>
    );
  }

  private renderMessageGroupList(messages: IMessage[]) {
    const groups = this.groupMessagesByDate(messages);
    return (
      <FlatList
        ref={el => (this._flatListRef = el)}
        data={Array.from(groups.keys())}
        refreshing={this.state.isLoading}
        onRefresh={() => this.handleRefresh()}
        onScroll={e => this.handleFlatListScroll(e)}
        onLayout={e => this.handleFlatListLayout(e)}
        renderItem={({ item }) => (
          <View key={item} style={Stylesheet.messageGroup}>
            {this.renderMessageGroupDivider(item, groups.size)}
            <View style={Stylesheet.messagesList}>
              {groups
                .get(item)
                ?.sort((a, b) => (a.dateTime.isBefore(b.dateTime) ? -1 : 1))
                .map(message => (
                  <ChatMessage {...message} key={message.dateTime.format()} />
                ))}
            </View>
          </View>
        )}
        keyExtractor={item => item}
        style={Stylesheet.messageGroupList}
      />
    );
  }

  private renderMessageGroupDivider(date: string, groupsCount: number) {
    const isToday = this.getIsToday(date);
    return (
      (groupsCount > 1 || !isToday) && (
        <View style={Stylesheet.messageGroupDateWrapper}>
          {isToday && <View style={Stylesheet.messageGroupDivider} />}
          <Text style={Stylesheet.messageGroupDate}>{this.getMessageGroupDate(date)}</Text>
          {isToday && <View style={Stylesheet.messageGroupDivider} />}
        </View>
      )
    );
  }
}

export default Chat;
