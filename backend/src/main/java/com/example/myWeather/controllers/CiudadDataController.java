package com.example.myWeather.controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.myWeather.dto.CiudadDataDto;
import com.example.myWeather.services.CiudadDataService;


@RestController
@RequestMapping("/ciudad")
@CrossOrigin(origins = "http://localhost:4200")
public class CiudadDataController {
    @Autowired
    private CiudadDataService covidDataService;

    @GetMapping("data")
    public ResponseEntity<List<CiudadDataDto>> getCiudadData(@RequestParam("city") String city) {
        return new ResponseEntity<List<CiudadDataDto>>(covidDataService.retrieveCityData(city),HttpStatus.OK);
    }
}
