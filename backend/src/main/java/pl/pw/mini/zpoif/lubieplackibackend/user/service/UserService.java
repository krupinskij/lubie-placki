package pl.pw.mini.zpoif.lubieplackibackend.user.service;

import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import java.util.List;

public interface UserService {
    User findById(Long id);

    User save(User user);
}
