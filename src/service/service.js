const connection = require('../repository/firebase');

const getDocument = async () => {

    var result = [];

    try {
         
        const db = connection.getDatabase();
        
        const collection = db.collection('nz').doc('price').collection('price');

        const collectionRef = await collection.get();
        
        if (collectionRef.docs.length >= 1) { 
            collectionRef.docs.forEach(doc => {
                //console.log('[SERVICE] -> A DOCUMENT WAS FOUND WITH ID -> '+ doc.id);
                // console.log("%j",doc.data());
                result.push(doc.data());
            });
        } 

        return result;

    } catch (error) {
        console.log('[SERVICE] -> AN ERROR HAS OCCURRED -> ', error);
        result = false;
    }
  
}

module.exports.getDocument = getDocument;