package com.supermercado.producto.controllers;


import com.supermercado.producto.entity.Cliente;
import com.supermercado.producto.entity.Factura;
import com.supermercado.producto.entity.Proveedor;
import com.supermercado.producto.repository.ClienteRepository;
import com.supermercado.producto.repository.FacturaRepository;
import com.supermercado.producto.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//FALTAN LOS METODOS PUT AND DELETE "TENER EN CUENTA"

@RestController
public class FacturaController {

    @Autowired
    private FacturaRepository facturaRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    private Message message = new Message();

    @RequestMapping(value = "api/facturas/{consecutivo}", method = RequestMethod.GET)
    public Optional<Factura> getFactura(@PathVariable Long consecutivo){
        Optional<Factura> foundFactura = facturaRepository.findById(consecutivo);
        if (foundFactura.isPresent()){
            return foundFactura;
        }
        return null;
    }

    @RequestMapping(value = "api/facturas/{id_documento}", method = RequestMethod.POST)
    public ResponseEntity createFactura(@RequestBody Factura factura, @PathVariable Long id_documento){
        try {
            Cliente documento = clienteRepository.getById(id_documento);
            factura.setDocumento(documento);
            facturaRepository.save(factura);
            return message.viewMessage(HttpStatus.OK,"success","Factura generated success!!");

        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Factura not found!");
        }



    }

    @RequestMapping(value = "api/facturas/{consecutivo}", method = RequestMethod.DELETE)
    public ResponseEntity deleteFactura(@PathVariable Long consecutivo){
        Map<String, String> response = new HashMap<>();
        try {
            Factura factura = facturaRepository.findById(consecutivo).get();
            facturaRepository.delete(factura);
            return message.viewMessage(HttpStatus.OK,"success","Factura delete success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Factura not found!");
        }


    }

    @RequestMapping(value = "api/facturas", method = RequestMethod.GET)
    public List<Factura> listFacturas(){
        System.out.println(facturaRepository.findAll());

        return facturaRepository.findAll();
    }
}
