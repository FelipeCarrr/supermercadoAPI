package com.supermercado.producto.controllers;


import com.supermercado.producto.entity.Comuna;
import com.supermercado.producto.repository.ComunaRepository;
import com.supermercado.producto.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController

public class ComunaController {

    @Autowired
    private ComunaRepository comunaRepository;

    private Message message = new Message();

    @RequestMapping(value = "api/comunas/{cod_comuna}", method = RequestMethod.GET)
    public Optional<Comuna> getComuna(@PathVariable Long cod_comuna){
        Optional<Comuna> foundComuna = comunaRepository.findById(cod_comuna);
        if (foundComuna.isPresent()){
            return foundComuna;
        }
        return null;
    }

    @RequestMapping(value = "api/comunas", method = RequestMethod.POST)
    public ResponseEntity createComuna(@RequestBody Comuna comuna){
        Map<String,String> response = new LinkedHashMap<>();
        try{
            comunaRepository.save(comuna);
            return message.viewMessage(HttpStatus.OK,"success","Create comuna success!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.INTERNAL_SERVER_ERROR,"error","An error occurred while creating the comuna!");
        }

    }

    @RequestMapping(value = "api/comunas", method = RequestMethod.GET)
    public List<Comuna> listComunas(){
        System.out.println(comunaRepository.findAll());

        return comunaRepository.findAll();
    }

    @RequestMapping(value = "api/comunas/{cod_comuna}", method = RequestMethod.PUT)
    public ResponseEntity editComuna(@RequestBody Comuna newComuna, @PathVariable Long cod_comuna){
        Map<String, String> response = new HashMap<>();
        try {
            Comuna comuna = comunaRepository.findById(cod_comuna).get();
            comuna.setCod_comuna(newComuna.getCod_comuna());
            comuna.setNombre(newComuna.getNombre());
            comuna.setKms_s(newComuna.getKms_s());
            comunaRepository.save(comuna);

            return message.viewMessage(HttpStatus.OK,"success","Comuna edit success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Comuna not found!");
        }
    }
    @RequestMapping(value = "api/comunas/{cod_comuna}", method = RequestMethod.DELETE)
    public ResponseEntity deleteComuna(@PathVariable Long cod_comuna){
        Map<String, String> response = new HashMap<>();
        try {
            Comuna comuna = comunaRepository.findById(cod_comuna).get();
            comunaRepository.delete(comuna);
            return message.viewMessage(HttpStatus.OK,"success","Comuna delete success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Comuna not found!");
        }


    }
}
