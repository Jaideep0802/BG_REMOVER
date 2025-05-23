import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("Databa se Connected");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/bg-remover`)
}

export default connectDB