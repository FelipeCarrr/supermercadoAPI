package com.supermercado.producto.controllers;


import com.supermercado.producto.entity.Barrio;
import com.supermercado.producto.repository.BarrioRepository;
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
public class BarrioController {

    @Autowired
    private BarrioRepository barrioRepository;

    private Message message = new Message();

    @RequestMapping(value = "api/barrios/{cod_barrio}", method = RequestMethod.GET)
    public Optional<Barrio> getBarrio(@PathVariable Long cod_barrio){
        Optional<Barrio> foundBarrio = barrioRepository.findById(cod_barrio);
        if (foundBarrio.isPresent()){
            return foundBarrio;
        }
        return null;
    }

    @RequestMapping(value = "api/barrios", method = RequestMethod.GET)
    public List<Barrio> listBarrios(){
        System.out.println(barrioRepository.findAll());

        return barrioRepository.findAll();
    }

    @RequestMapping(value = "api/barrios/{cod_barrio}", method = RequestMethod.PUT)
    public ResponseEntity editBarrio(@RequestBody Barrio newBarrio, @PathVariable Long cod_barrio){
        Map<String, String> response = new HashMap<>();
        try {
            Barrio barrio = barrioRepository.findById(cod_barrio).get();
            barrio.setComuna(newBarrio.getComuna());
            barrio.setCod_barrio(newBarrio.getCod_barrio());
            barrio.setNombre(newBarrio.getNombre());
            barrioRepository.save(barrio);

            return message.viewMessage(HttpStatus.OK,"success","Barrio edit success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Barrio not found!");
        }
    }

}
