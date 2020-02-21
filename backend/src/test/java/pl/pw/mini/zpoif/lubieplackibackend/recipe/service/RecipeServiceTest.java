package pl.pw.mini.zpoif.lubieplackibackend.recipe.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.exception.RatingNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.exception.RecipeNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.*;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.repository.*;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UnauthorizedException;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UserNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(MockitoJUnitRunner.class)
public class RecipeServiceTest {

    @Mock RecipeRepository recipeRepository;
    @Mock IngredientRepository ingredientRepository;
    @Mock DirectionRepository directionRepository;
    @Mock HintRepository hintRepository;
    @Mock RatingRepository ratingRepository;

    @Mock UserRepository userRepository;

    @Spy
    @InjectMocks
    RecipeServiceImpl recipeService;

    private LocalDateTime getRandomDate() {
        Random random = new Random();
        return LocalDateTime.of(
                random.nextInt(50) + 1975,
                random.nextInt(11)+1,
                random.nextInt(20)+1,
                random.nextInt(23),
                random.nextInt(59)
        );
    }

    private List<Recipe> getRecipes(int count) {

        String[] titles = new String[] { "aaa", "bbb", "ccc", "ddd", "eee", "fff" };
        String[] types = new String[] { "makowiec", "jablecznik", "piernik", "inne" };
        String[] texts = new String[] { "aaa", "bbb", "ccc", "ddd", "eee", "fff" };
        Random random = new Random();

        List<Recipe> recipes = new ArrayList<>();

        for(int i = 0; i < count; i++) {
            List<Rating> ratings = new ArrayList<>();
            List<Tag> tags = new ArrayList<>();
            Recipe recipe = new Recipe();

            for(int j = 0; j < 5; j++) {
                Rating rating = new Rating();
                rating.setRating(random.nextInt(4)+1);
                rating.setRecipe(recipe);
                ratings.add(rating);
            }

            for(int j = 0; j < 6; j++) {
                if(random.nextBoolean()) {
                    Tag tag = new Tag();
                    tag.setText(texts[j]);
                    tags.add(tag);
                }
            }

            recipe.setTitle(titles[random.nextInt(titles.length-1)]);
            recipe.setType(types[random.nextInt(types.length-1)]);
            recipe.setAdd_date(getRandomDate());
            recipe.setRatings(ratings);
            recipe.setTags(tags);

            recipes.add(recipe);
        }

        return recipes;
    }

    @Test
    public void getAll_SortAlphabetically_ReturnRecipesSortedAlphabetically() {
        List<Recipe> recipes = getRecipes(10);
        List<Recipe> sortedRecipes = recipes.stream().sorted(Comparator.comparing(Recipe::getTitle)).collect(Collectors.toList());

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        List<Recipe> returnedRecipes = recipeService.getAll(null, "alpha", null, null, null);
        assertEquals(sortedRecipes, returnedRecipes);
    }

    @Test
    public void getAll_SortByAverage_ReturnRecipesSortedByAverage() {
        List<Recipe> recipes = getRecipes(10);
        List<Recipe> sortedRecipes = recipes.stream().sorted(Comparator.comparing(Recipe::getAverageRating).reversed()).collect(Collectors.toList());

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        List<Recipe> returnedRecipes = recipeService.getAll(null, "average", null, null, null);
        assertEquals(sortedRecipes, returnedRecipes);
    }

    @Test
    public void getAll_SortByAmountOfRatings_ReturnRecipesSortedByAmountOfRatings() {
        List<Recipe> recipes = getRecipes(10);
        List<Recipe> sortedRecipes = recipes.stream().sorted(Comparator.comparing(Recipe::getCountRating).reversed()).collect(Collectors.toList());

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        List<Recipe> returnedRecipes = recipeService.getAll(null, "count", null, null, null);
        assertEquals(sortedRecipes, returnedRecipes);
    }

    @Test
    public void getAll_SortByNull_ReturnRecipesSortedByAddDate() {
        List<Recipe> recipes = getRecipes(10);
        List<Recipe> sortedRecipes = recipes.stream().sorted(Comparator.comparing(Recipe::getAdd_date).reversed()).collect(Collectors.toList());

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        List<Recipe> returnedRecipes = recipeService.getAll(null, null, null, null, null);
        assertEquals(sortedRecipes, returnedRecipes);
    }

