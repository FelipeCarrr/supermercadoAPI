package com.supermercado.producto.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "barrio")
public class Barrio {

    @ManyToOne
    @JoinColumn(name = "cod_comuna")
    private Comuna comuna;

    @Id
    @Column(nullable = false, unique = true, length = 5)
    private long cod_barrio;

    @Column(nullable = false, length = 40)
    private String nombre;


}
