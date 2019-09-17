# Brawdkaster

A simple broadcaster to broadcast your message to multiple social channels simultaneously.

## Usage

```javascript
const facebookPageConnector = new FacebookPageConnector({
  accessToken: 'a1b2',
  id: 'my-fb-page', // `id` is an identifier so you can have multiple same type of connectors
  pageId: '1234',
});
const instagramBusinessConnector = new InstagramBusinessConnector({
  accessToken: 'a1b2',
  id: 'my-ig-page',
  userId: '1234',
});
const linkedInConnector = new LinkedInConnector({
  accessToken: 'a1b2',
  id: 'my-linkedin',
});
const twitterConnector = new LinkedInConnector({
  accessToken: '1234',
  accessTokenSecret: '5678',
  consumerKey: 'abcd',
  consumerSecret: 'efgh',
  id: 'my-twitter',
});
const brawdkaster = new Brawdkaster({
  connectors: [
    facebookPageConnector,
    instagramBusinessConnector, // Not tested
    linkedInConnector,
    twitterConnector, // Not tested
  ],
});

brawdkaster.broadcast(
  {
    message: 'Hello World',
  },
  {
    // TODO: This is just a concept, not implemented yet.
    only: ['my-fb-page'],
  },
);
```

## Build your own connector

WIP

## TODO

- [ ] Facebook Connector
- [x] Facebook Page Connector
- [x] Twitter Connector
- [x] Instagram Business Connector
- [x] LinkedIn Connector
- [ ] LinkedIn Page Connector
- [ ] WhatsApp Connector
- [ ] Tumblr Connector
- [ ] Better Documentation
- [ ] Add debug logs
- [ ] Test Cases
