const fs = require('fs')

const tryMake = (dirpath) => {
    try {
        fs.mkdirSync(dirpath)
    } catch (reason) {
        console.log(`${reason.code} on ${dirpath}`)
    }
}

const tryMakeDirs = (...dirpaths) => {
    for (const dirpath of dirpaths) {
        tryMake(dirpath)
    }
}

module.exports = {
    tryMakeDirs
}