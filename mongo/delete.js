require('./dbconnection'); // koko tiedoston importtaus onnistuu
const Student = require('./models/Student');

const studentgrade = 'e1234';
// Poistaa opiskelijan opiskelijatunnuksen avulla
Student.deleteOne({ studentcode: studentgrade })
  .then((result) => {
    console.log('Student deleted');
  })
  .catch((err) => {
    throw err;
  });
