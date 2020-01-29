package pl.pw.mini.zpoif.lubieplackibackend.message.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pw.mini.zpoif.lubieplackibackend.message.model.Message;
import pl.pw.mini.zpoif.lubieplackibackend.message.service.MessageService;

@RestController
@RequestMapping(path = "/messages")
@CrossOrigin
public class MessageController {

    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping(path = "/{user_id}/received")
    public ResponseEntity getReceivedMessagesByUserId(@PathVariable Long user_id) {
        return ResponseEntity.ok(messageService.getReceivedMessagesByUserId(user_id));
    }

    @GetMapping(path = "/{user_id}/sended")
    public ResponseEntity getSendedMessagesByUserId(@PathVariable Long user_id) {
        return ResponseEntity.ok(messageService.getSendedMessagesByUserId(user_id));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity getMessageById(@PathVariable Long id) {
        return ResponseEntity.ok(messageService.getMessageById(id));
    }

    @PostMapping(path = "/{sender_id}/{receiver_id}")
    public ResponseEntity postMessage(@PathVariable Long sender_id, @PathVariable Long receiver_id, @RequestBody Message message) {
        return ResponseEntity.ok(messageService.postMessage(sender_id, receiver_id, message));
    }
}
