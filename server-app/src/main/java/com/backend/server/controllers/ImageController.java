package com.backend.server.controllers;

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

import com.backend.server.controllers.utils.ControllerResponseUtils;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.services.ImageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<?> uploadImage(
        @RequestParam("img") MultipartFile img,
        @RequestParam(name = "isMain", defaultValue = "false") String isMainStr
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> imageService.saveImage(img, Boolean.parseBoolean(isMainStr))
        );
    }

    @GetMapping("/{imgId}")
    public ResponseEntity<?> downloadImage(@PathVariable(required = true) Long imgId) {
        try {
            Resource img = imageService.retrieveImage(imgId);
            String mimeType = imageService.getImageExtension(img.getFilename());
            return (
                ResponseEntity
                    .ok()
                    .header(HttpHeaders.CONTENT_TYPE, "image/" + mimeType)
                    .body(img)
            );
        } catch (BadRequestException e) {
            return ControllerResponseUtils.errorResponseFactory(e);
        }
        
    }
}
