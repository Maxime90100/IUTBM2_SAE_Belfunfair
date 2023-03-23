import UsersService from "../services/users.service.js";
import dotenv from "dotenv"
dotenv.config()

export const getTypesManege = (req,res)=>{
    let service = new UsersService()
    service.getTypesManege().then(result=>{
        res.status(200).send({success:1,data:result})
    }).catch(error=>{
        res.status(400).send({success:0,data:error})
    })
}
export const getTypesStand = (req,res)=>{
    let service = new UsersService()
    service.getTypesStand().then(result=>{
        res.status(200).send({success:1,data:result})
    }).catch(error=>{
        res.status(400).send({success:0,data:error})
    })
}
export const getTypesArtist = (req,res)=>{
    let service = new UsersService()
    service.getTypesArtist().then(result=>{
        res.status(200).send({success:1,data:result})
    }).catch(error=>{
        res.status(400).send({success:0,data:error})
    })
}

export const getManifestation = async (req,res)=>{
    let service = new UsersService()
    let manifestation = await service.getInProgressManifestation()
    res.status(200).send({success:1,data:manifestation});
}

export const getAttractions = async (req,res)=>{
    let idUser = req.params.idUser
    let service = new UsersService()
    let maneges, stands, artistes
    if(idUser){
        maneges = await service.getManegesByIdUser(idUser)
        stands = await service.getStandsByIdUser(idUser)
        artistes = await service.getArtistsByIdUser(idUser)
    }else{
        maneges = await service.getManeges()
        stands = await service.getStands()
        artistes = await service.getArtists()
    }
    res.status(200).send({success:1,data:{maneges:maneges,stands:stands,artistes:artistes}})
}

export const getNotes = async (req,res)=>{
    let service = new UsersService()
    let id_user = req.params.id_user
    if(id_user === undefined) id_user = null
    let notes = await service.getNotes(id_user)
    res.status(200).send({success:1,data:notes})
}
export const setNote = async (req,res)=>{
    let id_user = req.params.id_user
    let type = req.params.type
    let id = req.params.id
    let note = req.params.note
    let service = new UsersService()
    service.setNote(id_user,type,id,note).then(result=>{
        res.status(200).send({data:result})
    }).catch(error=>{
        res.status(200).send({data:error})
    });
}