const express = require('express');
const app = express();
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();

//set view engine
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/api', (req, res) => {
    const text = (req.query.text !== undefined) ? req.query.text : 'yo'
    const attributes = { stroke: 'black' , id: 'svg-text'};
    const options = { x: 0, y: 0, fontSize: 350, anchor: 'top', attributes: attributes };

    const textOptions = {
        image_size: (req.query.image_size !== undefined) ? req.query.image_size : 30,
        distance_size: (req.query.distance_size !== undefined) ? req.query.distance_size : 20,
    }

    let imgOptions = []
    if (req.query.images !== undefined) {
        req.query.images.forEach(img => imgOptions.push(img))
    } else
        imgOptions.push('mie')


    const svgText = textToSVG.getSVG(text, options);
    res.render('index', { svgText, textOptions, imgOptions, text })
})

// app.listen(process.env.PORT || 3000);
module.exports = app


