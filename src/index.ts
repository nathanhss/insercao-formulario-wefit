import bodyParser from "body-parser";
import express from "express";
import formRoutes from "./routes/form";

const app = express();

const port = process.env.PORT || 4568;

app.use(bodyParser.json());

app.use(formRoutes);

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
