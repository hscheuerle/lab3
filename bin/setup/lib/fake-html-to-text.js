const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

const bs = 'Download a Postscript or PDF version of this paper. Download all the files for this paper as a gzipped tar archive. Generate another one. Back to the SCIgen homepage. '

const convertHtml = (srcpath, destpath) => {
    return new Promise((resolve, reject) => {
        const html = fs.readFileSync(srcpath)
        const $ = cheerio.load(html)
        const text = $('body').text().trim().replace(/\s+/g, ' ').replace(bs, '')
        fs.writeFileSync(destpath, text)
        resolve()
    })
}

const fakeHtml2Text = async (srcdirpath, destdirpath) => {
    const files = fs.readdirSync(srcdirpath)
    for (const file of files) {
        const srcpath = path.resolve(srcdirpath, file)
        const destpath = path.resolve(destdirpath, file.replace(/.html$/, '.txt'))
        await convertHtml(srcpath, destpath)
    }
    return 'done'
}

module.exports = {
    fakeHtml2Text
}