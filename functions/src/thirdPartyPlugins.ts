import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const thirdPartyPlugins = functions.https.onRequest(async (req, res) => {
    const db = admin.firestore();

    const documents = await db
        .collection('third-party-plugins')
        .get()
        .then(snap => {
            snap.docs;
        });

    res.json(documents);
});
