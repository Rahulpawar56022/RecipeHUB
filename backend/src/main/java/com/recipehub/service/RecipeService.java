package com.recipehub.service;

import com.recipehub.dto.RecipeRequest;
import com.recipehub.model.*;
import com.recipehub.repository.RecipeRepository;
import com.recipehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findByApprovedTrue();
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
    }

    public List<Recipe> searchRecipes(String query) {
        return recipeRepository.searchRecipes(query);
    }

    public List<Recipe> getByCategory(String category) {
        Recipe.Category cat = Recipe.Category.valueOf(category.toUpperCase());
        return recipeRepository.findByCategory(cat);
    }

    public List<Recipe> getPopularRecipes() {
        return recipeRepository.findPopularRecipes();
    }

    public List<Recipe> getFeaturedRecipes() {
        return recipeRepository.findByFeaturedTrue();
    }

    public List<Recipe> getUserRecipes(Long userId) {
        return recipeRepository.findByUserId(userId);
    }

    @Transactional
    public Recipe createRecipe(RecipeRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Recipe recipe = Recipe.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .videoUrl(request.getVideoUrl())
                .prepTime(request.getPrepTime())
                .cookTime(request.getCookTime())
                .difficulty(Recipe.Difficulty.valueOf(request.getDifficulty().toUpperCase()))
                .servings(request.getServings())
                .calories(request.getCalories())
                .protein(request.getProtein())
                .carbs(request.getCarbs())
                .fat(request.getFat())
                .category(Recipe.Category.valueOf(request.getCategory().toUpperCase()))
                .cuisine(request.getCuisine())
                .tags(request.getTags())
                .user(user)
                .build();

        if (request.getIngredients() != null) {
            List<Ingredient> ingredients = request.getIngredients().stream()
                    .map(dto -> Ingredient.builder()
                            .name(dto.getName())
                            .quantity(dto.getQuantity())
                            .unit(dto.getUnit())
                            .recipe(recipe)
                            .build())
                    .collect(Collectors.toList());
            recipe.setIngredients(ingredients);
        }

        if (request.getSteps() != null) {
            List<Step> steps = request.getSteps().stream()
                    .map(dto -> Step.builder()
                            .stepNumber(dto.getStepNumber())
                            .title(dto.getTitle())
                            .instruction(dto.getInstruction())
                            .recipe(recipe)
                            .build())
                    .collect(Collectors.toList());
            recipe.setSteps(steps);
        }

        return recipeRepository.save(recipe);
    }

    @Transactional
    public void deleteRecipe(Long id, String userEmail) {
        Recipe recipe = getRecipeById(id);
        if (!recipe.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Not authorized to delete this recipe");
        }
        recipeRepository.delete(recipe);
    }

    // Admin methods
    public List<Recipe> getPendingRecipes() {
        return recipeRepository.findByApprovedFalse();
    }

    @Transactional
    public Recipe approveRecipe(Long id) {
        Recipe recipe = getRecipeById(id);
        recipe.setApproved(true);
        return recipeRepository.save(recipe);
    }
}
