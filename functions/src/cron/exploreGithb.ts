import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

import { schedule } from './fixtures';

admin.initializeApp();

export const exploreGithub = functions.pubsub
    .schedule(schedule)
    .onRun(async context => {
        console.info(context.timestamp);

        const html = await fetch(
            'https://github.com/topics/vocality'
        ).then(res => res.text());

        const $ = cheerio.load(html);
        const repositoryList: string[] = [];

        $('h1.f3.text-gray.text-normal.lh-condensed').each((i, e) => {
            const lastChild = e.children[e.children.length - 1];
            const repository = $(lastChild).attr('href');
            if (repository) {
                repositoryList.push(repository);
            }
        });

        const plugins: { name: string; commands: any }[] = [];

        repositoryList.forEach(async repository => {
            const commandsJson = await fetch(
                `https://raw.githubusercontent.com${repository}/master/commands.json`
            ).then(res => res.json());

            plugins.push({
                name: repository.substr(1),
                commands: commandsJson,
            });
        });

        pushToFirestore(plugins);
    });

function pushToFirestore(plugins: { name: string; commands: any }[]) {
    const db = admin.firestore().collection('third-party-plugins');

    plugins.forEach(p => {
        db.doc(p.name).set(p.commands);
    });
}
