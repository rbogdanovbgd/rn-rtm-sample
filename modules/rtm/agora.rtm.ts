import RtmEngine, { RtmChannelMember, RtmMessage } from 'agora-react-native-rtm';
import moment, { isDuration } from 'moment';

import { IRTMConfig, IMessage } from './models';
import { IMessageHistoryQueryRequest, IMessageHistoryQueryResponse, IMessageHistoryResponse, MessageHistoryResponseCode } from '.';

const AGORA_APP_ID = '345f6c65a0a440ba9881cde075639749';
const AgoraAPI = 'https://api.agora.io/dev/v2/project/';
const AgoraMessageHistoryPath = '/rtm/message/history/query';
const RepeatMessageHistoryRequestInMs = 2000;
const AgoraAuthHeader = 'Basic ZjkyOWYwYjkxZDNiNGViYzgyODczZjdjOWEyMGVjZmY6MGY0NWYxODcxYWQ5NDczODg1MDUxMDM4YjY5NTQ0N2U=';

export class AgoraRTM {
  private static _client: RtmEngine;
  private static _config: IRTMConfig;

  public static init(config: IRTMConfig) {
    try {
      console.log('Agora RTM', 'init');
      this._client = new RtmEngine();
      this._config = config;
      this.subscribeEvents();
    } catch (err) {
      console.log(err);
    }
  }

  public static subscribeEvents() {
    this._client.addListener('ChannelMessageReceived', (message, member) => this.handleMessageReceived(message, member));
  }

  public static async login() {
    try {
      if (!this._config || !this._client) return;
      console.log('Agora RTM', 'login');
      await this._client.createInstance(AGORA_APP_ID);
      await this._client.loginV2(this._config.uid);
    } catch (err) {
      console.log(err);
    }
  }

  public static async logout() {
    try {
      if (!this._client) return;
      console.log('Agora RTM', 'logout');
      await this._client.logout();
    } catch (err) {
      console.log(err);
    }
  }

  public static async join() {
    try {
      console.log(`join to channel = ${this._config.channel}`);
      if (!this._config || !this._client) return;
      console.log('Agora RTM', 'join', this._config.channel);
      await this._client.joinChannel(this._config.channel);
    } catch (err) {
      console.log(err);
    }
  }

  public static async leave() {
    try {
      if (!this._config || !this._client) return;
      console.log('Agora RTM', 'leave', this._config.channel);
      await this._client.leaveChannel(this._config.channel);
    } catch (err) {
      console.log(err);
    }
  }

  public static async sendMessage(text: string) {
    try {
      if (!this._config || !this._client) return;
      const message = new RtmMessage(text);
      console.log('Agora RTM', 'sendMessage', message, this._config.channel);
      await this._client.sendMessage(this._config.channel, message, {
        enableHistoricalMessaging: true,
      });
      return {
        text: message.text,
        dateTime: moment(),
        isLocal: true,
      } as IMessage;
    } catch (err) {
      console.log(err);
    }
  }

  public static async getHistoryMessages(endTime?: moment.Moment) {
    if (!this._config) return [];
    try {
      const query = await this.createMessageHistoryQuery(endTime);
      if(!query) return [];
      const result = await this.getMessageHistoryByQuery(query);
      return (
        result?.messages?.map(m => {
          return {
            dateTime: moment(m.ms),
            text: m.payload,
            isLocal: m.src === this._config.uid,
          } as IMessage;
        }) || []
      );
    } catch (err) {
      console.log(err);
    }
  }

  public static async destroy() {
    try {
      if (!this._client) return;
      console.log('Agora RTM', 'destroy');
      await this._client.release();
    } catch (err) {
      console.log(err);
    }
  }

  // Handlers

  private static handleMessageReceived(message: RtmMessage, member: RtmChannelMember) {
    try {
      console.log('Agora RTM', 'ChannelMessageReceived', message);
      this._config?.onMessageReceived?.({
        text: message.text,
        dateTime: moment(message.serverReceivedTs),
        isLocal: member.userId === this._config.uid,
      });
    } catch (err) {
      console.log(err);
    }
  }

  private static async createMessageHistoryQuery(endTime: moment.Moment = moment()) {
    const endTimeUtc = endTime.clone().utc(false);
    const startTimeUtc = endTimeUtc.clone().subtract(1, 'week');
    const data: IMessageHistoryQueryRequest = {
      filter: {
        destination: this._config.channel,
        start_time: startTimeUtc.format(),
        end_time: endTimeUtc.format(),
      },
      limit: 20,
      offset: 0,
      order: 'desc',
    };
    try {
      console.log('Agora RTM', 'createMessageHistoryQuery:request', data);
      const response = await fetch(`${AgoraAPI}${AGORA_APP_ID}${AgoraMessageHistoryPath}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          // TODO: replace Authorization header with x-agora-token and x-agora-uid headers
          'x-agora-token': this._config.token,
          'x-agora-uid': this._config.uid,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || response.statusText);
      }
      const result = await response.json();
      console.log('Agora RTM', 'createMessageHistoryQuery:response', result);
      return result as IMessageHistoryQueryResponse;
    } catch (err) {
      console.log(err);
    }
  }

  private static async getMessageHistoryByQuery(query: IMessageHistoryQueryResponse) {
    if (!query) return null;
    const path = query.location.replace('~', '');
    const url = `${AgoraAPI}${AGORA_APP_ID}${path}`;
    try {
      console.log('Agora RTM', 'getMessageHistoryByQuery:request', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // TODO: replace Authorization header with x-agora-token and x-agora-uid headers
          'x-agora-token': this._config.token,
          'x-agora-uid': this._config.uid,
        },
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || response.statusText);
      }
      const result = await response.json();
      console.log('Agora RTM', 'getMessageHistoryByQuery:response', result);

      if (result.code === MessageHistoryResponseCode.InProgress) {
        const repeatResult = new Promise<IMessageHistoryResponse | undefined | null>(res => {
          setTimeout(async () => {
            const result = await this.getMessageHistoryByQuery(query);

            res(result);
          }, RepeatMessageHistoryRequestInMs);
        });
        return await repeatResult as IMessageHistoryResponse;
      }

      return result as IMessageHistoryResponse;
    } catch (err) {
      console.log(err);
    }
  }
}
