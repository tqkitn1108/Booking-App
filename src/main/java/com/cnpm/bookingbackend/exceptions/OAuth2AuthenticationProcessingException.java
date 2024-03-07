package com.cnpm.bookingbackend.exceptions;

import org.springframework.security.core.AuthenticationException;

public class OAuth2AuthenticationProcessingException extends AuthenticationException {
    public OAuth2AuthenticationProcessingException(String message){
        super(message);
    }
}
