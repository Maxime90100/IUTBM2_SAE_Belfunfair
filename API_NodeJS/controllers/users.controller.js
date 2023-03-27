import UsersService from "../services/users.service.js";
import OrganisateursService from "../services/organisateurs.service.js"
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
    let serviceOrga = new OrganisateursService()
    let maneges, stands, artistes, cancelSignup
    if(idUser){
        maneges = await service.getManegesByIdUser(idUser)
        stands = await service.getStandsByIdUser(idUser)
        artistes = await service.getArtistsByIdUser(idUser)
        cancelSignup = await serviceOrga.getCancelSignup()
    }else{
        maneges = await service.getManeges()
        stands = await service.getStands()
        artistes = await service.getArtists()
    }
    res.status(200).send({success:1,data:{maneges:maneges,stands:stands,artistes:artistes,cancelSignup:cancelSignup.data}})
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

export const getLike = async (req,res)=>{
    let service = new UsersService()
    let id_user = req.params.id_user
    if(id_user === undefined) id_user = null
    let likes = await service.getLike(id_user)
    res.status(200).send({success:1,data:likes})
}

export const setLike = async (req,res)=>{
    let id_user = req.params.id_user
    let type = req.params.type
    let id = req.params.id
    let bool = req.params.bool
    let service = new UsersService()
    service.setLike(id_user,type,id,bool).then(result=>{
        res.status(200).send({data:result})
    }).catch(error=>{
        res.status(200).send({data:error})
    });
}

export const getGoldenBook = async (req,res)=>{
    let service = new UsersService()
    service.getGoldenBook().then(result=>{
        res.status(200).send({data:result})
    }).catch(error=>{
        res.status(200).send({data:error})
    });
}

export const addToGoldenBook = async (req,res)=>{
    let id_user = req.params.id_user
    let comment = req.body.comment
    let header = req.body.header
    let service = new UsersService()
    service.addToGoldenBook(id_user,comment,header).then(result=>{
        res.status(200).send({data:result})
    }).catch(error=>{
        res.status(200).send({data:error})
    });
}

export const deleteFromGoldenBook = async (req,res)=>{
    let id = req.params.id
    let service = new UsersService()
    service.deleteFromGoldenBook(id).then(result=>{
        res.status(200).send({data:result})
    }).catch(error=>{
        res.status(200).send({data:error})
    });
}