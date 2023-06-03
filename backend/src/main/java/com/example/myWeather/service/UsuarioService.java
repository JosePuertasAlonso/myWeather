package com.example.myWeather.service;


import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;


import com.example.myWeather.entity.Favorito;
import com.example.myWeather.entity.Usuario;
import com.example.myWeather.repository.UsuarioRepository;
import com.example.myWeather.service.UsuarioService;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario obtenerUsuario(Long usuarioId) {
        return usuarioRepository.findById(usuarioId).orElse(null);
    }

    public void agregarFavorito(Long usuarioId, Favorito favorito) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        if (usuario != null) {
            usuario.agregarFavorito(favorito);
            usuarioRepository.save(usuario);
        }
    }
    public List<Favorito> obtenerFavoritosPorUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null); // Obtener el usuario por su ID
        if (usuario != null) {
            return usuario.getFavoritos(); // Obtener la lista de favoritos del usuario
        } else {
            return Collections.emptyList(); // Devolver una lista vacía si el usuario no existe
        }
    }

    public void guardarUsuario(Usuario usuario) {
        // Lógica para guardar un usuario
        usuarioRepository.save(usuario);
    }
    
    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }
    public Usuario buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }
    
}