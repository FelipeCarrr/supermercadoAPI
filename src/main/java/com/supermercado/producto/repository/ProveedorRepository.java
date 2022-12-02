package com.supermercado.producto.repository;



import com.supermercado.producto.entity.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProveedorRepository extends JpaRepository<Proveedor,Long> {
}
