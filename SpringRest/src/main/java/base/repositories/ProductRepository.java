package base.repositories;

import org.springframework.data.repository.CrudRepository;

import base.beans.Product;

public interface ProductRepository extends CrudRepository<Product, Long>{

}
