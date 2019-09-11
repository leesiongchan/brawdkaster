import got from 'got';

import Connector, { BroadcastMessage, ConnectorConfig } from './connector';

export interface FacebookPageConnectorConfig extends ConnectorConfig {
  apiVersion?: string;
  accessToken: string;
  pageId: string;
}

export interface FacebookPageBroadcastMessage extends BroadcastMessage {
  images?: string[];
}

export class FacebookPageConnector extends Connector {
  private readonly API_HOST = 'https://graph.facebook.com';

  private readonly accessToken: string;
  private readonly apiVersion: string;
  private readonly pageId: string;

  constructor(config: FacebookPageConnectorConfig) {
    super(config);

    this.accessToken = config.accessToken;
    this.apiVersion = config.apiVersion || 'v4.0';
    this.pageId = config.pageId;
  }

  private get apiBaseUrl() {
    return `${this.API_HOST}/${this.apiVersion}`;
  }

  public broadcast(message: FacebookPageBroadcastMessage) {
    // * NOTE: https://developers.facebook.com/docs/pages/publishing
    return got.post(`${this.apiBaseUrl}/${this.pageId}/feed`, {
      query: {
        ...message,
        access_token: this.accessToken,
      },
    });
  }
}

export default FacebookPageConnector;
