package pl.pw.mini.zpoif.lubieplackibackend.recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.RecipePhoto;

public interface RecipePhotoRepository  extends JpaRepository<RecipePhoto, Long> {
    RecipePhoto findByRecipeId(Long id);
}
