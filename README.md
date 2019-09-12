# Brawdkaster

A simple broadcaster to broadcast your message to multiple social channels simultaneously.

## Usage

```javascript
const facebookPageConnector = new FacebookPageConnector({
  accessToken: 'a1b2',
  id: 'my-fb-page', // `id` is an identifier so you can have multiple same type of connectors
  pageId: '1234',
});
const linkedInConnector = new LinkedInConnector({
  accessToken: 'a1b2',
  id: 'my-linkedin',
});
const brawdkaster = new Brawdkaster({
  connectors: [facebookPageConnector],
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

## TODO

- [ ] Facebook Connector
- [x] Facebook Page Connector
- [ ] Twitter Connector
- [ ] Instagram Connector
- [x] LinkedIn Connector
- [ ] WhatsApp Connector
- [ ] Tumblr Connector
- [ ] Better Documentation
- [ ] Test Cases
