const express = require ('express');
const app = express();
const port = process.env.port || 3000;
const path = require ('path');

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/*', (req, res) => {
    const destPath = path.join(__dirname, 'dist/index.html');
    res.sendFile(destPath);
});

app.listen(port, () => {
    console.log('App is up and running!');
})