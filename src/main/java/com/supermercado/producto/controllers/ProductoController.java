package com.supermercado.producto.controllers;

import com.supermercado.producto.entity.Producto;
import com.supermercado.producto.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController

public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @RequestMapping(value = "api/productos/{id}", method = RequestMethod.GET)
    public ResponseEntity<Producto> getProducto(@PathVariable Long id){
        Optional<Producto> foundProducto = productoRepository.findById(id);
        if (foundProducto.isPresent()){
            return ResponseEntity.ok(foundProducto.get());
        }
        Map<String,String> errorResponse = new LinkedHashMap<>();
        errorResponse.put("error","Not found");
        errorResponse.put("message", "Producto not found");
        errorResponse.put("status", HttpStatus.NOT_FOUND.toString());
        return new ResponseEntity(errorResponse, HttpStatus.NOT_FOUND);

    }
    @RequestMapping(value = "api/productos", method = RequestMethod.POST)
    public Producto createProducto(@RequestBody Producto producto){
        return productoRepository.save(producto);
    }

    @RequestMapping(value = "api/productos", method = RequestMethod.GET)
    public List<Producto> listProductos(){

        return productoRepository.findAll();
    }
}
