package pl.pw.mini.zpoif.lubieplackibackend.recipe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.*;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.repository.*;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {


    private RecipeRepository recipeRepository;
    private IngredientRepository ingredientRepository;
    private DirectionRepository directionRepository;
    private HintRepository hintRepository;
    private RecipePhotoRepository recipePhotoRepository;

    ///

    private UserRepository userRepository;

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository, IngredientRepository ingredientRepository, DirectionRepository directionRepository, HintRepository hintRepository, RecipePhotoRepository recipePhotoRepository, UserRepository userRepository){
        this.recipeRepository = recipeRepository;

        this.ingredientRepository = ingredientRepository;
        this.directionRepository = directionRepository;
        this.hintRepository = hintRepository;

        this.recipePhotoRepository = recipePhotoRepository;

        ///

        this.userRepository = userRepository;
    }

    @Override
    public List<Recipe> findByType(String type) {
        if(type!=null) return recipeRepository.findByType(type);
        else return recipeRepository.findAll();
    }

    @Override
    public List<Recipe> getSorted(String sort) {
        
        if(sort!=null && sort.equals("alpha")) return recipeRepository.findAll().stream()
                .sorted((r1, r2) -> r1.getTitle().compareToIgnoreCase(r2.getTitle()))
                .collect(Collectors.toList());

        return recipeRepository.findAll().stream()
                .sorted(Comparator.comparing(Recipe::getAdd_date))
                .collect(Collectors.toList());
    }

    @Override
    public Recipe findById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    @Override
    public List<Recipe> findByUserId(Long user_id) {
        User user = userRepository.findById(user_id).orElse(null);
        if(user==null) return null;

        return recipeRepository.findByUser(user);
    }


    @Override
    public RecipePhoto findRecipePhotoByRecipeId(Long id) {
        return recipePhotoRepository.findByRecipeId(id);
    }

    @Override
    public Long getRandomId() {
        List<Recipe> recipes = recipeRepository.findAll();
        Random random = new Random();

        Long id = recipes.get(random.nextInt(recipes.size())).getId();

        return id;
    }

    @Override
    public Recipe save(Long user_id, Recipe recipe) {
        User user = userRepository.findById(user_id).orElse(null);
        recipe.setUser(user);
        recipe.setAdd_date(LocalDateTime.now());

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

    @Override
    public void deleteRecipe(Long id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);

        recipePhotoRepository.delete(recipe.getRecipe_photo());

        for(Direction direction : recipe.getDirections()) {
            directionRepository.delete(direction);
        }

        for(Ingredient ingredient : recipe.getIngredients()) {
            ingredientRepository.delete(ingredient);
        }

        for(Hint hint : recipe.getHints()) {
            hintRepository.delete(hint);
        }
        recipeRepository.delete(recipe);
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