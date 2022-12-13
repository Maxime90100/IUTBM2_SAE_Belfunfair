import UsersService from "../services/users.service.js";
import {pool} from "../db.js";

export default class Organisateurs {

    // MANEGES ET STANDS

    async getManegeStand(){
        let service = new UsersService()
        let maneges = await service.getManeges()
        let stands = await service.getStands()
        return {maneges:maneges,stands:stands}
    }
    async getManegeStandByIdUser(id_user){
        let service = new UsersService()
        let maneges = await service.getManegesByIdUser(id_user)
        let stands = await service.getStandsByIdUser(id_user)
        return {maneges:maneges,stands:stands}
    }
    async getManegeStandStartWith(start){
        let service = new UsersService()
        let maneges = await service.getManegesStartWith(start)
        let stands = await service.getStandsStartWith(start)
        return {maneges:maneges,stands:stands}
    }
    async getManegeStandByStatus(status){
        return new Promise((resolve,reject)=>{
            pool.query('select * from maneges where maneges.status=$1;', [status], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve({maneges:result.rows})
            });
        });
    }

    async getManegeById(id){
        return new Promise((resolve,reject)=>{
            pool.query('select * from maneges m join users u on m.id_user = u.id where m.id=$1;', [id], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows[0])
            });
        });
    }
    async getStandById(id){
        return new Promise((resolve,reject)=>{
            pool.query('select * from stands s join users u on s.id_user = u.id where s.id=$1;', [id], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows[0])
            });
        });
    }

    // STAFF

    async showStaff(id_user,id_staff) {
        let service = new UsersService()
        if(id_staff !== undefined)
            return service.getStaffById(id_staff)
        return service.getStaffByIdUser(id_user)
    }
}
