package pl.pw.mini.zpoif.lubieplackibackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pw.mini.zpoif.lubieplackibackend.model.Direction;

public interface DirectionRepository extends JpaRepository<Direction, Long> {
}
