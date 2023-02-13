import mongoose from "mongoose";

const connectionDB = async (uri) => {
    try {
        mongoose.set('strictQuery', false)
        const connect= await mongoose.connect(uri,
        //      {
        //     useUnifiedTopology: true,
        //     useNewUrlParser: true,
        // }
        )
        console.log(`MongoDB connected: ${connect.connection.host}`)
    } catch (error) {
        console.error(`Error ${error.message}`);
        process.exit(1);
    }
};




export default connectionDB;