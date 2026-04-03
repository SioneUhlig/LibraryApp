const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Library API is running' });
});

router.get('/professional', (req, res) => {
  res.json({
    professionalName: "JANE SMITH",
    nameLink: {
      firstName: "Jane",
      url: "https://www.linkedin.com/in/janesmith"
    },
    primaryDescription: " is a Full Stack Web Developer",
    workDescription1: "I build web applications using modern technologies.",
    workDescription2: "I love learning and solving problems with code.",
    linkTitleText: "Connect with me:",
    linkedInLink: {
      text: "LinkedIn",
      link: "https://www.linkedin.com/in/janesmith"
    },
    githubLink: {
      text: "GitHub",
      link: "https://github.com/janesmith"
    }
  });
});

router.use('/contacts', require('./contacts'));
router.use('/books', require('./books'));
router.use('/', require('../routes/swagger'));

module.exports = router;