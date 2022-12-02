package com.supermercado.producto.repository;


import com.supermercado.producto.entity.Comuna;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComunaRepository extends JpaRepository<Comuna,Long> {
}
