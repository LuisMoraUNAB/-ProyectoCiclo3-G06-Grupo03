
// script del menu responsive Abrir el menu
var btnMobile = document.getElementById('btn-mobile')
btnMobile.addEventListener('click', function (e) {
    e.preventDefault()
    let mySidenav = document.getElementById("mySidenav")
    mySidenav.classList.toggle("openOffCanvas")
})

// script del menu responsive sticky menu

var nav = document.getElementById('mySidenav')

window.addEventListener('scroll', function () {
    if (window.pageYOffset > nav.offsetTop) {
        nav.classList.add('nav-fixed')
    } else {
        nav.classList.remove('nav-fixed')
    }
})
 // script del menu responsive effecto accordeon
var submenu = document.getElementsByClassName('link-submenu')

for (var i = 0; i < submenu.length; i++) {
    submenu[i].onclick = function () {
        var content = this.nextElementSibling

        if (content.style.maxHeight) {
            content.style.maxHeight = null
        } else {
            content.style.maxHeight = content.scrollHeight + "px"
        }

    }
}

// script del slider de producto
let activeImg = 0
function slider(n) {
    let images = document.getElementsByClassName("slider-item")

    for (i = 0; i < images.length; i++) {

        if (images[i].className.includes("active")) {
            images[i].className = images[i].className.replace("active", "")

            break
        }
    }

    activeImg = n
    images[n].className += " active"
}

function next() {
    activeImg++
    if (activeImg > 2) {
        activeImg = 0
    }
    slider(activeImg)
}

function previus() {
    activeImg--
    if (activeImg < 0) {
        activeImg = 2
    }
    slider(activeImg)
}


// script de la navegacipon por tabs
let tabs = Array.prototype.slice.apply(document.querySelectorAll('.tabs-item'))
let panels = Array.prototype.slice.apply(document.querySelectorAll('.tab-panel'))

//scrip para loguear
    function accesar(){
        console.log("intento de acceso")

        let correo  = document.getElementById("correo").value
        let contrasena  = document.getElementById("contrasena").value
        fetch("http://150.136.246.164:8080/tshirt/usuarios/login?correo="+correo+"&contrasena="+contrasena)
        .then(Response => Response.json())
        .then(
            data=>{console.log(data)
            console.log(data.nombre)
            if(data.tipoId != 0){
                if(data.tipoId == 1){
                    document.location = "catalogo.html?nombre="+data.nombre+"&id="+data.id+"&tipoid="+data.tipoId
                }else{
                    document.location = "RegistroProductos.html"
                }
            }else{
                alert("Usuario y contraseña no coninciden.")
            }
        })
        
    }

//agregar camisa al carrito
function agregarProducto(productoId,precio){
    var http = new XMLHttpRequest();
    var url = "http://150.136.246.164:8080/tshirt/carrito/agregarAlCarrito";
    
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json");
    var valores=getGET();
    let id = valores['id'];
    http.send(JSON.stringify({
        productoId: productoId,
        precio: precio,
        clienteId: id})
        );
        alert("Se agrego un producto")
        llenarCarrito()
}

//script para llenar camisetas
function solicitar(){
    fetch("http://150.136.246.164:8080/tshirt/productos/all")
   .then(Response => Response.json())
   .then (data => {console.log(data)
                       let codigo
                       codigo = ""
                       let columnas = 0
                       codigo += '<div class="columns is-mobile is-multiline">'
                       data.forEach(element => {
                               if(columnas > 3){
                                   codigo += '<div class="columns is-mobile is-multiline">'
                                       columnas = 0    
                               }
                               //console.log("nombre"+element.nombre)
                               if(element.estado == 1){
                                    codigo += '<div class ="column is-half-mobile is-one-quarter-desktop">'
                                    codigo += '<div class="card ">'
                                        codigo += '<span class="price"> <sup><a id="nombreproducto">'+element.nombre+'</a><br>'+element.precio+'</sup></span>'
                                        codigo += '<img src="img/item-1.png" alt="">'
                                        codigo += '<div class="card-simple-options">'
                                        codigo += "<button  onclick= 'agregarProducto("+element.id+","+element.precio+")' class='btn btn-default btn-primary'>Agregar al carrito</button>"
                                        codigo += '</div>'
                                    codigo += '</div>'
                                codigo += '</div>'   
                                columnas += 1
                               }

                           }
                           
                       );
                       codigo += '</div>'
                       document.getElementById("lproductos").innerHTML = codigo
                   }
       )
}

    //captura VALORES QUE LLEGAN EN LA URL
    function getGET()
    {
        // capturamos la url
        var loc = document.location.href;
        // si existe el interrogante
        if(loc.indexOf('?')>0)
        {
            // cogemos la parte de la url que hay despues del interrogante
            var getString = loc.split('?')[1];
            // obtenemos un array con cada clave=valor
            var GET = getString.split('&');
            var get = {};
            // recorremos todo el array de valores
            for(var i = 0, l = GET.length; i < l; i++){
                var tmp = GET[i].split('=');
                get[tmp[0]] = unescape(decodeURI(tmp[1]));
            }
            return get;
        }
    }
    //lena el carrito
    function llenarCarrito(){
        var valores=getGET();
        if(valores){
            let id = valores['id'];
            fetch("http://150.136.246.164:8080/tshirt/carrito/carritocliente?id="+id) //consultamos productos
            .then(Response => Response.json())
            .then (data => {console.log(data)
                            let codigo
                            codigo ='<button  onclick= "pagarCarrito()" class="btn btn-default btn-primary">Pagar tus productos</button>'
                            data.forEach(element => {
                                
                                codigo += '<li class="nav-menu-item"><a class="nav-menu-link"> Producto id: '+ element.productoId+': $ '+element.precio+'</a></li>'
                                }
                                );
                                
                            document.getElementById("carrito").innerHTML = codigo
                        }
                )   
        }

    }
