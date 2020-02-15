/*
package pl.pw.mini.zpoif.lubieplackibackend.user.controller;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UnauthorizedException;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UserNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;
import pl.pw.mini.zpoif.lubieplackibackend.user.service.UserService;
import pl.pw.mini.zpoif.lubieplackibackend.user.service.UserServiceImpl;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class UserControllerTest {

    private UserRepository userRepository;

    private UserService userService;

    @Test
    void givenExistingUser_whenLogin_thenThrowUnauthorizedException() {
        userRepository = Mockito.mock(UserRepository.class);
        userService = new UserServiceImpl(
                userRepository
        );

        Mockito.when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.empty());

        try {
            User returnedUser = userService.login("A", "B");
            Assert.fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            Assert.assertEquals(ex.getMessage(), "Nazwa użytkownika lub hasło nie jest poprawne");
        }
    }

    @Test
    void givenExistingUser_whenFindById_thenAccept() {
        User user = new User();
        userRepository = Mockito.mock(UserRepository.class);
        userService = new UserServiceImpl(
                userRepository
        );

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));

        User returnedUser = userService.findById(1L);

        Assert.assertEquals(returnedUser, user);
    }

    @Test
    void givenNotExistingUser_whenFindById_thenThrowUserNotFoundException() {
        userRepository = Mockito.mock(UserRepository.class);
        userService = new UserServiceImpl(
                userRepository
        );

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            User returnedUser = userService.findById(1L);
            Assert.fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            Assert.assertEquals(ex.getMessage(), "Nie ma takiego użytkownika");
        }
    }

    @Test
    void givenNotExistingUser_whenGetUsernameByUserId_thenThrowUserNotFoundException() {
        userRepository = Mockito.mock(UserRepository.class);
        userService = new UserServiceImpl(
                userRepository
        );

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            String returnedUsername = userService.getUsernameByUserId(1L);
            Assert.fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            Assert.assertEquals(ex.getMessage(), "Nie ma takiego użytkownika");
        }
    }

    @Test
    void updateUsernameByUserId() {
    }

    @Test
    void givenExistingUser_whenUpdateUsernameByUserId_thenChangeUsername() {
        User user = new User();
        user.setUsername("A");

        userRepository = Mockito.mock(UserRepository.class);
        userService = new UserServiceImpl(
                userRepository
        );

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));
        Mockito.when(userRepository.save(Mockito.any())).thenReturn(user);

        User returnedUser = userService.updateUsernameByUserId(1L, "B");
        Assert.assertEquals(returnedUser.getUsername(), "B");
    }

    @Test
    void givenExistingUser_whenUpdateUsernameByUserId_thenAlsoChangeUsername() {
        User user = new User();
        user.setUsername("A");

        userRepository = Mockito.mock(UserRepository.class);
        userService = new UserServiceImpl(
                userRepository
        );

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));
        Mockito.when(userRepository.save(Mockito.any())).thenReturn(user);

        User returnedUser = userService.updateUsernameByUserId(1L, "B");
        Assert.assertNotEquals(returnedUser.getUsername(), "A");
    }

    @Test
    void givenNotExistingUser_whenUpdateUsernameByUserId_thenThrowUserNotFoundException() {
        userRepository = Mockito.mock(UserRepository.class);
        userService = new UserServiceImpl(
                userRepository
        );

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        Mockito.when(userRepository.save(Mockito.any())).thenReturn(new User());

        try {
            User returnedUser = userService.updateUsernameByUserId(1L, "A");
            Assert.fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            Assert.assertEquals(ex.getMessage(), "Nie ma takiego użytkownika");
        }
    }
}*/
