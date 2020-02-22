package pl.pw.mini.zpoif.lubieplackibackend.user.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Rating;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Recipe;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UnauthorizedException;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UserNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {

    @Mock UserRepository userRepository;

    @Spy
    @InjectMocks
    UserServiceImpl userService;

    @Test
    public void saveUser_OccupiedUserName_ThrowUnauthorizedException() {

        User user = new User();
        user.setUsername("username");
        Mockito.when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.of(new User()));

        try {
            userService.saveUser(user);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Istnieje już użytkownik o podanej nazwie", ex.getMessage());
        }
    }

    @Test
    public void saveUser_NewUser_ReturnUUID() {

        User user = new User();
        user.setUsername("username");
        user.setPassword("password");
        Mockito.when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.empty());

        userService.saveUser(user);
    }

    @Test
    public void login_UnoccupiedUserName_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.empty());

        try {
            userService.login("username", "password");
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Nazwa użytkownika lub hasło nie jest poprawne", ex.getMessage());
        }
    }

    @Test
    public void login_WrongPassword_ThrowUnauthorizedException() {

        User user = new User();
        user.setUsername("username");
        user.setPassword("password");
        Mockito.when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.of(user));

        try {
            userService.login("username", "wrong password");
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Nazwa użytkownika lub hasło nie jest poprawne", ex.getMessage());
        }
    }

    @Test
    public void login_CorrectUserNameAndPassword_ReturnUUID() {

        User user = new User();
        user.setUsername("username");
        user.setPassword("password");
        Mockito.when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.of(user));

        userService.login("username", "password");
    }

    @Test
    public void logout_UnoccupiedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            userService.logout(UUID.randomUUID());
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Żeby się wylogować najpierw się zaloguj XD", ex.getMessage());
        }
    }

    @Test
    public void logout__DeleteSecurityToken() {

        User user = new User();
        UUID uuid = UUID.randomUUID();
        user.setSecurityToken(uuid);

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));

        userService.logout(uuid);
        assertNull(user.getSecurityToken());
    }

    @Test
    public void getUser_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            userService.getUser(UUID.randomUUID());
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się na swoje konto", ex.getMessage());
        }
    }

    @Test
    public void getUser_AssignedSecurityToken_ReturnUser() {

        User user = new User();
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));

        User returnedUser = userService.getUser(UUID.randomUUID());
        assertEquals(user, returnedUser);
    }

    @Test
    public void getId_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            userService.getId(UUID.randomUUID());
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się na swoje konto", ex.getMessage());
        }
    }

    @Test
    public void getId_AssignedSecurityToken_ReturnId() {

        User user = new User();
        user.setId(1L);
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));

        Long id = userService.getId(UUID.randomUUID());
        assertEquals(1L, id);
    }

    @Test
    public void getUserById_UnassignedId_ThrowUserNotFoundException() {

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            userService.getUserById(1L);
            fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            assertEquals("Nie ma takiego użytkownika", ex.getMessage());
        }
    }

    @Test
    public void getUserById_AssignedId_ReturnUser() {

        User user = new User();
        user.setId(1L);
        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));

        User returnedUser = userService.getUserById(1L);
        assertEquals(user, returnedUser);
        assertEquals(1L, returnedUser.getId());
    }

    @Test
    public void getUsernameByUserId_UnassignedId_ThrowUserNotFoundException() {

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            userService.getUsernameByUserId(1L);
            fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            assertEquals("Nie ma takiego użytkownika", ex.getMessage());
        }
    }

    @Test
    public void getUsernameByUserId_AssignedId_ReturnUser() {

        User user = new User();
        user.setId(1L);
        user.setUsername("username");
        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));

        String returnedUserName = userService.getUsernameByUserId(1L);
        assertEquals("username", returnedUserName);
    }

    @Test
    public void updateUsername_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            userService.updateUsername(UUID.randomUUID(), "username");
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void updateUsername_OccupiedUserName_ThrowUnauthorizedException() {

        User oldUser = new User();
        oldUser.setUsername("username");
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.of(oldUser));

        try {
            userService.updateUsername(UUID.randomUUID(), "username");
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Podana nazwa jest już zajęta", ex.getMessage());
        }
    }

    @Test
    public void updateUsername_NewUserName_ThrowUnauthorizedException() {

        User user = new User();
        user.setUsername("username");
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.empty());

        User returnedUser = userService.updateUsername(UUID.randomUUID(), "new username");
        assertEquals(user, returnedUser);
        assertEquals("new username", returnedUser.getUsername());
    }

    @Test
    public void getUserAvatarByUserId_UnassignedSecurityToken_ThrowUserNotFoundException() {

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            userService.getUserAvatarByUserId(1L);
            fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            assertEquals("Nie ma takiego użytkownika", ex.getMessage());
        }
    }

    @Test
    public void updateUserAvatar_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            userService.updateUserAvatar(UUID.randomUUID(), new byte[0]);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void updateUserAvatar_NewAvatar_ReturnUser() {

        User user = new User();
        byte[] avatar = new byte[0];
        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));

        User returnedUser = userService.updateUserAvatar(UUID.randomUUID(), avatar);
        assertEquals(user, returnedUser);
        assertEquals(avatar, returnedUser.getAvatar());
    }

    @Test
    public void getPointsByUserId_UnassignedId_ThrowUserNotFoundException() {

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            userService.getPointsByUserId(1L);
            fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            assertEquals("Nie ma takiego użytkownika", ex.getMessage());
        }
    }

    private List<Rating> getRatings(int count) {
        List<Rating> ratings = new ArrayList<>();
        Random random = new Random();

        for (int i=0; i<count; i++) {
            Rating rating = new Rating();
            rating.setRating(random.nextInt(5)+1);

            ratings.add(rating);
        }

        return ratings;
    }

    private List<Recipe> getRecipes(int recipeCount, int ratingsCount) {
        List<Recipe> recipes = new ArrayList<>();

        for(int i=0; i<recipeCount; i++) {
            Recipe recipe = new Recipe();
            recipe.setRatings(getRatings(ratingsCount));

            recipes.add(recipe);
        }

        return recipes;
    }

    @Test
    public void getPointsByUserId_UserWithoutRecipes_Return0() {

        User user = new User();
        user.setRecipes(getRecipes(0, 0));

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));

        Integer returnedPoints = userService.getPointsByUserId(1L);
        assertEquals(0, returnedPoints);
    }

    @Test
    public void getPointsByUserId_UserWith5RecipesAnd0Ratings_ReturnPoints() {

        User user = new User();
        user.setRecipes(getRecipes(5, 0));

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));

        Integer returnedPoints = userService.getPointsByUserId(1L);
        assertEquals(0, returnedPoints);
    }

    @Test
    public void getPointsByUserId_UserWith1Recipe_ReturnPoints() {

        User user = new User();
        List<Recipe> recipes = getRecipes(1, 5);
        user.setRecipes(recipes);

        Integer points = 0;
        for (Rating rating: recipes.get(0).getRatings()) {
            points += rating.getRating();
        }

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));

        Integer returnedPoints = userService.getPointsByUserId(1L);
        assertEquals(points, returnedPoints);
    }

    @Test
    public void getPointsByUserId_UserWith5Recipes_ReturnPoints() {

        User user = new User();
        List<Recipe> recipes = getRecipes(5, 5);
        user.setRecipes(recipes);

        Integer points = recipes.stream()
                .map(r-> {
                    int recipePoints = 0;
                    for (Rating rating: r.getRatings()) {
                        recipePoints += rating.getRating();
                    }

                    return recipePoints;
                }).reduce(Integer::sum).orElse(0);

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));

        Integer returnedPoints = userService.getPointsByUserId(1L);
        assertEquals(points, returnedPoints);
    }
}