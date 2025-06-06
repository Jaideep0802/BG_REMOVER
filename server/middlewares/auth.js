import jwt from 'jsonwebtoken'

// middlewae function to decode jwt token to get clerkId

const authUser = async (req,res,next) => {

    try {
        const {token} = req.headers
        if(!token){
            return res.json({success: false, message: "Not Authorized Login Try Again"})
        }
        const token_decode = jwt.decode(token);
        req.clerkId = token_decode.sub;
        next()

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}


export default authUser

