package pl.pw.mini.zpoif.lubieplackibackend.recipe;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.service.RecipeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/recipes")
public class RecipeController {
    private final RecipeRepository recipeRepository;
    private final RecipeService recipeService;

    public RecipeController(RecipeRepository recipeRepository, RecipeService recipeService) {
        this.recipeRepository = recipeRepository;
        this.recipeService = recipeService;
    }

    @PostMapping(path = "")
    public ResponseEntity<Recipe> createUser(@RequestBody @Valid Recipe recipe) {

        return ResponseEntity.ok().body(recipeRepository.save(recipe));
    }

    @GetMapping(path = "")
    public List<Recipe> getAllEmployees() {
        return recipeRepository.findAll();
    }
}
