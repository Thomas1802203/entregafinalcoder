let productos = [];

fetch("./js/productos.json")
.then(response => response.json())
.then(data => {
    productos = data;
    cargarProductos(productos);

})

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numero = document.querySelector("#numero");



function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML ="";

    productosElegidos.forEach(producto =>{
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML =`
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.precio}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" id="${producto.id}">Agregar</button>
                    </div>
        `;
        contenedorProductos.append(div);

    })
    acutalizarBotonesAgregar();
}



botonesCategorias.forEach(boton=>{
    boton.addEventListener("click",(e)=>{

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        
        if (e.currentTarget.id !="todos"){
            const productoCategoria= productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosElegidos = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosElegidos);
        } else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
        

        e.currentTarget.classList.add("active");

    })

});

function acutalizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    })
}
let productosEnCarrito;


let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if(productosEnCarritoLS){
     productosEnCarrito = JSON.parse(productosEnCarritoLS);
     actualizarNumero();
}else{
    productosEnCarrito=[];

}


function agregarAlCarrito(e) {

    Toastify({
        text: "Producto Agregado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #23336b, #23336b)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado= productos.find(producto=> producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id=== idBoton)){
       const index= productosEnCarrito.findIndex(producto => producto.id===idBoton);
       productosEnCarrito[index].cantidad++;

    }else{
        productoAgregado.cantidad=1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumero();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumero() {
    let nuevoNumero = productosEnCarrito.reduce((acc,producto)=> acc+producto.cantidad,0);
    numero.innerText= nuevoNumero;
}

