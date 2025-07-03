package com.hotel.booking.service;

import com.hotel.booking.dto.ProfileResponse;
import com.hotel.booking.dto.ProfileUpdateRequest;
import com.hotel.booking.entity.User;
import com.hotel.booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    public ProfileResponse getProfile(Authentication authentication) {
        User user = (User) authentication.getPrincipal(); // ✅ lấy object User
        return toDto(user);
    }

    public ProfileResponse updateProfile(Authentication authentication, ProfileUpdateRequest request) {
        User user = (User) authentication.getPrincipal(); // ✅
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        return toDto(userRepository.save(user));
    }

    private ProfileResponse toDto(User user) {
        ProfileResponse dto = new ProfileResponse();
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole());
        return dto;
    }
}

