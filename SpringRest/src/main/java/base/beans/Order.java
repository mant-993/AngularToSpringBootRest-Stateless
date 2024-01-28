package base.beans;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;


@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name="Orders")
public class Order {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="order_id")
	private Long orderId;
	

	@NonNull
	private String username;
	
	@NonNull
	@ManyToMany
	private List<Product> productList;

	private double totalPrice;
	
	private Date placedAt;
	

	public void setId(Long orderId) {
		this.orderId = orderId;
	}
	
	@PrePersist
	void persistDateTotalPrice() {
		this.totalPrice = this.productList.stream().collect(Collectors.groupingBy(Product::getName, Collectors.summingDouble(Product::getPrice))).values().stream().reduce(0.0, (a,b) -> a+b);
	    this.placedAt = new Date();
	}


}


