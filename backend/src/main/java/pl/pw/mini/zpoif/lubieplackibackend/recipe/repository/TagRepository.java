package pl.pw.mini.zpoif.lubieplackibackend.recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Tag;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByText(String text);
}
