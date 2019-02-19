import * as multer from 'multer'
import * as path from 'path'
import * as crypto from 'crypto'
import * as multers3 from 'multer-s3'
import * as aws from 'aws-sdk'

aws.config.update({
    region: "eu-west-1",
});


const storegeTypes = {

    local: multer.diskStorage({
        destination: (req, file , callback) => {
            callback(null, path.resolve(__dirname, '..', 'tmp', 'uploads'))
        },
    
        filename: (req, file, callback) => {
            //add unique id for file name
            crypto.randomBytes(16, (err, hash) => {
                if(err) this.callback(err);
    
                const fileName = `${hash.toString('hex')}-${file.originalname}`
                console.log(fileName)
                callback(null, fileName)
            })
        }
    }),
    
    cloud: multers3({

        s3: new aws.S3({
            
            accessKeyId: "AKIAIDZP73SMQFOCRDPA",
            secretAccessKey: "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",
            sslEnabled: false,
            s3ForcePathStyle: true,
            
        }),

        bucket: 'jet-upload',
        contentType: multers3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        
        key: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) this.callback(err);
    
                const filename = `${hash.toString('hex')}-${file.originalname}`
                callback(null, filename)
            })
        }
    })
}

export const multerConfig = {
    dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
    storage: storegeTypes.local,
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