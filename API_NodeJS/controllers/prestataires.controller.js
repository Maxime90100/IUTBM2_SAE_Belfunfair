import PrestatairesService from "../services/prestataires.service.js";
import dotenv from "dotenv"
import UsersService from "../services/users.service.js";
dotenv.config()

// MANEGES

export const showManeges = (req,res)=>{
    let id_user = req.params.id_user
    let manege_id = req.params.id

    let service = new PrestatairesService()
    service.showManeges(id_user,manege_id).then(result=>{
        res.status(200).send(result)
    }).catch(error=>{
        res.status(400).send(error)
    });
}
export const addManege = (req,res)=>{
    let id_user = req.params.id_user
    let name = req.body.name
    let description = req.body.description
    let type = req.body.type
    let taille_min = req.body.taille_min

    let service = new PrestatairesService()
    service.addManege(id_user,name,description,type,taille_min).then(result=>{
        res.status(200).send(result)
    }).catch(error=>{
        res.status(400).send(error)
    });
}
export const editManege = (req,res)=>{
    let id_manege = req.params.id
    let name = req.body.name
    let description = req.body.description
    let type = req.body.type
    let taille_min = req.body.taille_min

    let service = new PrestatairesService()
    service.editManege(id_manege,name,description,type,taille_min).then(result=>{
        res.status(200).send(result);
    }).catch(error=>{
        res.status(400).send(error);
    });
}
export const signupManege = async (req,res)=>{
    let id_manege = req.params.id
    let service = new UsersService()
    service.getManegeById(id_manege).then(manege=>{
        service.getEmplacements('maneges').then(result=>{
            let emplacements = result
            let alreadyRegistered = false
            result.forEach(e=>{
                if(e.id === parseInt(id_manege)){
                    emplacements = e
                    alreadyRegistered = true
                }
            });
            res.status(200).send({success:1,data:{manege:manege,emplacements:emplacements,alreadyRegistered:alreadyRegistered}})
        }).catch(error=>{
            res.status(200).send(error)
        })
    }).catch(error=>{
        res.status(200).send(error)
    });
}
export const signupManegePOST = async (req,res)=>{
    let id_manege = req.params.id
    let id_emplacement = req.body.id_emplacement
    let id_manifestation = req.body.id_manifestation
    let datedebut = req.body.datedebut
    let datefin = req.body.datefin
    let service = new PrestatairesService()
    service.signupManege(id_manege, id_emplacement, id_manifestation, datedebut, datefin).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const cancelSignupManege = async (req,res)=>{
    let id_manege = req.params.id
    let id_manifestation = req.body.id_manifestation
    let service = new PrestatairesService()
    service.cancelSignupManege(id_manege, id_manifestation).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const deleteManege = (req,res)=>{
    let id_manege = req.params.id
    let service = new PrestatairesService()
    service.deleteManege(id_manege).then(result=>{
        res.status(200).send(result);
    }).catch(error=>{
        res.status(400).send(error);
    });
}
/*
export const deleteImageManege = (req,res)=>{
    let id_user = req.params.id_user
    let id_manege = req.params.id
    if(req.body.path !== undefined)
        req.flash("success",`Les images ont été supprimées !`);
    res.redirect("/prestataires/"+id_user+"/manege/"+id_manege);
}
*/

// STANDS

export const showStand = (req,res)=>{
    let id_user = req.params.id_user
    let stand_id = req.params.id

    let service = new PrestatairesService()
    service.showStands(id_user,stand_id).then(result=>{
        res.status(200).send(result)
    }).catch(error=>{
        res.status(400).send(error)
    });
}
export const addStand = (req,res)=>{
    let id_user = req.params.id_user
    let name = req.body.name
    let description = req.body.description
    let type = req.body.type

    let service = new PrestatairesService()
    service.addStand(id_user,name,description,type).then(result=>{
        res.status(200).send(result)
    }).catch(error=>{
        res.status(400).send(error)
    });
}
export const editStand = (req,res)=>{
    let id_stand = req.params.id
    let name = req.body.name
    let description = req.body.description
    let type = req.body.type

    let service = new PrestatairesService()
    service.editStand(id_stand,name,description,type).then(result=>{
        res.status(200).send(result)
    }).catch(error=>{
        res.status(400).send(error)
    });
}
export const signupStand = async (req,res)=>{
    let id_user = req.params.id_user
    let id_stand = req.params.id
    let service = new UsersService()
    service.getStandById(id_stand).then(stand=>{
        service.getEmplacements('stands').then(result=>{
            let emplacements = result
            let alreadyRegistered = false
            result.forEach(e=>{
                if(e.id === parseInt(id_stand)){
                    emplacements = e
                    alreadyRegistered = true
                }
            });
            res.status(200).send({success:1,data:{stand:stand,emplacements:emplacements,alreadyRegistered:alreadyRegistered}})
        }).catch(error=>{
            res.status(400).send(error)
        })
    }).catch(error=>{
        req.flash("error",`${error}`);
        res.redirect("/prestataires/"+id_user+"/manege");
    });
}
export const signupStandPOST = async (req,res)=>{
    let id_stand = req.params.id
    let id_emplacement = req.body.id_emplacement
    let id_manifestation = req.body.id_manifestation
    let datedebut = req.body.datedebut
    let datefin = req.body.datefin

    let service = new PrestatairesService()
    service.signupStand(id_stand, id_emplacement, id_manifestation, datedebut, datefin).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const cancelSignupStand = async (req,res)=>{
    let id_stand = req.params.id
    let id_manifestation = req.body.id_manifestation
    let service = new PrestatairesService()
    service.cancelSignupStand(id_stand, id_manifestation).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const deleteStand = (req,res)=>{
    let id_stand = req.params.id

    let service = new PrestatairesService()
    service.deleteStand(id_stand).then(result=>{
        res.status(200).send(result)
    }).catch(error=>{
        res.status(200).send(error)
    });
}
/*
export const deleteImageStand = (req,res)=>{
    let id_user = req.params.id_user
    let id_stand = req.params.id
    if(req.body.path !== undefined)
        req.flash("success",`Les images ont été supprimées !`);
    res.redirect("/prestataires/"+id_user+"/stand/"+id_stand);
}
*/

// SCENE

export const showArtists = (req,res)=>{
    let id_user = req.params.id_user
    let artiste_id = req.params.id

    let service = new PrestatairesService()
    service.showArtists(id_user,artiste_id).then(result=>{
        res.status(200).send(result)
    }).catch(error=>{
        res.status(400).send(error)
    });
}
export const addArtist = (req,res)=>{
    let id_user = req.params.id_user
    let name = req.body.name
    let description = req.body.description
    let type = req.body.type
    let groupe = req.body.groupe

    let service = new PrestatairesService()
    service.addArtist(id_user,name,description,type,groupe).then(result=>{
        res.status(200).send(result)
    }).catch(error=>{
        res.status(400).send(error)
    });
}
export const editArtist = (req,res)=>{
    let id_artiste = req.params.id
    let name = req.body.name
    let description = req.body.description
    let type = req.body.type
    let groupe = req.body.groupe

    let service = new PrestatairesService()
    service.editArtist(id_artiste,name,description,type,groupe).then(result=>{
        res.status(200).send(result)
    }).catch(error=>{
        res.status(400).send(error)
    });
}
export const signupArtist = async (req,res)=>{
    let id_user = req.params.id_user
    let service = new UsersService()
    service.getArtistsInscrits().then(artists=>{
        res.status(200).send({success:1,data: {artists:artists}})
    }).catch(error=>{
        req.flash("error",`${error}`);
        res.redirect("/prestataires/"+id_user+"/manege");
    });
}
export const signupArtistPOST = async (req,res)=>{
    let id_artist = req.params.id
    let id_manifestation = req.body.id_manifestation
    let date = req.body.date
    let startHour = req.body.startHour
    let endHour = req.body.endHour

    let service = new PrestatairesService()
    service.signupArtist(id_artist, id_manifestation, date, startHour, endHour).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const cancelSignupArtist = async (req,res)=>{
    let id_artist = req.params.id
    let id_manifestation = req.body.id_manifestation
    let service = new PrestatairesService()
    service.cancelSignupArtist(id_artist, id_manifestation).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const deleteArtist = (req,res)=>{
    let id_artist = req.params.id

    let service = new PrestatairesService()
    service.deleteArtist(id_artist).then(result=>{
        res.status(200).send(result)
    }).catch(error=>{
        res.status(400).send(error)
    });
}