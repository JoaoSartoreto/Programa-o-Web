const mensagemController = require("./../controller/mensagem.controller");
const mensagemModel = require("./../model/mensagem.model");



module.exports = (app) => {
    app.route(mensagemController.routes().base)
        .post(mensagemModel.mensagemMODEL.validacoes(), mensagemController.create())

    app.route(mensagemController.routes().id)
        .get(mensagemController.find())
}

