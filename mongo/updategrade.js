/* eslint-disable quote-props */
require('./dbconnection'); // koko tiedoston importtaus onnistuu
const Student = require('./models/Student');
/*
const newgrade = {
  // arvosanaolio
  coursecode: 'HTK10900',
  grade: 3,
};
*/
// päivitetään pelkkä arvosana, ei koko oliota
const newgrade = 5;
// päivitetään tietyn opiskelijan tietty kurssi
Student.findOneAndUpdate(
  { studentcode: 'e1234', 'grades.coursecode': 'HTS10600' }, // kohde
  { 'grades.$.grade': newgrade } // toimenpiteet. $ viittaa kohteeseen
)
  .then((result) => {
    console.log('Document inserted succesfully: ' + result);
  })
  .catch((err) => {
    console.error(err);
  });
