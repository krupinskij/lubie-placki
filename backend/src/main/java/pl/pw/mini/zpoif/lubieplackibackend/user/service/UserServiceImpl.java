package pl.pw.mini.zpoif.lubieplackibackend.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

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
        if(user==null || !password.equals(user.getPassword())) return null;

        return user;
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
