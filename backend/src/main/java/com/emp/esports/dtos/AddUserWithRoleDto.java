package com.emp.esports.dtos;

import com.emp.esports.utils.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddUserWithRoleDto {
    private String username;
    private String email;
    private String password;
    private Role role;
}
