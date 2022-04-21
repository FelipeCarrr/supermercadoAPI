package com.supermercado.producto.controllers;

import com.supermercado.producto.entity.Producto;
import com.supermercado.producto.repository.ProductoRepository;
import com.supermercado.producto.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController

public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;
    private Message message = new Message();

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

    @RequestMapping(value = "api/productos/{id}", method = RequestMethod.PUT)
    public ResponseEntity editProducto(@RequestBody Producto newProducto, @PathVariable Long id){
        Map<String, String> response = new HashMap<>();
        try {
            Producto producto = productoRepository.findById(id).get();
            producto.setCodigoPro(newProducto.getCodigoPro());
            producto.setNombre(newProducto.getNombre());
            producto.setValorProducto(newProducto.getValorProducto());
            producto.setTipoProducto(newProducto.getTipoProducto());
            producto.setCantidad(newProducto.getCantidad());
            productoRepository.save(producto);

            return message.viewMessage(HttpStatus.OK,"success","product edit success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Product not found!");
        }
    }
    @RequestMapping(value = "api/productos/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteProducto(@PathVariable Long id){
        Map<String, String> response = new HashMap<>();
        try {
            Producto producto = productoRepository.findById(id).get();
            productoRepository.delete(producto);
            return message.viewMessage(HttpStatus.OK,"success","Product delete success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Product not found!");
        }


    }
}
