package base.restControllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import base.beans.LoginRequest;
import base.beans.LoginResponse;
import base.beans.ErrorResponse;
import base.beans.Users;
import base.repositories.UserRepository;
import base.security.JwtUtil;
import base.security.UserRepositoryUserDetailsService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;



@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("/users")
@Slf4j
public class UserController {
  
  private UserRepository userRepo;
  private PasswordEncoder passwordEncoder;
  private AuthenticationManager authenticationManager;
  private JwtUtil jwtUtil;

  public UserController(UserRepository userRepo, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
    this.userRepo = userRepo;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.jwtUtil = jwtUtil;
  }
  
  public Users toEncodedUser(Users user) {
	    return new Users(
	        user.getUsername(), passwordEncoder.encode(user.getPassword()), 
	        user.getFullname(), user.getStreet(), user.getCity(), user.getState(),
	        user.getZip(), user.getPhoneNumber());
  }
  
  @GetMapping(value="/profile")
  @ResponseBody
  @CrossOrigin(origins = {"http://localhost:4200"})
  public ResponseEntity requestProfile(HttpServletRequest request) {
	  Claims claims = jwtUtil.resolveClaims(request);
	  String username = claims.getSubject();
	  Users user = userRepo.findByUsername(username);
	  return ResponseEntity.ok(user);
  }
  
  
  @ResponseBody
  @CrossOrigin(origins = {"http://localhost:4200"})
  @PostMapping(value="/login")
  public ResponseEntity processLogin(@RequestBody LoginRequest loginRequest) {
	  try {
          Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
          String username = authentication.getName();
          Users user = new Users(username, "", "", "", "", "", "", "");
          String token = jwtUtil.createToken(user);
          LoginResponse loginResponse = new LoginResponse(username,token);

          return ResponseEntity.ok(loginResponse);

      }catch (BadCredentialsException e){
          ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST,"Invalid username or password");
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
      }catch (Exception e){
          ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage());
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
      }
  }
  
  @CrossOrigin(origins = {"http://localhost:4200"})
  @PostMapping(value = "/registration", consumes="application/json")
  @ResponseBody
  public ResponseEntity processRegistration(@RequestBody Users user) {
    userRepo.save(this.toEncodedUser(user));
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }
}
