package pl.pw.mini.zpoif.lubieplackibackend.user.service;

import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Recipe;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import java.util.List;

public interface UserService {
    User findById(Long id);

    List<Recipe> findRecipesByUser(Long user_id);

    User save(User user);
    User authenticate(User user);
}
