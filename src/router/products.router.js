import { Router } from "express";
import { ProductManager } from "../../ProductManager.js"
import productModel from "../models/product.model.js"

let productos = []

const router = Router()

router.get("/", async (req,res)=>{
    try{
        productos = await productModel.find().lean()
        res.status(200).render("home",{productos})
    }catch(error){
        res.status(500).json({ message: 'Error render de los productos', error });
    }
})

router.get("/:id",async (req,res)=>{
    try{
        const id = req.params.id
        let product = await productModel.findById(id).lean()
        if(!product){
            res.status(404).send("Error producto no encontrado")
        }else{
            res.status(200).render("product", {product})
        }

    }catch(error){
        res.status(500).json({ message: 'Error render del producto ', error });

    }
})

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    const newProduct = new productModel({title, description, code, price, status, stock, category, thumbnails})
    await newProduct.save()
    res.status(201).json(newProduct)
} catch (error) {
    res.status(500).json({message:"Error al crear el producto ", error})
  }
})

router.put("/:id", async (req, res)=>{
    
    try{
        const id = req.params.id

        const { title, description, code, price, status, stock, category, thumbnails } = req.body
   
        let product = await productModel.findById(id)
        
        if(!product){
            return res.status(404).send("Error producto no encontrado")   
        }
        
        if(title) product.title = title
        if(description) product.description = description
        if(code) product.code = code
        if(price) product.price = price
        if(status) product.status = status 
        if(stock) product.stock = stock 
        if(category) product.category = category
        if(thumbnails) product.thumbnails = thumbnails

        await product.save()
        res.status(202).json(product)

    }catch(error){
        res.status(500).json({message:`Error al modificar el producto `, error})
    }
    

})

router.delete("/:id", async (req,res)=>{
    
    try{
        const {id} = req.params
        const deleteProduct = await productModel.deleteOne({_id : id})
        
        if(deleteProduct.deletedCount > 0){
            res.status(200).json({message:`Producto eliminado`})
        }else{
            res.status(404).json({message:` Producto no encontrado`})
        }

    }catch(error){
        res.status(500).json({message:`Error al eliminar el producto `, error})
    }
})

export default router