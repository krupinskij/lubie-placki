package pl.pw.mini.zpoif.lubieplackibackend.user.service;

import org.springframework.stereotype.Service;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Recipe;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.repository.RecipeRepository;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private RecipeRepository recipeRepository;

    public UserServiceImpl(UserRepository userRepository, RecipeRepository recipeRepository) {
        this.userRepository = userRepository;

        this.recipeRepository = recipeRepository;
    }

    @Override
    public User findById(Long id) {
        User user = userRepository.findById(id).orElse(null);

        return user;
    }

    @Override
    public List<Recipe> findRecipesByUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        return recipeRepository.findByUser(user);
    }

    @Override
    public User save(User user) {
        userRepository.save(user);
        user.setPassword(null);
        return user;
    }

    @Override
    public User authenticate(User user) {
        User user1 = userRepository.findByLogin(user.getLogin()).orElse(null);
        if(user1 == null || !user1.getPassword().equals(user.getPassword())) return null;

        user1.setPassword(null);
        return user1;
    }
}
