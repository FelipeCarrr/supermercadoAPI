//funciones propias de la app
async function login(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    var settings={
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    }
    const request = await fetch("api/auth/login",settings);
    //console.log(await request.text());
    if(request.ok){
        const respuesta = await request.json();

        localStorage.token = respuesta.detail;

        localStorage.email = jsonData.email;
        location.href= "dashboard.html";
    }
}

async function Registrar(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    var settings={
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    }
    const request = await fetch("api/auth/registrar",settings);
    console.log(await request.text());
    if(request.ok){        
        location.href= "dashboard.html";
    }
    alertas("Se ha modificado el Producto Exitosamente!", 1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalProducto')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}
async function sendUser(path){
    validaToken()
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(path, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    myForm.reset();
    console.log(await request.text())
}

async function sendData(path){
    validaToken()
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        if(k !="cajero"){
            jsonData[k] = v;
        }
        
    }
    var id_cajero = document.getElementById("cajero").value;
    const request = await fetch(path+"/"+id_cajero, {
        method: jsonData["metodo"],
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    console.log(await request.text())
}
function listarUsu(){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':localStorage.token
        },
    }
    fetch("api/users",settings)
    .then(response => response.json())
    .then(function(data){

        var usuarios ='';
        for(const usuario of data){
          console.log(usuario.email)
          usuarios += '<tr>'+
          '<th scope="row">'+usuario.id+'</th>'+
          '<td>'+usuario.firstName+'</td>'+
          '<td>'+usuario.lastName+'</td>'+
          '<td>'+usuario.email+'</td>'+
          '<td>'+
            '<button type="button" class="btn btn-outline-danger" onclick="eliminarUsuario(\''+usuario.id+'\')"><i class="fa-solid fa-user-minus"></i></button>'+
            '<a href="#" onclick="traerModificarUsuario(\''+usuario.id+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-user-pen"></i></a>'+
            '<a href="#" onclick="verUsuario(\''+usuario.id+'\')"class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
          '</td>'+
        '</tr>';
         }
         document.getElementById("listarUsu").innerHTML=usuarios;

    })
}
function eliminarUsuario(id){
    validaToken()
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Authorization':localStorage.token
        },
    }
    fetch("api/users/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listarUsu()
        alertas("Se ha Eliminado el usuario Exitosamente!", 1)
    })
}

function traerModificarUsuario(id){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':localStorage.token
        },
    }
    fetch("api/users/"+id,settings)
    .then(response => response.json())
    .then(function(usuario){

        var cadena='';

        if(usuario){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-user-pen"></i>Modificar Usuarios</h1></div>'+
            '<form action="" method="post" id="myForm">'+
                '<input type="hidden" name="id" id="id" value="'+usuario.id+'">'+
                '<label for="firstName" class="form-label">First Name</label>'+
                '<input type="text" name="firstName" class="form-control" id="firstName" required value="'+usuario.firstName+'"> <br>'+
                '<label for="lastName" class="form-label">Last Name</label>'+
                '<input type="text" name="lastName" class="form-control" id="lastName" required value="'+usuario.lastName+'"> <br>'+
                '<label for="email" class="form-label">Email</label>'+
                '<input type="email" name="email" class="form-control" id="email" required value="'+usuario.email+'"> <br>'+
                '<label for="password" class="form-label">Password</label>'+
                '<input type="password" id="password" class="form-control" name="password" required> <br>'+
                '<button type="button" class="btn btn-outline-warning" onclick="modificarUsuario(\''+usuario.id+'\')">Modificar</button>'+
            '</form>';
         }
         document.getElementById("contentModal_1").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalUsurio'))
         myModal.toggle();

    })
}
async function modificarUsuario(id){
    validaToken()
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/users/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    listarUsu();
    alertas("Se ha modificado el usuario Exitosamente!", 1)
    document.getElementById("contentModal_1").innerHTML = '';
    var myModalEl = document.getElementById('modalUsurio')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function verUsuario(id){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':localStorage.token
        },
    }
    fetch("api/users/"+id,settings)
    .then(response => response.json())
    .then(function(usuario){

        var cadena='';

        if(usuario){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Usuario</h1></div>'+
            '<ul class="list-group">'+
            '<li class="list-group-item">Nombre: '+usuario.firstName+'</li>'+
            '<li class="list-group-item">Apellido: '+usuario.lastName+'</li>'+
            '<li class="list-group-item">Email: '+usuario.email+'</li>'+
            '</ul>'+
            '<br>'
         }
         document.getElementById("contentModal_1").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalUsurio'))
         myModal.toggle();

    })
}
//##################################### Hasta AQUI Todo lo del Usuario ##################################################################



