import * as admin from 'firebase-admin';

admin.initializeApp();

export * from './thirdPartyPlugins';
export * from './cron/exploreGithb';
export * from './cron/exploreNpm';
