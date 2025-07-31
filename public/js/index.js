const socket = io()

socket.on("updateProducts", (products)=>{
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
            <td>
            

        `
        tbody.appendChild(tr)
    })
    document.querySelectorAll(".delete")

})