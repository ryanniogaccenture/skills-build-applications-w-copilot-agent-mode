"use strict";
/**
 * Configuration for Codespaces and local development
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.getApiUrl = void 0;
const getApiUrl = () => {
    // In GitHub Codespaces, construct the URL using CODESPACE_NAME
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    // In local development, use localhost
    const port = process.env.PORT || 8000;
    return `http://localhost:${port}`;
};
exports.getApiUrl = getApiUrl;
exports.config = {
    port: parseInt(process.env.PORT || '8000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
    apiUrl: (0, exports.getApiUrl)(),
    corsOrigin: process.env.CORS_ORIGIN || '*'
};
exports.default = exports.config;
//# sourceMappingURL=config.js.map