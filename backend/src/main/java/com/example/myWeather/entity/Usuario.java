package com.example.myWeather.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    
    @JsonIgnore
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Favorito> favoritos = new ArrayList<>();

    public Usuario() {
    }

    public Usuario(String username, String password, List<Favorito> favoritos) {
        this.username = username;
        this.password = password;
        this.favoritos = favoritos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Favorito> getFavoritos() {
        return favoritos;
    }

    public void setFavoritos(List<Favorito> favoritos) {
        this.favoritos = favoritos;
    }

    public void agregarFavorito(Favorito favorito) {
        favoritos.add(favorito);
        favorito.setUsuario(this);
    }

    public void eliminarFavorito(Favorito favorito) {
        favoritos.remove(favorito);
        favorito.setUsuario(null);
    }
}
