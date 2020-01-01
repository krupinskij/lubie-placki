package pl.pw.mini.zpoif.lubieplackibackend.service;

import pl.pw.mini.zpoif.lubieplackibackend.model.*;

import java.util.List;

public interface RecipeService {

    List<Recipe> findByType(String type);
    Recipe findById(Long id);
    RecipePhoto findRecipePhotoByRecipeId(Long id);

    Recipe save(Recipe recipe);
    List<Ingredient> saveAllIngredients(Long id, List<Ingredient> ingredients);
    List<Direction> saveAllDirections(Long id, List<Direction> directions);
    List<Hint> saveAllHints(Long id, List<Hint> hints);
    RecipePhoto saveRecipePhoto(Long id, byte[] photo);
}
