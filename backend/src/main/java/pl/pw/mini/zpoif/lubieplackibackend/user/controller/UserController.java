package pl.pw.mini.zpoif.lubieplackibackend.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.service.UserService;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity addUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    private static class LoginData {
        private String username;
        private String password;

        public LoginData() { }

        String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginData loginData) {
        return ResponseEntity.ok(userService.login(loginData.getUsername(), loginData.getPassword() ));
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader String securityTokenValue) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        userService.logout(securityToken);
        return ResponseEntity.ok("Wylogowano pomyślnie");
    }

    @GetMapping("")
    public ResponseEntity getUser(@RequestHeader String securityTokenValue) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(userService.getUser(securityToken));
    }

    @GetMapping("/{id}")
    public ResponseEntity getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/{user_id}/username")
    public ResponseEntity getUsernameByUserId(@PathVariable Long user_id) {
        return ResponseEntity.ok(userService.getUsernameByUserId(user_id));
    }

    @PutMapping("/username")
    public ResponseEntity updateUsername(@RequestHeader String securityTokenValue, @RequestBody String username) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(userService.updateUsername(securityToken, username));
    }

    @GetMapping(path = "/default/avatar", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity getDefaultAvatar() {
        return ResponseEntity.ok(userService.getDefaultAvatar());
    }

    @GetMapping(path = "/{user_id}/avatar", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity getUserAvatarByUserId(@PathVariable Long user_id) {
        return ResponseEntity.ok(userService.getUserAvatarByUserId(user_id));
    }

    @PutMapping(path = "/avatar")
    public ResponseEntity updateUserAvatar(@RequestHeader String securityTokenValue, @RequestBody byte[] photo) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(userService.updateUserAvatar(securityToken, photo));
    }

    @GetMapping(path = "/{user_id}/points")
    public ResponseEntity getPointsByUserId(@PathVariable Long user_id) {
        return ResponseEntity.ok(userService.getPointsByUserId(user_id));
    }


}

