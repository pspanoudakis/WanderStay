package com.backend.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/protected")
@RequiredArgsConstructor
public class ProtectedController {

    @GetMapping("/hello")
    public ResponseEntity<String> helloNum(@RequestParam(value = "num", defaultValue = "0") String num) {
        return ResponseEntity.ok("*Hello " + num + "*");
    }

}
