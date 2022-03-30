package com.supermercado.producto;

import com.supermercado.producto.entity.Producto;
import com.supermercado.producto.repository.ProductoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)

public class ProductoRepositoryTests {
    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private ProductoRepository repository;

    @Test
    public void testCreateProducto(){
        Producto producto = new Producto();
        producto.setCodigoPro(Integer.parseInt("12345"));
        producto.setNombre("Tomate");
        producto.setValorProducto(Double.parseDouble("5000"));
        producto.setTipoProducto("Vegetales");
        producto.setCantidad(Integer.parseInt("2"));

        Producto savedProducto = repository.save(producto);
        Producto existProducto = entityManager.find(Producto.class, savedProducto.getId());
        assertEquals(producto.getCodigoPro(), existProducto.getCodigoPro());
    }
}
