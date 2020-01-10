package pl.pw.mini.zpoif.lubieplackibackend.recipe.service;

import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.*;

import java.util.List;

public interface RecipeService {

    List<Recipe> findByType(String type);
    Recipe findById(Long id);
    RecipePhoto findRecipePhotoByRecipeId(Long id);

    Long getRandomId();

    Recipe save(Long user_id, Recipe recipe);
    List<Ingredient> saveAllIngredients(Long id, List<Ingredient> ingredients);
    List<Direction> saveAllDirections(Long id, List<Direction> directions);
    List<Hint> saveAllHints(Long id, List<Hint> hints);
    RecipePhoto saveRecipePhoto(Long id, byte[] photo);
}
