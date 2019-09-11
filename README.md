# Brawdkaster

A simple broadcaster to broadcast your message to multiple social channels simultaneously.

## Usage

```javascript
const facebookPageConnector = new FacebookPageConnector({
  accessToken: 'a1b2',
  name: 'my-fb-page',
  pageId: '1234',
});
const brawdkaster = new Brawdkaster({
  connectors: [facebookPageConnector],
});

brawdkaster.broadcast({
  message: 'Hello World',
});
```

## TODO

- [ ] Facebook Connector
- [x] Facebook Page Connector
- [ ] Twitter Connector
- [ ] Instagram Connector
- [ ] LinkedIn Page Connector
- [ ] LinkedIn Profile Connector
- [ ] WhatsApp Connector
- [ ] Better Documentation
- [ ] Test Cases
