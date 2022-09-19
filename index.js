
const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(
    PORT,
    () => console.log(`alive on http://localhost:${PORT}`)
);

//Discord data request handler (returns)
app.get('/discord', (req, res) => {
    res.status(200).send({
        name: "",
        roles: []
    })
});