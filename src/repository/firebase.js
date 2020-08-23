const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.KEY_FILENAME
});

const getDatabase = () => {
    return db;
}

module.exports.getDatabase = getDatabase;