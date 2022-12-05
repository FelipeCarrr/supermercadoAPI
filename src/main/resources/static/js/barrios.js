//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& BARRIOS &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
function listarBarrios(){
    
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    fetch("api/barrios",settings)
    .then(response => response.json())
    .then(function(data){
        var barrios ='';
        for(const barrio of data){
          console.log(barrio)
          barrios += '<tr>'+
          '<th scope="row">'+barrio.comuna.cod_comuna+'</th>'+
          '<td>'+barrio.cod_barrio+'</td>'+
          '<td>'+barrio.nombre+'</td>'+
          '<td>'+
            '<button type="button" class="btn btn-danger" onclick="eliminarBarrio(\''+barrio.cod_barrio+'\')"><i class="fa-solid fa-trash"></i></button>'+
            '<a href="#" onclick="traerModificarBarrio(\''+barrio.cod_barrio+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-arrows-rotate"></i></a>'+
            '<a href="#" onclick="verBarrio(\''+barrio.cod_barrio+'\')"class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
          '</td>'+
        '</tr>';
         }
         document.getElementById("listarBarrios").innerHTML=barrios;
    })
}
function traerModificarArticulo(cod_articulo){
    
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

function verBarrio(cod_barrio){
    
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/barrios/"+cod_barrio,settings)
    .then(response => response.json())
    .then(function(barrio){
        
        var cadena='';
        
        if(barrio){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-eye"></i>Visualizar Barrio</h1></div>'+
            '<ul class="list-group">'+
            '<li class="list-group-item">Codigo de la Comuna: '+ barrio.comuna.cod_comuna+'</li>'+
            '<li class="list-group-item">Codigo del Barrio: '+ barrio.cod_barrio+'</li>'+
            '<li class="list-group-item">Nombre del Barrio: '+ barrio.nombre+'</li>'+
            '</ul>'+
            '<br>'
         }
         document.getElementById("contentModal_1").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalBarrio'))
         myModal.toggle();
        
    })
}

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& FIN BARRIOS &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&