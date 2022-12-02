package com.supermercado.producto.repository;


import com.supermercado.producto.entity.Detalle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetalleRepository extends JpaRepository<Detalle,Long> {
}
