'use strict'

const { question } = require('../models/index')

async function createQuestion (req, h) {
    let result
    try {
        result = await question.create(req.payload, req.state.user)
        console.log(`Pregunta creada con el id ${result}`)
    } catch (e) {
        console.error('Ocurrió un error: ', e)
        return h.view('ask', {
            title: 'Crear pregunta',
            error: 'Problemas creando la pregunta'
        }).code(500).takeover()
    }

    return h.response(`Pregunta creada con el id ${result}`)
}

async function answerQuestion (req, h) {
    let result
    try {
        result = await question.answer(req.payload, req.state.user)
        console.log(`Respuesta creada: ${result}`)
    } catch (e) {
        console.error(e)
    }
    return h.redirect(`/question/${req.payload.id}`)
}

module.exports = {
    createQuestion,
    answerQuestion
}