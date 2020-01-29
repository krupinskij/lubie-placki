package pl.pw.mini.zpoif.lubieplackibackend.user.service;

import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import java.io.IOException;
import java.util.List;

public interface UserService {
    List<String> getUsernamesByPrefix(String prefix);
    User saveUser(User user);

    User login(String username, String password);

    User findById(Long id);

    String getUsernameByUserId(Long user_id);

    User updateUsernameByUserId(Long user_id, String username);

    byte[] getDefaultAvatar() throws IOException;
    byte[] getUserAvatarByUserId(Long user_id) throws IOException;
    User updateUserAvatarByUserId(Long user_id, byte[] avatar);

}
