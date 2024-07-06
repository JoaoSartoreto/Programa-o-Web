const express = require("express");
const cors = require("cors");
const rotasMensagens = require("./../app/routes/mensagem.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

rotasMensagens(app);

app.use((_req, resp) => {
  resp.status(404).json({ mensagem: "Não foi possivel encontrar o recurso" });
});

app.use((_error, _req, resp) => {
  resp.status(500).json({ mensagem: "Houve um erro interno no servidor" });
});

module.exports = app;
