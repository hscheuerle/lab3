const fs = require('fs')
const path = require('path')
const http = require('http')
const cheerio = require('cheerio')

const handleData = async (res) => {
    return new Promise((resolve, reject) => {
        res.setEncoding('binary')
        let chunks = ''
        res.on('data', chunk => {
            chunks += chunk
        })
        res.on('end', () => {
            resolve(chunks)
        })
    });
}

const handleText = async (res) => {
    const data = await handleData(res)
    return data.toString()
}

const getPdfLinks = async (html) => {
    const $ = cheerio.load(html)
    return $('a')
        .filter((_, a) => {
            return $(a).text().trim() === 'pdf'
        }).map((_, a) => {
            return $(a).attr('href')
        }).toArray()
}

const handleRequestQueue = async (uris, destdir) => {
    const responses = []
    for (let uri of uris) {
        try {
            const res = await handleRequest(uri, destdir)
            responses.push(res) // FIXME: determine what to respond with
        } catch (reason) {
            console.log(`bad uri? ${reason}`)
        }
    }
    return responses
}

const handleRequest = async (uri, destdir) => {
    return new Promise((resolve, reject) => {
        http.get(uri, async (res) => {
            const { statusCode } = res
            const { 'content-type': type } = res.headers
            console.log(`${statusCode} ${type}`)

            if (statusCode === 200 && type === 'text/html') { // has <a> tags
                const data = await handleData(res)
                const tags = await getPdfLinks(data)
                const uris = tags.map(tag => uri + tag)
                const datas = await handleRequestQueue(uris, destdir)
                resolve(datas)

            } else if (statusCode === 200 && type === 'application/pdf') {
                const data = await handleText(res)
                const name = res.req.path.replace('/~tway/publications/', '')
                const destpath = path.resolve(destdir, name)
                fs.writeFile(destpath, data, 'binary', err => {
                    console.log('done')
                    console.log(err)
                    // add progress with counter based on total pdf tags recovered
                    resolve('data')
                })

            } else {
                reject(`${statusCode} not handled`)

            }
        }).on('error', reason => {
            console.log(reason)
        })
    })
}

// TODO: needs dirpath fix
const getReals = async (destdir) => {
    const uri = 'http://www.csc.villanova.edu/~tway/publications/'
    const res = await handleRequest(uri, destdir)
    return res
}

module.exports = {
    getReals
}