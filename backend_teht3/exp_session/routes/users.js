/* eslint-disable new-cap */
/*
users-reitit.
http://localhost:3000/users/ ei ole tässä sovelluksessa
aktiivisessa käytössä, vaan sieltä tulee pelkästään vastaus:
'respond with a resource'
*/
const express = require('express');
const router = express.Router();

/*
req on pyyntö, eli palvelin pyytää/ottaa dataa req-oliosta
res on vastaus, jonka palvelin antaa
next siirtää tarvittaessa seuraavaan reittiin
 */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
