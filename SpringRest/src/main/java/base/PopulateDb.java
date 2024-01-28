/*

package base;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

import org.hibernate.mapping.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import base.beans.Order;
import base.beans.Product;
import base.beans.Users;
import base.repositories.OrderRepository;
import base.repositories.ProductRepository;
import base.repositories.UserRepository;

@Profile("!••••••••prod")
@Configuration
public class PopulateDb {
	
	@Bean
	  public CommandLineRunner dataLoader(ProductRepository pRepo, UserRepository uRepo, PasswordEncoder encoder, OrderRepository oRepo) {
	    return args -> {
	      Product p1 = new Product("Flour Tortilla", 12.50);
	      Product p2 = new Product("Macarone", 7.99);
	      Product p3 = new Product("Jumbo Jet", 20000000.00);
	      Product p4 = new Product("Van Gogh n°213", 150000.00);
	      Product p5 = new Product("Pizza Wurstel", 5.99);
	      Product p6 = new Product("Venditti Chair", 25.00);
	      Product p7 = new Product("Velux MX", 3500.00);
	      Product p8 = new Product("Desk Lamp", 15.00);
	      Product p9 = new Product("Dog Synthetizer", 20.15);
	      Product p10 = new Product("Book of Ra", 25.67);
	      
	      
	      
	      pRepo.save(p1);
	      pRepo.save(p2);
	      pRepo.save(p3);
	      pRepo.save(p4);
	      pRepo.save(p5);
	      pRepo.save(p6);
	      pRepo.save(p7);
	      pRepo.save(p8);
	      pRepo.save(p9);
	      pRepo.save(p10);


	      Users u1 = new Users("habuma", encoder.encode("password"),
	          "Craig Walls", "123 North Street", "Cross Roads", "TX",
	          "76227", "123-123-1234");
	      uRepo.save(u1);
	      
	      ArrayList<Product> a1 = new ArrayList<Product>(Arrays.asList(p1, p2, p2, p6));

	      
	      Order o1 = new Order(u1.getUsername(), a1);	      
	      oRepo.save(o1);

	    };
	  }

}*/





