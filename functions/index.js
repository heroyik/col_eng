const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const axios = require("axios");
const { logger } = require("firebase-functions");

exports.synctogithub = onDocumentWritten({
    document: "EnglishExpressions/{docId}",
    region: "asia-northeast3",
    secrets: ["GITHUB_TOKEN"]
}, async (event) => {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = 'heroyik';
    const REPO_NAME = 'col_eng';

    if (!GITHUB_TOKEN) {
        logger.error('GITHUB_TOKEN is not set in environment variables.');
        return;
    }

    logger.info(`Triggering GitHub Action for ${event.params.docId}...`);

    try {
        const response = await axios.post(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/dispatches`,
            { event_type: 'sync_data' },
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json',
                    'User-Agent': 'Firebase-Cloud-Functions'
                }
            }
        );
        logger.info('GitHub Action triggered successfully.', { status: response.status });
    } catch (error) {
        logger.error('Failed to trigger GitHub Action:', error.response ? error.response.data : error.message);
    }
});
