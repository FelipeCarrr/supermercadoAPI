package com.supermercado.producto.controllers;



import com.supermercado.producto.entity.Articulo;
import com.supermercado.producto.repository.ArticuloRepository;
import com.supermercado.producto.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ArticuloController {

    @Autowired
    private ArticuloRepository articuloRepository;


    private Message message = new Message();

    @RequestMapping(value = "api/articulos/{cod_articulo}", method = RequestMethod.GET)
    public Optional<Articulo> getArticulo(@PathVariable Long cod_articulo){
        Optional<Articulo> foundArticulo = articuloRepository.findById(cod_articulo);
        if (foundArticulo.isPresent()){
            return foundArticulo;
        }
        return null;
    }

    @RequestMapping(value = "api/articulos", method = RequestMethod.GET)
    public List<Articulo> listArticulos(){
        System.out.println(articuloRepository.findAll());

        return articuloRepository.findAll();
    }

    @RequestMapping(value = "api/articulos/{cod_articulo}", method = RequestMethod.PUT)
    public ResponseEntity editArticulo(@RequestBody Articulo newArticulo, @PathVariable Long cod_articulo){
        Map<String, String> response = new HashMap<>();
        try {
            Articulo articulo = articuloRepository.findById(cod_articulo).get();
            articulo.setCod_articulo(newArticulo.getCod_articulo());
            articulo.setDescripcion(newArticulo.getDescripcion());
            articulo.setTalla(newArticulo.getTalla());
            articulo.setColor(newArticulo.getColor());
            articuloRepository.save(articulo);

            return message.viewMessage(HttpStatus.OK,"Success","article edit success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Article not found!");
        }
    }

    @RequestMapping(value = "api/articulo/{cod_articulo}", method = RequestMethod.DELETE)
    public ResponseEntity deleteArticulo(@PathVariable Long cod_articulo){
        Map<String, String> response = new HashMap<>();
        try {
            Articulo articulo = articuloRepository.findById(cod_articulo).get();
            articuloRepository.delete(articulo);
            return message.viewMessage(HttpStatus.OK,"success","Article delete success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Article not found!");
        }


    }
}
