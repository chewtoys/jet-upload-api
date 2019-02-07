import * as express from 'express';
import * as multer from 'multer';

import { multerConfig } from '../common/multer'
import { uploadController } from '../controller/upload-controller'

class UploadsRouter {

    private basePath = uploadController.basePath

    public applyRoutes(app: express.Application) : void {
    
        app.get(this.basePath, uploadController.findAll)
        app.post(this.basePath, [multer(multerConfig).single('file'), uploadController.save])
        app.get(`${this.basePath}/:id`, uploadController.findById)
        app.put(`${this.basePath}/:id`, uploadController.update)  
        app.delete(`${this.basePath}/:id`, uploadController.delete) 
     }
}

export const uploadsRauter = new UploadsRouter()