package pl.pw.mini.zpoif.lubieplackibackend.message.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pw.mini.zpoif.lubieplackibackend.message.model.Message;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByReceiver(User receiver);
    List<Message> findBySender(User sender);
}
