package com.backend.server.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {
    
    @GetMapping("/hello")
    public String Hello(@RequestParam(value = "num", defaultValue = "0") String num) {
        return "*Hello " + num + "*";
    }
    
}
