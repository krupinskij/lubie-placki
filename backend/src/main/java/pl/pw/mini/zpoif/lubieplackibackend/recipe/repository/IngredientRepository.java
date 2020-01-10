package pl.pw.mini.zpoif.lubieplackibackend.recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
