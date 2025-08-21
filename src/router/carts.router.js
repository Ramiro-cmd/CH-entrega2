import { Router } from "express";
import { CartManager } from "../../CartManager.js"
import cartModel from "../models/cart.model.js";

let carritos = []

const router = Router()

router.post("/", async (req, res) => {
    try {
        const { products } = req.body

        const newCart = await cartModel.create({products})

        res.status(201).json(newCart)
    }catch (error) {
        res.status(500).send("Error al agregar el producto")
    }
})

router.put("/:cid/product/:pid", async (req, res) => {
    
    try {
        const cartId = req.params.cid
        const prodId = req.params.pid
        const { quantity } = req.body
        
        let cart = await cartModel.findById(cartId)
        if(!cart){
            return res.status(404).send("Error carrito no encontrado")
        }
        
        if (!quantity || quantity < 0) {
            return res.status(400).send("Error cantidad inválida")
        }

        if(cart){
            let prod = cart.products.find((p) => p.product.toString() == prodId)
            if(!prod){
                return res.status(404).send("Error carrito no encotrado")
            }
            if(quantity) prod.quantity = quantity
            await cart.save()
            res.status(202).json(prod)
        }

    }catch(error){
        console.log(error)
        res.status(500).send("Error al agregar producto al carrito",error)
  }
})


router.get("/", async (req,res)=>{
    try{
        carritos = await cartModel.find().lean().populate("products.product")
        // res.status(200).render("carts",{carritos})
        res.status(200).json(carritos)

    }catch(error){

    }
})

router.get("/:id", async (req,res)=>{
    try{
        const id = req.params.id
        let cart = await cartModel.findById(id).lean().populate("products.product")
        if(!cart){
            return res.status(404).send("Error carrito no encontrado")
        }else{
            res.status(200).json(cart)
        }


    }catch(error){
        res.status(404).send("Error al renderizar carts", error)
    }
})

router.delete("/:id", async (req, res)=>{
    try{
        const {id} = req.params
        const deleteCart = await cartModel.deleteOne({_id: id})

        if(deleteCart.deletedCount > 0){
            res.status(200).json({message:`Carrito eliminado`})
        }else{
            res.status(404).json({message:`Carrito no encontrado`})
        }

    }catch(error){
        res.status(500).json({message:`Error al eliminar el carrito`, error})
    }
})

router.delete("/:cid/product/:pid", async (req,res)=>{
    try{
        const {cid, pid} = req.params

        const deleteCartProduct = await cartModel.updateOne({_id: cid},
            {$pull: {products:{product: pid}}})
        
        if(deleteCartProduct.modifiedCount > 0){
            res.send("Producto eliminado")
        }else{
            res.send("Error al eliminar")
        }

    }catch(error){
        res.status(500).json({message:`Error al eliminar el producto del carrito`, error})
    }
})

export default router