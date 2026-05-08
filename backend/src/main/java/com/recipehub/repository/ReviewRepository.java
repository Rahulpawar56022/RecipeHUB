package com.recipehub.repository;

import com.recipehub.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByRecipeId(Long recipeId);
    List<Review> findByUserId(Long userId);
}