    @Test
    public void getAll_ListWith11RecipesAndPage2_ReturnListWith1Recipe() {
        List<Recipe> recipes = getRecipes(11);

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        List<Recipe> returnedRecipes = recipeService.getAll(null, null, null, null, 2);
        assertEquals(1, returnedRecipes.size());
    }

    @Test
    public void getAll_ListWith25RecipesAndPage5_ReturnEmptyList() {
        List<Recipe> recipes = getRecipes(25);

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        List<Recipe> returnedRecipes = recipeService.getAll(null, null, null, null, 5);
        assertEquals(0, returnedRecipes.size());
    }

    @Test
    public void getAll_FilterByType_ReturnListOnlyWithOneType() {
        List<Recipe> recipes = getRecipes(10);
        List<Recipe> filteredRecipes = recipes.stream()
                .filter(r -> r.getType().equals("jablecznik"))
                .sorted(Comparator.comparing(Recipe::getAdd_date).reversed())
                .collect(Collectors.toList());

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        List<Recipe> returnedRecipes = recipeService.getAll("jablecznik", null, null, null, 1);
        assertEquals(filteredRecipes, returnedRecipes);
    }

    @Test
    public void getAll_FilterByTag_ReturnListOfRecipes() {
        List<Recipe> recipes = getRecipes(10);
        List<Recipe> filteredRecipes = recipes.stream()
                .filter(r -> {
                    for(Tag tag: r.getTags()) {
                        if(tag.getText().equals("aaa")) return true;
                    }
                    return false;
                })
                .sorted(Comparator.comparing(Recipe::getAdd_date).reversed())
                .collect(Collectors.toList());

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        List<Recipe> returnedRecipes = recipeService.getAll(null, null, "aaa", null, 1);
        assertEquals(filteredRecipes, returnedRecipes);
    }

    @Test
    public void getPagesCount_EmptyList_Return1() {
        List<Recipe> recipes = getRecipes(0);

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        Long returnedCount = recipeService.getPagesCount(null, null, null);
        assertEquals(1, returnedCount);
    }

    @Test
    public void getPagesCount_ListWith1Element_Return1() {
        List<Recipe> recipes = getRecipes(1);

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        Long returnedCount = recipeService.getPagesCount(null, null, null);
        assertEquals(1, returnedCount);
    }

    @Test
    public void getPagesCount_ListWith10Elements_Return1() {
        List<Recipe> recipes = getRecipes(10);

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        Long returnedCount = recipeService.getPagesCount(null, null, null);
        assertEquals(1, returnedCount);
    }

    @Test
    public void getPagesCount_ListWith11Elements_Return2() {
        List<Recipe> recipes = getRecipes(11);

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        Long returnedCount = recipeService.getPagesCount(null, null, null);
        assertEquals(2, returnedCount);
    }

    @Test
    public void getPagesCount_FilterByType_ReturnPagesCount() {
        List<Recipe> recipes = getRecipes(20);
        long pagesCount = recipes.stream()
                .filter(r -> r.getType().equals("jablecznik"))
                .count();
        pagesCount = (pagesCount + 9) / 10;
        if(pagesCount == 0) pagesCount = 1;

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        Long returnedCount = recipeService.getPagesCount("jablecznik", null, null);
        assertEquals(pagesCount, returnedCount);
    }

    @Test
    public void getPagesCount_FilterByTag_ReturnPagesCount() {
        List<Recipe> recipes = getRecipes(20);
        long pagesCount = recipes.stream()
                .filter(r -> {
                    for(Tag tag: r.getTags()) {
                        if(tag.getText().equals("aaa")) return true;
                    }
                    return false;
                })
                .count();
        pagesCount = (pagesCount + 9) / 10;
        if(pagesCount == 0) pagesCount = 1;

        Mockito.when(recipeRepository.findAll()).thenReturn(recipes);

        Long returnedCount = recipeService.getPagesCount(null, "aaa", null);
        assertEquals(pagesCount, returnedCount);
    }

    @Test
    public void getRecipeByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.getRecipeByRecipeId(1L);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void getRecipeByRecipeId_AssignedRecipeId_ReturnRecipe() {

        Recipe recipe = new Recipe();
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        Recipe returnedRecipe = recipeService.getRecipeByRecipeId(1L);
        assertEquals(recipe, returnedRecipe);
    }

