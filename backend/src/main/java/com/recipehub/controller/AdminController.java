package com.recipehub.controller;

import com.recipehub.model.Recipe;
import com.recipehub.model.User;
import com.recipehub.repository.RecipeRepository;
import com.recipehub.repository.UserRepository;
import com.recipehub.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final RecipeService recipeService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalRecipes", recipeRepository.count());
        stats.put("pendingRecipes", recipeRepository.findByApprovedFalse().size());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/recipes/pending")
    public ResponseEntity<List<Recipe>> getPendingRecipes() {
        return ResponseEntity.ok(recipeService.getPendingRecipes());
    }

    @PutMapping("/recipes/{id}/approve")
    public ResponseEntity<Recipe> approveRecipe(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.approveRecipe(id));
    }
}
