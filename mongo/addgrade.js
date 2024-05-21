require('./dbconnection'); // koko tiedoston importtaus onnistuu
//const studentcode = require('./NewTestStudentObject');
const Student = require('./models/Student');

const newgrade = {
  // arvosanaolio
  coursecode: 'HTK10900',
  grade: 3,
};

Student.updateOne(
  { studentcode: 'e1234' }, // kohde
  { $push: { grades: newgrade }, $inc: { studypoints: 5 } } // toimenpiteet
)
  .then((result) => {
    console.log('Document inserted succesfully: ' + result);
  })
  .catch((err) => {
    console.error(err);
  });