    @Test
    public void getRecipesByUserId_UnassignedUserId_ThrowUserNotFoundException() {

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.getRecipesByUserId(1L);
            fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            assertEquals("Nie znaleziono użytkownika", ex.getMessage());
        }
    }

    @Test
    public void getRecipesByUserId_AssignedUserId_ReturnRecipes() {

        List<Recipe> recipes = new ArrayList<>();
        recipes.add(new Recipe());
        recipes.add(new Recipe());
        User user = new User();
        user.setRecipes(recipes);
        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));

        List<Recipe> returnedRecipes = recipeService.getRecipesByUserId(1L);
        assertEquals(recipes, returnedRecipes);
        assertEquals(2, returnedRecipes.size());
    }

    @Test
    public void getRecipePhotoByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.getRecipePhotoByRecipeId(1L);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie ma takiego przepisu", ex.getMessage());
        }
    }

    @Test
    public void saveRecipe_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.saveRecipe(UUID.randomUUID(), new Recipe());
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void saveRecipe_AssignedSecurityToken_ReturnRecipe() {

        User user = new User();
        Recipe recipe = new Recipe();
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(recipeRepository.save(Mockito.any())).thenReturn(recipe);

        Recipe returnedRecipe = recipeService.saveRecipe(UUID.randomUUID(), recipe);

        assertEquals(recipe, returnedRecipe);
        assertEquals(user, returnedRecipe.getUser());
        assertEquals(0, returnedRecipe.getRatings().size());
    }

    @Test
    public void saveAllIngredientsByRecipeId_UnassignedSecurityToken_ThrowUnauthorizedException() {

        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(new Ingredient());
        ingredients.add(new Ingredient());
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.saveAllIngredientsByRecipeId(UUID.randomUUID(), 1L, ingredients);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void saveAllIngredientsByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(new Ingredient());
        ingredients.add(new Ingredient());
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.saveAllIngredientsByRecipeId(UUID.randomUUID(), 1L, ingredients);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void saveAllIngredientsByRecipeId_ListOfIngredients_ReturnListOfIngredients() {

        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(new Ingredient());
        ingredients.add(new Ingredient());
        Recipe recipe = new Recipe();
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        List<Ingredient> returnedIngredients = recipeService.saveAllIngredientsByRecipeId(UUID.randomUUID(), 1L, ingredients);
        assertEquals(ingredients, returnedIngredients);
        assertEquals(2, returnedIngredients.size());
        assertEquals(recipe, returnedIngredients.get(0).getRecipe());
    }

    @Test
    public void saveAllDirectionsByRecipeId_UnassignedSecurityToken_ThrowUnauthorizedException() {

        List<Direction> directions = new ArrayList<>();
        directions.add(new Direction());
        directions.add(new Direction());
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.saveAllDirectionsByRecipeId(UUID.randomUUID(), 1L, directions);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void saveAllDirectionsByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        List<Direction> directions = new ArrayList<>();
        directions.add(new Direction());
        directions.add(new Direction());
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.saveAllDirectionsByRecipeId(UUID.randomUUID(), 1L, directions);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void saveAllDirectionsByRecipeId_ListOfDirection_ReturnListOfDirection() {

        List<Direction> directions = new ArrayList<>();
        directions.add(new Direction());
        directions.add(new Direction());
        Recipe recipe = new Recipe();
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        List<Direction> returnedDirections = recipeService.saveAllDirectionsByRecipeId(UUID.randomUUID(), 1L, directions);
        assertEquals(directions, returnedDirections);
        assertEquals(2, returnedDirections.size());
        assertEquals(recipe, returnedDirections.get(0).getRecipe());
    }

    @Test
    public void saveAllHintsByRecipeId_UnassignedSecurityToken_ThrowUnauthorizedException() {

        List<Hint> hints = new ArrayList<>();
        hints.add(new Hint());
        hints.add(new Hint());
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.saveAllHintsByRecipeId(UUID.randomUUID(), 1L, hints);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void saveAllHintsByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        List<Hint> hints = new ArrayList<>();
        hints.add(new Hint());
        hints.add(new Hint());
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.saveAllHintsByRecipeId(UUID.randomUUID(), 1L, hints);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void saveAllHintsByRecipeId_ListOfHints_ReturnListOfHints() {

        List<Hint> hints = new ArrayList<>();
        hints.add(new Hint());
        hints.add(new Hint());
        Recipe recipe = new Recipe();
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        List<Hint> returnedHints = recipeService.saveAllHintsByRecipeId(UUID.randomUUID(), 1L, hints);
        assertEquals(hints, returnedHints);
        assertEquals(2, returnedHints.size());
        assertEquals(recipe, returnedHints.get(0).getRecipe());
    }

    @Test
    public void saveRecipePhotoByRecipeId_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.saveRecipePhotoByRecipeId(UUID.randomUUID(), 1L, null);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void saveRecipePhotoByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.saveRecipePhotoByRecipeId(UUID.randomUUID(), 1L, null);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void saveRecipePhotoByRecipeId_ByteArray_ReturnRecipe() {

        Recipe recipe = new Recipe();
        byte[] photo = new byte[0];
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));
        Mockito.when(recipeRepository.save(Mockito.any())).thenReturn(recipe);

        Recipe returnedRecipe = recipeService.saveRecipePhotoByRecipeId(UUID.randomUUID(), 1L, photo);
        assertEquals(recipe, returnedRecipe);
        assertEquals(photo, returnedRecipe.getPhoto());
    }

    @Test
    public void saveTagsByRecipeId_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.saveTagsByRecipeId(UUID.randomUUID(), 1L, "");
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void saveTagsByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.saveTagsByRecipeId(UUID.randomUUID(), 1L, "");
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void saveTagsByRecipeId_TagString_ReturnListOfTags() {

        Recipe recipe = new Recipe();
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));
        Mockito.when(recipeRepository.save(Mockito.any())).thenReturn(recipe);

        List<Tag> tags = recipeService.saveTagsByRecipeId(UUID.randomUUID(), 1L, "#1 #2 #3");
        assertEquals(3, tags.size());
        assertEquals("1", tags.get(0).getText());
        assertEquals("2", tags.get(1).getText());
    }

    @Test
    public void updateRecipeByRecipeId_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.updateRecipeByRecipeId(UUID.randomUUID(), 1L, new Recipe());
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void updateRecipeByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.updateRecipeByRecipeId(UUID.randomUUID(), 1L, new Recipe());
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void updateRecipeByRecipeId_UnassignedRecipe_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(new Recipe()));

        try {
            recipeService.updateRecipeByRecipeId(UUID.randomUUID(), 1L, new Recipe());
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Nie jesteś autorem tego przepisu", ex.getMessage());
        }
    }

    @Test
    public void updateRecipeByRecipeId_NewRecipe_ReturnRecipe() {

        User user = new User();
        Recipe recipe = new Recipe();
        recipe.setUser(user);
        Recipe newRecipe = new Recipe();
        newRecipe.setTitle("Title");
        newRecipe.setDescription("Description");
        newRecipe.setType("Type");
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));
        Mockito.when(recipeRepository.save(Mockito.any())).thenReturn(recipe);

        Recipe returnedRecipe = recipeService.updateRecipeByRecipeId(UUID.randomUUID(), 1L, newRecipe);

        assertEquals("Title", returnedRecipe.getTitle());
        assertEquals("Description", returnedRecipe.getDescription());
        assertEquals("Type", returnedRecipe.getType());
    }

    @Test
    public void updateAllIngredientsByRecipeId_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.updateAllIngredientsByRecipeId(UUID.randomUUID(), 1L, new ArrayList<>());
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void updateAllIngredientsByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.updateAllIngredientsByRecipeId(UUID.randomUUID(), 1L, new ArrayList<>());
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void updateAllIngredientsByRecipeId_UnassignedRecipe_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(new Recipe()));

        try {
            recipeService.updateAllIngredientsByRecipeId(UUID.randomUUID(), 1L, new ArrayList<>());
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Nie jesteś autorem tego przepisu", ex.getMessage());
        }
    }

    @Test
    public void updateAllIngredientsByRecipeId_NewIngredients_ReturnIngredients() {
        User user = new User();
        Recipe recipe = new Recipe();
        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(new Ingredient());
        recipe.setUser(user);
        recipe.setIngredients(ingredients);
        List<Ingredient> newIngredients = new ArrayList<>();
        newIngredients.add(new Ingredient());
        newIngredients.add(new Ingredient());

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));
        Mockito.when(ingredientRepository.save(Mockito.any())).thenReturn(new Ingredient());

        List<Ingredient> returnedIngredients = recipeService.updateAllIngredientsByRecipeId(UUID.randomUUID(), 1L, newIngredients);

        assertEquals(newIngredients, returnedIngredients);
        assertEquals(2, returnedIngredients.size());
    }

    @Test
    public void updateAllDirectionsByRecipeId_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.updateAllDirectionsByRecipeId(UUID.randomUUID(), 1L, new ArrayList<>());
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void updateAllDirectionsByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.updateAllDirectionsByRecipeId(UUID.randomUUID(), 1L, new ArrayList<>());
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void updateAllDirectionsByRecipeId_UnassignedRecipe_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(new Recipe()));

        try {
            recipeService.updateAllDirectionsByRecipeId(UUID.randomUUID(), 1L, new ArrayList<>());
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Nie jesteś autorem tego przepisu", ex.getMessage());
        }
    }

    @Test
    public void updateAllDirectionsByRecipeId_NewDirections_ReturnDirections() {
        User user = new User();
        Recipe recipe = new Recipe();
        List<Direction> directions = new ArrayList<>();
        directions.add(new Direction());
        recipe.setUser(user);
        recipe.setDirections(directions);
        List<Direction> newDirections = new ArrayList<>();
        newDirections.add(new Direction());
        newDirections.add(new Direction());

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));
        Mockito.when(directionRepository.save(Mockito.any())).thenReturn(new Direction());

        List<Direction> returnedDirections = recipeService.updateAllDirectionsByRecipeId(UUID.randomUUID(), 1L, newDirections);

        assertEquals(newDirections, returnedDirections);
        assertEquals(2, returnedDirections.size());
    }

    @Test
    public void updateAllHintsByRecipeId_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.updateAllHintsByRecipeId(UUID.randomUUID(), 1L, new ArrayList<>());
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void updateAllHintsByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.updateAllHintsByRecipeId(UUID.randomUUID(), 1L, new ArrayList<>());
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void updateAllHintsByRecipeId_UnassignedRecipe_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(new Recipe()));

        try {
            recipeService.updateAllHintsByRecipeId(UUID.randomUUID(), 1L, new ArrayList<>());
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Nie jesteś autorem tego przepisu", ex.getMessage());
        }
    }

    @Test
    public void updateAllHintsByRecipeId_NewHints_ReturnHints() {
        User user = new User();
        Recipe recipe = new Recipe();
        List<Hint> hints = new ArrayList<>();
        hints.add(new Hint());
        recipe.setUser(user);
        recipe.setHints(hints);
        List<Hint> newHints = new ArrayList<>();
        newHints.add(new Hint());
        newHints.add(new Hint());

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));
        Mockito.when(hintRepository.save(Mockito.any())).thenReturn(new Hint());

        List<Hint> returnedHints = recipeService.updateAllHintsByRecipeId(UUID.randomUUID(), 1L, newHints);

        assertEquals(newHints, returnedHints);
        assertEquals(2, returnedHints.size());
    }

    @Test
    public void updateRecipePhotoByRecipeId_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.updateRecipePhotoByRecipeId(UUID.randomUUID(), 1L, new byte[0]);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void updateRecipePhotoByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.updateRecipePhotoByRecipeId(UUID.randomUUID(), 1L, new byte[0]);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void updateRecipePhotoByRecipeId_UnassignedRecipe_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(new Recipe()));

        try {
            recipeService.updateRecipePhotoByRecipeId(UUID.randomUUID(), 1L, new byte[0]);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Nie jesteś autorem tego przepisu", ex.getMessage());
        }
    }

    @Test
    public void updateRecipePhotoByRecipeId_NewPhoto_ReturnRecipe() {

        User user = new User();
        Recipe recipe = new Recipe();
        recipe.setUser(user);
        recipe.setPhoto(new byte[0]);
        byte[] newPhoto = new byte[0];
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));
        Mockito.when(recipeRepository.save(Mockito.any())).thenReturn(recipe);

        Recipe returnedRecipe = recipeService.updateRecipePhotoByRecipeId(UUID.randomUUID(), 1L, newPhoto);
        assertEquals(recipe, returnedRecipe);
        assertEquals(newPhoto, returnedRecipe.getPhoto());
    }

    @Test
    public void deleteRecipe_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.deleteRecipe(UUID.randomUUID(), 1L);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void deleteRecipe_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.deleteRecipe(UUID.randomUUID(), 1L);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void deleteRecipe_UnassignedRecipe_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(new Recipe()));

        try {
            recipeService.deleteRecipe(UUID.randomUUID(), 1L);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Nie jesteś autorem tego przepisu", ex.getMessage());
        }
    }

    @Test
    public void addRatingByRecipeId_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.addRatingByRecipeId(UUID.randomUUID(), 1L, 5);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void addRatingByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.addRatingByRecipeId(UUID.randomUUID(), 1L, 5);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void addRatingByRecipeId_SetRating_ReturnRating() {

        Recipe recipe = new Recipe();
        recipe.setRatings(new ArrayList<>());

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));
        Mockito.when(ratingRepository.save(Mockito.any())).thenReturn(new Rating());

        Rating returnedRating = recipeService.addRatingByRecipeId(UUID.randomUUID(), 1L, 5);
        assertEquals(5, returnedRating.getRating());
    }

    @Test
    public void deleteRating_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.deleteRating(UUID.randomUUID(), 1L);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void deleteRating_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.deleteRating(UUID.randomUUID(), 1L);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void deleteRating_RecipeWithNoRatings_ThrowRatingNotFoundException() {

        User user = new User();
        Recipe recipe = new Recipe();
        recipe.setRatings(new ArrayList<>());
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        try {
            recipeService.deleteRating(UUID.randomUUID(), 1L);
            fail("Should throw RatingNotFoundException");
        } catch (RatingNotFoundException ex) {
            assertEquals("Ten użytkownik nie ocenił jeszcze tego przepisu", ex.getMessage());
        }
    }

    @Test
    public void deleteRating_UnassignedRecipe_ThrowRatingNotFoundException() {

        User user = new User();

        Rating rating = new Rating();
        rating.setUser(user);

        Recipe recipe = new Recipe();
        List<Rating> ratings = new ArrayList<>();
        ratings.add(rating);
        recipe.setRatings(ratings);

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        Rating returnedRating = recipeService.deleteRating(UUID.randomUUID(), 1L);
        assertEquals(rating, returnedRating);
    }

    @Test
    public void getRating_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            recipeService.getRating(UUID.randomUUID(), 1L);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void getRating_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.getRating(UUID.randomUUID(), 1L);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void getRating_RecipeWithNoRatings_ThrowRatingNotFoundException() {

        Recipe recipe = new Recipe();
        recipe.setRatings(new ArrayList<>());

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        try {
            recipeService.getRating(UUID.randomUUID(), 1L);
            fail("Should throw RatingNotFoundException");
        } catch (RatingNotFoundException ex) {
            assertEquals("Ten użytkownik nie ocenił jeszcze tego przepisu", ex.getMessage());
        }
    }

    @Test
    public void getRating__ReturnRating() {

        User user = new User();

        Rating rating = new Rating();
        rating.setUser(user);
        rating.setRating(5);

        Recipe recipe = new Recipe();
        List<Rating> ratings = new ArrayList<>();
        ratings.add(rating);
        recipe.setRatings(ratings);

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        Integer returnedRating = recipeService.getRating(UUID.randomUUID(), 1L);
        assertEquals(5, returnedRating);
    }

    @Test
    public void getRatingsByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            recipeService.getRatingsByRecipeId(1L);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    private List<Rating> getRatings(int count) {
        List<Rating> ratings = new ArrayList<>();
        Random random = new Random();

        for(int i=0; i<count; i++) {
            Rating rating = new Rating();
            rating.setRating(random.nextInt(5)+1);

            ratings.add(rating);
        }

        return ratings;
    }

    @Test
    public void getRatingsByRecipeId_RecipeWith0Ratings_ReturnStats() {

        Recipe recipe = new Recipe();
        recipe.setRatings(getRatings(0));

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        Double[] stats = recipeService.getRatingsByRecipeId(1L);
        assertEquals(2, stats.length);
        assertEquals(0.0, stats[0]);
        assertEquals(0.0, stats[1]);
    }

    @Test
    public void getRatingsByRecipeId_RecipeWith1Ratings_ReturnStats() {

        Recipe recipe = new Recipe();
        List<Rating> ratings = getRatings(1);
        recipe.setRatings(ratings);

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        Double[] stats = recipeService.getRatingsByRecipeId(1L);
        assertEquals(2, stats.length);
        assertEquals(ratings.get(0).getRating(), stats[0], 0);
        assertEquals(1.0, stats[1]);
    }

    @Test
    public void getRatingsByRecipeId_RecipeWith10Ratings_ReturnStats() {

        Recipe recipe = new Recipe();
        List<Rating> ratings = getRatings(10);
        Double sum = Double.valueOf(ratings.stream().map(Rating::getRating).reduce(Integer::sum).orElse(0));
        recipe.setRatings(ratings);

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        Double[] stats = recipeService.getRatingsByRecipeId(1L);
        assertEquals(2, stats.length);
        assertEquals(sum / 10, stats[0]);
        assertEquals(10.0, stats[1]);
    }



}
