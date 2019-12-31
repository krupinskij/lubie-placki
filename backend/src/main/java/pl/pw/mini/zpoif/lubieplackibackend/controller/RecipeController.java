package pl.pw.mini.zpoif.lubieplackibackend.controller;

import org.springframework.web.bind.annotation.*;
import pl.pw.mini.zpoif.lubieplackibackend.model.*;
import pl.pw.mini.zpoif.lubieplackibackend.service.RecipeService;

import java.util.List;

@RestController
@RequestMapping(path = "/recipes")
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {
    private RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
            this.recipeService = recipeService;
    }

    @GetMapping(path = "")
    public List<Recipe> getRecipes() {
        return recipeService.findAll();
    }

    @GetMapping(path = "/{id}")
    public Recipe getRecipeById(@PathVariable("id") Long id) {
        return recipeService.findById(id);
    }

    @PostMapping(path = "")
    public Recipe saveRecipe(@RequestBody Recipe recipe) {
        return recipeService.save(recipe);
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


}
