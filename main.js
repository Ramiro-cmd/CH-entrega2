import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io"

import productsRouter from "./src/router/products.router.js"
import cartsRouter from "./src/router/carts.router.js"
import viewsRouter from "./src/router/views.router.js"

const app = express()
const PORT = 8080


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

io.on("connection", (socket)=>{
    console.log("Nuevo cliente conectado")

    socket.on("")
})