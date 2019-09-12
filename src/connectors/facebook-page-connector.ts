import { GotInstance, GotJSONFn } from 'got';

import Connector, { BroadcastMessage, ConnectorConfig } from './connector';
import httpClient from '../utils/http-client';

export interface FacebookPageConnectorConfig extends ConnectorConfig {
  apiVersion?: string;
  accessToken: string;
  pageId: string;
}

export interface FacebookPageBroadcastMessage extends BroadcastMessage {
  // TODO: WIP
}

export class FacebookPageConnector extends Connector {
  private readonly API_HOST = 'https://graph.facebook.com';

  private readonly accessToken: string;
  private readonly apiVersion: string;
  private readonly pageId: string;
  private httpClient: GotInstance<GotJSONFn>;

  constructor(config: FacebookPageConnectorConfig) {
    super(config);

    this.accessToken = config.accessToken;
    this.apiVersion = config.apiVersion || 'v4.0';
    this.pageId = config.pageId;
    this.httpClient = httpClient.extend({
      baseUrl: `${this.apiBaseUrl}/${this.pageId}`,
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

  // * NOTE: https://developers.facebook.com/docs/pages/publishing
  public broadcast(message: FacebookPageBroadcastMessage) {
    return this.httpClient.post('/feed', { query: message }).then(response => response.body);
  }
}

export default FacebookPageConnector;
