import express from "express"
import mongoose from "mongoose"
import store from "./api/models/store.js"

const app = express()
// const port = 5500

app.set('port', process.env.PORT || 5500);


const mongoURL = "mongodb+srv://Alqaedra:QZTKBOYHo0abGxPa@cluster0.ibrhl.mongodb.net/clientes?retryWrites=true&w=majority"

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology:true})

app.use(express.json({ limit: "50mb" }))

app.post("/api/clients", (req, res) => {
    let clientData = req.body
    let mongoRecords = []
    clientData.forEach(client => {
        mongoRecords.push({
            firstName: client.firstName,
            phone: client.phone,
            address: client.address
        })
    })
    store.create(mongoRecords, (err, records) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(records)
        }
    })
})

app.delete("/api/clients", (req, res) => {
    store.deleteMany({}, (err) => {
        res.status(500).send(err)
    })
})

app.get("/api/clients", (req, res) => {
    store.find({}, (err, docs) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(docs)
        }
    })
})

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})
