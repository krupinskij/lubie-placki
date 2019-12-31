package pl.pw.mini.zpoif.lubieplackibackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pw.mini.zpoif.lubieplackibackend.model.Direction;
import pl.pw.mini.zpoif.lubieplackibackend.model.Hint;
import pl.pw.mini.zpoif.lubieplackibackend.model.Ingredient;
import pl.pw.mini.zpoif.lubieplackibackend.model.Recipe;
import pl.pw.mini.zpoif.lubieplackibackend.repository.DirectionRepository;
import pl.pw.mini.zpoif.lubieplackibackend.repository.HintRepository;
import pl.pw.mini.zpoif.lubieplackibackend.repository.IngredientRepository;
import pl.pw.mini.zpoif.lubieplackibackend.repository.RecipeRepository;

import java.util.List;

@Service
public class RecipeServiceImpl implements RecipeService {


    private RecipeRepository recipeRepository;
    private IngredientRepository ingredientRepository;
    private DirectionRepository directionRepository;
    private HintRepository hintRepository;

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository, IngredientRepository ingredientRepository, DirectionRepository directionRepository, HintRepository hintRepository){
        this.recipeRepository = recipeRepository;

        this.ingredientRepository = ingredientRepository;
        this.directionRepository = directionRepository;
        this.hintRepository = hintRepository;
    }

    @Override
    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    @Override
    public Recipe findById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    @Override
    public Recipe save(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    @Override
    public List<Ingredient> saveAllIngredients(Long id, List<Ingredient> ingredients) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);

        for(Ingredient ingredient : ingredients) {
            ingredient.setRecipe(recipe);
            ingredientRepository.save(ingredient);
        }

        return ingredients;
    }

    @Override
    public List<Direction> saveAllDirections(Long id, List<Direction> directions) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);

        for(Direction direction : directions) {
            direction.setRecipe(recipe);
            directionRepository.save(direction);
        }

        return directions;
    }

    @Override
    public List<Hint> saveAllHints(Long id, List<Hint> hints) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);

        for(Hint hint : hints) {
            hint.setRecipe(recipe);
            hintRepository.save(hint);
        }

        return hints;
    }


    /*@Autowired
    private JdbcTemplate jtm;

    @Override
    public List<Recipe> findAll() {
        final String sql = "SELECT * FROM recipestest where id=6";

        List<Recipe> recipes = jtm.query(sql, new BeanPropertyRowMapper(Recipe.class));

        return recipes;
    }*/
}