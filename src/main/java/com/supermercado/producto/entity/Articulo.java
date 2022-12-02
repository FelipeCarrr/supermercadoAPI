package com.supermercado.producto.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "articulo")
@Data
public class Articulo {

    @Id
    @Column(nullable = false, unique = true, length = 4)
    private long cod_articulo;

    @Column(nullable = true, length = 100)
    private String descripcion;

    @Column(nullable = false)
    private long valor;

    @Column(nullable = false, length = 3)
    private String talla;

    @Column(nullable = false, length = 20)
    private String color;

    @ManyToOne
    @JoinColumn(name = "nit")
    private Proveedor nit;

}
