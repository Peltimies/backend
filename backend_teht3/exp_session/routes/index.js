/* eslint-disable new-cap */
/*
routes-kansiossa sijaitsevat sovelluksen reitit, siis
url-osoitteet joiden kautta lähetetään tai haetaan dataa.

index.js-tiedostossa ovat reitit sovelluksen juureen
eli osoitteeseen http://localhost:3000/

Sessio on yksinkertaisin tapa reittien suojaukseen.
Se toimii perinteisissä sovelluksissa mutta ei
SPA-sovelluksissa, joissa käytetään JWT-tokenia.
*/

const express = require('express');
const Student = require('../models/Student');
// Reititys toimii router-olion kautta
const router = express.Router();
let sess;

// Kun mennään sovelluksen juureen, katsotaan ollanko jo kirjauduttu
/*
req on pyyntö, eli palvelin pyytää/ottaa dataa req-oliosta
res on vastaus, jonka palvelin antaa
next siirtää tarvittaessa seuraavaan reittiin
 */
router.get('/', (req, res, next) => {
  sess = req.session; // laitetaan sessio-olio muuttujaan sess
  /* Jos sessiossa on salasana 'qwerty', uudelleenohjataan käyttäjä
  suoraan reittiin sivu1. Tähän 'qwerty' on yksinkertaisuuden vuoksi
  kovakoodattu, mutta yleensä se tulee tietokannasta muuttujassa */
  if (sess.pass === 'qwerty') {
    res.redirect('/sivu1');
  } else {
    // muuten mennään kirjautumaan
    res.render('index', {
      // kirjautumissivu
      title: 'Express sessioesimerkki',
      errors: req.session.errors, // laitetaan sivulle menemään mahdolliset virheet
    });
    req.session.errors = null; // tyhjennetään vanhat virheet sessiosta
  }
});

/*
Kirjautumisdatan vastaanotto on post-tyyppinen eli vastaanotetaan
post-metodilla lähetettyä dataa
*/
router.post('/', (req, res) => {
  sess = req.session; // sessio talteen

  /************ Lomakedatan validointi palvelinpuolella ************/

  // tarkistetaan sisääntuleva data validaattorin checkBody -metodilla
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Please enter a valid email').isEmail();
  req.checkBody('pass', 'Password is required').notEmpty();
  // salasanan oikeellisuudesta ei tietoturvasyistä kannata antaa ilmoitusta
  const errors = req.validationErrors();
  // console.log(errors);

  // jos on validaatiovirheitä, pysytään kirjautumissivulla
  if (errors) {
    sess.errors = errors; // virheet sessioon josta ne voidaan näyttää kirjautumissivulla
    res.redirect('/');
    // muuten siirrytään reittiin sivu1 jossa tarkistetaan passwordin oikeellisuus
  } else {
    // sess.success = true;
    // sess.email = req.body.email; // sess.email saa arvon login-sivulta (index.ejs)
    sess.pass = req.body.pass; // sess.pass saa arvon login-sivulta (index.ejs)
    res.redirect('/sivu1');
  }
});

//reitti sivu1-sivulle
router.get('/sivu1', (req, res) => {
  sess = req.session; //laitetaan sessio-olio muuttujaan sess
  /* Sivu on suojattu salasanalla. Salasana 'qwerty' on yksinkertaisuuden
  vuoksi kovakoodattu tähän, mutta yleensä se tulee muuttujana tietokannasta */
  if (sess.pass === 'qwerty') {
    res.render('sivu1', {
      title: 'Olet nyt sessiossa sivulla sivu1!',
      sessid: sess.id,
      sess: sess,
    });
  } else {
    res.render('error', {
      // jos passu väärä, mennään error-sivulle
      message: 'Et ole kirjautunut tai salasanasi on väärä',
    });
  }
});

//reitti sivu2-sivulle
router.get('/sivu2', (req, res) => {
  sess = req.session; // laitetaan sessio-olio muuttujaan sess
  //  sessiossa ollaan
  if (sess.pass === 'qwerty') {
    res.render('sivu2', {
      title: 'Olet nyt sessiossa sivulla sivu2!',
      sessid: sess.id,
      sess: sess,
    });
  } else {
    res.render('error', {
      // jos passu väärä, mennään error-sivulle
      message: 'Et ole kirjautunut tai salasanasi on väärä',
    });
  }
}); //salainen sivu

//reitti sivu3-sivulle
router.get('/sivu3', async (req, res) => {
  sess = req.session; // laitetaan sessio-olio muuttujaan sess
  //  sessiossa ollaan
  if (sess.pass === 'qwerty') {
    // Haetaan tiedot tietokannasta tässä kohtaan. Normaalisti olisi erillinen controller tiedosto, jossa tieto haetaan
    Student.find()
      .then((students) => {
        res.render('sivu3', {
          title: 'Olet nyt sessiossa sivulla sivu3!',
          sessid: sess.id,
          students: students,
        });
      })
      .catch((err) => {
        throw err;
      });
  } else {
    res.render('error', {
      // Jos passu käärä, mennään error-sivulle
      message: 'Et ole kirjautunut tai salasanasi on käärä',
    });
  }
});

// reitti JSON-Apiin voidaan myös suojata sessiolla
router.get('/api', function (req, res) {
  sess = req.session; // laitetaan sessio-olio muuttujaan sess
  // api on suojattu salasanalla. Tässä on kovakoodattu esimerkkiapi key: value
  if (sess.pass === 'qwerty') {
    res.json({
      key: 'value',
    });
  } else {
    res.render('error', {
      // jos passu väärä, mennään error-sivulle
      message: 'Et ole kirjautunut tai salasanasi on väärä',
    });
  }
});

// logout-reitti
router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/'); //takaisin juureen eli kirjautumaan
    }
  });
});

module.exports = router;
