const readline = require('readline')

const createShell = options => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'user-shell> '
    })

    rl.on('line', line => {
        const target = line.trim()
        if (target === 'exit') {
            console.log('exiting');
            rl.close()
        } else if (target === 'help') {
            const keys = Object.keys(options)
            console.log(['help', 'exit', ...keys]);
            rl.prompt()
        } else if (Object.keys(options).includes(target)) {
            console.log(`calling (${target})`);
            options[target].call().then((result) => {
                console.log(`returns (${result})`);
                rl.prompt()
            }).catch((err) => {
                console.log(`error (${err})`);
                rl.close()
            });
        } else {
            console.log(`(${target}) not found`);
            rl.prompt()
        }
    }).on('close', () => {
        process.exit(0)
    })

    const close = () => {
        rl.close()
    }

    const start = () => {
        rl.prompt()
    }

    return { start, close }
}

module.exports = {
    prompt: {
        createShell
    }
}