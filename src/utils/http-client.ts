import got from 'got';

const httpClient = got.extend({ json: true });

export default httpClient;
