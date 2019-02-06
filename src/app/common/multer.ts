import * as multer from 'multer'
import * as path from 'path'
import * as crypto from 'crypto'


export const multerConfig = {
    dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file , callback) => {
            callback(null, path.resolve(__dirname, '..', 'tmp', 'uploads'))
        },

        filename: (req, file , callback) => {
            //add unique id for file name
            crypto.randomBytes(16, (err, hash) => {
                if(err) this.callback(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`
                callback(null, fileName)
            })
        }
    }),

    limits: {
        fileSize: 2 * 2024 * 1024 // 2MB
    },

    fileFilter: (req, file, callback) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/git'
        ]

        if(allowedMimes.indexOf(file.mimetype) !== -1){
            callback(null, true)
        }else{
            callback(new Error('Invalid Document'))
        }
    }
    
}