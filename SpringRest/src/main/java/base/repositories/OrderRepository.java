package base.repositories;

import org.springframework.data.repository.CrudRepository;

import base.beans.Order;
import base.beans.Users;

public interface OrderRepository extends CrudRepository<Order, Long>{
	
	Iterable<Order> findByUsername(String username);

}
