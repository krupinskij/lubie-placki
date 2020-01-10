package pl.pw.mini.zpoif.lubieplackibackend.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
