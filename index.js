const fs = require('fs');
const express = require('express');
const cors = require('cors');
var parser = require('xml2json');
const port = 5001;


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

app.post('/getData', function (req, res) {
    console.log(req.body.dayPath)
    const race = req.body.dayPath + "/" + req.body.file;

     const data = fs.readFileSync(race, {encoding:'utf8'});
     const jsonData = (JSON.parse(parser.toJson(data)))

     return res.status(200).json({data:jsonData});
});


app.post('/getRaces', (req, res) => {
    let testFolder = req.body.dayPath;
    
    return res.send(fs.readdirSync(testFolder))
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


