package pl.pw.mini.zpoif.lubieplackibackend.user.service;

import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Recipe;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import java.util.List;

public interface UserService {
    List<String> findUserUsernamesByPrefix(String prefix);
    User saveUser(User user);

    User login(String username, String password);

    User findById(Long id);

}
