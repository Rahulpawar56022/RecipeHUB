package com.recipehub.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AIService {

    @Value("${openai.api.key:sk-placeholder}")
    private String apiKey;

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    public Map<String, Object> generateRecipe(List<String> ingredients) {
        // If no API key configured, return mock response
        if (apiKey.equals("sk-placeholder") || apiKey.isEmpty()) {
            return getMockRecipe(ingredients);
        }

        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            String prompt = "Generate a recipe using these ingredients: " + String.join(", ", ingredients) +
                    ". Return JSON with fields: name, ingredients (array of strings), steps (array of strings), " +
                    "nutrition (object with calories, protein, carbs, fat), cookTime, difficulty.";

            Map<String, Object> body = new HashMap<>();
            body.put("model", "gpt-3.5-turbo");
            body.put("messages", List.of(
                    Map.of("role", "system", "content", "You are a professional chef. Return only valid JSON."),
                    Map.of("role", "user", "content", prompt)
            ));
            body.put("max_tokens", 800);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.exchange(OPENAI_URL, HttpMethod.POST, entity, Map.class);

            return response.getBody();
        } catch (Exception e) {
            return getMockRecipe(ingredients);
        }
    }

    private Map<String, Object> getMockRecipe(List<String> ingredients) {
        Map<String, Object> result = new HashMap<>();
        result.put("name", "Delicious " + String.join(" & ", ingredients) + " Recipe");
        result.put("ingredients", ingredients.stream()
                .map(i -> i + " - as needed")
                .toList());
        result.put("steps", List.of(
                "Prepare all ingredients by washing and chopping as needed.",
                "Heat oil in a large pan over medium heat.",
                "Add the main ingredients and sauté for 5-7 minutes.",
                "Season with salt, pepper, and your favorite spices.",
                "Cook until everything is tender and well combined.",
                "Garnish and serve hot."
        ));
        result.put("nutrition", Map.of(
                "calories", 320,
                "protein", "18g",
                "carbs", "24g",
                "fat", "16g"
        ));
        result.put("cookTime", "30 minutes");
        result.put("difficulty", "Medium");
        return result;
    }
}
