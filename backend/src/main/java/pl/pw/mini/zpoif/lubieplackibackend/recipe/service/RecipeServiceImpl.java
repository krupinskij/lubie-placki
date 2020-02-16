package pl.pw.mini.zpoif.lubieplackibackend.recipe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import pl.pw.mini.zpoif.lubieplackibackend.comment.model.Comment;
import pl.pw.mini.zpoif.lubieplackibackend.comment.repository.CommentRepository;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.exception.RatingNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.exception.RecipeNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.exception.RecipePhotoNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.*;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.repository.*;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UnauthorizedException;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UserNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {

    private RecipeRepository recipeRepository;
    private IngredientRepository ingredientRepository;
    private DirectionRepository directionRepository;
    private HintRepository hintRepository;
    private RatingRepository ratingRepository;
    private TagRepository tagRepository;
    private UserRepository userRepository;
    private CommentRepository commentRepository;

    public RecipeServiceImpl(
            RecipeRepository recipeRepository,
            IngredientRepository ingredientRepository,
            DirectionRepository directionRepository,
            HintRepository hintRepository,
            RatingRepository ratingRepository,
            TagRepository tagRepository,
            UserRepository userRepository,
            CommentRepository commentRepository
    ){

        this.recipeRepository = recipeRepository;

        this.ingredientRepository = ingredientRepository;
        this.directionRepository = directionRepository;
        this.hintRepository = hintRepository;

        this.ratingRepository = ratingRepository;

        this.tagRepository = tagRepository;

        this.userRepository = userRepository;

        this.commentRepository = commentRepository;
    }

    @Override
    public List<Recipe> findAll(String type, String sort, Integer page) {
        return recipeRepository.findAll().stream()
                .filter(recipe -> type==null || recipe.getType().equals(type))
                .sorted((r1, r2) -> {
                    if(sort!=null && sort.equals("alpha")) return r1.getTitle().compareToIgnoreCase(r2.getTitle());
                    else if(sort!=null && sort.equals("average")) return Double.compare(r2.getAverageRating(), r1.getAverageRating());
                    else if(sort!=null && sort.equals("count")) return Double.compare(r2.getCountRating(), r1.getCountRating());
                    else return r2.getAdd_date().compareTo(r1.getAdd_date());
                })
                .skip(page==null ? 0 : (page-1)*10)
                .limit(10)
                .collect(Collectors.toList());
    }

    @Override
    public Recipe findById(Long id) {
        return recipeRepository.findById(id).orElseThrow(() -> new RecipeNotFoundException("Nie znaleziono przepisu!"));
    }

    @Override
    public List<Recipe> findByUserId(Long user_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Nie znaleziono użytkownika!"));

        return recipeRepository.findByUser(user);
    }

    @Override
    public byte[] getRecipePhotoByRecipeId(Long id) throws IOException {
        Recipe recipe = recipeRepository.findById(id).orElseThrow(() -> new RecipeNotFoundException("Nie ma takiego przepisu"));

        if(recipe.getPhoto()!=null) return recipe.getPhoto();

        ClassPathResource imgFile = new ClassPathResource("image/cake.png");

        return StreamUtils.copyToByteArray(imgFile.getInputStream());
    }

    @Override
    public Long getRandomId() {
        List<Recipe> recipes = recipeRepository.findAll();
        Random random = new Random();

        return recipes.get(random.nextInt(recipes.size())).getId();
    }

    @Override
    public Recipe updateRecipeByRecipeId(UUID securityToken, Long recipe_id, Recipe new_recipe) {
        userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Nie jesteś autorem tego przepisu"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie znaleziono przepisu!"));

        recipe.setTitle(new_recipe.getTitle());
        recipe.setDescription(new_recipe.getDescription());
        recipe.setType(new_recipe.getType());

        return recipeRepository.save(recipe);
    }

    @Override
    public List<Ingredient> updateAllIngredientsByRecipeId(UUID securityToken, Long recipe_id, List<Ingredient> ingredients) {
        userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Nie jesteś autorem tego przepisu"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie znaleziono przepisu!"));

        ingredientRepository.deleteAll(recipe.getIngredients());

        for(Ingredient ingredient : ingredients) {
            ingredient.setRecipe(recipe);
            ingredientRepository.save(ingredient);
        }

        return ingredients;
    }

    @Override
    public List<Direction> updateAllDirectionsByRecipeId(UUID securityToken, Long recipe_id, List<Direction> directions) {
        userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Nie jesteś autorem tego przepisu"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie znaleziono przepisu!"));

        directionRepository.deleteAll(recipe.getDirections());

        for(Direction direction : directions) {
            direction.setRecipe(recipe);
            directionRepository.save(direction);
        }

        return directions;
    }

    @Override
    public List<Hint> updateAllHintsByRecipeId(UUID securityToken, Long recipe_id, List<Hint> hints) {
        userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Nie jesteś autorem tego przepisu"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie znaleziono przepisu!"));

        hintRepository.deleteAll(recipe.getHints());

        for(Hint hint : hints) {
            hint.setRecipe(recipe);
            hintRepository.save(hint);
        }

        return hints;
    }

    @Override
    public Recipe updateRecipePhotoByRecipeId(UUID securityToken, Long recipe_id, byte[] photo) {
        userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Nie jesteś autorem tego przepisu"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie znaleziono przepisu!"));

        recipe.setPhoto(photo);

        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe saveRecipe(UUID securityToken, Recipe recipe) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));

        recipe.setUser(user);
        recipe.setAdd_date(LocalDateTime.now());
        recipe.setRatings(new ArrayList<Rating>());

        return recipeRepository.save(recipe);
    }

    @Override
    public List<Ingredient> saveAllIngredientsByRecipeId(UUID securityToken, Long recipe_id, List<Ingredient> ingredients) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie znaleziono przepisu!"));

        for(Ingredient ingredient : ingredients) {
            ingredient.setRecipe(recipe);
            ingredientRepository.save(ingredient);
        }

        return ingredients;
    }

    @Override
    public List<Direction> saveAllDirectionsByRecipeId(UUID securityToken, Long recipe_id, List<Direction> directions) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie znaleziono przepisu!"));

        for(Direction direction : directions) {
            direction.setRecipe(recipe);
            directionRepository.save(direction);
        }

        return directions;
    }

    @Override
    public List<Hint> saveAllHintsByRecipeId(UUID securityToken, Long recipe_id, List<Hint> hints) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie znaleziono przepisu!"));

        for(Hint hint : hints) {
            hint.setRecipe(recipe);
            hintRepository.save(hint);
        }

        return hints;
    }

    @Override
    public Recipe saveRecipePhotoByRecipeId(UUID securityToken, Long recipe_id, byte[] photo) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie znaleziono przepisu!"));

        recipe.setPhoto(photo);

        return recipeRepository.save(recipe);
    }

    @Override
    public List<Tag> saveTagsByRecipeId(UUID securityToken, Long recipe_id, String tags) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie znaleziono przepisu!"));

        String[] array = tags.substring(1).split("#");
        for(String text : array) {

            Tag tag = new Tag();
            tag.setText(text.trim());
            tag.setRecipe(recipe);
            tagRepository.save(tag);
        }

        return recipe.getTags();
    }

    @Override
    public void deleteRecipe(UUID securityToken, Long id) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));
        Recipe recipe = recipeRepository.findById(id).orElseThrow(() -> new RecipeNotFoundException("Nie znaleziono przepisu!"));

        for(Rating rating : recipe.getRatings()) {
            ratingRepository.delete(rating);
        }

        for(Comment comment: recipe.getComments()) {
            commentRepository.delete(comment);
        }

        for(Tag tag: recipe.getTags()) {
            tagRepository.delete(tag);
        }

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

    @Override
    public Long getPagesCount(String type) {
        long count =  recipeRepository.findAll().stream()
                .filter(recipe -> type==null || recipe.getType().equals(type))
                .count();

        return (count+9)/10;
    }

    @Override
    public Rating addRatingByRecipeId(UUID securityToken, Long recipe_id, Integer r) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie ma takiego przepisu"));

        for(Rating rating: recipe.getRatings()) {
            if(rating.getUser().equals(user)) {
                rating.setRating(r);
                return ratingRepository.save(rating);
                //return rating;
            }
        }

        Rating rating = new Rating();
        rating.setRating(r);
        rating.setRecipe(recipe);
        rating.setUser(user);

        return ratingRepository.save(rating);
    }

    @Override
    public void deleteRating(UUID securityToken, Long recipe_id) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie ma takiego przepisu"));
        for(Rating rating:  recipe.getRatings()) {
            if(rating.getUser().getId().equals(user.getId())) {
                ratingRepository.delete(rating);
                return;
            }
        }

        throw new RatingNotFoundException("Ten użytkownik nie ocenił jeszcze tego przepisu");
    }

    @Override
    public Integer getRating(UUID securityToken, Long recipe_id) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie ma takiego przepisu"));
        List<Rating> ratings = recipe.getRatings();

        for(Rating rating: ratings) {
            if(rating.getUser().getId().equals(user.getId())) return rating.getRating();
        }

        throw new RatingNotFoundException("Ten użytkownik nie ocenił jeszcze tego przepisu");
    }

    @Override
    public Double[] getRatingsByRecipeId(Long recipe_id) {
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie ma takiego przepisu"));

        return new Double[]{ recipe.getAverageRating(), recipe.getCountRating() };
    }

    @Override
    public List<Rating> getRatings() {
        return ratingRepository.findAll();
    }

    @Override
    public List<Recipe> getRecipesByTag(String s) {
        if(s==null || s.equals("")) return recipeRepository.findAll().stream()
                .sorted(Comparator.comparing(Recipe::getAdd_date).reversed())
                .collect(Collectors.toList());

        return tagRepository.findByText(s).stream()
                .map(Tag::getRecipe)
                .sorted(Comparator.comparing(Recipe::getAdd_date).reversed())
                .collect(Collectors.toList());
    }


}