const express = require('express')
const natural = require('natural')
const path = require('path')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({limit: '50mb'}))

app.post('/classify', (req, res) => {
    const { text } = req.body
    const classpath = path.resolve(__dirname, '../data/classifier.json')
    natural.BayesClassifier.load(classpath, null, function (err, classifier) {
        if (err) {
            return res.json({ class: err })
        }

        const category = classifier.classify(text)
        return res.json({ class: category })
    });
})

app.listen(4000, () => {
    console.log("listening on port 4000")
})