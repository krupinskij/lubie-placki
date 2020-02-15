/*
package pl.pw.mini.zpoif.lubieplackibackend.recipe.controller;

import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import pl.pw.mini.zpoif.lubieplackibackend.comment.repository.CommentRepository;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Ingredient;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Rating;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Recipe;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.repository.*;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.service.RecipeService;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.service.RecipeServiceImpl;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(MockitoJUnitRunner.class)
class RecipeControllerTest {

    private RecipeService recipeService;
    private RecipeRepository recipeRepository;
    private IngredientRepository ingredientRepository;
    private DirectionRepository directionRepository;
    private HintRepository hintRepository;
    private RatingRepository ratingRepository;
    private TagRepository tagRepository;
    private RecipePhotoRepository recipePhotoRepository;
    private UserRepository userRepository;
    private CommentRepository commentRepository;


    @Test
    void givenExistingRecipe_whenGetRecipeById_thenAccept() {
        Recipe recipe = new Recipe();

        recipeRepository = Mockito.mock(RecipeRepository.class);
        ingredientRepository = Mockito.mock(IngredientRepository.class);
        directionRepository = Mockito.mock(DirectionRepository.class);
        hintRepository = Mockito.mock(HintRepository.class);
        ratingRepository = Mockito.mock(RatingRepository.class);
        tagRepository = Mockito.mock(TagRepository.class);
        recipePhotoRepository = Mockito.mock(RecipePhotoRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        commentRepository = Mockito.mock(CommentRepository.class);
        recipeService = new RecipeServiceImpl(
                recipeRepository,
                ingredientRepository,
                directionRepository,
                hintRepository,
                ratingRepository,
                tagRepository,
                recipePhotoRepository,
                userRepository,
                commentRepository);

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        Recipe recipe2 = recipeService.findById(1L);

        Assert.assertEquals(recipe.getId(), recipe2.getId());
    }

    @Test
    void givenExistingUser_whenFindByUserId_thenAccept() {
        User user = new User();
        List<Recipe> recipes = new ArrayList<>();
        recipes.add(new Recipe());
        recipes.add(new Recipe());
        recipes.add(new Recipe());
        user.setRecipes(recipes);

        recipeRepository = Mockito.mock(RecipeRepository.class);
        ingredientRepository = Mockito.mock(IngredientRepository.class);
        directionRepository = Mockito.mock(DirectionRepository.class);
        hintRepository = Mockito.mock(HintRepository.class);
        ratingRepository = Mockito.mock(RatingRepository.class);
        tagRepository = Mockito.mock(TagRepository.class);
        recipePhotoRepository = Mockito.mock(RecipePhotoRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        commentRepository = Mockito.mock(CommentRepository.class);
        recipeService = new RecipeServiceImpl(
                recipeRepository,
                ingredientRepository,
                directionRepository,
                hintRepository,
                ratingRepository,
                tagRepository,
                recipePhotoRepository,
                userRepository,
                commentRepository);

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));
        Mockito.when(recipeRepository.findByUser(Mockito.any())).thenReturn(recipes);

        List<Recipe> returnedRecipes = recipeService.findByUserId(1L);

        Assert.assertThat(returnedRecipes, Matchers.hasSize(3));
    }

    @Test
    void givenListOfIngredientsAndExistingRecipe_whenSaveAllIngredientsByRecipeId_thenAccept() {
        Recipe recipe = new Recipe();
        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(new Ingredient());

        recipeRepository = Mockito.mock(RecipeRepository.class);
        ingredientRepository = Mockito.mock(IngredientRepository.class);
        directionRepository = Mockito.mock(DirectionRepository.class);
        hintRepository = Mockito.mock(HintRepository.class);
        ratingRepository = Mockito.mock(RatingRepository.class);
        tagRepository = Mockito.mock(TagRepository.class);
        recipePhotoRepository = Mockito.mock(RecipePhotoRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        commentRepository = Mockito.mock(CommentRepository.class);
        recipeService = new RecipeServiceImpl(
                recipeRepository,
                ingredientRepository,
                directionRepository,
                hintRepository,
                ratingRepository,
                tagRepository,
                recipePhotoRepository,
                userRepository,
                commentRepository);

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));
        Mockito.when(ingredientRepository.save(Mockito.any())).thenReturn(Mockito.any());

        List<Ingredient> returnedIngredients = recipeService.saveAllIngredientsByRecipeId(1L, ingredients);

        Assert.assertEquals(returnedIngredients, ingredients);

    }

    @Test
    void givenExistingRecipe_whenUpdateRecipeByRecipeId_thenChangeTitle() {
        Recipe recipe1 = new Recipe();
        recipe1.setTitle("Title1");

        Recipe recipe2 = new Recipe();
        recipe2.setTitle("Title2");

        recipeRepository = Mockito.mock(RecipeRepository.class);
        ingredientRepository = Mockito.mock(IngredientRepository.class);
        directionRepository = Mockito.mock(DirectionRepository.class);
        hintRepository = Mockito.mock(HintRepository.class);
        ratingRepository = Mockito.mock(RatingRepository.class);
        tagRepository = Mockito.mock(TagRepository.class);
        recipePhotoRepository = Mockito.mock(RecipePhotoRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        commentRepository = Mockito.mock(CommentRepository.class);
        recipeService = new RecipeServiceImpl(
                recipeRepository,
                ingredientRepository,
                directionRepository,
                hintRepository,
                ratingRepository,
                tagRepository,
                recipePhotoRepository,
                userRepository,
                commentRepository);

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe1));
        Mockito.when(recipeRepository.save(Mockito.any())).thenReturn(recipe1);

        Recipe returnedRecipe = recipeService.updateRecipeByRecipeId(1L, recipe2);

        Assert.assertEquals(returnedRecipe.getTitle(), "Title2");
    }

    @Test
    void givenRecipeWitoutRating_whenGetRatingsByRecipeId_thenReturnArrayOfZeros() {
        Recipe recipe = new Recipe();
        List<Rating> ratings = new ArrayList<>();

        Rating rating1 = new Rating();
        recipe.setRatings(new ArrayList<>());

        recipeRepository = Mockito.mock(RecipeRepository.class);
        ingredientRepository = Mockito.mock(IngredientRepository.class);
        directionRepository = Mockito.mock(DirectionRepository.class);
        hintRepository = Mockito.mock(HintRepository.class);
        ratingRepository = Mockito.mock(RatingRepository.class);
        tagRepository = Mockito.mock(TagRepository.class);
        recipePhotoRepository = Mockito.mock(RecipePhotoRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        commentRepository = Mockito.mock(CommentRepository.class);
        recipeService = new RecipeServiceImpl(
                recipeRepository,
                ingredientRepository,
                directionRepository,
                hintRepository,
                ratingRepository,
                tagRepository,
                recipePhotoRepository,
                userRepository,
                commentRepository);

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        Double[] returedRatings = recipeService.getRatingsByRecipeId(1L);

        Assert.assertEquals(returedRatings[0], 0, 0);
        Assert.assertEquals(returedRatings[1], 0, 0);
    }
}*/
