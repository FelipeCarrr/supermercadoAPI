package com.supermercado.producto.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name ="cliente")
@Data
public class Cliente {

    @Id
    @Column(nullable = false, unique = true,length = 15)
    private long documento;

    @Column(nullable = false, length = 15)
    private String nombre1;

    @Column(nullable = false, length = 15)
    private String nombre2;

    @Column(nullable = false, length = 15)
    private String apellido1;

    @Column(nullable = false, length = 15)
    private String apellido2;

    @Column(nullable = false, length = 50)
    private String direccion;

    @Column(nullable = false, length = 15)
    private char sexo;

    @Column(nullable = false, length = 15)
    private long celular;

    @Column(nullable = false, length = 45)
    private String email;

    @ManyToOne
    @JoinColumn (name = "cod_comuna")
    private Comuna comuna;

    @ManyToOne
    @JoinColumn (name = "cod_barrio")
    private Barrio barrio;






}
