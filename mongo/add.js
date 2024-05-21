require('./dbconnection'); // koko tiedoston importtaus onnistuu
const Student = require('./models/Student');

// Lisättävä opiskelija

const newStudentobj = {
  studentcode: 'e1234',
  name: 'Esti Opiskelija',
  email: 'e1234@jamk.fi',
  studypoints: 0,
  grades: [
    {
      coursecode: 'HTS10600',
      grade: 0,
    },
  ],
};

// newstudent on Student-tyyppinen olio, joka voidaan laittaa kantaan
const newstudent = Student(newStudentobj);
// Mongoosen create() tallentaa yhden tai useamman dokumentin tietokantaan
Student.create(newstudent)
  .then((doc) => {
    console.log('Document inserted succesfully: ' + doc);
  })
  .catch((err) => {
    console.error(err);
  });
