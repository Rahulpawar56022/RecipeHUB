package com.recipehub.controller;

import com.recipehub.dto.RecipeRequest;
import com.recipehub.model.Recipe;
import com.recipehub.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> searchRecipes(@RequestParam String q) {
        return ResponseEntity.ok(recipeService.searchRecipes(q));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Recipe>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(recipeService.getByCategory(category));
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Recipe>> getPopular() {
        return ResponseEntity.ok(recipeService.getPopularRecipes());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Recipe>> getFeatured() {
        return ResponseEntity.ok(recipeService.getFeaturedRecipes());
    }

    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@RequestBody RecipeRequest request, Authentication auth) {
        return ResponseEntity.ok(recipeService.createRecipe(request, auth.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id, Authentication auth) {
        recipeService.deleteRecipe(id, auth.getName());
        return ResponseEntity.noContent().build();
    }
}
