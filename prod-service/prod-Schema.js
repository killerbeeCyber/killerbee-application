const mongoose = require('mongoose')
const bddConnect = require('./bdd')
bddConnect('Killerbee')

const freezbeeSchema = new mongoose.Schema({
    nom : String,
    description : String,
    pUHT : String,
    gamme : Number,
    ingredient : Array,
    grammage : Array,
})

const ingredientSchema = new mongoose.Schema({
    nom : String,
    description : String
})

const procedeSchema = new mongoose.Schema({
    nom : String,
    description : String,
    modele : String,
    etapes : [String],
    validation : Boolean,
    tests : String
})

const procedeModel = mongoose.model('procede', procedeSchema)
const ingredientModel = mongoose.model('ingredient', ingredientSchema)
const freezbeeModel = mongoose.model('freezbee', freezbeeSchema)

module.exports={freezbeeModel,procedeModel,ingredientModel}