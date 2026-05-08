package com.recipehub.dto;

import lombok.Data;
import java.util.List;

@Data
public class AIRecipeRequest {
    private List<String> ingredients;
}
