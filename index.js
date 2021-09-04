const express = require('express')
const multer = require('multer')
const path = require('path');
const jspdf = require('jspdf');


var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback) {
    callback(null, file.originalname + ".pdf");
  }
});
const upload = multer({ storage: storage })
const port = 3000
const doc = new jspdf.jsPDF();
const app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  res.send("File uploaded successfully")
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/pdf', (req, res) => {

  // doc.text("Hello world!", 10, 10);
  doc.fromHTML(elementHTML, 15, 15, {
    'width': 170
  });
  doc.save("uploads/a4.pdf");

  res.send("Saving");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})