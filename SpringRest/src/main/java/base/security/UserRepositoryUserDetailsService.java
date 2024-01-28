package base.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import base.beans.Users;
import base.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
public class UserRepositoryUserDetailsService implements UserDetailsService {
	
  private UserRepository userRepo;

  @Autowired
  public UserRepositoryUserDetailsService(UserRepository userRepo) {
    this.userRepo = userRepo;
  }
  
  @Override
  public UserDetails loadUserByUsername(String username)throws UsernameNotFoundException {
    Users user = userRepo.findByUsername(username);
    if (user != null) {
      log.info(user.getFullname());
      return user;
    }
    throw new UsernameNotFoundException("User '" + username + "' not found");
  }

}