////////////////LISTAR ARTICULOS//////////////
function listar(){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    fetch("api/articulos",settings)
    .then(response => response.json())
    .then(function(data){
        var articulos ='';
        for(const articulo of data){
          console.log(articulo)
          articulos += '<tr>'+
          '<th scope="row">'+articulo.cod_articulo+'</th>'+
          '<td>'+articulo.descripcion+'</td>'+
          '<td>'+articulo.valor+'</td>'+
          '<td>'+articulo.talla+'</td>'+
          '<td>'+articulo.color+'</td>'+
          '<td>'+articulo.nit.nit+'</td>'+
          /*'<td>'+producto.cajero.firstName+' '+producto.cajero.lastName+'</td>'+*/
          '<td>'+
            '<button type="button" class="btn btn-danger" onclick="eliminarArticulo(\''+articulo.cod_articulo+'\')"><i class="fa-solid fa-trash"></i></button>'+
            '<a href="#" onclick="traerModificarArticulo(\''+articulo.cod_articulo+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-arrows-rotate"></i></a>'+
            '<a href="#" onclick="verArticulo(\''+articulo.cod_articulo+'\')"class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
          '</td>'+
        '</tr>';
         }
         document.getElementById("listar").innerHTML=articulos;
    })
}
function traerModificarArticulo(cod_articulo){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/articulos/"+cod_articulo,settings)
    .then(response => response.json())
    .then(function(articulo){
        
        var cadena='';
        
        if(articulo){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-arrows-rotate"></i>Modificar Productos</h1></div>'+
            '<form action="" method="post" id="myForm">'+
                '<input type="hidden" name="id" id="id" value="'+articulo.cod_articulo+'">'+
                '<label for="descripcion" class="form-label">Descripcion</label>'+
                '<input type="text" name="descripcion" class="form-control" id="descripcion" required value="'+articulo.descripcion+'"> <br>'+
                '<label for="talla" class="form-label">Talla</label>'+
                '<input type="text" name="talla" class="form-control" id="talla" required value="'+articulo.talla+'"> <br>'+
                '<label for="color" class="form-label">Color</label>'+
                '<input type="text" name="color" class="form-control" id="color" required value="'+articulo.color+'"> <br>'+
                
                '<button type="button" class="btn btn-outline-warning" onclick="modificarArticulo(\''+articulo.cod_articulo+'\')">Modificar</button>'+
            '</form>';
         }
         document.getElementById("contentModal").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalArticulo'))
         myModal.toggle();
        
    })
}

async function modificarArticulo(cod_articulo){
    validaToken()
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/articulos/"+cod_articulo, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha modificado el Articulo Exitosamente!", 1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalArticulo')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function eliminarArticulo(cod_articulo){
    validaToken()
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
        },
    }
    fetch("api/articulos/"+cod_articulo,settings)
    .then(response => response.json())
    .then(function(data){
        listar()
        alertas("Se ha Eliminado el Articulo Exitosamente!", 1)
    })
}

