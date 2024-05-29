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
public class UpdateUserDto {
    private String newUsername;
    private String newEmail;
    private String newPassword;
    private Role newRole;
}
