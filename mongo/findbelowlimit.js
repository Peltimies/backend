require('./dbconnection'); // koko tiedoston importtaus onnistuu
const Student = require('./models/Student');

// Etsii oppilaat joilla on alle 5 opintopistettä
Student.find({ studypoints: { $lte: 5 } })
  .then((result) => {
    console.log('Students whos studypoints are under 5: ' + result);
  })
  .catch((err) => {
    console.log(err);
  });
