import * as express from "express";
import * as bodyParser from "body-parser";
import * as  morgan from "morgan";
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import * as path from 'path'

import { environment } from '../common/environment'
import { uploadsRauter } from '../router/upload-router'

export class Server {
    
    public app: express.Application
    public port : any

    constructor() {
        this.app = express();
        this.port = environment.server.port
        this.config();

        uploadsRauter.applyRoutes(this.app)
    }

    public initServer(){
        return this.initDb().then(() => {
            this.app.listen(this.port, () => {
                console.log('Server is listening on PORT:', this.port)
            })
        })
        .then(() => this)
        .catch(() => new Error('Start server is failed'))
   
    }

    private initDb(){
        (<any>mongoose).Promisse = global.Promise
        return mongoose.connect(environment.db.url, {
            useNewUrlParser: true
        })
    }

    private config(): void {
        //support application/json
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: true }));

        //logging middleware for node.js http apps.
        //dev - Concise output colored by response status for development use.
        this.app.use(morgan('dev'))
        
        //access to static files
        this.app.use('/files', express.static(path.resolve(__dirname, '..', '..', '..', 'src', 'app', 'tmp', 'uploads')))

        //reading the file .env
        dotenv.config()
    }
}