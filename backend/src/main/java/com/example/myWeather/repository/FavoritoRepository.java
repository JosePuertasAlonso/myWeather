package com.example.myWeather.repository;

import com.example.myWeather.entity.Favorito;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
}

