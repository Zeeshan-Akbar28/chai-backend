import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("ERROR: ", error)
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listning on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error(error)
//         throw new Error(error)
//     }
// })()
