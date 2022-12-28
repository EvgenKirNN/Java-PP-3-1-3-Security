package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
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
        return new ModelAndView("index");
    }

    @GetMapping(value = "api/user")
    public ResponseEntity<User> getUserInfo(Principal principal) {
        return new ResponseEntity<>(userService.findByUsername(principal.getName()), HttpStatus.OK);
    }

    @GetMapping(value = "api/admin/find/{username}")
    public ResponseEntity<User> userNameInfo(@PathVariable String username) {
        User user = userService.findByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping(value = "api/admin/{id}")
    public ResponseEntity<User> userInfo(@PathVariable long id) {
        User user = userService.get(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping(value = "api/admin")
    public ResponseEntity<List<User>> listOfUsers() {
        List<User> userList = userService.list();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @DeleteMapping(value = "api/admin/{id}")
    public ResponseEntity<Long> deleteUser(@PathVariable long id) {
        userService.delete(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PutMapping(value = "api/admin")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        userService.update(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping(value = "api/admin")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.add(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

}
