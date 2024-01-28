package base.restControllers;

import java.util.Optional;

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

import base.beans.Order;
import base.repositories.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(path="/api/orders",
                produces="application/json")
public class OrderApiController {
	
	private OrderRepository repo;

	  public OrderApiController(OrderRepository repo) {
	    this.repo = repo;
	  }

	  @GetMapping(produces="application/json")
	  public Iterable<Order> allOrders() {
	    return repo.findAll();
	  }
	  
	  @PostMapping(path="/user", produces="application/json")
	  public Iterable<Order> allOrdersByUsername(@RequestBody String username) {
	    return repo.findByUsername(username);
	  }

	  @PostMapping(consumes="application/json")
	  @ResponseStatus(HttpStatus.CREATED)
	  public Order postOrder(@RequestBody Order order) {
	    return repo.save(order);
	  }

	  @PutMapping(path="/{orderId}", consumes="application/json")
	  public Order putOrder(
	                        @PathVariable("orderId") Long orderId,
	                        @RequestBody Order order) {
	    order.setId(orderId);
	    return repo.save(order);
	  }
	  
	  @GetMapping("/{orderId}")
	  @ResponseStatus(HttpStatus.OK)
	  public Optional<Order> getOrderById(@PathVariable("orderId") Long orderId) {
	      return repo.findById(orderId);
	  }


	  @DeleteMapping("/{orderId}")
	  @ResponseStatus(HttpStatus.NO_CONTENT)
	  public void deleteOrder(@PathVariable("orderId") Long orderId) {
	    try {
	      repo.deleteById(orderId);
	    } catch (EmptyResultDataAccessException e) {
	    	e.printStackTrace();
	    }
	  }

}



