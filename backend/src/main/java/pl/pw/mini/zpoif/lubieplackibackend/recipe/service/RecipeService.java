package pl.pw.mini.zpoif.lubieplackibackend.recipe.service;

import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.*;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import java.io.IOException;
import java.util.List;

public interface RecipeService {

    List<Recipe> findAll(String type, String sort, Integer page);
    Recipe findById(Long id);
    List<Recipe> findByUserId(Long user_id);
    byte[] getRecipePhotoByRecipeId(Long id) throws IOException;

    Long getRandomId();

    // -- save recipe -- //

    Recipe saveRecipeByUserId(Long user_id, Recipe recipe);
    List<Ingredient> saveAllIngredientsByRecipeId(Long recipe_id, List<Ingredient> ingredients);
    List<Direction> saveAllDirectionsByRecipeId(Long recipe_id, List<Direction> directions);
    List<Hint> saveAllHintsByRecipeId(Long recipe_id, List<Hint> hints);
    Recipe saveRecipePhotoByRecipeId(Long recipe_id, byte[] photo);
    List<Tag> saveTagsByRecipeId(Long recipe_id, String tags);

    // -- update recipe -- //

    Recipe updateRecipeByRecipeId(Long recipe_id, Recipe recipe);
    List<Ingredient> updateAllIngredientsByRecipeId(Long recipe_id, List<Ingredient> ingredients);
    List<Direction> updateAllDirectionsByRecipeId(Long recipe_id, List<Direction> directions);
    List<Hint> updateAllHintsByRecipeId(Long recipe_id, List<Hint> hints);
    Recipe updateRecipePhotoByRecipeId(Long recipe_id, byte[] photo);

    void deleteRecipe(Long id);

    Long getPagesCount(String type);

    Rating addRatingByRecipeIdAndUserId(Long recipe_id, Long user_id, Integer rating);
    void deleteRating(Long recipe_id, Long user_id);
    Integer getRatingByUserId(Long recipe_id, Long user_id);
    Double[] getRatingsByRecipeId(Long recipe_id);
    List<Rating> getRatings();

    List<Recipe> getRecipesByTag(String s);
}
