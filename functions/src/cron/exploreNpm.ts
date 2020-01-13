import * as functions from 'firebase-functions';
import { schedule } from './fixtures';

export const exploreNpm = functions.pubsub
    .schedule(schedule)
    .onRun(async context => {
        // TOOD:
        // https://www.npmjs.com/search?q=keywords:vocality
    });
