import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { schedule } from './fixtures';

admin.initializeApp();

export const exploreNpm = functions.pubsub
    .schedule(schedule)
    .onRun(async context => {
        // TOOD:
        // https://www.npmjs.com/search?q=keywords:vocality
    });
