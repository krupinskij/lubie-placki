package pl.pw.mini.zpoif.lubieplackibackend.message.service;

import pl.pw.mini.zpoif.lubieplackibackend.message.model.Message;

import java.util.List;

public interface MessageService {
    List<Message> getReceivedMessagesByUserId(Long user_id);
    List<Message> getSendedMessagesByUserId(Long user_id);

    Message getMessageById(Long id);

    Message postMessage(Long sender_id, Long receiver_id, Message message);
}
