package com.emp.esports.security;

import com.emp.esports.dtos.AuthenticationRequest;
import com.emp.esports.dtos.RegisterRequest;
import com.emp.esports.security.AuthenticationService;
import com.emp.esports.utils.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody RegisterRequest request
    ) {
        // TODO proper exception handling
        try {
            return ResponseEntity.ok(authenticationService.register(request, Role.USER));
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> registerUser(
            @RequestBody AuthenticationRequest request
    ) {
        // TODO proper exception handling
        try {
            return ResponseEntity.ok(authenticationService.authenticate(request));
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        }
    }
}
