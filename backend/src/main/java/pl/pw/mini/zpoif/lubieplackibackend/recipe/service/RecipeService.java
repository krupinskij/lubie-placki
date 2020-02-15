package pl.pw.mini.zpoif.lubieplackibackend.recipe.service;

import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.*;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface RecipeService {

    List<Recipe> findAll(String type, String sort, Integer page);
    Recipe findById(Long id);
    List<Recipe> findByUserId(Long user_id);
    byte[] getRecipePhotoByRecipeId(Long id) throws IOException;

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

    void deleteRecipe(UUID securityToken, Long id);

    Long getPagesCount(String type);

    Rating addRatingByRecipeId(UUID securityToken, Long recipe_id, Integer rating);
    void deleteRating(UUID securityToken, Long recipe_id);
    Integer getRating(UUID securityToken, Long recipe_id);
    Double[] getRatingsByRecipeId(Long recipe_id);
    List<Rating> getRatings();

    List<Recipe> getRecipesByTag(String s);

    byte[] getUserRecipePhotoByRecipeIdAndOrder(Long recipe_id, Integer order);
    void saveUserRecipePhotoByRecipeId(Long recipe_id, byte[] recipe_photo);
}
