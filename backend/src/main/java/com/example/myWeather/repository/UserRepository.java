package com.example.myWeather.repository;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.myWeather.entity.Usuario;


@RepositoryRestResource
public interface UserRepository extends CrudRepository<Usuario, Long>{
    List<Usuario> findById(long id);
    List<Usuario> findByUsername(String username);
}
