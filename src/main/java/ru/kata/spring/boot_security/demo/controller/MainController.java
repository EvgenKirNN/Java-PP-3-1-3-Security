package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
public class MainController {

    private final UserService userService;

    public MainController(UserService userService) {
        this.userService = userService;
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

}
