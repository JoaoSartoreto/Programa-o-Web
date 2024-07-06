const app = require("./src/config/custom-express");
const mongoose = require("./src/config/database");
const path = require("node:path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

if (!process.env.MONGODB_URI) {
  return console.log(
    "Não foi possível carregar a URI para o Mongo DB do arquivo .env"
  );
}

mongoose.cliente.set("strictQuery", true);

mongoose.cliente
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(3000, () => {
      console.log("Servidor em execução na porta 3000");
    });
  })
  .catch((error) => console.log(error));
