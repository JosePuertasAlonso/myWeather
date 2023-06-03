package com.example.myWeather.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;
import com.example.myWeather.dto.CiudadDataDto;


@Component("ciudadDataService")
public class CiudadDataService {
    public List<CiudadDataDto> retrieveCityData(String city) {
        List<CiudadDataDto> cityData = new ArrayList<>();

        try {
            Document webPage = Jsoup.connect("https://www.istockphoto.com/es/search/2/image?phrase="+ city).get();
            String image = webPage.getElementsByClass("yGh0CfFS4AMLWjEE9W7v").get(0).attr("src").isEmpty() ? "" :webPage.getElementsByClass("yGh0CfFS4AMLWjEE9W7v").get(0).attr("src") ;
            cityData.add(new CiudadDataDto(image)); 
            return cityData;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}