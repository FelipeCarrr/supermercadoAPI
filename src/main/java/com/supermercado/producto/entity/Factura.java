package com.supermercado.producto.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "factura")
@Data
public class Factura {

    @Id
    @Column(nullable = false, unique = true)
    private long consecutivo;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date fecha;

    @ManyToOne
    @JoinColumn(name = "documento")
    private Cliente documento;

    @Column(nullable = false)
    private double descuento;

    @Column(nullable = false)
    private double total;


}
