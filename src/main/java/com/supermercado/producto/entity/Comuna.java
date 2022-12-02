package com.supermercado.producto.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "comuna")
@Data
public class Comuna {
    @Id
    @Column(nullable = false, unique = true, length = 2)
    private long cod_comuna;

    @Column(nullable = false, length = 40)
    private String nombre;

    @Column(nullable = true)
    private double kms_s;
}