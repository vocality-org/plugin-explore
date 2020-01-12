import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { schedule } from './config';

admin.initializeApp();

export const exploreGithub = functions.pubsub
    .schedule(schedule)
    .onRun(context => {
        console.log(new Date());
    });
