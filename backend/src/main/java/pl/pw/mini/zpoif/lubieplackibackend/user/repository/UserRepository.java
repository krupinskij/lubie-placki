package pl.pw.mini.zpoif.lubieplackibackend.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findBySecurityToken(UUID securityToken);

}
