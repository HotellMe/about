const Model = require('./model.js')

const getPhotos = (req, res) => {
  console.log('controller getting.../');
  const id = req.params.hotelId || "1";
  console.log(id);
  Model.getPhotos(id, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  })
}

module.exports = {
  getPhotos
}