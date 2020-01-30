package pl.pw.mini.zpoif.lubieplackibackend.message.controller;

import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import pl.pw.mini.zpoif.lubieplackibackend.message.exception.MessageNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.message.model.Message;
import pl.pw.mini.zpoif.lubieplackibackend.message.repository.MessageRepository;
import pl.pw.mini.zpoif.lubieplackibackend.message.service.MessageService;
import pl.pw.mini.zpoif.lubieplackibackend.message.service.MessageServiceImpl;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.repository.RecipeRepository;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UserNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

@RunWith(MockitoJUnitRunner.class)
class MessageControllerTest {

    private MessageRepository messageRepository;
    private UserRepository userRepository;

    private MessageService messageService;

    @Test
    void givenExistingUser_whenFindByReceiver_thenAccept() {
        User user = new User();
        user.setId(10L);

        List<Message> messages = new ArrayList<>();
        messages.add(new Message());
        messages.add(new Message());

        messageRepository = Mockito.mock(MessageRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        messageService = new MessageServiceImpl(
                messageRepository,
                userRepository
        );

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));
        Mockito.when(messageRepository.findByReceiver(Mockito.any())).thenReturn(messages);

        List<Message> returnedMessages = messageService.getReceivedMessagesByUserId(10L);

        Assert.assertThat(returnedMessages, Matchers.hasSize(2));
    }

    @Test
    void givenNotExistingUser_whenFindByReceiver_thenThrowUserNotFoundException() {

        List<Message> messages = new ArrayList<>();
        messages.add(new Message());
        messages.add(new Message());

        messageRepository = Mockito.mock(MessageRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        messageService = new MessageServiceImpl(
                messageRepository,
                userRepository
        );

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        Mockito.when(messageRepository.findByReceiver(Mockito.any())).thenReturn(messages);

        try {

            List<Message> returnedMessages = messageService.getReceivedMessagesByUserId(1L);
            Assert.fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            Assert.assertEquals(ex.getMessage(), "Nie ma takiego użytkownika");
        }

    }

    @Test
    void givenExistingUser_whenFindBySender_thenAccept() {
        User user = new User();
        user.setId(10L);

        List<Message> messages = new ArrayList<>();
        messages.add(new Message());
        messages.add(new Message());

        messageRepository = Mockito.mock(MessageRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        messageService = new MessageServiceImpl(
                messageRepository,
                userRepository
        );

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));
        Mockito.when(messageRepository.findBySender(Mockito.any())).thenReturn(messages);

        List<Message> returnedMessages = messageService.getSendedMessagesByUserId(10L);

        Assert.assertThat(returnedMessages, Matchers.hasSize(2));
    }

    @Test
    void givenNotExistingUser_whenFindBySender_thenThrowUserNotFoundException() {

        List<Message> messages = new ArrayList<>();
        messages.add(new Message());
        messages.add(new Message());

        messageRepository = Mockito.mock(MessageRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        messageService = new MessageServiceImpl(
                messageRepository,
                userRepository
        );

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        Mockito.when(messageRepository.findBySender(Mockito.any())).thenReturn(messages);

        try {

            List<Message> returnedMessages = messageService.getSendedMessagesByUserId(1L);
            Assert.fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            Assert.assertEquals(ex.getMessage(), "Nie ma takiego użytkownika");
        }

    }

    @Test
    void givenExistingMessage_whenGetMessageById_thenAccept() {
        Message message = new Message();

        messageRepository = Mockito.mock(MessageRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        messageService = new MessageServiceImpl(
                messageRepository,
                userRepository
        );

        Mockito.when(messageRepository.findById(Mockito.any())).thenReturn(Optional.of(message));

        Message returnedMessage = messageService.getMessageById(1L);

        Assert.assertEquals(message, returnedMessage);
    }

    @Test
    void givenNotExistingMessage_whenGetMessageById_thenThrowMessageNotFoundException() {

        messageRepository = Mockito.mock(MessageRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        messageService = new MessageServiceImpl(
                messageRepository,
                userRepository
        );

        Mockito.when(messageRepository.findById(Mockito.any())).thenReturn(Optional.empty());

        try {
            Message returnedMessage = messageService.getMessageById(1L);
            Assert.fail("Should throw MessageNotFoundException");
        } catch (MessageNotFoundException ex) {
            Assert.assertEquals(ex.getMessage(), "Nie ma takiej wiadomości");
        }
    }

    @Test
    void givenExistingUser_whenPostMessage_thenAccept() {

        User user = new User();
        Message message = new Message();
        message.setContent("Text");

        messageRepository = Mockito.mock(MessageRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        messageService = new MessageServiceImpl(
                messageRepository,
                userRepository
        );

        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(messageRepository.save(Mockito.any())).thenReturn(message);

        Message returnedMessage = messageService.postMessage(1L, 1L, message);

        Assert.assertEquals(returnedMessage.getContent(), "Text");

    }

    @Test
    void givenNotExistingUser_whenPostMessage_thenThrowUserNotFoundException() {

        Message message = new Message();
        message.setContent("Text");

        messageRepository = Mockito.mock(MessageRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        messageService = new MessageServiceImpl(
                messageRepository,
                userRepository
        );

        Mockito.when(userRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        Mockito.when(messageRepository.save(Mockito.any())).thenReturn(message);

        try {
            Message returnedMessage = messageService.postMessage(1L, 1L, message);
            Assert.fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            Assert.assertEquals(ex.getMessage(), "Nie ma takiego użytkownika");
        }
    }
}