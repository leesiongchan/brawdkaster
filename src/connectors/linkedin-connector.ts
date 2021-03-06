import { GotInstance, GotJSONFn } from 'got';

import Connector, { BroadcastMessage, ConnectorConfig } from './connector';
import httpClient from '../utils/http-client';

export interface LinkedInConnectorConfig extends ConnectorConfig {
  apiVersion?: string;
  accessToken: string;
  pageId: string;
}

export interface LinkedInPageBroadcastMessage extends BroadcastMessage {
  // TODO: WIP
}

interface LinkedInShareRequest {
  author: string;
  lifecycleState: 'PUBLISHED';
  specificContent: { 'com.linkedin.ugc.ShareContent': LinkedInShareContent };
  visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'CONNECTIONS' | 'PUBLIC' };
}

interface LinkedInShareContent {
  media?: LinkedInShareMedia[];
  shareCommentary: { text: string };
  shareMediaCategory: 'NONE' | 'ARTICLE' | 'IMAGE';
}

interface LinkedInShareMedia {
  description?: string;
  media?: string;
  originalUrl?: string;
  status: 'READY';
  title?: string;
}

export class LinkedInConnector extends Connector {
  private readonly API_HOST = 'https://api.linkedin.com';

  private readonly accessToken: string;
  private readonly apiVersion: string;
  private httpClient: GotInstance<GotJSONFn>;
  // TODO: Should we maintain the typing?
  private profile: any;

  constructor(config: LinkedInConnectorConfig) {
    super(config);

    this.accessToken = config.accessToken;
    this.apiVersion = config.apiVersion || 'v2';
    this.httpClient = httpClient.extend({
      baseUrl: this.apiBaseUrl,
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'Cache-Control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0',
      },
    });
  }

  private get apiBaseUrl() {
    return `${this.API_HOST}/${this.apiVersion}`;
  }

  // * NOTE: https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin
  public async broadcast(message: LinkedInPageBroadcastMessage) {
    if (!this.profile) {
      await this.initialize();
    }

    const body: LinkedInShareRequest = {
      author: `urn:li:person:${this.profile.id}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text: message.message },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    return this.httpClient.post('/ugcPosts', { body }).then(response => response.body);
  }

  private async initialize() {
    // Fetches the person
    this.profile = await this.fetchProfile();
  }

  private fetchProfile() {
    return this.httpClient('/me').then(response => response.body);
  }
}

export default LinkedInConnector;
