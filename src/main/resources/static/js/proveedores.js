//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& PROVEEDORES &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
function listarProveedores(){
    
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    fetch("api/proveedores",settings)
    .then(response => response.json())
    .then(function(data){
        var proveedores ='';
        for(const proveedor of data){
          console.log(proveedor)
          proveedores += '<tr>'+
          '<th scope="row">'+proveedor.nit+'</th>'+
          '<td>'+proveedor.nombre+'</td>'+
          '<td>'+proveedor.direccion+'</td>'+
          '<td>'+proveedor.celular+'</td>'+
          '<td>'+
            '<button type="button" class="btn btn-danger" onclick="eliminarPoveedor(\''+proveedor.nit+'\')"><i class="fa-solid fa-trash"></i></button>'+
            '<a href="#" onclick="traerModificarProveedor(\''+proveedor.nit+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-arrows-rotate"></i></a>'+
            '<a href="#" onclick="verProveedor(\''+proveedor.nit+'\')"class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
          '</td>'+
        '</tr>';
         }
         document.getElementById("listarProveedores").innerHTML=proveedores;
    })
}
function traerModificarProveedor(nit){
    
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/proveedores/"+nit,settings)
    .then(response => response.json())
    .then(function(proveedor){
        
        var cadena='';
        
        if(proveedor){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-arrows-rotate"></i>Modificar Proveedor</h1></div>'+
            '<form action="" method="post" id="myForm">'+
                '<input type="hidden" name="id" id="id" value="'+proveedor.nit+'">'+
                '<label for="nombre" class="form-label">Nombre del Proveedor</label>'+
                '<input type="text" name="nombre" class="form-control" id="nombre" required value="'+proveedor.nombre+'"> <br>'+
                '<label for="direccion" class="form-label">Dirección</label>'+
                '<input type="text" name="direccion" class="form-control" id="direccion" required value="'+proveedor.direccion+'"> <br>'+
                '<label for="celular" class="form-label">Celular</label>'+
                '<input type="text" name="celular" class="form-control" id="celular" required value="'+proveedor.celular+'"> <br>'+
                
                '<button type="button" class="btn btn-outline-warning" onclick="modificarProveedor(\''+proveedor.nit+'\')">Modificar</button>'+
            '</form>';
         }
         document.getElementById("contentModal").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalProveedor'))
         myModal.toggle();
        
    })
}

async function modificarProveedor(nit){
    
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/proveedores/"+nit, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listarProveedores();
    alertas("Se ha modificado el Proveedor Exitosamente!", 1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalProveedor')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function eliminarProducto(id){
    
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
        },
    }
    fetch("api/productos/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listar()
        alertas("Se ha Eliminado el producto Exitosamente!", 2)
    })
}


function verProveedor(nit){
    
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/proveedores/"+nit,settings)
    .then(response => response.json())
    .then(function(proveedor){
        
        var cadena='';
        
        if(proveedor){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-eye"></i>Visualizar Proveedor</h1></div>'+
            '<ul class="list-group">'+
            '<li class="list-group-item">Nit: '+ proveedor.nit+'</li>'+
            '<li class="list-group-item">Nombre del Proveedor: '+ proveedor.nombre+'</li>'+
            '<li class="list-group-item">Dirección: '+ proveedor.direccion+'</li>'+
            '<li class="list-group-item">Celular: '+ proveedor.celular+'</li>'+
            '</ul>'+
            '<br>'
         }
         document.getElementById("contentModal_1").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalProveedor'))
         myModal.toggle();
        
    })
}

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

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& FIN PROVEEDORES &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&