const mensagemDAO = require("./../dao/mensagem.dao");
const { validationResult } = require("express-validator");

class MensagemController {
  routes() {
    return {
      base: "/chat/messages/",
      id: "/chat/messages/:id",
    };
  }

  find() {
    return (req, resp) => {
      mensagemDAO
        .findById(req.params.id)
        .then((resultado) => {
          if (resultado) return resp.status(200).json(resultado);
          return resp.status(404).json({ mensagem: "Mensagem não localizada" });
        })
        .catch((error) => resp.status(400).json({ mensagem: error.message }));
    };
  }

  create() {
    return (req, resp) => {
      const erros = validationResult(req).array();
      if (erros.length > 0) {
        resp.status(422).json(erros);
      } else {
        mensagemDAO
          .create(req.body)
          .then(() => {
            resp
              .status(201)
              .json({ mensagem: "Mensagem armazenada com sucesso!" });
          })
          .catch((error) => resp.status(400).json({ mensagem: error.message }));
      }
    };
  }
}

module.exports = new MensagemController();
