package base.repositories;
import org.springframework.data.repository.CrudRepository;
import base.beans.Users;

public interface UserRepository extends CrudRepository<Users, Long> {

  Users findByUsername(String username);
  
}
