package pl.pw.mini.zpoif.lubieplackibackend.recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Recipe;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByType(String type);
    List<Recipe> findByUser(User user);
}
