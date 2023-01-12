import UsersService from "../services/users.service.js";
import {pool} from "../db.js";
import {getWaitAttribution} from "../controllers/organisateurs.controller.js";

export default class Organisateurs {

    async getCancelSignup(){
        return new Promise(async (resolve,reject)=>{
            pool.query('select * from manegesinscrit where cancel=$1;',[true],(error,result)=> {
                if (error) reject(error)
                let maneges = result.rows
                pool.query('select * from standsinscrit where cancel=$1;',[true],(error,result)=> {
                    if (error) reject(error)
                    let stands = result.rows
                    pool.query('select id, id_manifestation, id_artiste, cast(date as text), starthour, endhour, cancel from artistesinscrit where cancel=$1;',[true],(error,result)=> {
                        if (error) reject(error)
                        let artistes = result.rows
                        resolve({success: 0, date: {maneges:maneges,stands:stands,artistes:artistes}})
                    });
                });
            });
        });
    }

    async getWaitAttribution(){
        return new Promise(async (resolve,reject)=>{
            pool.query('select * from manegesinscrit mi join maneges m on mi.id_manege=m.id where m.status=$1;',['wait_attribution'],(error,result)=> {
                if (error) reject(error)
                let maneges = result.rows
                pool.query('select * from standsinscrit si join stands s on si.id_stand=s.id where s.status=$1;',['wait_attribution'],(error,result)=> {
                    if (error) reject(error)
                    let stands = result.rows
                    pool.query('select * from artistesinscrit ai join artistes a on ai.id_artiste=a.id where a.status=$1;',['wait_attribution'],(error,result)=> {
                        if (error) reject(error)
                        let artistes = result.rows
                        resolve({success: 0, date: {maneges:maneges,stands:stands,artistes:artistes}})
                    });
                });
            });
        });
    }
    async cancelSignupManege(id_manege,id_manifestation,id_emplacement){
        return new Promise(async (resolve,reject)=>{
            pool.query('delete from manegesinscrit where id_manege=$1 and id_manifestation=$2 and id_emplacement=$3;',[id_manege,id_manifestation,id_emplacement],(error,result)=> {
                if (error) reject(error)
                pool.query('update maneges set status=$1 where id=$2;',['not_attributed',id_manege],(error,result)=> {
                    if (error) reject(error)
                    resolve({success: 0, date: "Inscription correctement annulée !"})
                });
            });
        });
    }
    async registerManege(id_manege,id_manifestation,id_emplacement){
        return new Promise(async (resolve,reject)=>{
            pool.query('update maneges m set status=$1 from manegesinscrit mi where m.id=$2 and mi.id_manifestation=$3 and mi.id_emplacement=$4;',['attributed',id_manege,id_manifestation,id_emplacement],(error,result)=> {
                if (error) reject(error)
                resolve({success: 0, date: "Inscription validée !"})
            });
        });
    }
    async cancelSignupStand(id_stand,id_manifestation,id_emplacement){
        return new Promise(async (resolve,reject)=>{
            pool.query('delete from standsinscrit where id_stand=$1 and id_manifestation=$2 and id_emplacement=$3;',[id_stand,id_manifestation,id_emplacement],(error,result)=> {
                if (error) reject(error)
                pool.query('update stands set status=$1 where id=$2;',['not_attributed',id_stand],(error,result)=> {
                    if (error) reject(error)
                    resolve({success: 0, date: "Inscription correctement annulée !"})
                });
            });
        });
    }
    async registerStand(id_stand,id_manifestation,id_emplacement){
        return new Promise(async (resolve,reject)=>{
            pool.query('update stands s set status=$1 from standsinscrit si where s.id=$2 and si.id_manifestation=$3 and si.id_emplacement=$4;',['attributed',id_stand,id_manifestation,id_emplacement],(error,result)=> {
                if (error) reject(error)
                resolve({success: 0, date: "Inscription validée !"})
            });
        });
    }

    async cancelSignupArtiste(id_artiste,id_manifestation,date){
        return new Promise(async (resolve,reject)=>{
            pool.query('delete from artistesinscrit where id_artiste=$1 and id_manifestation=$2 and date=$3;',[id_artiste,id_manifestation,date],(error,result)=> {
                if (error) reject(error)
                pool.query('update artistes set status=$1 where id=$2;',['not_attributed',id_artiste],(error,result)=> {
                    if (error) reject(error)
                    resolve({success: 0, date: "Inscription correctement annulée !"})
                });
            });
        });
    }
    async registerArtiste(id_artiste,id_manifestation,id_emplacement){
        return new Promise(async (resolve,reject)=>{
            pool.query('update artistes a set status=$1 from artistesinscrit ai where a.id=$2 and ai.id_manifestation=$3 and ai.id_emplacement=$4;',['attributed',id_artiste,id_manifestation,id_emplacement],(error,result)=> {
                if (error) reject(error)
                resolve({success: 0, date: "Inscription validée !"})
            });
        });
    }



}
