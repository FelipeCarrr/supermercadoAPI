package com.supermercado.producto.controllers;

import com.supermercado.producto.entity.Producto;
import com.supermercado.producto.entity.User;
import com.supermercado.producto.repository.ProductoRepository;
import com.supermercado.producto.repository.UserRepository;
import com.supermercado.producto.util.Message;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController

public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private UserRepository userRepository;
    private Message message = new Message();

    @RequestMapping(value = "api/productos/{id}", method = RequestMethod.GET)
    public Optional<Producto> getProducto(@PathVariable Long id){
        Optional<Producto> foundProducto = productoRepository.findById(id);
        if (foundProducto.isPresent()){
            return foundProducto;
        }
        return null;
    }
    @RequestMapping(value = "api/productos/{id_cajero}", method = RequestMethod.POST)
    public ResponseEntity createProducto(@RequestBody Producto producto,@PathVariable Long id_cajero){
        try {
            User cajero = userRepository.getById(id_cajero);
            producto.setCajero(cajero);
            productoRepository.save(producto);
            return message.viewMessage(HttpStatus.OK,"success","product saved success!!");

        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Cajero not found!");
        }



    }

    @RequestMapping(value = "api/productos", method = RequestMethod.GET)
    public List<Producto> listProductos(){
        System.out.println(productoRepository.findAll());

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
