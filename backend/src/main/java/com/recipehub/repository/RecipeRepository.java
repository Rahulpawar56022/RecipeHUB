package com.recipehub.repository;

import com.recipehub.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByUserId(Long userId);
    List<Recipe> findByCategory(Recipe.Category category);
    List<Recipe> findByApprovedTrue();
    List<Recipe> findByFeaturedTrue();
    List<Recipe> findByApprovedFalse();

    @Query("SELECT r FROM Recipe r WHERE LOWER(r.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(r.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Recipe> searchRecipes(String query);

    @Query("SELECT r FROM Recipe r WHERE r.approved = true ORDER BY SIZE(r.reviews) DESC")
    List<Recipe> findPopularRecipes();
}
