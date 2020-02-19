package pl.pw.mini.zpoif.lubieplackibackend.user.service;

import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface UserService {
    UUID saveUser(User user);

    UUID login(String username, String password);
    void logout(UUID securityToken);

    User getUser(UUID securityToken);
    User getUserById(Long id);

    String getUsernameByUserId(Long user_id);

    User updateUsername(UUID securityToken, String username);

    byte[] getDefaultAvatar();
    byte[] getUserAvatarByUserId(Long user_id);
    User updateUserAvatar(UUID securityToken, byte[] avatar);

    Integer getPointsByUserId(Long user_id);

}
