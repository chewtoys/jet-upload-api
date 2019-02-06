import * as express from "express";
import * as bodyParser from "body-parser";
import * as  morgan from "morgan";

import { environment } from '../common/environment'
import { uploadsRauter } from '../router/uploads-router'

export class Server {
    
    public app: express.Application
    private port : any

    constructor() {
        this.app = express();
        this.port = environment.server.port
        uploadsRauter.applyRoutes(this.app)
        this.config();
    }

    public initServer(){
        return this.app.listen(this.port, () =>{
            console.log('Server is listening on PORT:', this.port)
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
    }
}