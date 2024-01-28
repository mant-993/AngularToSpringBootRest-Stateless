package base.restControllers;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import base.beans.Product;
import base.repositories.ProductRepository;

@RestController
@RequestMapping(path="/api/products",
                produces="application/json")
public class ProductApiController {
	
	private ProductRepository repo;

	  public ProductApiController(ProductRepository repo) {
	    this.repo = repo;
	  }

	  @GetMapping(produces="application/json")
	  public Iterable<Product> allProducts() {
	    return repo.findAll();
	  }

	  @PostMapping(consumes="application/json")
	  @ResponseStatus(HttpStatus.CREATED)
	  public Product postProduct(@RequestBody Product product) {
	    return repo.save(product);
	  }

	  @PutMapping(path="/{productId}", consumes="application/json")
	  public Product putProduct(
	                        @PathVariable("productId") Long productId,
	                        @RequestBody Product product) {
		  product.setId(productId);
	    return repo.save(product);
	  }

	  

	  @DeleteMapping("/{productId}")
	  @ResponseStatus(HttpStatus.NO_CONTENT)
	  public void deleteProduct(@PathVariable("productId") Long productId) {
	    try {
	      repo.deleteById(productId);
	    } catch (EmptyResultDataAccessException e) {
	    	e.printStackTrace();
	    }
	  }

}
