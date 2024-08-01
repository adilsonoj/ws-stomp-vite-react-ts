import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';

export class WsClient {
  private stompClient: Client;
  private channel: string;

  constructor(url: string, channel: string) {
    const socketFactory = () => new SockJS(url);
    this.channel = channel;
    this.stompClient = Stomp.over(socketFactory);
  }

  private onConnect = (callback: Function) => {
    this.stompClient.subscribe(`/topic/${this.channel}`, (frame: any) => callback(frame));
  };

  private onError = (frame: any) => {
    console.error('WebSocket error: ' + frame.headers['message'] + ' - ' + frame.body);
  };

  public disconnect = () => {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
      console.log('WebSocket disconnected');
    } else {
      console.log('WebSocket is not connected');
    }
  };


  public connect = (callback: Function) => {
    this.stompClient.onStompError = this.onError;
    this.stompClient.onConnect = () => {
      console.log("connect");

      this.onConnect(callback)
    }

    this.stompClient.activate();
  }

}
