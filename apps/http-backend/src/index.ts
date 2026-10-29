import express from "express";

const app = express();

app.get("/", function (req, res) {
    res.send("Zylo HTTP backend is running!");
});

app.listen(4000, function () {
    console.log("Zylo HTTP backend running on port 4000");
});