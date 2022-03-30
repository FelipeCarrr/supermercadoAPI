package com.supermercado.producto.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "producto")
@Data
public class Producto {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(nullable = false, unique = true, length = 10)
    private int codigoPro;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(nullable = false, length = 10)
    private double valorProducto;

    @Column(nullable = false,length = 50)
    private String tipoProducto;

    @Column(nullable = false, length = 10)
    private int cantidad;


}
