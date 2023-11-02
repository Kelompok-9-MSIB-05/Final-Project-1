const express = require("express")
const app = express()
const routes = require("./routes")
PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

app.get("/", (req, res) => {
    res.send("Testing");
    });

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    });


