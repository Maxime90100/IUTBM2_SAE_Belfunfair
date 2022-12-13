import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {pool} from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const source = __dirname+"/../public/img/upload"

export default class ImagesService{

    async addImage(type,id){
        let paths = await this.getPaths(type,id)
        this.updateImages(paths,id,type).catch(error=>{console.log(error)});
    }
    async deleteImage(type,id,path){
        let paths = await this.getPaths(type,id)
        paths.forEach((Path,index)=>{
           if(Path === path) paths.splice(index,1)
        });

        this.updateImages(paths,id,type).then(()=>{
            try{fs.unlinkSync(__dirname+'/../public'+path)}catch(e){console.error(e)}
        }).catch(error=>{console.log(error)});
    }
    async getPaths(type,id){
        let paths = []
        try{
            const files = await fs.promises.readdir( source );
            files.forEach((file)=>{
                if(file.split('-')[1] === type && file.split('-')[2] === id.toString())
                    paths.push("/img/upload/"+file)
            });
            return paths
        }catch(e){console.error(e)}
    }
    async updateImages(paths,id,type){
        return new Promise((resolve,reject)=>{
            pool.query('update '+type+' set images=$1 where id=$2;', [paths,id], (error,result)=>{
                if(error){
                    console.error(error)
                    reject('L\'image n\'a pas pu être supprimée !')
                }
                resolve('L\'image à bien été supprimée !')
            });
        });
    }
}