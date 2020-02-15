package pl.pw.mini.zpoif.lubieplackibackend.recipe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.*;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.service.RecipeService;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

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



    @PostMapping(path = "")
    public ResponseEntity saveRecipe(@RequestHeader String securityTokenValue, @RequestBody Recipe recipe) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.saveRecipe(securityToken, recipe));
    }

    @PostMapping(path = "/{recipe_id}/ingredients")
    public ResponseEntity saveAllIngredientsByRecipeId(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id,  @RequestBody List<Ingredient> ingredients) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.saveAllIngredientsByRecipeId(securityToken, recipe_id, ingredients));
    }

    @PostMapping(path = "/{recipe_id}/directions")
    public ResponseEntity saveAllDirectionsByRecipeId(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id,  @RequestBody List<Direction> directions) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.saveAllDirectionsByRecipeId(securityToken, recipe_id, directions));
    }

    @PostMapping(path = "/{recipe_id}/hints")
    public ResponseEntity saveAllHintsByRecipeId(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id,  @RequestBody List<Hint> hints) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.saveAllHintsByRecipeId(securityToken, recipe_id, hints));
    }

    @PostMapping(path = "/{recipe_id}/photo")
    public ResponseEntity saveRecipePhotoByRecipeId(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id, @RequestBody byte[] photo) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.saveRecipePhotoByRecipeId(securityToken, recipe_id, photo));
    }

    @PostMapping(path = "/{recipe_id}/tags")
    public ResponseEntity saveTagsByRecipeId(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id, @RequestBody String tags) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.saveTagsByRecipeId(securityToken, recipe_id, tags));
    }

    @PutMapping(path = "/{recipe_id}")
    public ResponseEntity updateRecipeByRecipeId(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id, @RequestBody Recipe recipe) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.updateRecipeByRecipeId(securityToken, recipe_id, recipe));
    }

    @PutMapping(path = "/{recipe_id}/ingredients")
    public ResponseEntity updateAllIngredientsByRecipeId(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id,  @RequestBody List<Ingredient> ingredients) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.updateAllIngredientsByRecipeId(securityToken, recipe_id, ingredients));
    }

    @PutMapping(path = "/{recipe_id}/directions")
    public ResponseEntity updateAllDirectionsByRecipeId(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id,  @RequestBody List<Direction> directions) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.updateAllDirectionsByRecipeId(securityToken, recipe_id, directions));
    }

    @PutMapping(path = "/{recipe_id}/hints")
    public ResponseEntity updateAllHintsByRecipeId(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id,  @RequestBody List<Hint> hints) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.updateAllHintsByRecipeId(securityToken, recipe_id, hints));
    }

    @PutMapping(path = "/{recipe_id}/photo")
    public ResponseEntity updateRecipePhotoByRecipeId(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id, @RequestBody byte[] photo) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.updateRecipePhotoByRecipeId(securityToken, recipe_id, photo));
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity deleteRecipe(@RequestHeader String securityTokenValue, @PathVariable Long id) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        recipeService.deleteRecipe(securityToken, id);
        return ResponseEntity.ok("Usunięto przepis");
    }


    @PostMapping(path="/{recipe_id}/rating")
    public ResponseEntity addRatingByRecipeId(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id, @RequestBody Integer rating) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.addRatingByRecipeId(securityToken, recipe_id, rating));
    }

    @DeleteMapping(path = "/{recipe_id}/rating")
    public ResponseEntity deleteRating(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        recipeService.deleteRating(securityToken, recipe_id);
        return ResponseEntity.ok("Usunięto ocenę");
    }

    @GetMapping(path = "/{recipe_id}/ratings")
    public ResponseEntity getRatingsByRecipeId(@PathVariable Long recipe_id) {
        return ResponseEntity.ok(recipeService.getRatingsByRecipeId(recipe_id));
    }

    @GetMapping(path="/{recipe_id}/rating")
    public ResponseEntity getRating(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(recipeService.getRating(securityToken, recipe_id));
    }

    @GetMapping(path = "/ratings")
    public ResponseEntity getRatings() {
        return ResponseEntity.ok(recipeService.getRatings());
    }

    @GetMapping(path = "/search")
    public ResponseEntity getRecipesByTag(@RequestParam(required = false) String s) {
        return ResponseEntity.ok(recipeService.getRecipesByTag(s));
    }

    @GetMapping(path = "/{recipe_id}/user_photo/{order}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity getUserRecipePhotoByRecipeIdAndOrder(@PathVariable Long recipe_id, @PathVariable Integer order) throws IOException {
        return ResponseEntity.ok(recipeService.getUserRecipePhotoByRecipeIdAndOrder(recipe_id, order));
    }

    @PostMapping(path = "/{recipe_id}/user_photo")
    public ResponseEntity saveUserRecipePhotoByRecipeId(@PathVariable Long recipe_id, @RequestBody byte[] recipe_photo) {
        recipeService.saveUserRecipePhotoByRecipeId(recipe_id, recipe_photo);
        return ResponseEntity.ok("Dodano zdjęcie");
    }

}
