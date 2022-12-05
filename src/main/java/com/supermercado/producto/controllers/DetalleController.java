package com.supermercado.producto.controllers;


import com.supermercado.producto.entity.Detalle;
import com.supermercado.producto.repository.DetalleRepository;
import com.supermercado.producto.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

//FALTAN LOS METODOS PUT AND DELETE "TENER EN CUENTA" MUESTRA ERROR DE CONSECUTIVO REPETIDO

@RestController
public class DetalleController {

    @Autowired
    private DetalleRepository detalleRepository;

    private Message message = new Message();

    @RequestMapping(value = "api/detalles/{ordinal}", method = RequestMethod.GET)
    public Optional<Detalle> getDetalle(@PathVariable Long ordinal){
        Optional<Detalle> foundDetalle = detalleRepository.findById(ordinal);
        if (foundDetalle.isPresent()){
            return foundDetalle;
        }
        return null;
    }

    @RequestMapping(value = "api/detalles", method = RequestMethod.GET)
    public List<Detalle> listDetalles(){
        System.out.println(detalleRepository.findAll());

        return detalleRepository.findAll();
    }
}
