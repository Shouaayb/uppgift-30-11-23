const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log('Sho was here');
    const comments = JSON.parse(fs.readFileSync(__dirname + '/comments.json', 'utf8'));
    res.render('index', { comments });
});

app.post('/process', (req, res) => {
    console.log('Mäx was here');
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const comment = req.body.comment;

    // Läs befintliga kommentarer från filen
    const comments = JSON.parse(fs.readFileSync(__dirname + '/comments.json', 'utf8'));

    // Lägg till den nya kommentaren
    comments.push({ name, email, phone, comment });

    // Spara kommentarerna tillbaka till filen
    fs.writeFileSync(__dirname + '/comments.json', JSON.stringify(comments, null, 2), 'utf8');

    // Skicka kommentarerna som JSON-svar
    res.render('index', { comments });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
