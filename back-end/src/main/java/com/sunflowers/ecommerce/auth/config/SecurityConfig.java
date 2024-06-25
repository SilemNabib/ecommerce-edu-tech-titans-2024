package com.sunflowers.ecommerce.auth.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.filter.CorsFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static com.sunflowers.ecommerce.auth.entity.Permission.ADMIN_READ;
import static com.sunflowers.ecommerce.auth.entity.Permission.ADMIN_CREATE;
import static com.sunflowers.ecommerce.auth.entity.Permission.ADMIN_UPDATE;
import static com.sunflowers.ecommerce.auth.entity.Permission.ADMIN_DELETE;
import static com.sunflowers.ecommerce.auth.entity.Permission.USER_READ;
import static com.sunflowers.ecommerce.auth.entity.Permission.USER_CREATE;
import static com.sunflowers.ecommerce.auth.entity.Permission.USER_UPDATE;
import static com.sunflowers.ecommerce.auth.entity.Permission.USER_DELETE;
import static com.sunflowers.ecommerce.auth.entity.Role.ADMIN;
import static com.sunflowers.ecommerce.auth.entity.Role.USER;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;
import static org.springframework.http.HttpMethod.GET;

/**
 * Security configuration class for setting up HTTP security and authentication.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;

    private static final String[] PUBLIC_PATHS = new String[] {"/api/v1/auth/**", "/api/v1/country/**", "/api/v1/auth/forgotPwd/**"};
    private static final String[] USER_PATHS = new String[]{"/api/v1/user/**", "/api/v1/cart/**", "/api/v1/product/inventory/**", "/api/v1/order/**", "/api/v1/checkout/**", "/api/v1/product/**", "/api/v1/review/**" };
    private static final String[] ADMIN_PATHS = new String[]{"api/v1/admin/**"};
    /**
     * Configures the security filter chain for HTTP security.
     *
     * @param http the HttpSecurity object to be configured
     * @return the configured SecurityFilterChain
     * @throws Exception if an error occurs during configuration
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(PUBLIC_PATHS).permitAll()

                        .requestMatchers(USER_PATHS).hasAnyRole(USER.name(), ADMIN.name())
                        .requestMatchers(GET, USER_PATHS).hasAnyAuthority(USER_READ.name(), ADMIN_READ.name())
                        .requestMatchers(POST, USER_PATHS).hasAnyAuthority(USER_CREATE.name(), ADMIN_CREATE.name())
                        .requestMatchers(PUT, USER_PATHS).hasAnyAuthority(USER_UPDATE.name(), ADMIN_UPDATE.name())
                        .requestMatchers(DELETE, USER_PATHS).hasAnyAuthority(USER_DELETE.name(), ADMIN_DELETE.name())

                        .requestMatchers(ADMIN_PATHS).hasRole(ADMIN.name())
                        .requestMatchers(GET, ADMIN_PATHS).hasAnyAuthority(ADMIN_READ.name())
                        .requestMatchers(POST, ADMIN_PATHS).hasAnyAuthority(ADMIN_CREATE.name())
                        .requestMatchers(PUT, ADMIN_PATHS).hasAnyAuthority(ADMIN_UPDATE.name())
                        .requestMatchers(DELETE, ADMIN_PATHS).hasAnyAuthority(ADMIN_DELETE.name())

                        .anyRequest().authenticated()
                ).sessionManagement(sessionManagement ->
                        sessionManagement
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}
