package com.recipehub.controller;

import com.recipehub.dto.AIRecipeRequest;
import com.recipehub.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateRecipe(@RequestBody AIRecipeRequest request) {
        return ResponseEntity.ok(aiService.generateRecipe(request.getIngredients()));
    }
}
