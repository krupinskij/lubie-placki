package pl.pw.mini.zpoif.lubieplackibackend.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UnauthorizedException;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UserNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<String> findUserUsernamesByPrefix(String prefix) {

        List<String> usernames = userRepository.findAll().stream()
                .map(user -> user.getUsername())
                .filter(username -> username.startsWith(prefix))
                .collect(Collectors.toList());

        return usernames;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username).orElse(null);

        if(user==null || !user.getPassword().equals(password)) {
            throw new UnauthorizedException("Nazwa użytkownika lub hasło nie jest poprawne");
        }

        return user;
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));
    }

    @Override
    public String getUsernameByUserId(Long user_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

        return user.getUsername();
    }

    @Override
    public User updateUsernameByUserId(Long user_id, String username) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

        user.setUsername(username);
        return userRepository.save(user);
    }

    @Override
    public byte[] getDefaultAvatar() throws IOException {
        ClassPathResource imgFile = new ClassPathResource("image/avatar.png");

        return StreamUtils.copyToByteArray(imgFile.getInputStream());
    }

    @Override
    public byte[] getUserAvatarByUserId(Long user_id) throws IOException {
        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

        if(user.getAvatar()!=null) return user.getAvatar();

        ClassPathResource imgFile = new ClassPathResource("image/avatar.png");

        return StreamUtils.copyToByteArray(imgFile.getInputStream());
    }

    @Override
    public User updateUserAvatarByUserId(Long user_id, byte[] avatar) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

        user.setAvatar(avatar);

        return userRepository.save(user);
    }
}
