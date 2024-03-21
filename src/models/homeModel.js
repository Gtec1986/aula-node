const mongoose = require("mongoose")

const HomeSchema = new mongoose.Schema({
    valor:{ type: Number, required: true},
    descricao: String
})

const HomeModel = mongoose.model("aula_js2024 ", HomeSchema)

module.exports = HomeModel