async function sendSearch(path){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }

    const request = await fetch(path+"/"+jsonData["id"], {
        method: jsonData["metodo"],
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    console.log(await request.text())
}

function verArticulo(cod_articulo){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/articulos/"+cod_articulo,settings)
    .then(response => response.json())
    .then(function(articulo){
        
        var cadena='';
        
        if(articulo){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-eye"></i>Visualizar Articulo</h1></div>'+
            '<ul class="list-group">'+
            '<li class="list-group-item">Codigo del Articulo: '+ articulo.cod_articulo+'</li>'+
            '<li class="list-group-item">Descripcion: '+ articulo.descripcion+'</li>'+
            '<li class="list-group-item">Valor del Articulo: '+ articulo.valor+'</li>'+
            '<li class="list-group-item">Talla: '+ articulo.talla+'</li>'+
            '<li class="list-group-item">Color: '+ articulo.color+'</li>'+
            '<li class="list-group-item">Nit: '+ articulo.nit.nit+'</li>'+
            '</ul>'+
            '<br>'
         }
         document.getElementById("contentModal").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalArticulo'))
         myModal.toggle();
        
    })
}
////////////////////// FIN ARTICULOS /////////////////////////



/*//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ CLIENTES $$$$$$$$$$$$$$$$$$$$$$$$$$
function listarClientes(){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    fetch("api/clientes",settings)
    .then(response => response.json())
    .then(function(data){
        var clientes ='';
        for(const cliente of data){
          console.log(cliente)
          clientes += '<tr>'+
          '<th scope="row">'+cliente.documento+'</th>'+
          '<td>'+cliente.nombre1+' '+cliente.nombre2+'</td>'+
          '<td>'+cliente.apellido1+' '+cliente.apellido2+'</td>'+
          '<td>'+cliente.direccion+'</td>'+
          '<td>'+cliente.sexo+'</td>'+
          '<td>'+cliente.celular+'</td>'+
          '<td>'+cliente.email+'</td>'+
          '<td>'+cliente.comuna.cod_comuna+'</td>'+
          '<td>'+cliente.comuna.cod_comuna+'</td>'+
          /*'<td>'+producto.cajero.firstName+' '+producto.cajero.lastName+'</td>'+
          '<td>'+
            '<button type="button" class="btn btn-danger" onclick="eliminarCliente(\''+cliente.documento+'\')"><i class="fa-solid fa-trash"></i></button>'+
            '<a href="#" onclick="traerModificarCliente(\''+cliente.documento+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-arrows-rotate"></i></a>'+
            '<a href="#" onclick="verCliente(\''+cliente.documento+'\')"class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
          '</td>'+
        '</tr>';
         }
         document.getElementById("listarClientes").innerHTML=clientes;
    })
}


function traerModificarCliente(cod_articulo){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/clientes/"+cod_articulo,settings)
    .then(response => response.json())
    .then(function(articulo){
        
        var cadena='';
        
        if(articulo){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-arrows-rotate"></i>Modificar Productos</h1></div>'+
            '<form action="" method="post" id="myForm">'+
                '<input type="hidden" name="id" id="id" value="'+articulo.cod_articulo+'">'+
                '<label for="descripcion" class="form-label">Descripcion</label>'+
                '<input type="text" name="descripcion" class="form-control" id="descripcion" required value="'+articulo.descripcion+'"> <br>'+
                '<label for="talla" class="form-label">Talla</label>'+
                '<input type="text" name="talla" class="form-control" id="talla" required value="'+articulo.talla+'"> <br>'+
                '<label for="color" class="form-label">Color</label>'+
                '<input type="text" name="color" class="form-control" id="color" required value="'+articulo.color+'"> <br>'+
                
                '<button type="button" class="btn btn-outline-warning" onclick="modificarArticulo(\''+articulo.cod_articulo+'\')">Modificar</button>'+
            '</form>';
         }
         document.getElementById("contentModal").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalArticulo'))
         myModal.toggle();
        
    })
}

async function modificarCliente(cod_articulo){
    validaToken()
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/clientes/"+cod_articulo, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha modificado el Articulo Exitosamente!", 1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalArticulo')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function verCliente(documento){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/clientes/"+documento,settings)
    .then(response => response.json())
    .then(function(cliente){
        
        var cadena='';
        
        if(cliente){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-eye"></i>Visualizar Clientes</h1></div>'+
            '<ul class="list-group">'+
            '<li class="list-group-item">Documento:'+ cliente.documento+'</li>'+
            '<li class="list-group-item">Apellidos: '+cliente.nombre1+' '+cliente.nombre2+'</li>'+
            '<li class="list-group-item">Apellidos: '+cliente.apellido1+' '+cliente.apellido2+'</li>'+
            '<li class="list-group-item">Direccion: '+ cliente.direccion+'</li>'+
            '<li class="list-group-item">Sexo: '+ cliente.sexo+'</li>'+
            '<li class="list-group-item">Celular: '+ cliente.celular+'</li>'+
            '<li class="list-group-item">Email: '+cliente.email+'</li>'+
            '<li class="list-group-item">Cod. Comuna: '+cliente.comuna.cod_comuna+'</li>'+
            '<li class="list-group-item">Cod. : Barrio'+cliente.comuna.cod_comuna+'</li>'+
            '</ul>'+
            '<br>'
         }
         document.getElementById("contentModal").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalCliente'))
         myModal.toggle();
        
    })
}
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ FIN CLIENTES $$$$$$$$$$$$$$$$$$$$$$*/


function alertas(mensaje,tipo){
    var color=""; 
    if(tipo == 1 ){//success verde
        color = "success"

    }
    else{//danger rojo
        color = "danger"

    }
    var alerta = '<div class="alert alert-'+color+' alert-dismissible fade show" role="alert">'+
                   '<strong><i class="fa-solid fa-triangle-exclamation"></i></strong>'+ 
                   mensaje+
                   '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
                 '</div>';
    document.getElementById("datos").innerHTML=alerta;


}
function salir(){
    localStorage.clear();
    location.href = "index.html"
}
function validaToken(){
    if(localStorage.token == undefined){
        salir();
    }
}