// const fs = require('fs');
// const sharp = require('sharp');

// const resize = (path, format, width, height) => {
//     const readStream = fs.createReadStream(path);
//     let transform = sharp();

//     if(format) {
//         transform = transform.toFormat(format);
//     }

//     if(width || height) {
//         transform = transform.resize(width, height);
//     }

//     return readStream.pipe(transform);
// };

// module.exports = resize; 


const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class Resize {
    constructor(folder) {
        this.folder = folder;
    }

    async save(buffer) {
        const filename = Resize.filename();
        const filepath = this.filepath(filename);

        await sharp(buffer)
            .resize(300, 300, {
                fit: sharp.fit.fill,
                withoutEnlargement: true
            })
            .toFile(filepath);

        return filename;
    }

    static filename() {
        return `${uuidv4()}.png`;
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`);
    }
}

module.exports = Resize;