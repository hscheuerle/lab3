const fs = require('fs')
const path = require('path')
const http = require('http')

const handleData = res => {
    return new Promise((resolve, reject) => {
        let chunks = ''
        res.on('data', chunk => {
            chunks += chunk
        })
        res.on('end', () => {
            resolve(chunks)
        })
    });
}

const handleRequest = async uri => {
    return new Promise((resolve, reject) => {
        http.get(uri, async res => {
            const { statusCode } = res

            if (statusCode === 302) { // redirect
                const { location } = res.headers
                const data = await handleRequest(location)
                resolve(data)

            } else if (statusCode === 200) { // success
                const data = await handleData(res)
                resolve(data)

            } else {
                reject(`${statusCode} not handled`)

            }
        })
    })
}

const getFake = async () => {
    const uri = 'http://scigen.csail.mit.edu/cgi-bin/scigen.cgi?.html'
    const res = await handleRequest(uri)
    return res
}

// FIXME: not proved whatsoever
const getProgress = (i, total, width) => {
    const progress = i / total * width
    const on = i + 1
    console.clear()
    console.log(`[${'|'.repeat(progress)}${' '.repeat(width - progress - (1 / total * width))}] (${on}/${total})`)
}

const getFakes = async (dirpath, count) => {
    for (let i = 0; i < count; i++) {
        const data = await getFake()
        fs.writeFileSync(path.resolve(dirpath, `fake-paper-${i}.html`), data)
        // update progress bar
        getProgress(i, count, 100)
    }
}

module.exports = {
    getFakes
}