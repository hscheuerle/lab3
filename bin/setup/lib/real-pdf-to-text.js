const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

const convertPdf = (filepath) => {
    return new Promise((resolve, reject) => {
        console.log(filepath)
        // TODO: pdf/real needs test
        spawn('pdftotext', [filepath, filepath.replace(/pdf/g, 'txt').replace('txt', 'txt/real')]).on('close', () => {
            resolve()
        })
    })
}

// make src/dest:path args for wider usecase
const realPdf2Text = async (dirpath) => {
    const dirs = fs.readdirSync(dirpath)
    for (const dir of dirs) {
        console.log(dir)
        await convertPdf(path.resolve(dirpath, dir))
    }
    return true
}

module.exports = {
    realPdf2Text
}
