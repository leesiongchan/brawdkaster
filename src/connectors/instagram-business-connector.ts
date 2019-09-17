import { GotInstance, GotJSONFn } from 'got';

import Connector, { BroadcastMessage, ConnectorConfig } from './connector';
import httpClient from '../utils/http-client';

export interface InstagramBusinessConnectorConfig extends ConnectorConfig {
  apiVersion?: string;
  accessToken: string;
  userId: string;
}

export interface InstagramBusinessBroadcastMessage extends BroadcastMessage {
  // TODO: WIP
}

export class InstagramBusinessConnector extends Connector {
  private readonly API_HOST = 'https://graph.facebook.com';

  private readonly accessToken: string;
  private readonly apiVersion: string;
  private readonly userId: string;
  private httpClient: GotInstance<GotJSONFn>;

  constructor(config: InstagramBusinessConnectorConfig) {
    super(config);

    this.accessToken = config.accessToken;
    this.apiVersion = config.apiVersion || 'v4.0';
    this.userId = config.userId;
    this.httpClient = httpClient.extend({
      baseUrl: `${this.apiBaseUrl}/${config.userId}`,
      hooks: {
        beforeRequest: [
          options => {
            if (typeof options.query === 'object') {
              options.query = { ...options.query, access_token: config.accessToken };
            }
          },
        ],
      },
    });
  }

  private get apiBaseUrl() {
    return `${this.API_HOST}/${this.apiVersion}`;
  }

  // * NOTE: https://developers.facebook.com/docs/instagram-api/guides/content-publishing
  public broadcast(message: InstagramBusinessBroadcastMessage) {
    return this.httpClient
      .post(`${this.userId}/media`, { query: { caption: message.message } })
      .then(response => response.body);
  }
}

export default InstagramBusinessConnector;
