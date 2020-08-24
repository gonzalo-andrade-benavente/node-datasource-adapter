
const { getDocument, getDocumentById, postDocument } = require('../service/service');

exports.getDocument = async (req, res) => {
  let collectionName = req.headers['x-country'];
  let subcollectionName = 'subclass';
  if (!collectionName) {
    res.sendStatus(400);  
  } else {
    collectionName = collectionName.toString().trim().toLowerCase();
    const documents = await getDocument(collectionName, subcollectionName);
    res.json(documents);
  }
}

exports.getDocumentById = async (req, res) => {
  let collectionName = req.headers['x-country'];
  let subcollectionName = 'subclass';
  let id = req.params.id;
  if (!collectionName) {
    res.sendStatus(400);  
  } else if (!id) {
    res.sendStatus(400);
  } else {
    collectionName = collectionName.toString().trim().toLowerCase();
    const documents = await getDocumentById(collectionName, subcollectionName, id);
    res.json(documents);
  }
}

exports.postDocument = async (req, res) => {
  
  let collectionName = req.headers['x-country'];
  let subcollectionName = 'subclass';
  const reqQueries = req.query;
  const msg = req.body;

  if (!collectionName) {
    res.sendStatus(400);  
  } else if (Object.entries(reqQueries).length === 0 && reqQueries.constructor === Object) {
    // To handle the key.
    res.sendStatus(400);
  } else {
    collectionName = collectionName.toString().trim().toLowerCase();
    const document = await postDocument(collectionName, subcollectionName, msg);
    res.json(document);
  }
  
  
  
}