package com.supermercado.producto.repository;


import com.supermercado.producto.entity.Articulo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticuloRepository extends JpaRepository<Articulo,Long> {
}
