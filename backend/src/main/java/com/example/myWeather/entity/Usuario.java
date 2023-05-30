package com.example.myWeather.entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "Name is mandatory")
    @Column(name = "name")
    private String username;

    @NotBlank(message = "Name is mandatory")
    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Favorite> favorites;

    public Usuario() {
    }

    public Usuario(String username, String password, List<Favorite> favorites) {
        this.username = username;
        this.password = password;
        this.favorites = favorites;
        for (Favorite fav : favorites) {
            fav.setUsuario(this);
        }
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public List<Favorite> getFavorites() {
        return favorites;
    }

    public void setFavorites(List<Favorite> favorites) {
        this.favorites = favorites;
        for (Favorite fav : favorites) {
            fav.setUsuario(this);
        }
    }
    
}
