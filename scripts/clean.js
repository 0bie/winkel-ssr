const fs = require('fs')
const Path = require('path')

const CWD = process.cwd()

const filePaths = [
    Path.resolve(CWD, './server.js'),
    Path.resolve(CWD, './chunked.css'),
    Path.resolve(CWD, './public/scripts/'),
    Path.resolve(CWD, './public/styles/'),
    Path.resolve(CWD, './public/loadable-stats.json'),
    Path.resolve(CWD, './public/sw.js')
]

const cleanFiles = (files) => {
    return new Promise((resolve) => {
        files.forEach((path) => {
            if (fs.existsSync(path)) {
                if (!fs.statSync(path).isDirectory()) {
                    fs.unlinkSync(path)
                    console.log(`🚮: ${path}`)
                } else {
                    fs.readdirSync(path).forEach((file) => {
                        const curPath = Path.join(path, file)
                        if (fs.statSync(curPath).isDirectory()) {
                            const files = fs.readdirSync(curPath)
                            console.log('FILES: ', files.map((file => Path.join(curPath, file))))
                            cleanFiles(files.map((file => Path.join(curPath, file))))
                                .catch((error) => console.error(error))
                        } else {
                            fs.unlinkSync(curPath)
                            console.log(`🚮: ${curPath}`)
                        }
                    })
                    fs.rmdirSync(path)
                }
            }
        })
        resolve()
    })
}

cleanFiles(filePaths)
    .then(() => console.log('🚮 Previous build files were deleted'))
    .catch((error) => console.error(error))
