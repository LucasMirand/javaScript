
const newURL="https://fakestoreapi.com/products?limit=20"
const contenedorCards = $('#container-card');
const contenedorCarrito = $('#container-carrito')
let carrito = []

//FORMA - Cargar pagina
$.get(newURL, cargar)
function cargar (data,status) {
  console.log(data);
  //guardarJSON
  guardarDatos(data);
  console.log(status);
  prods= data;
  $(`.remover`).hide();
}

//JSON Guardar Datos
function guardarDatos(data){
  let aJson = JSON.stringify(data)
  localStorage.setItem("productos", aJson)
     
}

//IMPORTAR JSON 
let prods = JSON.parse(localStorage.getItem("productos"));
console.log(prods)
llenar()

//Llenar HTML
function llenar(){
    prods.forEach((producto) => {      
      contenedorCards.append(`<div class="col-sm-4 product-item">
            <div class="card text-center" style= "width:18rem">
            <img class="card-img img-fluid rounded mx-auto d-block"  style="width:12rem" src="${producto.image}" alt="Card image cap">
                <div class="card-body">
                  <h3 class="card-title text-truncate">${producto.title}</h3>
                  <h4>Precio Lista:</p>
                  <p>${producto.price}</p>
                </div>
                <button type="button" class="btn btn-success btn_comprar" id="${producto.id}">Añadir</button>

            </div> 
    </div`)
    //BTN Añadir
    $(`#${producto.id}`).on('click', function(){
            console.log($(this))
            let idBoton = parseInt($(this)[0].id.slice());
            console.log(idBoton);
            let productoSeleccionado = prods.find(producto => producto.id === idBoton);
            console.log(productoSeleccionado);
            agregarProducto(productoSeleccionado);
            validarStorage();
            $(`.remover`).show();
            $('#btn-comprar').show();
            $('#confirmacion').hide();
        })      
    });    
}


// Buscar CATEGORIAS  
function search(categoria){   
  prods.forEach((producto) => {      
    if (producto.category==categoria) {
      contenedorCards.append(`<div class="col-sm-4 product-item">
      <div class="card text-center" style= "width:18rem">
      <img class="card-img img-fluid rounded mx-auto d-block"  style="width:12rem" src="${producto.image}" alt="Card image cap">
          <div class="card-body">
            <h3 class="card-title text-truncate">${producto.title}</h3>
            <h4>Precio Lista:</p>
            <p>${producto.price}</p>
          </div>
          <button type="button" class="btn btn-success btn_comprar" id="${producto.id}">Añadir</button>

        </div> 
      </div`)
//BTN Añadir
    $(`#${producto.id}`).on('click', function(){
          console.log($(this))
          let idBoton = parseInt($(this)[0].id.slice());
          console.log(idBoton);
          let productoSeleccionado = prods.find(producto => producto.id === idBoton);
          console.log(productoSeleccionado);
          agregarProducto(productoSeleccionado);
          validarStorage();
      })}      
  });
}




//EVENTOS-BTN CATEGORIAS
$('#btn-joyas').click(() => {
  let categoria = "jewelery";
  contenedorCards.html("");  
  search(categoria);
  $("body").css("background-color", "grey")
  
  
});

$('#btn-electronics').click(() => {
  let categoria = "electronics";
  contenedorCards.html("");  
  search(categoria);
  $("body").css("background-color", "green")
  
});

$('#btn-hombres').click(() => {
  let categoria = "men's clothing";
  contenedorCards.html("");  
  search(categoria);
  $("body").css("background-color", "blue")
  
});

$('#btn-mujeres').click(() => {
  let categoria = "women's clothing";
  contenedorCards.html("");  
  search(categoria);
  $("body").css("background-color", "pink")
  
});
$('#btn-todos').click(() => {

  contenedorCards.html("");  
  llenar();
  $("body").css("background-color", "white")
  
});

// 
/*
$("a").hover(() => {
  $(this).css("background-color", "blue");},
  ()=>{$(this).css("background-color", "white")
});
*/

//Funcion BTN-Añadir
function agregarProducto(producto){
  if (carrito.length !== 0){
//    let idBoton = parseInt($(this)[0].id);
    if (carrito.some(elem => elem.producto.id === producto.id)){
        let indiceProductoMatcheado = carrito.indexOf(carrito.find(elem => elem.producto.id === producto.id));
        carrito[indiceProductoMatcheado].cantidad += 1;
        console.log(indiceProductoMatcheado);
      } else {
        let nuevoProducto = {
            producto: producto,
            cantidad: 1
        }
        carrito.push(nuevoProducto);
    } } else {
    let nuevoProducto = {
        producto: producto,
        cantidad: 1
    }
    carrito.push(nuevoProducto);
}
localStorage.setItem('carrito', JSON.stringify(carrito));
validarStorage();
}

