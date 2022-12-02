package com.supermercado.producto.controllers;


import com.supermercado.producto.entity.Proveedor;
import com.supermercado.producto.repository.ProveedorRepository;
import com.supermercado.producto.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class ProveedorController {

    @Autowired
    private ProveedorRepository proveedorRepository;

    private Message message = new Message();

    @RequestMapping(value = "api/proveedores/{nit}", method = RequestMethod.GET)
    public Optional<Proveedor> getProveedor(@PathVariable Long nit){
        Optional<Proveedor> foundProveedor = proveedorRepository.findById(nit);
        if (foundProveedor.isPresent()){
            return foundProveedor;
        }
        return null;
    }

    @RequestMapping(value = "api/proveedores", method = RequestMethod.POST)
    public ResponseEntity createProveedor(@RequestBody Proveedor proveedor){
        Map<String,String> response = new LinkedHashMap<>();
        try{

            proveedorRepository.save(proveedor);
            return message.viewMessage(HttpStatus.OK,"success","Proveedor created success!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.INTERNAL_SERVER_ERROR,"error","An error occurred while creating the proveedor!");
        }

    }

    @RequestMapping(value = "api/proveedores", method = RequestMethod.GET)
    public List<Proveedor> listProveedores(){
        System.out.println(proveedorRepository.findAll());

        return proveedorRepository.findAll();
    }

    @RequestMapping(value = "api/proveedores/{nit}", method = RequestMethod.PUT)
    public ResponseEntity editProveedor(@RequestBody Proveedor newProveedor, @PathVariable Long nit){
        Map<String, String> response = new HashMap<>();
        try {
            Proveedor proveedor = proveedorRepository.findById(nit).get();
            proveedor.setNit(newProveedor.getNit());
            proveedor.setNombre(newProveedor.getNombre());
            proveedor.setDireccion(newProveedor.getDireccion());
            proveedor.setCelular(newProveedor.getCelular());
            proveedorRepository.save(proveedor);

            return message.viewMessage(HttpStatus.OK,"success","Proveedor edit success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Proveedor not found!");
        }
    }
    @RequestMapping(value = "api/proveedores/{nit}", method = RequestMethod.DELETE)
    public ResponseEntity deleteProveedor(@PathVariable Long nit){
        Map<String, String> response = new HashMap<>();
        try {
            Proveedor proveedor = proveedorRepository.findById(nit).get();
            proveedorRepository.delete(proveedor);
            return message.viewMessage(HttpStatus.OK,"success","Proveedor delete success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Proveedor not found!");
        }


    }
}
