export interface IRTMConfig {
    uid: string;
    channel: string;
    token: string;
  
    onMessageReceived?: (message: IMessage) => void;
  }
  
  export interface IMessage {
    text: string;
    dateTime: moment.Moment;
    isLocal?: boolean;
  }
  
  export interface IMessageHistoryQueryFilter {
    destination: string;
    start_time: string;
    end_time: string;
  }
  
  export interface IMessageHistoryQueryRequest {
    filter: IMessageHistoryQueryFilter;
    offset: number;
    limit: number;
    order?: string;
  }
  
  export interface IMessageHistoryQueryResponse {
    limit: number;
    location: string;
    offset: number;
    order: string;
    request_id: string;
    result: string;
  }
  
  export interface IHistoryMessage {
    dst: string;
    message_type: string;
    ms: number;
    payload: string;
    src: string;
  }
  
  export enum MessageHistoryResponseCode {
    OK = 'ok',
    InProgress = 'in progress',
  }
  
  export interface IMessageHistoryResponse {
    code: MessageHistoryResponseCode;
    request_id: string;
    result: string;
    messages: IHistoryMessage[];
  }
  