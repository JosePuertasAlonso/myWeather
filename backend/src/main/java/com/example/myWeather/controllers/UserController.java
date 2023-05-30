package com.example.myWeather.controllers;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.myWeather.entity.Usuario;
import com.example.myWeather.repository.UserRepository;

import java.util.List;

@RepositoryRestController
public class UserController {
    
    private final UserRepository userRepository;

    UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users/search")
    public List<Usuario> getHeroesByName(@RequestParam(value = "username") String name) {
        return userRepository.findByUsername(name);
    }
}
