//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& DETALLES &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
function listarFacturas(){
    
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    fetch("api/facturas",settings)
    .then(response => response.json())
    .then(function(data){
        var facturas ='';
        for(const factura of data){
          console.log(factura)
          facturas += '<tr>'+
          '<th scope="row">'+factura.consecutivo+'</th>'+
          '<td>'+factura.fecha+'</td>'+
          '<td>'+factura.documento.documento+'</td>'+
          '<td>'+factura.descuento+'</td>'+
          '<td>'+factura.total+'</td>'+
          '<td>'+
            '<button type="button" class="btn btn-danger" onclick="eliminarComuna(\''+factura.consecutivo+'\')"><i class="fa-solid fa-trash"></i></button>'+
            '<a href="#" onclick="traerModificarComuna(\''+factura.consecutivo+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-arrows-rotate"></i></a>'+
            '<a href="#" onclick="verFactura(\''+factura.consecutivo+'\')"class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
          '</td>'+
        '</tr>';
         }
         document.getElementById("listarFacturas").innerHTML=facturas;
    })
}

async function sendFactura(path){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        if(k !="documento"){
            jsonData[k] = v;
        }
        
    }
    var id_documento = document.getElementById("documento").value;
    const request = await fetch(path+"/"+id_documento, {
        method: jsonData["metodo"],
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    console.log(await request.text())
}
function traerModificarComuna(cod_comuna){
    
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/comunas/"+cod_comuna,settings)
    .then(response => response.json())
    .then(function(comuna){
        
        var cadena='';
        
        if(comuna){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-arrows-rotate"></i>Modificar Comuna</h1></div>'+
            '<form action="" method="post" id="myForm">'+
                '<input type="hidden" name="id" id="id" value="'+comuna.cod_comuna+'">'+
                '<label for="nombe" class="form-label">Nombre de la Comuna</label>'+
                '<input type="text" name="nombre" class="form-control" id="nombre" required value="'+comuna.nombre+'"> <br>'+
                '<label for="kms_s" class="form-label">KMS_2</label>'+
                '<input type="text" name="kms_2" class="form-control" id="kms_s" required value="'+comuna.kms_s+'"> <br>'+
                
                '<button type="button" class="btn btn-outline-warning" onclick="modificarComuna(\''+comuna.cod_comuna+'\')">Modificar</button>'+
            '</form>';
         }
         document.getElementById("contentModal").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalComuna'))
         myModal.toggle();
        
    })
}

async function modificarComuna(cod_comuna){
    
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/comunas/"+cod_comuna, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listarComunas();
    alertas("Se ha modificado la Comuna Exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalComuna')
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
        alertas("Se ha Eliminado el producto Exitosamente!",2)
    })
}

function verFactura(cod_comuna){
    
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/facturas/"+consecutivo,settings)
    .then(response => response.json())
    .then(function(factura){
        
        var cadena='';
        
        if(factura){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-eye"></i>Visualizar Factura</h1></div>'+
            '<ul class="list-group">'+
            '<li class="list-group-item">Consecutivo: '+ factura.consecutivo+'</li>'+
            '<li class="list-group-item">Fecha de la factura: '+ comuna.nombre+'</li>'+
            '<li class="list-group-item">KMS_2: '+ comuna.kms_s+'</li>'+
            '</ul>'+
            '<br>'
         }
         document.getElementById("contentModal_1").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalComuna'))
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

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& FIN COMUNAS &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&