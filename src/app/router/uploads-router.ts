import * as express from 'express';
import * as multer from 'multer';

import { multerConfig } from '../common/multer'

class UploadsRouter {

    public applyRoutes(app: express.Application) : void {
    
        app.get('/uploads')
        app.post('/uploads', multer(multerConfig).single('file'), (req, res) => {
            console.log(req.file)
            res.send([])
        }) 
        app.get('/uploads/:id')
        app.put('/uploads/:id')  
        app.delete('/uploads/:id') 
     }
}

export const uploadsRauter = new UploadsRouter()