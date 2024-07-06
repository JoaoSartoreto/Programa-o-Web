const mongoose = require("../model/mensagem.model");

const callbackResultado = (resolve, reject) => {
  return (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  };
};

class MensagemDAO {
  findById(id) {
    return new Promise((resolve, reject) => {
      mongoose.mensagem.findOne(
        { message_id: id },
        callbackResultado(resolve, reject)
      );
    });
  }

  create(mensagem) {
    return new Promise((resolve, reject) => {
      mongoose.mensagem.create(mensagem, callbackResultado(resolve, reject));
    });
  }
}

module.exports = new MensagemDAO();
