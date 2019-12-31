package pl.pw.mini.zpoif.lubieplackibackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pw.mini.zpoif.lubieplackibackend.model.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
