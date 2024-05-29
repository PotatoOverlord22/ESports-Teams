package com.emp.esports.controllers;

import com.emp.esports.dtos.AddUserWithRoleDto;
import com.emp.esports.dtos.UpdateUserDto;
import com.emp.esports.models.entities.User;
import com.emp.esports.models.exceptions.NotFound;
import com.emp.esports.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {
    private final UserService userService;

    @PostMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addUserWithRole(@RequestBody AddUserWithRoleDto newUser) {
        try {
            userService.addUserWithRole(newUser);
            return ResponseEntity.ok("Added user successfully");
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        }
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserPage(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int pageSize) {
        try {
            Page<User> paginatedUsers = userService.getUsersPage(page - 1, pageSize);
            return ResponseEntity.ok().body(paginatedUsers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not get users: " + e.getMessage());
        }
    }

    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Integer userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok().body("User deleted successfully");
        } catch (NotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Couldn't delete user: " + e.getMessage());
        }
    }

    @PutMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable Integer userId, @RequestBody UpdateUserDto updateUserDto) {
        try {
            userService.updateUser(userId, updateUserDto);
            return ResponseEntity.ok().body(userService.getUserById(userId));
        } catch (NotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Couldn't update user: " + e.getMessage());
        }
    }
}
