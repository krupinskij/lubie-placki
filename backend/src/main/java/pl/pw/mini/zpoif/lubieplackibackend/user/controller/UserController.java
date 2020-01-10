package pl.pw.mini.zpoif.lubieplackibackend.user.controller;

import org.springframework.web.bind.annotation.*;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.service.UserService;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "/{id}")
    public User getRecipeById(@PathVariable("id") Long id) {
        return userService.findById(id);
    }

    @PostMapping(path = "")
    public User saveRecipe(@RequestBody User user) {
        return userService.save(user);
    }
}
