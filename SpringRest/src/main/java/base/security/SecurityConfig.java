package base.security;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.Filter;


@Configuration
@EnableWebSecurity
public class SecurityConfig{

  @Autowired
  private UserDetailsService userDetailsService;
    

  @Bean
  public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
      AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
      authenticationManagerBuilder.userDetailsService(userDetailsService);
      return authenticationManagerBuilder.build();
  }


  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	  
          http.cors().and().csrf().disable()
                  .authorizeHttpRequests((authorize) -> authorize
                          .requestMatchers("/", "/users/login", "users/registration").permitAll().anyRequest().authenticated()
                  )
                  .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                  .and().addFilterBefore(new JwtAuthorizationFilter(new JwtUtil(), new ObjectMapper() ), UsernamePasswordAuthenticationFilter.class);

                  
          return http.build();
   

  }
}

