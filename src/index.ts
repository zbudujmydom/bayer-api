import dotenv from "dotenv";
import express from "express";
import { isOfferValid } from "@helpers/isOfferValid";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.static("./public"));
app.use(cookieParser());
app.use((req, res, next) => {
  res.removeHeader("X-powered-by");
  res.setHeader("X-Custom", "ABC");
  next();
});
app.use(bodyParser.json());

app.get("/text", (req, res) => {
  res
    .status(200)
    .cookie("cookie-2", "ABC", {
      expires: new Date(Date.now() + 8 + 36000000),
    })
    .cookie("test-cookie", "123")
    .send("example text ABC");
});

app.get("/offer/:id", (req, res) => {
  const id = req.params.id;

  if (isOfferValid(id)) {
    res.setHeader("X-custom-header", "123").status(200).json({ id: 123, title: "oferta ABC" });
  } else {
    res.status(404).json({ errorMessage: "Offer not found" });
  }
});

app.get("/image", (req, res) => {
  res.redirect(301, "/images/sunflower.jpg");
});

app.get("/check-cookies", (req, res) => {
  console.log("Cookies:", req.cookies);
  res.status(200).send("ok");
});

app.get("/check-query", (req, res) => {
  console.log(req.query);
  res.status(200).json({ success: true });
});

app.post("/add-item", (req, res) => {
  const data = req.body;
  console.log(data);

  res.status(200).send(data.age > 18 ? "ok" : "problem");
});

app.listen(port, () => {
  console.log("Serves is running on port: ", port);
});

/*
  GET - pobieramy dane 
    /offers -> wiele ofert jako lista
    /offer/123 -> jedna oferta z id=123
    /user -> jeden user

    (prefetch)
  POST -> tworzymy item
  PUT -> nadpisac item
  PATH -> modyfikuje tylko pojedyncze dane itema

  DELETE -> usuwanie itema / archiwizowanie
    - archive: flaga isActive: false
    - archive: kopia do tabeli B i wtedy usuwamy z tabeli A, email: '' (RODO?)

    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
*/
