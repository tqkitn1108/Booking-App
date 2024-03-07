package com.cnpm.bookingbackend.security;

import com.cnpm.bookingbackend.security.jwt.JwtAuthenticationFilter;
import com.cnpm.bookingbackend.security.oauth2.CustomOAuth2UserService;
import com.cnpm.bookingbackend.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.cnpm.bookingbackend.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.cnpm.bookingbackend.security.oauth2.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Giving us annotations we can use at the controller level to perform role access control
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final CustomOAuth2UserService customOAuth2UserService;
    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Bean
    public SecurityFilterChain securityFilter(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/**", "/api/v1/hotels/**", "/api/v1/business/**", "/api/v1/upload", "/api/v1/bookings/**").permitAll()
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**").permitAll()
                        .requestMatchers("/oauth2/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Permit Preflight Request
                        .anyRequest().authenticated())
                .oauth2Login(oauth -> oauth
                        .authorizationEndpoint(endpoint -> endpoint
                                .baseUri("/oauth2/authorize")
                                .authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository))
                        .redirectionEndpoint(endpoint -> endpoint.baseUri("/oauth2/callback/*"))
                        .userInfoEndpoint(endpoint -> endpoint.userService(customOAuth2UserService))
                        .successHandler(oAuth2AuthenticationSuccessHandler)
                        .failureHandler(oAuth2AuthenticationFailureHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(ex -> ex.authenticationEntryPoint(new RestAuthenticationEntryPoint()))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        var config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of("http://localhost:8080", "http://localhost:3000"));
////        config.setAllowedMethods(List.of("GET","POST","PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"));
////        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
//        config.setAllowedMethods(Collections.singletonList("*"));
//        config.setAllowedHeaders(Collections.singletonList("*"));
//        config.setMaxAge(3600L);
////        config.setAllowCredentials(true);
////        config.setAllowedHeaders(Arrays.asList("Authorization", "Requestor-Type"));
////        config.setExposedHeaders(Arrays.asList("X-Get-Header"));
//
//        var source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }
}
