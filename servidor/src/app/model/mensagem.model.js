const mongoose = require("mongoose");
const { check } = require("express-validator");

const mensagem = mongoose.model("mensagem", {
  timestamp: String,
  sender_id: String,
  sender_name: String,
  sender_image: String,
  receiver_id: String,
  receiver_name: String,
  visibility: Boolean,
  message_id: String,
  message_text: String,
  color: String,
});

class MensagemModel {
  validacoes() {
    return [
      this.validarNotEmpty("timestamp", "timestamp é necessário"),
      this.validarNotEmpty("sender_id", "sender_id é necessário"),
      this.validarNotEmpty("sender_name", "sender_name é necessário"),
      this.validarNotEmpty("sender_image", "sender_image é necessário"),
      this.validarNotEmpty("visibility", "visibility é necessário"),
      this.validarNotEmpty("message_id", "message_id é necessário"),
      this.validarNotEmpty("color", "color é necessário"),
      check("color").isHexColor(),
    ];
  }

  validarNotEmpty(campo, mensagem) {
    return check(campo).notEmpty().withMessage(mensagem);
  }
}

const mensagemMODEL = new MensagemModel();

module.exports = { mensagem, mensagemMODEL };
