package com.supplify.supplier_to_company.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

//    @Bean
//    public CorsFilter corsFilter() {
//        CorsConfiguration corsConfiguration = new CorsConfiguration();
//
//        // Allow credentials (cookies, authorization headers)
//        corsConfiguration.setAllowCredentials(true);
//
//        // Allow all origins (for development - restrict in production)
//        corsConfiguration.setAllowedOriginPatterns(Arrays.asList("*"));
//
//        // Allowed HTTP methods
//        corsConfiguration.setAllowedMethods(Arrays.asList(
//                "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
//        ));
//
//        // Allowed headers
//        corsConfiguration.setAllowedHeaders(Arrays.asList(
//                "Origin",
//                "Content-Type",
//                "Accept",
//                "Authorization",
//                "X-Requested-With",
//                "Access-Control-Request-Method",
//                "Access-Control-Request-Headers"
//        ));
//
//        // Exposed headers (headers that browser can access)
//        corsConfiguration.setExposedHeaders(Arrays.asList(
//                "Access-Control-Allow-Origin",
//                "Access-Control-Allow-Credentials",
//                "Authorization"
//        ));
//
//        // Max age for preflight requests (1 hour)
//        corsConfiguration.setMaxAge(3600L);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", corsConfiguration);
//
//        return new CorsFilter(source);
//    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration cors = new CorsConfiguration();

        cors.setAllowCredentials(true);
        cors.setAllowedOriginPatterns(List.of("http://localhost:3000"));

        cors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        cors.setAllowedHeaders(List.of("*"));
        cors.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);

        return new CorsFilter(source);
    }

}
