require('./dbconnection'); // koko tiedoston importtaus onnistuu
const Student = require('./models/Student');

Student.find({})
  .then((result) => {
    console.log(result);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
  });
