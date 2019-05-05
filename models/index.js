'use strict'

const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase.json')
const Users = require('./users')
const Question = require('./question')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://node-hapi-f50b1.firebaseio.com/'
})

const db = firebase.database()

module.exports = {
    users: new Users(db),
    question: new Question(db)
}
