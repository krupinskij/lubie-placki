package pl.pw.mini.zpoif.lubieplackibackend.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.service.UserService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/register/usernames")
    public ResponseEntity getUsernames(@RequestParam String prefix) {
        List<String> usernames = userService.findUserUsernamesByPrefix(prefix);

        return new ResponseEntity(usernames, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity addUser(@RequestBody User user) {
        User newUser = userService.saveUser(user);

        return new ResponseEntity(newUser, HttpStatus.OK);
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
        User user = userService.login(loginData.getUsername(), loginData.getPassword() );

        if(user==null) return new ResponseEntity("incorrect username or password", HttpStatus.UNAUTHORIZED);

        return new ResponseEntity(user, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping("/{user_id}/username")
    public String getUsernameByUserId(@PathVariable Long user_id) {
        return userService.getUsernameByUserId(user_id);
    }

    @PutMapping("/{user_id}/username")
    public User updateUsernameByUserId(@PathVariable Long user_id, @RequestBody String username) {
        return userService.updateUsernameByUserId(user_id, username);
    }

    @GetMapping(path = "/default/avatar", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getDefaultAvatar() throws IOException {
        return userService.getDefaultAvatar();
    }

    @GetMapping(path = "/{user_id}/avatar", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getUserAvatarByUserId(@PathVariable Long user_id) throws IOException {
        return userService.getUserAvatarByUserId(user_id);
    }

    @PutMapping(path = "/{user_id}/avatar")
    public User updateUserAvatarByUserId(@PathVariable Long user_id, @RequestBody byte[] photo) {
        return userService.updateUserAvatarByUserId(user_id, photo);
    }


}

