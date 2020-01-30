package pl.pw.mini.zpoif.lubieplackibackend.message.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pw.mini.zpoif.lubieplackibackend.message.exception.MessageNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.message.model.Message;
import pl.pw.mini.zpoif.lubieplackibackend.message.repository.MessageRepository;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UserNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    private MessageRepository messageRepository;
    private UserRepository userRepository;

    public MessageServiceImpl(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Message> getReceivedMessagesByUserId(Long user_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

        return messageRepository.findByReceiver(user);

    }

    @Override
    public List<Message> getSendedMessagesByUserId(Long user_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

        return messageRepository.findBySender(user);
    }

    @Override
    public Message getMessageById(Long id) {
        return messageRepository.findById(id).orElseThrow(() -> new MessageNotFoundException("Nie ma takiej wiadomości"));
    }

    @Override
    public Message postMessage(Long sender_id, Long receiver_id, Message message) {
        User sender = userRepository.findById(sender_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));
        User receiver = userRepository.findById(receiver_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

        message.setDate(LocalDateTime.now());
        message.setReceiver(receiver);
        message.setSender(sender);

        return messageRepository.save(message);
    }
}
