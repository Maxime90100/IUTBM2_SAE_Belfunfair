import PublicService from "../services/public.service.js";
export const Home = async(req,res)=>{
    let service = new PublicService();
    let maneges = await service.getManegesMap()
    let stands = await service.getStandsMap()
    res.status(200).send({success:1,data:{maneges:maneges,stands:stands}});
}