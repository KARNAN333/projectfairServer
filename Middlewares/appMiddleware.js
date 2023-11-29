const appMiddleware = (req,res,next)=>{
    console.log("inside application specific middleware");
    next()
}

module.exports = appMiddleware