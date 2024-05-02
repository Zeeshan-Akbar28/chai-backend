import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionIstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // console.log(connectionIstance, 'connectionIstance')
        console.log(`\n MongoDB connected !! DB Host: ${connectionIstance.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection failed: ", error)
        process.exit(1)
    }
}

export default connectDB