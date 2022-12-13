import UsersService from "../services/users.service.js";
import dotenv from "dotenv"
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