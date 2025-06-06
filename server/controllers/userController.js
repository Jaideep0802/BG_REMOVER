import { messageInRaw, Webhook } from "svix"
import userModel from "../models/userModel.js"
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js"

//API controller function to manage Clerk User with databse

//http://localhost:4000/api/user/webhooks

const clerkWebHooks = async(req,res) => {
    try {
        // Create a Svix instance with clerk webhook secret

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const {data, type} = req.body
        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    photo: data.image_url,
                    firstName: data.first_name,
                    lastName: data.last_name,
                }

                await userModel.create(userData);
                res.json({})
                break;
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    photo: data.image_url,
                    firstName: data.first_name,
                    lastName: data.last_name,
                }

                await userModel.findOneAndUpdate({clerkId: data.id}, userData)
                res.json({})
                break;
            }
            case "user.deleted": {
                await userModel.findOneAndDelete({clerkId: data.id})
                res.json({})
                break;
            }
        
            default:
                break;
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
} 

// API controller function to get user available credits data

const userCredits = async(req,res) => {
    try {
        const clerkId  = req.clerkId;
        const userData = await userModel.findOne({ clerkId })        
        res.json({success: true, credits: userData.creditBalance })
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// gateway intialize

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

//API to make payment for credits
const paymentRazorpay = async (req,res) => {
    try {
        const { planId } = req.body
        const clerkId = req.clerkId
        const userData = await userModel.findOne({ clerkId })

        if(!userData || !planId ){
            return res.json({success: false, message: 'Invalid Credentials'})
        }

        let credits, plan, amount, date

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 50
                break;
            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 100
                break;
            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;
            default:
                break;
        }

        date= Date.now()

        //Creating Transaction 
        const transactionData = {
            clerkId,
            plan,
            amount,
            credits,
            date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount : amount*100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        }

        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                return res.json({success:false, message:error})
            }
            res.json({success: true, order})
        })
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

//API controller function to verify razorpay paayment
const verifyRazorPay = async ( req,res ) => {
    try {
        const { razorpay_order_id } = req.body
        const orderinfo = await (razorpayInstance.orders.fetch(razorpay_order_id))

        if(orderinfo.status === 'paid') {
            const transactionData =  await transactionModel.findById(orderinfo.receipt)
            if(transactionData.payment){
                return res.json({ success: false, message: 'Payment Failed'})
            }

            //adding credits in user data
            const userData = await userModel.findOne({clerkId: transactionData.clerkId})
            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id,{creditBalance})
            
            //making the payment true
            await transactionModel.findByIdAndUpdate(transactionData._id,{payment: true})

            res.json({ success: true, message:'Credits Added'})
        }
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}


export { clerkWebHooks, userCredits, paymentRazorpay, verifyRazorPay }