function pagarCarrito(){
    prompt("Ingresa el CVV de tu tarjeta para proceder al pago",0);
    alert("Tus prodictos se enviaran en breve")
}

function crearProducto(){


    var http = new XMLHttpRequest();
    var url = "http://150.136.246.164:8080/tshirt/productos/crear";
    
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json");

    nombre = document.getElementById("nombre").value
    precio = document.getElementById("precio").value
    let listcategoria = document.getElementById("categoria")
    let categoria = listcategoria.value

    let listEstado = document.getElementById("estado")
    let estado = listcategoria.value


    //falta pasar el valor del select al Json para crear el producto
    http.send(JSON.stringify({
        nombre: nombre,
        precio: precio,
        categoriaId: categoria,
        estado: estado})
        );
        alert("Se agrego un producto al catalogo")
}

function cambiarEstado(id,nombre,precio,categoria,estado){

    if(estado == 1){
        estado = 2
    }else{
        estado = 1
    }
    var http = new XMLHttpRequest();
    var url = "http://150.136.246.164:8080/tshirt/productos/modificar";

    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json");
    //falta pasar el valor del select al Json para crear el producto
    http.send(JSON.stringify({
        id: id,
        nombre: nombre,
        precio: precio,
        categoriaId: categoria,
        estado: estado})
        );
        adminProductos()
    alert("intento de cambio de estados")
}
//scrip para llenar productos en administracion
function adminProductos(){
    fetch("http://150.136.246.164:8080/tshirt/productos/all")
.then(Response => Response.json())
.then (data => {console.log(data)
                    let codigo
                    codigo = ""
                    let columnas = 0
                    codigo += '<div class="columns is-mobile is-multiline">'
                    data.forEach(element => {
                            if(columnas > 3){
                                codigo += '<div class="columns is-mobile is-multiline">'
                                    columnas = 0    
                            }
                            console.log("nombre"+element.nombre)
                            codigo += '<div class ="column is-half-mobile is-one-quarter-desktop">'
                                codigo += '<div class="card ">'
                                    codigo += '<span class="price"> <sup><a id="nombreproducto">'+element.nombre+'</a><br>'+element.precio+'</sup></span>'
                                    codigo += '<img src="img/item-1.png" alt="">'
                                    codigo += '<div class="card-simple-options">'
                                        codigo += '<button  onclick= "cambiarEstado('+element.id+','+'\''+element.nombre+'\''+','+element.precio+','+element.categoriaId+','+element.estado+')" class= "btn btn-default btn-primary">Cambiar estado</button>'
                                    codigo += '</div>'
                                codigo += '</div>'
                            codigo += '</div>'   
                            columnas += 1
                        }
                        
                    );
                    codigo += '</div>'
                    document.getElementById("lproductos").innerHTML = codigo
                }
    )
}

function registro(){
    console.log("intento de registro")
    let nombre = document.getElementById("nombre").value
    let correo = document.getElementById("correo").value
    let contrasena = document.getElementById("contrasena").value

    console.log(nombre)
    console.log(correo)
    console.log(contrasena)

    var http = new XMLHttpRequest();
    var url = "http://150.136.246.164:8080/tshirt/usuarios/adduser";
    
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json");

    http.send(JSON.stringify({
        nombre: nombre,
        correo: correo,
        contrasena: contrasena,
        tipo: 1})
        );
}