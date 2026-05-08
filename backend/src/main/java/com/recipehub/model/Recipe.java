package com.recipehub.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String imageUrl;
    private String videoUrl;
    private String prepTime;
    private String cookTime;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private Integer servings;
    private Integer calories;
    private String protein;
    private String carbs;
    private String fat;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String cuisine;

    @Builder.Default
    private Boolean approved = false;

    @Builder.Default
    private Boolean featured = false;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingredient> ingredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("stepNumber ASC")
    private List<Step> steps;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @ElementCollection
    @CollectionTable(name = "recipe_tags", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "tag")
    private List<String> tags;

    public enum Difficulty { EASY, MEDIUM, HARD }
    public enum Category { VEG, NON_VEG, DESSERTS, HEALTHY, FAST_FOOD }
}
