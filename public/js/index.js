const socket = io()

socket.on("listProducts", (products)=>{
    const tbody = document.getElementById("producto")
    tbody.innerHTML = ""

    products.forEach(product => {
        const tr = document.createElement("tr")
        tr.innerHTML=`
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.code}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td>
                <button data-id="${product.id}" class="delete">X</button>
            </td>
            

        `
        tbody.appendChild(tr)
    })
    document.querySelectorAll(".delete").forEach(button =>{
        button.addEventListener("click", ()=>{
            const id = button.getAttribute("data-id")
            socket.emit("deleteProduct", id)
        })
    })

    const agregar = document.querySelector(".agregar-btn")
    agregar.addEventListener("click", ()=> {
        const formulario = document.getElementById("formulario")
        formulario.innerHTML =`
            <h2>Agregar producto</h2>
            <form id="add-product-form">
            <div>
                <label for="title">Título:</label>
                <input type="text" id="title" name="title" required />
            </div>
            <div>
                <label for="description">Descripción:</label>
                <input type="text" id="description" name="description" required />
            </div>
            <div>
                <label for="code">Código:</label>
                <input type="text" id="code" name="code" required />
            </div>
            <div>
                <label for="price">Precio:</label>
                <input type="number" id="price" name="price" step="0.01" required />
            </div>
            <div>
                <label for="stock">Stock:</label>
                <input type="number" id="stock" name="stock" required />
            </div>
            <div>
                <label for="category">Categoría:</label>
                <input type="text" id="category" name="category" required />
            </div>
            <button>Agregar</button>
            </form>

        `
        const form = document.getElementById("add-product-form")
        form.addEventListener("submit", (e)=>{
            e.preventDefault()

            const newProduct = {
                title: document.getElementById("title").value.trim(),
                description: document.getElementById("description").value.trim(),
                code: document.getElementById("code").value.trim(),
                price: parseFloat(document.getElementById("price").value),
                stock: parseInt(document.getElementById("stock").value,10),
                category: document.getElementById("category").value.trim()
            }
            socket.emit("addProduct", newProduct)
            form.reset()
        })
    })

})