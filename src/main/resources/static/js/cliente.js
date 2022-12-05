//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ CLIENTES $$$$$$$$$$$$$$$$$$$$$$$$$$
function listarClientes(){
    
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
          '<td>'+cliente.barrio.cod_barrio+'</td>'+
          /*'<td>'+producto.cajero.firstName+' '+producto.cajero.lastName+'</td>'+*/
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


function traerModificarCliente(documento){
    
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
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-arrows-rotate"></i>Modificar Productos</h1></div>'+
            '<form action="" method="post" id="myForm">'+
                '<input type="hidden" name="id" id="id" value="'+cliente.documento+'">'+
                '<label for="descripcion" class="form-label">Descripcion</label>'+
                '<input type="text" name="descripcion" class="form-control" id="descripcion" required value="'+cliente.nombre1+'"> <br>'+
                '<label for="talla" class="form-label">Talla</label>'+
                '<input type="text" name="talla" class="form-control" id="talla" required value="'+cliente.nombre2+'"> <br>'+
                '<label for="color" class="form-label">Color</label>'+
                '<input type="text" name="color" class="form-control" id="color" required value="'+cliente.apellido1+'"> <br>'+
                
                '<button type="button" class="btn btn-outline-warning" onclick="modificarCliente(\''+cliente.documento+'\')">Modificar</button>'+
            '</form>';
         }
         document.getElementById("contentModal").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalArticulo'))
         myModal.toggle();
        
    })
}

async function modificarCliente(cod_articulo){
    
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
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-eye"></i>Visualizar Cliente</h1></div>'+
            '<ul class="list-group">'+
            '<li class="list-group-item">Documento: ' +cliente.documento+'</li>'+
            '<li class="list-group-item">Apellidos: '+cliente.nombre1+' '+cliente.nombre2+'</li>'+
            '<li class="list-group-item">Apellidos: '+cliente.apellido1+' '+cliente.apellido2+'</li>'+
            '<li class="list-group-item">Direccion: '+ cliente.direccion+'</li>'+
            '<li class="list-group-item">Sexo: '+ cliente.sexo+'</li>'+
            '<li class="list-group-item">Celular: '+ cliente.celular+'</li>'+
            '<li class="list-group-item">Email: '+cliente.email+'</li>'+
            '<li class="list-group-item">Cod. Comuna: '+cliente.comuna.cod_comuna+'</li>'+
            '<li class="list-group-item">Cod. Barrio: '+cliente.barrio.cod_barrio+'</li>'+
            '</ul>'+
            '<br>'
         }
         console.log
         document.getElementById("contentModal_1").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalCliente'))
         myModal.toggle();
        
    })
}
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ FIN CLIENTES $$$$$$$$$$$$$$$$$$$$$$