package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value = {"/login", "/"})
    public ModelAndView login() {
        return new ModelAndView("login");
    }

    @GetMapping(value = "/index")
    public ModelAndView getMainPage() {
        ModelAndView mv = new ModelAndView();
        mv.addObject("authUser", userService.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()));
        mv.setViewName("index");
        return mv;
    }

    @GetMapping(value = "api/admin/{id}")
    public ResponseEntity<User> userInfo(@PathVariable long id) {
        User user = userService.get(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @GetMapping(value = "api/admin")
    public ResponseEntity<List<User>> listOfUsers() {
        List<User> userList = userService.list();
        return ResponseEntity.status(HttpStatus.OK).body(userList);
    }

    @DeleteMapping(value = "api/admin/{id}")
    public ResponseEntity<Long> deleteUser(@PathVariable long id) {
        userService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(id);
    }

    @PutMapping(value = "api/admin")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        userService.update(user);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @PostMapping(value = "api/admin")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.add(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

}
