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

module.exports = {
    createQuestion
}