import OrganisateursService from "../services/organisateurs.service.js";
import dotenv from "dotenv"
dotenv.config()

export const getCancelSignup = async (req,res)=>{
    let service = new OrganisateursService()
    service.getCancelSignup().then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const getWaitAttribution = async (req,res)=>{
    let service = new OrganisateursService()
    service.getWaitAttribution().then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const cancelSignupManege = async (req,res)=>{
    let id_manege = req.params.id_manege
    let id_manifestation = req.params.id_manifestation
    let id_emplacement = req.params.id_emplacement
    let service = new OrganisateursService()
    service.cancelSignupManege(id_manege, id_manifestation,id_emplacement).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const registerManege = async (req,res)=>{
    let id_manege = req.params.id_manege
    let id_manifestation = req.params.id_manifestation
    let id_emplacement = req.params.id_emplacement
    let service = new OrganisateursService()
    service.registerManege(id_manege, id_manifestation,id_emplacement).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const cancelSignupStand = async (req,res)=>{
    let id_stand = req.params.id_stand
    let id_manifestation = req.params.id_manifestation
    let id_emplacement = req.params.id_emplacement
    let service = new OrganisateursService()
    service.cancelSignupStand(id_stand, id_manifestation,id_emplacement).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const registerStand = async (req,res)=>{
    let id_stand = req.params.id_stand
    let id_manifestation = req.params.id_manifestation
    let id_emplacement = req.params.id_emplacement
    let service = new OrganisateursService()
    service.registerStand(id_stand, id_manifestation,id_emplacement).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const cancelSignupArtiste = async (req,res)=>{
    let id_artiste = req.params.id_artiste
    let id_manifestation = req.params.id_manifestation
    let date = req.params.date
    let service = new OrganisateursService()
    service.cancelSignupArtiste(id_artiste, id_manifestation,date).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}
export const registerArtiste = async (req,res)=>{
    let id_artiste = req.params.id_artiste
    let id_manifestation = req.params.id_manifestation
    let date = req.params.date
    let service = new OrganisateursService()
    service.registerArtiste(id_artiste, id_manifestation,id_emplacement).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(400).send(error)
    });
}