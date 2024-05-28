package com.emp.esports.services;

import com.emp.esports.dtos.AddUserWithRoleDto;
import com.emp.esports.dtos.RegisterRequest;
import com.emp.esports.dtos.UpdateUserDto;
import com.emp.esports.models.exceptions.NotFound;
import com.emp.esports.security.AuthenticationService;
import com.emp.esports.models.entities.User;
import com.emp.esports.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;

    public void save(User user) {
        // TODO user validation
        userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void addUserWithRole(AddUserWithRoleDto newUserDto) {
        RegisterRequest registerRequest = RegisterRequest.builder()
                .username(newUserDto.getUsername())
                .email(newUserDto.getEmail())
                .password(newUserDto.getPassword())
                .build();
        authenticationService.register(registerRequest, newUserDto.getRole());
    }

    public Page<User> getUsersPage(int page, int pageSize) {
        Pageable pageRequest = PageRequest.of(page, pageSize);
        return userRepository.findAll(pageRequest);
    }

    public void deleteUser(Integer userId) throws NotFound {
        if (!userRepository.existsById(userId))
            throw new NotFound("Could not find user with id " + userId);
        userRepository.deleteById(userId);
    }

    public User updateUser(Integer userId, UpdateUserDto updateUserDto) throws NotFound {
        Optional<User> maybeUser = userRepository.findById(userId);
        if (maybeUser.isPresent()) {
            // TODO validation
            User user = maybeUser.get();
            user.setUsername(updateUserDto.getNewUsername());
            user.setPassword(updateUserDto.getNewPassword());
            user.setEmail(updateUserDto.getNewEmail());
            user.setRole(updateUserDto.getNewRole());

            userRepository.save(user);
            return user;
        }
        throw new NotFound("Could not find user with id " + userId);
    }

    public User getUserById(Integer userId) throws NotFound {
        if (!userRepository.existsById(userId))
            throw new NotFound("Could not find user with id " + userId);
        return userRepository.findById(userId).get();
    }
}
