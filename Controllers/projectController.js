const projects = require('../Model/projectSchema')

// addproject
exports.addProjects = async (req,res)=>{
    console.log("Inside add project function");
    const userId = req.payload
    // const projectImage = req.file.filename
    const projectImage = req.file ? req.file.filename : null;
    
    const {title,languages,overview,github,website} = req.body
    // console.log(`${title},${languages},${overview},${github},${website},${projectImage} ${userId}`);
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("project already exist... upload another")
        }
        else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(401).json(`request failed, error: ${err}...`)
    }
    // res.status(200).json("addProjects request recived...")
}

// get userproject
exports.allUserProjects = async (req,res)=>{
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// get allprojects
exports.getallProjects = async (req,res)=>{
    const searchKey = req.query.search
    const query = {
        languages:{$regex:searchKey , $options:"i"}
    }
    try{
        const allprojects = await projects.find(query)
        res.status(200).json(allprojects)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// get homeprojects
exports.gethomeProjects = async (req,res)=>{
    try{
        const homeprojects = await projects.find().limit(3)
        res.status(200).json(homeprojects)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// edit project
exports.editProjectController = async (req,res)=>{
    // get project id
    const {id} = req.params
    const userId = req.payload
    const {title,languages,overview,github,website,projectImage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage

    try{
        const updateProject = await projects.findByIdAndUpdate({_id:id},{
            title,languages,overview,github,website,projectImage:uploadProjectImage,userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// delete project
exports.deleteProjectController = async (req,res)=>{
    // get project details
    const {id} = req.params
    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    }
    catch(err){
        res.status(401).json(err)
    }
}