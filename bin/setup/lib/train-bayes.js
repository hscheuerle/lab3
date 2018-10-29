const fs = require('fs')
const path = require('path')
const natural = require('natural')

const trainBayes = (datadirpath, fakedirpath, realdirpath) => {
    return new Promise((resolve, reject) => {
        const
            fakefilepaths = fs.readdirSync(fakedirpath).map(dir => path.resolve(fakedirpath, dir)),
            realfilepaths = fs.readdirSync(realdirpath).map(dir => path.resolve(realdirpath, dir)),
            classifierpath = path.resolve(datadirpath, 'classifier.json');

        const
            { BayesClassifier } = natural,
            classifier = new BayesClassifier();

        fakefilepaths.forEach(fakefilepath => {
            console.log(fakefilepath)
            const buffer = fs.readFileSync(fakefilepath)
            classifier.addDocument(buffer.toString(), 'fake')
        })

        realfilepaths.forEach(realfilepath => {
            console.log(realfilepath)
            const buffer = fs.readFileSync(realfilepath)
            classifier.addDocument(buffer.toString(), 'real')
        })

        classifier.train();

        classifier.save(classifierpath, (err, classifier) => {
            if (err) reject(err)
            resolve('done')
        });
    });
}

module.exports = {
    trainBayes
}