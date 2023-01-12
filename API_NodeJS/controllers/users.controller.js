import UsersService from "../services/users.service.js";
import dotenv from "dotenv"
import PublicService from "../services/public.service.js";
dotenv.config()
export const authenticateUser = (req,res)=>{
    let data = {
        firstname: req.body.firstname,
        surname: req.body.surname,
        password: req.body.password
    }
    let service = new UsersService();
    service.authenticate(data).then(result=>{
        res.status(200).send({data:result})
    }).catch(error=>{
        res.status(200).send({data:error})
    });
}
export const signup = (req,res)=>{
    let firstname = req.body.firstname
    let surname = req.body.surname
    let password = req.body.password
    let email = req.body.email
    let service = new UsersService()
    service.signup(firstname,surname,password,email).then(result=>{
        res.status(200).send({success:1,data:result})
    }).catch(error=>{
        res.status(400).send({success:0,data:error})
    })
}
export const logout = (req,res)=>{
    req.session.destroy();
    res.redirect("/")
}

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
    let service = new UsersService()
    let maneges = await service.getManeges()
    let stands = await service.getStands()
    let artistes = await service.getArtists()
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