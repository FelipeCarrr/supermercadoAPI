package com.supermercado.producto.controllers;


import com.supermercado.producto.entity.Cliente;
import com.supermercado.producto.repository.BarrioRepository;
import com.supermercado.producto.repository.ClienteRepository;
import com.supermercado.producto.repository.ComunaRepository;
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
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ComunaRepository comunaRepository;

    @Autowired
    private BarrioRepository barrioRepository;

    private Message message = new Message();

    @RequestMapping(value = "api/clientes/{documento}", method = RequestMethod.GET)
    public Optional<Cliente> getCliente(@PathVariable Long documento){
        Optional<Cliente> foundCliente = clienteRepository.findById(documento);
        if (foundCliente.isPresent()){
            return foundCliente;
        }
        return null;
    }

    @RequestMapping(value = "api/clientes", method = RequestMethod.GET)
    public List<Cliente> listClientes(){
        System.out.println(clienteRepository.findAll());

        return clienteRepository.findAll();
    }

    @RequestMapping(value = "api/clientes/{documento}", method = RequestMethod.PUT)
    public ResponseEntity editCliente(@RequestBody Cliente newCliente, @PathVariable Long documento){
        Map<String, String> response = new HashMap<>();
        try {
            Cliente cliente = clienteRepository.findById(documento).get();
            cliente.setDocumento(newCliente.getDocumento());
            cliente.setNombre1(newCliente.getNombre1());
            cliente.setNombre2(newCliente.getNombre2());
            cliente.setApellido1(newCliente.getApellido1());
            cliente.setApellido2(newCliente.getApellido2());
            cliente.setDireccion(newCliente.getDireccion());
            cliente.setSexo(newCliente.getSexo());
            cliente.setCelular(newCliente.getCelular());
            cliente.setEmail(newCliente.getEmail());
            cliente.setComuna(newCliente.getComuna());
            cliente.setBarrio(newCliente.getBarrio());
            clienteRepository.save(cliente);

            return message.viewMessage(HttpStatus.OK,"success","Client edit success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","Client not found!");
        }
    }

}
