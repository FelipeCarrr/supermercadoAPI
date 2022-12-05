package com.supermercado.producto.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "detalle")
@Data
public class Detalle {


    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long consecutivo;

    @Id
    @Column(nullable = false, unique = true, length = 4)
    private long ordinal;

    @ManyToOne
    @JoinColumn(name = "cod_articulo")
    private Articulo articulo;

    @Column(nullable = false)
    private int cantidad;

    @Column(nullable = false)
    private int precio_venta;

    @Column(nullable = false)
    private double subtotal;

    @Column(nullable = false)
    private double descuento;



}
