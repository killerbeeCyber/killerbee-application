const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { freezbeeModel,ingredientModel,procedeModel } = require('./prod-Schema')

const app = express()
const port = 27021

app.use(express.json())
app.use(cors())

app.listen(port, () => {
  var listen = `Express listening on port ${port}`
})

app.get('/freezbee', (req,res)=>{
    const params ={}
    freezbeeModel.find ((err, doc) =>{
        if (!err) {
          if (doc != null) {
            return res.status(200).json(doc)
          } else {
            return res.status(404).json({ message: 'no article available' })
          }
        } else {
          return res.status(500).json({ message: 'Internal error' })
        }
      })
})

app.get('/freezbee/:id',(req,res)=>{
    let idFreezbee
    try {
        idFreezbee = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
        throw 'Bad Id'
    }

    freezbeeModel.findOne({ _id: idFreezbee }, (err, doc) => {
        if (!err) {
            if (doc != null) {
                return res.status(200).json(doc)
        } else {
            return res.status(404).json({ message: 'article not found' })
        }
        } else {
            return res.status(500).json({ message: 'Internal error' })
        }
    })
})

app.post('/freezbee', (req,res)=>{
    const nomFreezbee = req.body.nom
    const descriptionFreezbee = req.body.description
    const pUHTFreezbee= req.body.pUHT
    const gammeFreezbee = req.body.gamme
    const ingredientFreezbee = req.body.ingredient
    const grammageFreezbee = req.body.grammage

    const newFreezbee = new freezbeeModel({
        nom: nomFreezbee,
        description : descriptionFreezbee,
        pUHT : pUHTFreezbee,
        gamme : gammeFreezbee,
        ingredient : ingredientFreezbee,
        grammage : grammageFreezbee
    })

    newFreezbee.save((err,doc)=>{
        if (!err) {
            return res.status(201).json(doc)
          } else {
            return res.status(500).json({ message: 'Internal error' })
        }
    })
})

app.patch('/freezbee/:id', (req,res)=>{
    const id = req.params.id
    const changes = req.body
    try {
      idFreezbee = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
      throw 'Bad Id'
    }
    freezbeeModel.findByIdAndUpdate(id, changes, (err, doc) => {
        if (!err) {
            return res.status(200).json(doc)
        } else {
            return res.status(404).json({ message: 'article not found' })
        }
    })
})

app.delete('/freezbee/:id', (req,res)=>{
    const id = req.params.id
    try {
      idFreezbee = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
      throw 'Bad Id'
    }
    freezbeeModel.findOne({ _id: id }, (err, doc) => {
        if (!err) {
            if (doc != null) {
                doc.delete()
                return res.status(200).json(doc)
            } else {
                return res.status(404).json({ message: 'article not found' })
            }
        } else {
        return res.status(500).json({ message: 'Internal error' })
        }
    })
})

app.get('/ingredient', (req,res)=>{
    const params ={}
    ingredientModel.find ((err, doc) =>{
        if (!err) {
          if (doc != null) {
            return res.status(200).json(doc)
          } else {
            return res.status(404).json({ message: 'no article available' })
          }
        } else {
          return res.status(500).json({ message: 'Internal error' })
        }
    })
})

app.get('/ingredient/:id',(req,res)=>{
    let idIngredient
    try {
        idIngredient = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
        throw 'Bad Id'
    }

    freezbeeModel.findOne({ _id: idIngredient }, (err, doc) => {
        if (!err) {
            if (doc != null) {
                return res.status(200).json(doc)
        } else {
            return res.status(404).json({ message: 'article not found' })
        }
        } else {
            return res.status(500).json({ message: 'Internal error' })
        }
    })
})

app.post('/ingredient', (req,res)=>{
    const nomIngredient = req.body.nom
    const descriptionIngredient = req.body.description

    const newIngredient = new ingredientModel({
        nom: nomIngredient,
        description : descriptionIngredient,
    })

    newIngredient.save((err,doc)=>{
        if (!err) {
            return res.status(201).json(doc)
          } else {
            return res.status(500).json({ message: 'Internal error' })
        }
    })
})

app.patch('/ingredient/:id', (req,res)=>{
    const id = req.params.id
    const changes = req.body
    try {
      idIngredient = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
      throw 'Bad Id'
    }
    ingredientModel.findByIdAndUpdate(id, changes, (err, doc) => {
        if (!err) {
            return res.status(200).json(doc)
        } else {
            return res.status(404).json({ message: 'article not found' })
        }
    })
})

app.delete('/ingredient/:id', (req,res)=>{
    const id = req.params.id
    try {
      idIngredient = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
      throw 'Bad Id'
    }
    ingredientModel.findOne({ _id: id }, (err, doc) => {
        if (!err) {
            if (doc != null) {
                doc.delete()
                return res.status(200).json(doc)
            } else {
                return res.status(404).json({ message: 'article not found' })
            }
        } else {
        return res.status(500).json({ message: 'Internal error' })
        }
    })
})

app.get('/procede', (req,res)=>{
    const params ={}
    procedeModel.find ((err, doc) =>{
        if (!err) {
          if (doc != null) {
            return res.status(200).json(doc)
          } else {
            return res.status(404).json({ message: 'no article available' })
          }
        } else {
          return res.status(500).json({ message: 'Internal error' })
        }
      })
})

app.get('/procede/:id',(req,res)=>{
    let idProcede
    try {
        idProcede = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
        throw 'Bad Id'
    }

    procedeModel.findOne({ _id: idProcede }, (err, doc) => {
        if (!err) {
            if (doc != null) {
                return res.status(200).json(doc)
        } else {
            return res.status(404).json({ message: 'article not found' })
        }
        } else {
            return res.status(500).json({ message: 'Internal error' })
        }
    })
})

app.post('/procede', (req,res)=>{
    const nomProcede = req.body.nom
    const descriptionProcede = req.body.description
    const modeleProcede = req.body.modele
    const etapesProcede = req.body.etapes
    const validationProcede = req.body.validation
    const testsProcede = req.body.tests

    const newProcede = new procedeModel({
        nom: nomProcede,
        description : descriptionProcede,
        modele : modeleProcede,
        etapes : etapesProcede,
        validation : validationProcede,
        tests: testsProcede
    })

    newProcede.save((err,doc)=>{
        if (!err) {
            return res.status(201).json(doc)
          } else {
            return res.status(500).json({ message: 'Internal error' })
        }
    })
})

app.patch('/procede/:id', (req,res)=>{
    const id = req.params.id
    const changes = req.body
    try {
      idProcede = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
      throw 'Bad Id'
    }
    procedeModel.findByIdAndUpdate(id, changes, (err, doc) => {
        if (!err) {
            return res.status(200).json(doc)
        } else {
            return res.status(404).json({ message: 'article not found' })
        }
    })
})

app.delete('/procede/:id', (req,res)=>{
    const id = req.params.id
    try {
      idProcede = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
      throw 'Bad Id'
    }
    procedeModel.findOne({ _id: id }, (err, doc) => {
        if (!err) {
            if (doc != null) {
                doc.delete()
                return res.status(200).json(doc)
            } else {
                return res.status(404).json({ message: 'article not found' })
            }
        } else {
        return res.status(500).json({ message: 'Internal error' })
        }
    })
})