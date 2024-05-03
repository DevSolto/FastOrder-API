import 'dotenv/config'
import express from "express"
import userRoutes from "./routes/userRouts"
import unityRoutes from "./routes/unityRouts"

const app = express()

app.use(express.json())

app.use("/api/users",userRoutes)
app.use("/api/unities", unityRoutes)

app.listen(process.env.PORT,()=>{
  console.log(`Listening port ${process.env.PORT}`);
})