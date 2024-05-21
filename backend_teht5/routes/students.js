// Reititystiedosto johon tulevat opiskelijatietokantaa
// manipuoloivat reitit

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const sc = require('../controllers/studentcontroller');

const authorize = require('../verifytoken');
// 1) Kaikkien opiskelijoiden haku
// localhost:3000/students/
router.get('/', sc.findAll);

// 2) Yhden opiskelijan haku id:n perusteella
// localhost:3000/students/6630a53cb7b4d3f802d45e1e
// kaksoispiste tarkoittaa dynaamista reittiparametria
router.get('/:id', sc.findById);

router.post('/', authorize, sc.add);

// 3) Yhden opiskelijan haku opiskelijanumeron perusteella
// localhost:3000/students/scode/ac9194
router.get('/scode/:scode', authorize, sc.findByScode);

// 4) Opiskelijan lisääminen
// localhost:3000/students/add
router.post('/add', sc.add);

// 5) Opiskelijan poisto
// localhost:3000/students/6630a53cb7b4d3f802d45e1e
router.delete('/:id', authorize, sc.deleteById);

// 6) Opiskelijan muokkaaminen
// localhost:3000/students/6630a53cb7b4d3f802d45e1e
router.put('/:id', authorize, sc.updateById);

// 7) Niiden opiskelijoiden haku joilla on opintopisteä alle url-osoitteessa päytetyn arvon
// localhost:3000/students/sp/10
router.get('/sp/:sp', sc.findBySp);

// 8) Uuden arvosanan lisäys opiskelijalle ja samalla opintopisteiden lisäys viidellä
// localhost:3000/students/addgrade/ac9194/HTS10100
router.post('/addgrade/:scode/:ccode', sc.addGrade);

// 9) Arvosanan muokkaus
// localhost:3000/students/updategrade/ac9194/HTS10100
router.put('/updategrade/:scode/:ccode', sc.updateGrade);

// 10) Sama kurssi
// localhost:3000/students/findwithcourse/HTS10600
router.get('/findwithcourse/:coursecode', sc.findWithCourse);

module.exports = router;
