package com.example.myWeather.service;

import org.springframework.stereotype.Service;

import com.example.myWeather.entity.Favorito;
import com.example.myWeather.repository.FavoritoRepository;

@Service
public class FavoritoService {
    private final FavoritoRepository favoritoRepository;

    public FavoritoService(FavoritoRepository favoritoRepository) {
        this.favoritoRepository = favoritoRepository;
    }

    public Favorito crearFavorito(Favorito favorito) {
        return favoritoRepository.save(favorito);
    }
}

