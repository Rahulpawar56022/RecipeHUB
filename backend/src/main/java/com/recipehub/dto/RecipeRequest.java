package com.recipehub.dto;

import lombok.Data;
import java.util.List;

@Data
public class RecipeRequest {
    private String title;
    private String description;
    private String imageUrl;
    private String videoUrl;
    private String prepTime;
    private String cookTime;
    private String difficulty;
    private Integer servings;
    private Integer calories;
    private String protein;
    private String carbs;
    private String fat;
    private String category;
    private String cuisine;
    private List<IngredientDto> ingredients;
    private List<StepDto> steps;
    private List<String> tags;

    @Data
    public static class IngredientDto {
        private String name;
        private String quantity;
        private String unit;
    }

    @Data
    public static class StepDto {
        private Integer stepNumber;
        private String title;
        private String instruction;
    }
}
