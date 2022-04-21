const express = require("express");
const app = express();
const product = require("./api/product");

app.use(express.json({extend: false}));

app.use("/api/product", product);

app.get("/",(req,res,next) => {
    res.status(200).send("Hello World")
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));