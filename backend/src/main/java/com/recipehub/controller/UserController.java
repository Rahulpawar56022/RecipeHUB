package com.recipehub.controller;

import com.recipehub.model.User;
import com.recipehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(null); // Never expose password
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody Map<String, String> updates, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updates.containsKey("bio")) user.setBio(updates.get("bio"));
        if (updates.containsKey("profilePicture")) user.setProfilePicture(updates.get("profilePicture"));
        if (updates.containsKey("username")) user.setUsername(updates.get("username"));

        userRepository.save(user);
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/{id}/follow")
    public ResponseEntity<String> followUser(@PathVariable Long id, Authentication auth) {
        User currentUser = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        User targetUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        if (!currentUser.getFollowing().contains(targetUser)) {
            currentUser.getFollowing().add(targetUser);
            userRepository.save(currentUser);
        }
        return ResponseEntity.ok("Followed successfully");
    }

    @DeleteMapping("/{id}/follow")
    public ResponseEntity<String> unfollowUser(@PathVariable Long id, Authentication auth) {
        User currentUser = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        User targetUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        currentUser.getFollowing().remove(targetUser);
        userRepository.save(currentUser);
        return ResponseEntity.ok("Unfollowed successfully");
    }
}
