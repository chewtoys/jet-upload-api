import * as mongoose from 'mongoose'

export interface Upload extends mongoose.Document {
    name: string,
    size: number,
    key: string,
    url: string,
    createdAt: Date
}

const uploadSchema = new mongoose.Schema({
    originalname: String,
    size: Number,
    filename: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Upload = mongoose.model<Upload>('Upload', uploadSchema)