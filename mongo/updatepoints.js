require('./dbconnection');
const Student = require('./models/Student');
const student = 'x1234';

Student.findOneAndUpdate({ studentcode: student }, { studypoints: 8 })
  .then((result) => {
    console.log(result.name + ' studypoint updated');
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
  });
