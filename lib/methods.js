'use strict'

const { questions } = require('../models/index')

async function setAnswerRight (questionId, answerId, user) {
    let result
    try {
        result = await questions.setAnswerRight(questionId, answerId, user)
    } catch (e) {
        console.error(e)
        return false
    }
    return result
}

module.exports = {
    setAnswerRight
}
