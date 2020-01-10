package pl.pw.mini.zpoif.lubieplackibackend.user.controller;

import org.springframework.web.bind.annotation.*;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Recipe;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.service.UserService;

import java.util.List;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.findById(id);
    }

    @GetMapping(path = "/{id}/recipes")
    public List<Recipe> getRecipesByUser(@PathVariable("id") Long id) { return userService.findRecipesByUser(id); }

    @PostMapping(path = "")
    public User saveRecipe(@RequestBody User user) {
        return userService.save(user);
    }
}
