import OrganisateursService from "../services/organisateurs.service.js";
import dotenv from "dotenv"
import UsersService from "../services/users.service.js";
dotenv.config()


// STAFF
export const showStaff = (req,res)=>{
    let user_id = req.params.id_user
    let staff_id = req.params.id
    let service = new OrganisateursService()

    service.showStaff(user_id,staff_id).then(result=>{
        if(staff_id !== undefined) res.status(200).render("organisateurs/showStaffById.handlebars",result)
        else res.status(200).render("organisateurs/staff.handlebars", {staff:result,id_user:user_id})
    }).catch(error=>{res.status(400).send({success:0,error:error})});
}

export const showManegeStand = (req,res)=>{
    let id_user = req.params.id_user
    let query = req.query.query
    let status = req.query.status
    let service = new OrganisateursService()
    if(status && status !== ''){
        service.getManegeStandByStatus(status)
            .then(result=>{res.status(200).render('organisateurs/manegeStand.handlebars', {result:result,id_user:id_user})})
            .catch(error=>{res.status(400).redirect('organisateurs/'+id_user)})
    }
    else{
        if(query && query !== ''){
            if(isNaN(query)){ //text
                service.getManegeStandStartWith(query)
                    .then(result=>{res.status(200).render('organisateurs/manegeStand.handlebars', {result:result,id_user:id_user})})
                    .catch(error=>{res.status(400).redirect('organisateurs/'+id_user)})
            }
            else{ //number
                service.getManegeStandByIdUser(query)
                    .then(result=>{res.status(200).render('organisateurs/manegeStand.handlebars',{result:result,id_user:id_user})})
                    .catch(error=>{res.status(400).redirect('organisateurs/'+id_user)})
            }
        }else{
            service.getManegeStand()
                .then(result=>{res.status(200).render('organisateurs/manegeStand.handlebars',{result:result,id_user:id_user})})
                .catch(error=>{res.status(400).redirect('organisateurs/'+id_user)})
        }
    }
}
export const showManege = (req,res)=>{
    let id_user = req.params.id_user
    let id_manege = req.params.id
    let service = new OrganisateursService()
    service.getManegeById(id_manege)
        .then(result=>{res.status(200).render('organisateurs/showManege.handlebars',{result:result,id_user:id_user})})
        .catch(error=>{res.status(400).redirect('organisateurs/'+id_user+'/manegeStand')})
}
export const showStand = (req,res)=>{
    let id_user = req.params.id_user
    let id_stand = req.params.id
    let service = new OrganisateursService()
    service.getStandById(id_stand)
        .then(result=>{res.status(200).render('organisateurs/showStand.handlebars',{result:result,id_user:id_user})})
        .catch(error=>{res.status(400).redirect('organisateurs/'+id_user+'/manegeStand')})
}

export const showSecurity = (req,res)=>{}

export const showArtist = (req,res)=>{}
