package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value = {"/", "/index"})
    public String showIndex() {
        return "index";
    }

    @GetMapping(value = "/user")
    public String showUserInfo(Principal principal, ModelMap model) {
        model.addAttribute("user", userService.findByUsername(principal.getName()));
        model.addAttribute("listOfRoles", roleService.roles());
        return "user";
    }

    @GetMapping(value = "/admin")
    public String showAdminPage(Principal principal, ModelMap model) {
        model.addAttribute("user", userService.findByUsername(principal.getName()));
        return "admin";
    }

    @GetMapping(value = "/admin/users")
    public String showListOfUsers(ModelMap model) {
        model.addAttribute("users", userService.list());
        return "users";
    }

    @GetMapping(value = "/admin/add")
    public String showUserAdd(ModelMap model) {
        //User user = new User();
        model.addAttribute("user", new User());
        //System.out.println("---->>> " + user);
        model.addAttribute("listOfRoles", roleService.roles());
        return "user-add";
    }

    @GetMapping(value = "/admin/edit")
    public String showUserEdit(@RequestParam(value = "id") long id, ModelMap model) {
        model.addAttribute("user", userService.get(id));
        model.addAttribute("listOfRoles", roleService.roles());
        return "user-edit";
    }

    @GetMapping(value = "/admin/delete")
    public String deleteUser(@RequestParam(value = "id") long id) {
        userService.delete(id);
        return "redirect:/admin";
    }



    @PostMapping(value = "/admin/edit")
    public String editUser(@ModelAttribute User user/*, Set<Role> userRoles*/) {
        userService.update(user);
        return "redirect:/admin";
    }

    @PostMapping(value = "/admin/add")
    public String addUser(@ModelAttribute User user/*, Set<Role> userRoles*/) {
        userService.add(user);
        return "redirect:/admin";
    }

}
