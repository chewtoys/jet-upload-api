import * as mongoose from 'mongoose'
import * as aws from 'aws-sdk'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

const s3 = new aws.S3({
    accessKeyId: "",
    secretAccessKey: "",
    sslEnabled: false,
    s3ForcePathStyle: true,
})

const upload : Upload = this

export interface Upload extends mongoose.Document {
    filename: string,
    originalname: string,
    size: number,
    key: string,
    location: string,
    createdAt: Date
}

const uploadSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    size: Number,
    key: String,
    location: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

uploadSchema.pre('save', function(next){

    if(!upload.location){
        upload.location = `${process.env.APP_URL}/files/${upload.filename}`
        next()
    }
    next()
    
})

uploadSchema.pre('remove', function(next){

    if(upload.location){
        return s3.deleteObject({
            Bucket: 'jet-upload',
            Key: upload.key,
        }).promise()
    }else{
        return promisify(fs.unlink)(path.resolve(__dirname, '..', 'tmp', 'uploads', upload.filename))
    }
})

export const Upload = mongoose.model<Upload>('Upload', uploadSchema)

