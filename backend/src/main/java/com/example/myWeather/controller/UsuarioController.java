package com.example.myWeather.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.myWeather.entity.Favorito;
import com.example.myWeather.entity.Usuario;
import com.example.myWeather.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.crearUsuario(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioService.obtenerUsuario(usuarioId);
        if (usuario != null) {
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{usuarioId}/favoritos")
    public ResponseEntity<Usuario> agregarFavorito(
            @PathVariable Long usuarioId,
            @RequestBody Favorito favorito) {
        Usuario usuario = usuarioService.obtenerUsuario(usuarioId);
        if (usuario != null) {
            usuario.agregarFavorito(favorito);
            usuarioService.guardarUsuario(usuario); // Guardar el usuario actualizado con el nuevo favorito
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("{usuarioId}/favoritos/{favoritoId}")
    public ResponseEntity<?> eliminarFavorito(
            @PathVariable Long usuarioId,
            @PathVariable Long favoritoId) {
        Usuario usuario = usuarioService.obtenerUsuario(usuarioId);
        if (usuario != null) {
            List<Favorito> favoritos = usuario.getFavoritos();
            Favorito favoritoToRemove = null;
            for (Favorito fav : favoritos) {
                if (fav.getId().equals(favoritoId)) {
                    favoritoToRemove = fav;
                    break;
                }
            }
            if (favoritoToRemove != null) {
                usuario.eliminarFavorito(favoritoToRemove);
                usuarioService.guardarUsuario(usuario);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{usuarioId}/favoritos")
    public ResponseEntity<List<Favorito>> obtenerFavoritosPorUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioService.obtenerUsuario(usuarioId);
        if (usuario != null) {
            List<Favorito> favoritos = usuario.getFavoritos();
            return new ResponseEntity<>(favoritos, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerUsuarios() {
        List<Usuario> usuarios = usuarioService.obtenerUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/buscar/{username}")
    public ResponseEntity<Usuario> buscarPorUsername(@PathVariable String username) {
        Usuario usuario = usuarioService.buscarPorUsername(username);
        if (usuario != null) {
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
}
