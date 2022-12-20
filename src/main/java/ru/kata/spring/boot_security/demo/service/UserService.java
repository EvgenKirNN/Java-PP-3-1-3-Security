package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {

    List<User> list();

    User get(long id);

    void add(User user);

    void delete(long id);

    void update(User user);

    User findByUsername(String username);
}
