const connection = require('../repository/firebase');

const getDocument = async (collectionName, subcollectionName) => {
    var documents = {};
    var result = [];
    try {
        const db = connection.getDatabase();
        const collection = db.collection(collectionName).doc(subcollectionName).collection(subcollectionName);
        const collectionRef = await collection.get();
        if (collectionRef.docs.length >= 1) {
            collectionRef.docs.forEach(doc => {
                result.push(doc.data().message);
            });
        }

        documents = { error: false, data: result, message: 'Data load correctly' };
    } catch (err) {
        documents = { error: true, data: null, message: err };
    }
    return documents;
}

const getDocumentById = async (collectionName, subcollectionName, subclass) => {
    var documents = {};
    var result = [];
    var message = '';
    /*
    try {
        const db = connection.getDatabase();
        const collection = db.collection(collectionName).doc(subcollectionName).collection(subcollectionName);
        const collectionRef = await collection.where(`query.id`, `==`, subclass).get();
        if (collectionRef.docs.length >= 1) {
            collectionRef.docs.forEach(doc => {
                result.push(doc.data().message);
            });
        }
        
        documents = { error: false, data: result, message: 'Data founded correctly' };
    } catch (err) {
        documents = { error: true,  data: null, message: `Params ${subclass}`};
    }
    */
    try {
        
        const db = connection.getDatabase();
        const collection = db.collection(collectionName).doc(subcollectionName).collection(subcollectionName);

        await collection.where('query.id', '==', subclass).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    message = 'No matching documents.';
                }

                snapshot.forEach(doc => {
                    result.push(doc.data().message);
                });
            })
            .catch(err => {
                message = err;
            });
        
            if (result.length > 0) {
                documents = { error: false, data: result, message: `Matching ${subclass} ok` };
            } else {
                documents = { error: true, data: null, message: message };
            }

    } catch (err) {
        documents = { error: true, data: null, message: `Matching ${subclass} nok` };
    }

    return documents;

}

const postDocument = async (collectionName, subcollectionName, msg) => {

    var document = {};

    const db = connection.getDatabase();
    const collection = db.collection(collectionName).doc(subcollectionName).collection(subcollectionName);
    await collection.add({ "message": msg, "query": { id: msg.subclass } }).then(doc => {
        document = { error: false, message: `Data was save succesfully with the id -> ${doc.id}` };
    }).catch(err => {
        document = { error: true, message: err };
    });

    return document;

}

module.exports = {
    getDocument: getDocument,
    getDocumentById: getDocumentById,
    postDocument: postDocument
}