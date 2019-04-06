import { Request, Response, NextFunction } from 'express'
import { Controller } from '../controller/generic-controller'
import { Upload } from '../model/upload-model'

class UploadController extends Controller<Upload> {

    constructor(){
      super(Upload)
    }

    save = (req: Request, res: Response, next: NextFunction) => {
      let document = new this.model(req.file)
      document.save()
          .then(result => res.send(result))
          .catch(next)
  }
  
}
  
export const uploadController = new UploadController()