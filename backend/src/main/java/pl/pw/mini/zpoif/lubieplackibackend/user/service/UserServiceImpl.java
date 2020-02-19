package pl.pw.mini.zpoif.lubieplackibackend.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import pl.pw.mini.zpoif.lubieplackibackend.comment.model.Comment;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Recipe;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UnauthorizedException;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UserNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<String> getUsernamesByPrefix(String prefix) {

        return userRepository.findAll().stream()
                .map(User::getUsername)
                .filter(username -> username.startsWith(prefix))
                .collect(Collectors.toList());
    }

    @Override
    public UUID saveUser(User user) {

        UUID randomUUID = UUID.randomUUID();
        user.setSecurityToken(randomUUID);
        userRepository.save(user);

        return user.getSecurityToken();
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
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Żeby się wylogować najpierw się zaloguj na swoje konto"));
        user.setSecurityToken(null);
        userRepository.save(user);
    }

    @Override
    public User getUser(UUID securityToken) {
        return userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));
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
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

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
    public User updateUserAvatar(UUID securityToken, byte[] avatar) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));

        user.setAvatar(avatar);

        return userRepository.save(user);
    }

    @Override
    public Integer getPointsByUserId(Long user_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

        Integer recipePoints = user.getRecipes().stream()
                .mapToInt(Recipe::getSumRating)
                .reduce(Integer::sum).orElse(0);

        Integer commentPoints = user.getComments().stream()
                .mapToInt(Comment::getPoints)
                .reduce(Integer::sum).orElse(0);

        return recipePoints + commentPoints;
    }
}
