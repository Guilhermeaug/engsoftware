package com.example.application.security;

import com.vaadin.flow.spring.security.VaadinWebSecurity;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig extends VaadinWebSecurity {
    @SneakyThrows
    @Override
    protected void configure(HttpSecurity http) {
        http.authorizeHttpRequests(registry -> {
            registry.requestMatchers(new AntPathRequestMatcher("/**")).permitAll();
            registry.requestMatchers(new AntPathRequestMatcher("/autenticado/**")).authenticated();
        });
        super.configure(http);
        setLoginView(http, "/login");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
