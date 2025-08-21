import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io"

import productsRouter from "./src/router/products.router.js"
import cartsRouter from "./src/router/carts.router.js"
import viewsRouter from "./src/router/views.router.js"

import {ProductManager} from "./ProductManager.js"

import mongoose from "mongoose"



const app = express()
const PORT = 8080

mongoose.connect("mongodb://localhost:27017/myDatabase")
// mongoose.connect("mongodb+srv://root:root@cluster0.dbiozif.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Conectado a mongo")
})
.catch((error)=>{
    console.log("MongoDB error: ", error)
})



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))

app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.use("/realtimeproducts", viewsRouter )

const server = app.listen(PORT, ()=>{
    console.log("Servidor iniciado")
})

const io = new Server(server)

const actualizarVista = async () =>{
    io.emit("listProducts", await ProductManager.leerArchivo())
}

io.on("connection", async(socket)=>{
    console.log("Nuevo cliente conectado")

    actualizarVista()

    socket.on("deleteProduct", async (id)=>{
        await ProductManager.eliminarProducto(parseInt(id))
        await actualizarVista()
    })

    socket.on("addProduct",async (newProduct)=>{
        await ProductManager.agregarProducto(newProduct)
        await actualizarVista()
    })

})