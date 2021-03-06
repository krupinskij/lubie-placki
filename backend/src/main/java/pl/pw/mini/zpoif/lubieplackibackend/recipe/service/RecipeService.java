package pl.pw.mini.zpoif.lubieplackibackend.recipe.service;

import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.*;

import java.util.List;
import java.util.UUID;

public interface RecipeService {

    List<Recipe> getAll(String type, String sort, String text, Long user_id, Integer page);
    Long getPagesCount(String type, String search, Long user_id);

    Recipe getRecipeByRecipeId(Long recipe_id);
    List<Recipe> getRecipesByUserId(Long user_id);

    byte[] getRecipePhotoByRecipeId(Long recipe_id);
    byte[] getDefaultPhoto();

    Long getRandomId();

    // -- save recipe -- //

    Recipe saveRecipe(UUID securityToken, Recipe recipe);
    List<Ingredient> saveAllIngredientsByRecipeId(UUID securityToken, Long recipe_id, List<Ingredient> ingredients);
    List<Direction> saveAllDirectionsByRecipeId(UUID securityToken, Long recipe_id, List<Direction> directions);
    List<Hint> saveAllHintsByRecipeId(UUID securityToken, Long recipe_id, List<Hint> hints);
    Recipe saveRecipePhotoByRecipeId(UUID securityToken, Long recipe_id, byte[] photo);
    List<Tag> saveTagsByRecipeId(UUID securityToken, Long recipe_id, String tags);

    // -- update recipe -- //

    Recipe updateRecipeByRecipeId(UUID securityToken, Long recipe_id, Recipe recipe);
    List<Ingredient> updateAllIngredientsByRecipeId(UUID securityToken, Long recipe_id, List<Ingredient> ingredients);
    List<Direction> updateAllDirectionsByRecipeId(UUID securityToken, Long recipe_id, List<Direction> directions);
    List<Hint> updateAllHintsByRecipeId(UUID securityToken, Long recipe_id, List<Hint> hints);
    Recipe updateRecipePhotoByRecipeId(UUID securityToken, Long recipe_id, byte[] photo);

    Recipe deleteRecipe(UUID securityToken, Long recipe_id);


    Rating addRatingByRecipeId(UUID securityToken, Long recipe_id, Integer rating);
    Rating deleteRating(UUID securityToken, Long recipe_id);
    Integer getRating(UUID securityToken, Long recipe_id);
    Double[] getRatingsByRecipeId(Long recipe_id);
}
