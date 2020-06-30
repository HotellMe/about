const db = require('../database');

const getPhotos = (id, callback) => {
  console.log('model getting.../');

  // query to grab all data
  db.Photo.find({ _id: id }, callback);
}

module.exports = {
  getPhotos
}