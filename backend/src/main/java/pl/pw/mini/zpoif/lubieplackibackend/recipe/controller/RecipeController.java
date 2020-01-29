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
    public ResponseEntity getRecipes(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) Integer page
    ) {
        return ResponseEntity.ok(recipeService.findAll(type, sort, page));
    }

    @GetMapping(path = "/pages")
    public ResponseEntity getPagesCount(@RequestParam(required = false) String type) {
        return ResponseEntity.ok(recipeService.getPagesCount(type));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity getRecipeById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(recipeService.findById(id));
    }

    @GetMapping(path = "/{id}/photo", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity getRecipePhoto(@PathVariable("id") Long id) throws IOException {
        return ResponseEntity.ok(recipeService.getRecipePhotoByRecipeId(id));
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity getRecipesByUser(@PathVariable("user_id") Long user_id) {
        return ResponseEntity.ok(recipeService.findByUserId(user_id));
    }

    @GetMapping(path="/random")
    public ResponseEntity getRandomId() {
        return ResponseEntity.ok(recipeService.getRandomId());
    }



    @PostMapping(path = "/{user_id}")
    public ResponseEntity saveRecipeByUserId(@PathVariable Long user_id, @RequestBody Recipe recipe) {
        return ResponseEntity.ok(recipeService.saveRecipeByUserId(user_id, recipe));
    }

    @PostMapping(path = "/{recipe_id}/ingredients")
    public ResponseEntity saveAllIngredientsByRecipeId(@PathVariable Long recipe_id,  @RequestBody List<Ingredient> ingredients) {
        return ResponseEntity.ok(recipeService.saveAllIngredientsByRecipeId(recipe_id, ingredients));
    }

    @PostMapping(path = "/{recipe_id}/directions")
    public ResponseEntity saveAllDirectionsByRecipeId(@PathVariable Long recipe_id,  @RequestBody List<Direction> directions) {
        return ResponseEntity.ok(recipeService.saveAllDirectionsByRecipeId(recipe_id, directions));
    }

    @PostMapping(path = "/{recipe_id}/hints")
    public ResponseEntity saveAllHintsByRecipeId(@PathVariable Long recipe_id,  @RequestBody List<Hint> hints) {
        return ResponseEntity.ok(recipeService.saveAllHintsByRecipeId(recipe_id, hints));
    }

    @PostMapping(path = "/{recipe_id}/photo")
    public ResponseEntity saveRecipePhotoByRecipeId(@PathVariable Long recipe_id, @RequestBody byte[] photo) {
        return ResponseEntity.ok(recipeService.saveRecipePhotoByRecipeId(recipe_id, photo));
    }

    @PostMapping(path = "/{recipe_id}/tags")
    public ResponseEntity saveTagsByRecipeId(@PathVariable Long recipe_id, @RequestBody String tags) {
        return ResponseEntity.ok(recipeService.saveTagsByRecipeId(recipe_id, tags));
    }

    @PutMapping(path = "/{recipe_id}")
    public ResponseEntity updateRecipeByRecipeId(@PathVariable Long recipe_id, @RequestBody Recipe recipe) {
        return ResponseEntity.ok(recipeService.updateRecipeByRecipeId(recipe_id, recipe));
    }

    @PutMapping(path = "/{recipe_id}/ingredients")
    public ResponseEntity updateAllIngredientsByRecipeId(@PathVariable Long recipe_id,  @RequestBody List<Ingredient> ingredients) {
        return ResponseEntity.ok(recipeService.updateAllIngredientsByRecipeId(recipe_id, ingredients));
    }

    @PutMapping(path = "/{recipe_id}/directions")
    public ResponseEntity updateAllDirectionsByRecipeId(@PathVariable Long recipe_id,  @RequestBody List<Direction> directions) {
        return ResponseEntity.ok(recipeService.updateAllDirectionsByRecipeId(recipe_id, directions));
    }

    @PutMapping(path = "/{recipe_id}/hints")
    public ResponseEntity updateAllHintsByRecipeId(@PathVariable Long recipe_id,  @RequestBody List<Hint> hints) {
        return ResponseEntity.ok(recipeService.updateAllHintsByRecipeId(recipe_id, hints));
    }

    @PutMapping(path = "/{recipe_id}/photo")
    public ResponseEntity updateRecipePhotoByRecipeId(@PathVariable Long recipe_id, @RequestBody byte[] photo) {
        return ResponseEntity.ok(recipeService.updateRecipePhotoByRecipeId(recipe_id, photo));
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.ok("Usunięto przepis");
    }


    @PostMapping(path="/{recipe_id}/rating/{user_id}")
    public ResponseEntity addRatingByRecipeIdAndUserId(@PathVariable Long recipe_id, @PathVariable Long user_id, @RequestBody Integer rating) {
        return ResponseEntity.ok(recipeService.addRatingByRecipeIdAndUserId(recipe_id, user_id, rating));
    }

    @DeleteMapping(path = "/{recipe_id}/rating/{user_id}")
    public ResponseEntity deleteRating(@PathVariable Long recipe_id, @PathVariable Long user_id) {
        recipeService.deleteRating(recipe_id, user_id);
        return ResponseEntity.ok("Usunięto ocenę");
    }

    @GetMapping(path = "/{recipe_id}/rating")
    public ResponseEntity getRatingsByRecipeId(@PathVariable Long recipe_id) {
        return ResponseEntity.ok(recipeService.getRatingsByRecipeId(recipe_id));
    }

    @GetMapping(path="/{recipe_id}/rating/{user_id}")
    public ResponseEntity getRatingByUserId(@PathVariable Long recipe_id, @PathVariable Long user_id) {
        return ResponseEntity.ok(recipeService.getRatingByUserId(recipe_id, user_id));
    }

    @GetMapping(path = "/ratings")
    public ResponseEntity getRatings() {
        return ResponseEntity.ok(recipeService.getRatings());
    }

    @GetMapping(path = "/search")
    public ResponseEntity getRecipesByTag(@RequestParam(required = false) String s) {
        return ResponseEntity.ok(recipeService.getRecipesByTag(s));
    }

}
