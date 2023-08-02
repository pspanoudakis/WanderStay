package com.backend.server.controllers;

import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.server.services.ImageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("img") MultipartFile img) {
        try {
            imageService.saveImage(img, false);
            return ResponseEntity.ok(null);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        
    }

    @GetMapping("/{imgId}")
    public ResponseEntity<Resource> downloadImage(@PathVariable(required = true) Long imgId) {
        Resource img = imageService.retrieveImage(imgId);
        // img.getContentAsByteArray()
        if (img == null) {
            return ResponseEntity.badRequest().body(null);
        }
        String mimeType = imageService.getImageExtension(img.getFilename());
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, "image/" + mimeType).body(img);
    }
}
