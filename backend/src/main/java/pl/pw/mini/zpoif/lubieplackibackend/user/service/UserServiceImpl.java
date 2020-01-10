package pl.pw.mini.zpoif.lubieplackibackend.user.service;

import org.springframework.stereotype.Service;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(Long id) {
        User user = userRepository.findById(id).orElse(null);

        return user;
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
