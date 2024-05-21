/* eslint-disable quote-props */
/* eslint-disable new-cap */
const Student = require('../models/Student'); // haetaan model

// Tietokannan käsittelymetodit tehdään olion sisään
// metodin nimi on avain ja sen runko on arvo
const StudentController = {
  // 1) Kaikkien opiskeljoiden haku
  findAll(req, res) {
    Student.find()
      .then((students) => {
        res.json(students);
      })
      .catch((err) => {
        throw err;
      });
  },
  // 2) Yhden opiskelijan haku id:n perusteella
  findById(req, res) {
    Student.findOne({ _id: req.params.id })
      .then((student) => {
        res.json(student);
      })
      .catch((err) => {
        throw err;
      });
  },
  // 3) Yhden opiskelijan haku opiskelijanumeron perusteella
  findByScode(req, res) {
    Student.findOne({ studentcode: req.params.scode })
      .then((student) => {
        res.json(student);
      })
      .catch((err) => {
        throw err;
      });
  },

  // 4) Opiskelijan lisääminen
  add(req, res) {
    console.log('Adding new student');
    console.log('Request body:', req.body);
    const newStudent = Student(req.body);
    Student.create(newStudent)
      .then((student) => {
        console.log('Student added successfully:', student);
        res.json(student);
      })
      .catch((err) => {
        console.error('Error adding student:', err);
        throw err;
      });
  },

  // 5) Opiskelijan poisto
  deleteById(req, res) {
    Student.findOneAndDelete({ _id: req.params.id })
      .then((student) => {
        res.json(student);
      })
      .catch((err) => {
        throw err;
      });
  },
  // 6) Opiskelijan muokkaaminen
  updateById(req, res) {
    Student.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((student) => {
        res.json(student);
      })
      .catch((err) => {
        throw err;
      });
  },
  // 7) Niiden opiskelijoiden haku joilla on opintopisteitä alle url-osoitteessa lähetetyn arvon
  findBySp(req, res) {
    Student.find({ studypoints: { $lt: req.params.sp } })
      .then((students) => {
        res.json(students);
      })
      .catch((err) => {
        throw err;
      });
  },

  // 8) Uuden arvosanan lisäys opiskelijalle ja samalla opintopisteiden lisäys viidellä
  addGrade(req, res) {
    const newGrade = {
      coursecode: req.body.coursecode,
      grade: req.body.grade,
    };
    Student.findOneAndUpdate(
      { studentcode: req.params.scode },
      {
        $push: { grades: newGrade },
        $inc: { studypoints: req.body.grade > 0 ? 5 : 0 },
      }
    )
      .then(() => {
        res.send('New course added for student');
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // 9) Arvosanan muokkaus. Muokkaus tarkoittaa aina sitä, että olemassa olevan tiedon päälle laitetaan uutta tietoa
  // Valitaan opiskelijan arvosana opiskelijanumeron ja kurssitunnuksen perusteella ja päivitetään se
  updateGrade(req, res) {
    console.log('Updating grade for', req.params.scode, req.params.code);
    Student.findOneAndUpdate(
      {
        studentcode: req.params.scode,
        'grades.coursecode': req.params.code,
      },
      {
        $set: {
          'grades.$.grade': req.body.grade,
        },
      }
    )
      .then(() => {
        res.json('Course updated');
      })
      .catch((err) => {
        console.error('Error updating grade:', err);
        throw err;
      });
  },

  // 10) Niiden opiskelijoiden haku, joilla on tietty kurssi
  findWithCourse(req, res) {
    Student.find({ grades: { $elemMatch: { coursecode: req.params.code } } })
      .then((students) => {
        res.json(students);
      })
      .catch((error) => {
        throw error;
      });
  },
};

module.exports = StudentController;

/*
students.js -reittitiedostossa kontrollerin metodia kutsutaan tällä tavalla:

router.get('/', StudentController.findAll);

jolloin kaikki opiskelijat saadaan JSON-muodossa osoitteesta http://localhost:3000/students/

*/
