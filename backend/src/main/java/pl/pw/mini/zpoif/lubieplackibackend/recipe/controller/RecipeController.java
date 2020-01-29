package pl.pw.mini.zpoif.lubieplackibackend.recipe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.*;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.service.RecipeService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/recipes")
@CrossOrigin
public class RecipeController {
    private RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
            this.recipeService = recipeService;
    }

    @GetMapping(path = "")
    public List<Recipe> getRecipes(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) Integer page
    ) {
        return recipeService.findAll(type, sort, page);
    }

    @GetMapping(path = "/pages")
    public Long getPagesCount(@RequestParam(required = false) String type) {
        return recipeService.getPagesCount(type);
    }

    @GetMapping(path = "/{id}")
    public Recipe getRecipeById(@PathVariable("id") Long id) {
        return recipeService.findById(id);
    }

    @GetMapping(path = "/{id}/photo", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getRecipePhoto(@PathVariable("id") Long id) throws IOException {
        return recipeService.getRecipePhotoByRecipeId(id);
    }

    @GetMapping("/user/{user_id}")
    public List<Recipe> getRecipesByUser(@PathVariable("user_id") Long user_id) {
        return recipeService.findByUserId(user_id);
    }

    @GetMapping(path="/random")
    public Long getRandomId() {
        return recipeService.getRandomId();
    }



    @PostMapping(path = "/{user_id}")
    public Recipe saveRecipeByUserId(@PathVariable Long user_id, @RequestBody Recipe recipe) {
        return recipeService.saveRecipeByUserId(user_id, recipe);
    }

    @PostMapping(path = "/{recipe_id}/ingredients")
    public List<Ingredient> saveAllIngredientsByRecipeId(@PathVariable Long recipe_id,  @RequestBody List<Ingredient> ingredients) {
        return recipeService.saveAllIngredientsByRecipeId(recipe_id, ingredients);
    }

    @PostMapping(path = "/{recipe_id}/directions")
    public List<Direction> saveAllDirectionsByRecipeId(@PathVariable Long recipe_id,  @RequestBody List<Direction> directions) {
        return recipeService.saveAllDirectionsByRecipeId(recipe_id, directions);
    }

    @PostMapping(path = "/{recipe_id}/hints")
    public List<Hint> saveAllHintsByRecipeId(@PathVariable Long recipe_id,  @RequestBody List<Hint> hints) {
        return recipeService.saveAllHintsByRecipeId(recipe_id, hints);
    }

    @PostMapping(path = "/{recipe_id}/photo")
    public Recipe saveRecipePhotoByRecipeId(@PathVariable Long recipe_id, @RequestBody byte[] photo) {
        return recipeService.saveRecipePhotoByRecipeId(recipe_id, photo);
    }

    @PutMapping(path = "/{recipe_id}")
    public Recipe updateRecipeByRecipeId(@PathVariable Long recipe_id, @RequestBody Recipe recipe) {
        return recipeService.updateRecipeByRecipeId(recipe_id, recipe);
    }

    @PutMapping(path = "/{recipe_id}/ingredients")
    public List<Ingredient> updateAllIngredientsByRecipeId(@PathVariable Long recipe_id,  @RequestBody List<Ingredient> ingredients) {
        return recipeService.updateAllIngredientsByRecipeId(recipe_id, ingredients);
    }

    @PutMapping(path = "/{recipe_id}/directions")
    public List<Direction> updateAllDirectionsByRecipeId(@PathVariable Long recipe_id,  @RequestBody List<Direction> directions) {
        return recipeService.updateAllDirectionsByRecipeId(recipe_id, directions);
    }

    @PutMapping(path = "/{recipe_id}/hints")
    public List<Hint> updateAllHintsByRecipeId(@PathVariable Long recipe_id,  @RequestBody List<Hint> hints) {
        return recipeService.updateAllHintsByRecipeId(recipe_id, hints);
    }

    @PutMapping(path = "/{recipe_id}/photo")
    public Recipe updateRecipePhotoByRecipeId(@PathVariable Long recipe_id, @RequestBody byte[] photo) {
        return recipeService.updateRecipePhotoByRecipeId(recipe_id, photo);
    }

    @DeleteMapping(path="/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
    }


    @PostMapping(path="/{recipe_id}/rating/{user_id}")
    public Rating addRating(@PathVariable Long recipe_id, @PathVariable Long user_id, @RequestBody Integer rating) {
        return recipeService.saveRating(recipe_id, user_id, rating);
    }

    @DeleteMapping(path = "/{recipe_id}/rating/{user_id}")
    public void deleteRating(@PathVariable Long recipe_id, @PathVariable Long user_id) {
        recipeService.deleteRating(recipe_id, user_id);
    }

    @GetMapping(path = "/{recipe_id}/rating")
    public ResponseEntity getRatingsByRecipeId(@PathVariable Long recipe_id) {
        return ResponseEntity.ok(recipeService.getRatingsByRecipeId(recipe_id));
    }

    @GetMapping(path="/{recipe_id}/rating/{user_id}")
    public Integer getRatingByUserId(@PathVariable Long recipe_id, @PathVariable Long user_id) {
        return recipeService.getRatingByUserId(recipe_id, user_id);
    }

    @GetMapping(path = "/ratings")
    public List<Rating> getRatings() {
        return recipeService.getRatings();
    }

}
