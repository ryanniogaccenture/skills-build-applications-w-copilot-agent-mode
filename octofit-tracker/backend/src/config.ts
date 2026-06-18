/**
 * Configuration for Codespaces and local development
 */

export const getApiUrl = (): string => {
  // In GitHub Codespaces, construct the URL using CODESPACE_NAME
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }

  // In local development, use localhost
  const port = process.env.PORT || 8000;
  return `http://localhost:${port}`;
};

export const config = {
  port: parseInt(process.env.PORT || '8000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
  apiUrl: getApiUrl(),
  corsOrigin: process.env.CORS_ORIGIN || '*'
};

export default config;
