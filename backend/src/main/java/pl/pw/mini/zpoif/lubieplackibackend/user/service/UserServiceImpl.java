package pl.pw.mini.zpoif.lubieplackibackend.user.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UnauthorizedException;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UserNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.io.IOException;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UUID saveUser(User newUser) {
        User user = userRepository.findByUsername(newUser.getUsername()).orElse(null);
        if(user != null) throw new UnauthorizedException("Istnieje już użytkownik o podanej nazwie");

        UUID randomUUID = UUID.randomUUID();
        newUser.setSecurityToken(randomUUID);
        userRepository.save(newUser);

        return newUser.getSecurityToken();
    }

    @Override
    public UUID login(String username, String password) {
        User user = userRepository.findByUsername(username).orElse(null);

        if(user==null || !user.getPassword().equals(password)) {
            throw new UnauthorizedException("Nazwa użytkownika lub hasło nie jest poprawne");
        }

        UUID randomUUID = UUID.randomUUID();
        user.setSecurityToken(randomUUID);
        userRepository.save(user);

        return user.getSecurityToken();
    }

    @Override
    public void logout(UUID securityToken) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Żeby się wylogować najpierw się zaloguj XD"));
        user.setSecurityToken(null);
        userRepository.save(user);
    }

    @Override
    public User getUser(UUID securityToken) {
        return userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));
    }

    @Override
    public Long getId(UUID securityToken) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));

        return user.getId();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));
    }

    @Override
    public String getUsernameByUserId(Long user_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

        return user.getUsername();
    }

    @Override
    public User updateUsername(UUID securityToken, String username) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się"));
        User oldUser = userRepository.findByUsername(username).orElse(null);
        if(oldUser != null && !user.equals(oldUser)) throw new UnauthorizedException("Podana nazwa jest już zajęta");

        user.setUsername(username);
        userRepository.save(user);

        return user;
    }

    @Override
    public byte[] getDefaultAvatar() {
        ClassPathResource imgFile = new ClassPathResource("image/avatar.png");

        try {
            return StreamUtils.copyToByteArray(imgFile.getInputStream());
        } catch (IOException ex) {
            return null;
        }
    }

    @Override
    public byte[] getUserAvatarByUserId(Long user_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

        if(user.getAvatar()!=null) return user.getAvatar();

        ClassPathResource imgFile = new ClassPathResource("image/avatar.png");

        try {
            return StreamUtils.copyToByteArray(imgFile.getInputStream());
        } catch (IOException ex) {
            return null;
        }
    }

    @Override
    public User updateUserAvatar(UUID securityToken, byte[] avatar) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się"));

        user.setAvatar(avatar);

        userRepository.save(user);

        return user;
    }

    @Override
    public Integer getPointsByUserId(Long user_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

        return user.getPoints();
    }
}
