
let carritoTemporal = []

document.querySelectorAll(".agregar").forEach(button =>{
        button.addEventListener("click", async ()=>{
            const id = button.getAttribute("data-id")

            const existe = carritoTemporal.find(p => p.product === id)

            if(existe){
                existe.quantity +=1
            }else{
                const res = await fetch(`/api/products/json/${id}`)
                const prod =await res.json()
                
                carritoTemporal.push({
                    product: prod._id,
                    title: prod.title,
                    quantity: 1
                })
            }
            renderCarrito()

        })
})


const renderCarrito = () =>{
    const div = document.getElementById("carrito")

    div.innerHTML =`
        <h2>Tu Carrito</h2>

        <ul>
            ${carritoTemporal.map(p=>`<li>${p.title} x ${p.quantity}`).join("")}
        </ul>
        <button id="guardarCarrito">Guardar carrito</button>
    `


    document.getElementById("guardarCarrito").addEventListener("click", async () => {
    
    const productosParaEnviar = carritoTemporal.map(p => ({
        product: p.product,
        quantity: p.quantity
    }))

    const res = await fetch("/api/carts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ products: productosParaEnviar }) 
    })

    if (res.ok) {
        alert("Carrito guardado con éxito")
        carritoTemporal = []
        renderCarrito()
    } else {
        alert("Error al guardar el carrito")
    }
    })
}

