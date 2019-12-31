package pl.pw.mini.zpoif.lubieplackibackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pw.mini.zpoif.lubieplackibackend.model.Hint;

public interface HintRepository extends JpaRepository<Hint, Long> {
}
