package com.supermercado.producto.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "proveedor")
@Data
public class Proveedor {

    @Id
    @Column(nullable = false, unique = true)
    private long nit;

    @Column(nullable = false, length = 80)
    private String nombre;

    @Column(nullable = false, length = 40)
    private String direccion;

    @Column(nullable = false, length = 15)
    private String celular;

}
