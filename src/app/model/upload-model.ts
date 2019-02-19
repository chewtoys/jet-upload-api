import * as mongoose from 'mongoose'

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
    const upload: Upload = this

    if(!upload.location){
        upload.location = `${process.env.APP_URL}/files/${upload.filename}`
        next()
    }
    next()
    
})

export const Upload = mongoose.model<Upload>('Upload', uploadSchema)