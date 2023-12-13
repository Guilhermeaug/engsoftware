package com.example.application.config;

import com.vaadin.flow.spring.security.VaadinWebSecurity;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig extends VaadinWebSecurity {
    @SneakyThrows
    @Override
    protected void configure(HttpSecurity http)  {
        super.configure(http);
        setLoginView(http, "/login");
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder().username("user").password("password").roles("USER").build();

        return new InMemoryUserDetailsManager(user);
    }

}
