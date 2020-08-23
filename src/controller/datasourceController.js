
const { getDocument } = require('../service/service');

exports.getDocument = async (req, res) => {
  //res.json({message:'datasourceController.getDocument'});
  const documents = await getDocument();
  res.json(documents);
}