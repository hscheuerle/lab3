#!/usr/bin/env node

const path = require('path')

const { prompt } = require('./lib/prompt');

const { tryMakeDirs } = require('./lib/try-make-dirs')
const { getFakes } = require('./lib/get-fakes')
const { getReals } = require('./lib/get-reals')
const { fakeHtml2Text } = require('./lib/fake-html-to-text')
const { realPdf2Text } = require('./lib/real-pdf-to-text')
const { trainBayes } = require('./lib/train-bayes')

const
    rootpath = path.resolve(process.cwd(), 'server'),
    datadirpath = path.resolve(rootpath, 'data'),
    htmldirpath = path.resolve(datadirpath, 'html'),
    pdfdirpath = path.resolve(datadirpath, 'pdf'),
    txtdirpath = path.resolve(datadirpath, 'txt'),
    fakedirpath = path.resolve(txtdirpath, 'fake'),
    realdirpath = path.resolve(txtdirpath, 'real');

const sh = prompt.createShell({
    init: () => {
        return new Promise((resolve, reject) => {
            tryMakeDirs(datadirpath, htmldirpath, pdfdirpath, txtdirpath, fakedirpath, realdirpath)
            resolve()
        })
    },
    fakes: async () => getFakes(htmldirpath, 66),
    reals: async () => getReals(pdfdirpath),
    html2text: async () => fakeHtml2Text(htmldirpath, fakedirpath),
    pdf2text: async () => realPdf2Text(pdfdirpath, realdirpath),
    train: async () => trainBayes(datadirpath, fakedirpath, realdirpath)
})

sh.start()