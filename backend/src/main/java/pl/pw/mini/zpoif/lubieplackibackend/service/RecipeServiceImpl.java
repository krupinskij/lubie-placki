package pl.pw.mini.zpoif.lubieplackibackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pw.mini.zpoif.lubieplackibackend.model.*;
import pl.pw.mini.zpoif.lubieplackibackend.repository.*;

import java.util.List;

@Service
public class RecipeServiceImpl implements RecipeService {


    private RecipeRepository recipeRepository;
    private IngredientRepository ingredientRepository;
    private DirectionRepository directionRepository;
    private HintRepository hintRepository;
    private RecipePhotoRepository recipePhotoRepository;

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository, IngredientRepository ingredientRepository, DirectionRepository directionRepository, HintRepository hintRepository, RecipePhotoRepository recipePhotoRepository){
        this.recipeRepository = recipeRepository;

        this.ingredientRepository = ingredientRepository;
        this.directionRepository = directionRepository;
        this.hintRepository = hintRepository;

        this.recipePhotoRepository = recipePhotoRepository;
    }

    @Override
    public List<Recipe> findByType(String type) {
        if(type!=null) return recipeRepository.findByType(type);
        else return recipeRepository.findAll();
    }

    @Override
    public Recipe findById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    @Override
    public RecipePhoto findRecipePhotoByRecipeId(Long id) {
        return recipePhotoRepository.findByRecipeId(id);
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

    @Override
    public RecipePhoto saveRecipePhoto(Long id, byte[] photo) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);

        RecipePhoto recipePhoto = new RecipePhoto();
        recipePhoto.setRecipe(recipe);
        recipePhoto.setPhoto(photo);

        return recipePhotoRepository.save(recipePhoto);
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