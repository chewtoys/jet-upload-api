import {Request, Response, NextFunction} from 'express'
import * as mongoose from 'mongoose'

export abstract class Controller<E extends mongoose.Document> {

    public basePath: string

    constructor(protected model: mongoose.Model<E>){
        this.basePath = `/${model.collection.name}`
    }

    findAll = (req: Request, res: Response, next: NextFunction) => {
       this.model.find()
           .then( result => res.send(result))
           .catch(next)
      }

    findById = (req: Request, res: Response, next: NextFunction) => {
        this.model.findById(req.params.id)
            .then(result => res.send(result))
            .catch(next)
    }

    save = (req: Request, res: Response, next: NextFunction) => {
        let document = new this.model(req.body)
        document.save()
            .then(result => res.send(result))
            .catch(next)
    }

    update = (req: Request, res: Response, next: NextFunction) => {
        const options = { runValidators: true, new : true }
        this.model.findByIdAndUpdate(req.params.id, req.body, options)
            .then(result => res.send(result))
            .catch(next)
      }


     delete =  (req: Request, res: Response, next: NextFunction) => {
        this.model.deleteOne({_id:req.params.id}).exec().then((cmdResult: any)=>{
          if(cmdResult){
            res.sendStatus(204)
          }else{
            throw new Error('Document Not Found')
          }
          return next()
        }).catch(next)
      }
}
