interface IEnvironmentConfig {
  MONGO_URI: string;
  HOST: string;
  PORT: number;
  JWT_KEY: string;
  DOMAIN: string;
  HTTP_PROTOCOL: string;
  UPLOAD_PATH: string;
}

interface IConfig {
  [key: string]: IEnvironmentConfig;
  development: IEnvironmentConfig;
  production: IEnvironmentConfig;
}

const Config: IConfig = {
  development: {
    PORT: 3000,
    MONGO_URI: 'mongodb://localhost:27017/demo-shop',
    JWT_KEY: 'MySuperPassword1234',
    DOMAIN: 'localhost',
    HTTP_PROTOCOL: 'http',
    HOST: 'http://localhost',
    UPLOAD_PATH: '/public',
  },
  production: {
    PORT: +process.env.HTTP_SERVER_PORT,
    MONGO_URI: process.env.MONGODB_CONNECTION,
    HOST: process.env.HTTP_SERVER_HOST,
    JWT_KEY: process.env.JWT_KEY,
    DOMAIN: process.env.DOMAIN,
    HTTP_PROTOCOL: process.env.HTTP_PROTOCOL,
    UPLOAD_PATH: process.env.UPLOAD_PATH,
  },
};

export {
  IEnvironmentConfig,
  IConfig,
  Config,
};