//Validar Storage Carrito
function validarStorage(){
  if (localStorage.length !== 0){
      let carritoTraido = JSON.parse(localStorage.getItem('carrito'));
      carrito = carritoTraido;
      imprimirCarrito(carrito);
  }
}


//AñadirCarrito
function imprimirCarrito(arrayCarrito){
  contenedorCarrito.html('');
  console.log(arrayCarrito);
  arrayCarrito.forEach((elemento) => {
      contenedorCarrito.append(`
          <div class="border-primary shoppingCartItem">            
          <li class="card-title carrito-nombre-producto">${elemento.producto.title.toUpperCase()} </li> 
          <li><input type="number" value="${elemento.cantidad}" id="input-${elemento.producto.id}"></li>
          <li class="card-text">Precio  unitario: $ ${elemento.producto.price}</li>  
          <li class="card-text" id="removido">Precio total: $ ${elemento.producto.price * elemento.cantidad}</li>
          </div>          
      `)
      $(`#input-${elemento.producto.id}`).change(function(){
          elemento.cantidad = parseInt($(this).val());
          let indiceProductoMatcheado = carrito.indexOf(carrito.find(elem => elem.producto.id === parseInt((`input-${elemento.producto.id}`).slice(6))));
          carrito[indiceProductoMatcheado].cantidad = parseInt($(`#input-${elemento.producto.id}`).val());
          localStorage.setItem('carrito', JSON.stringify(carrito));
          validarStorage();
      })
      
    })
    
/*
      $(`#remover${elemento.producto.id}`).click(()=>{
        console.log(elemento.producto.id)
      
        console.log(carrito)
        let idMatcheado = carrito.indexOf(carrito.find(elem => elem.elemento.id === elemento.id));
        console.log(idMatcheado) */
//        localStorage.removeItem('image');
//          let productoSeleccionado = prods.find(producto => producto.id === idBoton);
//          console.log(productoSeleccionado);
//          agregarProducto(productoSeleccionado);
//          validarStorage();
      




  let totalCompra = $('#total-compra');
  let total = 0;
  
  carrito.forEach((dato) =>{
      total += dato.producto.price * dato.cantidad;
  });
  totalCompra.text(total);
  //Compra Realizada
  $('#btn-comprar').click(()=>{
      contenedorCarrito.html('');
      $('#confirmacion').show();
      $('#confirmacion').text(`Gracias por su compra. El total a pagar es $${total}`).css({'backgroundColor': 'green', 'color': 'white', 'padding': '5px'});
      $('#confirmacion').slideDown('slow');
      $('.remover').hide();
      $('#btn-comprar').hide();
      total = 0;
      carrito = [];
  })
  $(`.remover`).click(()=>{
    contenedorCarrito.html('');
    $('#removido').html('')
    total = 0;
    carrito = [];})
}


//-------------------------------------------------PROYECTO ANTERIOR-------------------------//
/*
  //EVENTO CLICK AÑADIR
  $('.card').click((e) => {
    addCarrito(e)
  });
*/
//Api buscar por categoría
/*
*/
//AGREGAR CARRITO
/*
function addCarrito(e) {
  if(e.target.classList.contains('btn')){
  setCarrito(e.target.parentElement)
  } e.stopPropagation()
}
function setCarrito(objeto) {
  console.log(objeto)
  let objCarrito = {
    id: objeto.querySelector('.btn').id,
    title: objeto.querySelector('h3').textContent,
    price: objeto.querySelector('p').value,
    cantidad: 1
  }
  console.log(objCarrito)
}
*/

//NO ME SALE LA CLASE
//let carritos = [];
/*
class Carrito {
  constructor (prods){
    this.titulo = prods.title;
    this.precio= prods.price;
    this.cantidad =1;
  }
  guardar(){
    localStorage.setItem("carrito",JSON.stringify(new Carrito))
    console.log(Carrito)
  }
}

class carritoModel {
  constructor(){ 
    let prods = JSON.parse(localStorage.getItem("productos"));
    this.prods = prods.map(prod => new Carrito(prod))
  }
}
*/

/* No
$('.btn').click(() => {
  console.log(prods)
  let filtro = ($(this).attr('id'))
  prodFiltrado = prods.filter(prod => prod.title == filtro)
  agregarCarrito(prodFiltrado)

})

function agregarCarrito(producto) {
    console.log(producto)
};
*/

