package com.example.myWeather.dto;

public class CiudadDataDto {
    public String cityImg;


    public CiudadDataDto(String cityImg) { 
        this.cityImg = cityImg;
    }

    public CiudadDataDto() {
    }
    public String getCityImg() {
        return cityImg;
    }

    public void setCityImg(String cityImg) {
        this.cityImg = cityImg;
    }
}
