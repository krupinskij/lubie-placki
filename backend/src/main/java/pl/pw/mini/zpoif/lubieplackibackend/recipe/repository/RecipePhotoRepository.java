package pl.pw.mini.zpoif.lubieplackibackend.recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.RecipePhoto;

import java.util.Optional;

public interface RecipePhotoRepository  extends JpaRepository<RecipePhoto, Long> {
    Optional<RecipePhoto> findByRecipeId(Long id);
}
