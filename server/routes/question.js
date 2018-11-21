
const express = require('express');
const router = express.Router();

// database
const questions = [];

// retrieve all questions
router.get('/', (req, res) => {

    const qs = questions.map(q => ({

        id:             q.id,
        title:          q.title,
        description:    q.description,
        answers:        q.answers,
        answers_count:  q.answers.length

    }));

    return res.send(qs);

});

// get specific question
router.get('/:id', (req, res) => {

    const question = questions.filter(q => (q.id === parseInt(req.params.id)));

    if (question.length > 1) return res.status(500).send();

    if (question.length === 0) return res.status(404).send();

    return res.send(question[0]);

});

// add new question
router.post('/', (req, res) => {

    const {title, description} = req.body;

    const newQuestion = {

        id: questions.length + 1,
        title,
        description,
        answers: []

    };

    questions.push(newQuestion);

    return res.status(200).send();

});

// add new answer
router.post('/answer/:id', (req, res) => {

    const {answer} = req.body;

    const question = questions.filter(q => (q.id === parseInt(req.params.id)));

    if (question.length > 1) return res.status(500).send();

    if (question.length === 0) return res.status(404).send();

    question[0].answers.push({
        answer
    });

    return res.status(200).send();

});

module.exports = router;