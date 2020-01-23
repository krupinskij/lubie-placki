package pl.pw.mini.zpoif.lubieplackibackend.recipe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
    public List<Recipe> getRecipes(@RequestParam(required = false) String type) {
        return recipeService.findByType(type);
    }

    @GetMapping(path = "/sort")
    public List<Recipe> getSortedRecipe(@RequestParam(required = false) String sort) {
        return recipeService.getSorted(sort);
    }

    @GetMapping(path = "/{id}")
    public Recipe getRecipeById(@PathVariable("id") Long id) {
        return recipeService.findById(id);
    }

    @GetMapping(path = "/recipephotos/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getRecipePhoto(@PathVariable("id") Long id) throws IOException {
        RecipePhoto recipePhoto = recipeService.findRecipePhotoByRecipeId(id);

        return recipePhoto.getPhoto();
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
    public Recipe saveRecipe(@PathVariable Long user_id, @RequestBody Recipe recipe) {
        return recipeService.save(user_id, recipe);
    }

    @PostMapping(path = "/{id}/ingredients")
    public List<Ingredient> saveIngredients(@PathVariable Long id,  @RequestBody List<Ingredient> ingredients) {
        return recipeService.saveAllIngredients(id, ingredients);
    }

    @PostMapping(path = "/{id}/directions")
    public List<Direction> saveDirections(@PathVariable Long id,  @RequestBody List<Direction> directions) {
        return recipeService.saveAllDirections(id, directions);
    }

    @PostMapping(path = "/{id}/hints")
    public List<Hint> saveHints(@PathVariable Long id,  @RequestBody List<Hint> hints) {
        return recipeService.saveAllHints(id, hints);
    }

    @PostMapping(path = "/{id}/recipephoto")
    public RecipePhoto saveRecipePhoto(@PathVariable Long id, @RequestBody byte[] photo) {
        return recipeService.saveRecipePhoto(id, photo);
    }

    @DeleteMapping(path="/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
    }


}
