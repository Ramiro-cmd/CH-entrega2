import { Router } from "express"
import { ProductManager } from "../../ProductManager.js"


const router = Router()

router.get("/", (req,res)=>{
    res.render("realTimeProducts", {})
})

export default router