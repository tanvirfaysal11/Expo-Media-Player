const HOST = {
  Dev: 'http://192.168.88.62:12754',
  Staging: 'https://api-pocketx-dev.xeonsoftware.com',
  Production: 'https://api-lataherbal-test.xeonsoftware.com',
};

const API_SERVER = {
  dev: HOST.Dev,
  staging: HOST.Staging,
  production: HOST.Production,
};

export const GRAPHQL_SERVER = {
  dev: HOST.Dev + '/graphql',
  staging: HOST.Staging + '/graphql',
  production: HOST.Production + '/graphql',
};

export const BASE_URL = {
  GRAPHQL: GRAPHQL_SERVER.dev,
  REST_API: API_SERVER.dev,
};
export const API_ENDPOINT = {
  LOGIN: '/api/authorization',
  ACCOUNTS: '/api/accounts',
  JOURNALS: '/api/journals',
  PURCHASE_INVOICES: '/api/purchaseInvoices',
};
