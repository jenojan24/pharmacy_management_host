import distributorModel from "../models/distributor.js";

class distributorController{

    static getAllDistributors=async(req,res)=>{
        try {
           const allDistributors=await distributorModel.find({});
           if(allDistributors){
            return res.status(200).json(allDistributors);
           }
        } catch (error) {
            return res.status(400).json(error);
        }

    };

    static createDistributor=async(req,res)=>{

const {dis_ID,name,email,contact_no,address,medicines,payments,ammount,remark}=req.body;


try {
    const newDistributor=distributorModel({
        dis_ID,
        name,
        email,
        contact_no,
        address,
        medicines,
        payments,
        ammount,
        remark
    });

    const saved_distributor=await newDistributor.save();
    if(saved_distributor){
        return res.status(201).json(saved_distributor);
    }else{
        return res.status(400).json({message:"something wrong"});
    }
} catch (error) {
    console.error(error);
    return res.status(500).json({message:error.message});
}

    };

    static getSingleDistributor=async(req,res)=>{
        const {id}=req.params;
        try {
            if(id){
                const getSingleDistributor=await distributorModel.findById(id);

            return res.status(200).json(getSingleDistributor);

            }else{
                return res.status(400).json({message:"id not found"});
            }
            
        } catch (error) {
            return res.status(400).json(error);
        }

    };

    static updateDistributor=async(req,res)=>{
        const {id}=req.params;
        try {
            if(id){
                const getUpdatedData=await distributorModel.findByIdAndUpdate(id,req.body);

            return res.status(200).json(getUpdatedData);

            }else{
                return res.status(400).json({message:"id not found"});
            }
            
        } catch (error) {
            return res.status(400).json(error);
        }

    };

    
    static deleteDistributor=async(req,res)=>{
        const {id}=req.params;
        try {
            if(id){
                const getdeletedData=await distributorModel.findByIdAndDelete(id);

            return res.status(200).json(getdeletedData);

            }else{
                return res.status(400).json({message:"id not found"});
            }
            
        } catch (error) {
            return res.status(400).json(error);
        }

    };

    static getsearchSDistributor=async(req,res)=>{
        const {name}=req.query;
        
            try{
                const searchResults=await distributorModel.find({
                    name: { $regex: new RegExp(name, 'i') } 
                });

            return res.status(200).json(searchResults);

            
        } catch (error) {
            return res.status(400).json(error);
        }
    };
    

   
}
export default distributorController;