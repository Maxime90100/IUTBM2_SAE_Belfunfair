import bcrypt from "bcrypt";
import {pool} from "../db.js";
import UsersService from "../services/users.service.js";
import jwt from "jsonwebtoken";

export const authenticateUser = (req,res)=>{
    let data = {
        firstname: req.body.firstname,
        surname: req.body.surname,
        password: req.body.password
    }
    authenticate(data).then(result=>{
        res.status(200).send({data:result})
    }).catch(error=>{
        res.status(200).send({data:error})
    });
}

export async function authenticate(data){
    const user = await findUser(data.firstname,data.surname)
    return new Promise((resolve, reject)=>{
        if (user) {
            bcrypt.compare(data.password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign(user,process.env.JWT_SECRET_KEY,{
                        algorithm:'HS256',
                        expiresIn:'30m'
                    });
                    resolve({success:1,token:token,message:`Bienvenue ${user.firstname} ${user.surname}`,data:user});
                }
                reject({success:0,message:"Mot de passe incorrect !",data:[]});
            });
        } else {
            reject({success:0,message:'Prénom ou Nom incorrect !',data:[]});
        }
    })
}

export async function findUser(firstname,surname){
    let service = new UsersService()
    let users = await service.getUsers()
    return users.find((u) =>
        u.firstname.toLowerCase() === firstname.toLowerCase() &&
        u.surname.toLowerCase() === surname.toLowerCase())
}

export const validateToken = (req,res,next) =>{
    const token = req.headers.authorization
    if(jwt.verify(token,process.env.JWT_SECRET_KEY)) next();
    else return new Error('No Authorisation Header')
}
export const signupUser = (req,res)=>{
    let firstname = req.body.firstname
    let surname = req.body.surname
    let password = req.body.password
    let email = req.body.email
    signup(firstname,surname,password,email).then(result=>{
        res.status(200).send({success:1,data:result})
    }).catch(error=>{
        res.status(400).send({success:0,data:error})
    })
}
export async function signup(firstname,surname,password,email){
    return new Promise((resolve,reject)=>{
        bcrypt.hash(password,10).then(pwdHash=>{
            pool.query('insert into users(firstname,surname,password,email,role) values ($1,$2,$3,$4,$5);', [firstname,surname,pwdHash,email,'user'], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve({success:1,data:"Votre compte à bien été enregistrer !"})
            });
        }).catch(err=>{reject(err)})
    });
}

export const logoutUser = (req,res)=>{
    if(req.session) req.session.destroy();
    res.redirect("/")
}