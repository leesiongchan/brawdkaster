import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import { GotFormFn, GotInstance } from 'got';

import Connector, { BroadcastMessage, ConnectorConfig } from './connector';
import httpClient from '../utils/http-client';

export interface TwitterConnectorConfig extends ConnectorConfig {
  accessToken: string;
  accessTokenSecret: string;
  apiVersion?: string;
  consumerKey: string;
  consumerSecret: string;
}

export interface TwitterBroadcastMessage extends BroadcastMessage {
  // TODO: WIP
}

export class TwitterConnector extends Connector {
  private readonly API_HOST = 'https://api.twitter.com';

  private readonly accessToken: string;
  private readonly accessTokenSecret: string;
  private readonly apiVersion: string;
  private readonly consumerKey: string;
  private readonly consumerSecret: string;
  private oauth: OAuth;
  private httpClient: GotInstance<GotFormFn<string>>;

  constructor(config: TwitterConnectorConfig) {
    super(config);

    this.accessToken = config.accessToken;
    this.accessTokenSecret = config.accessTokenSecret;
    this.consumerKey = config.consumerKey;
    this.consumerSecret = config.consumerSecret;
    this.apiVersion = config.apiVersion || '1.1';
    this.oauth = new OAuth({
      consumer: { key: config.consumerKey, secret: config.consumerSecret },
      hash_function(baseString, key) {
        return crypto
          .createHmac('sha1', key)
          .update(baseString)
          .digest('base64');
      },
      signature_method: 'HMAC-SHA1',
    });
    this.httpClient = httpClient;
  }

  private get apiBaseUrl() {
    return `${this.API_HOST}/${this.apiVersion}`;
  }

  // * NOTE: https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update
  public broadcast(message: TwitterBroadcastMessage) {
    const requestData = {
      data: { status: message.message },
      method: 'POST',
      url: `${this.apiBaseUrl}/statuses/update.json`,
    };
    const token = {
      key: this.accessToken,
      secret: this.accessTokenSecret,
    };
    const headers = {
      ...this.oauth.toHeader(this.oauth.authorize(requestData, token)),
    };

    return this.httpClient(requestData.url, {
      body: requestData.data,
      form: true,
      headers,
      method: requestData.method,
    }).then(response => response.body);
  }
}

export default TwitterConnector;
