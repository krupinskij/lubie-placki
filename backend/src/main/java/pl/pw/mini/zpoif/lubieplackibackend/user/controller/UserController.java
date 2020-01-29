package pl.pw.mini.zpoif.lubieplackibackend.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.service.UserService;

import java.io.IOException;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/register/usernames")
    public ResponseEntity getUsernamesByPrefix(@RequestParam String prefix) {
        return ResponseEntity.ok(userService.getUsernamesByPrefix(prefix));
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

    @GetMapping("/{id}")
    public ResponseEntity getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/{user_id}/username")
    public ResponseEntity getUsernameByUserId(@PathVariable Long user_id) {
        return ResponseEntity.ok(userService.getUsernameByUserId(user_id));
    }

    @PutMapping("/{user_id}/username")
    public ResponseEntity updateUsernameByUserId(@PathVariable Long user_id, @RequestBody String username) {
        return ResponseEntity.ok(userService.updateUsernameByUserId(user_id, username));
    }

    @GetMapping(path = "/default/avatar", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity getDefaultAvatar() throws IOException {
        return ResponseEntity.ok(userService.getDefaultAvatar());
    }

    @GetMapping(path = "/{user_id}/avatar", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity getUserAvatarByUserId(@PathVariable Long user_id) throws IOException {
        return ResponseEntity.ok(userService.getUserAvatarByUserId(user_id));
    }

    @PutMapping(path = "/{user_id}/avatar")
    public ResponseEntity updateUserAvatarByUserId(@PathVariable Long user_id, @RequestBody byte[] photo) {
        return ResponseEntity.ok(userService.updateUserAvatarByUserId(user_id, photo));
    }

    @GetMapping(path = "/{user_id}/points")
    public ResponseEntity getPointsByUserId(@PathVariable Long user_id) {
        return ResponseEntity.ok(userService.getPointsByUserId(user_id));
    }


}

