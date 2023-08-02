package com.backend.server.services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.server.entities.images.Image;
import com.backend.server.repositories.ImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final Path projectRootPath = Paths.get("").toAbsolutePath();
    // private final Path rootPath = this.projectRootPath.resolve("src/main/resources/images");
    private final Path rootPath = this.projectRootPath.resolve("resources/images");

    private final ImageRepository imageRepository;

    public String getImageExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }

    public void initUploadDirectory() {
        try {
            Files.createDirectories(rootPath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize images directory: " + rootPath.toString());
        }
    }

    public Image saveImage(MultipartFile file, boolean isMain) throws IOException {
        
        Image newImg = new Image();
        newImg.setMain(isMain);
        Image savedImg = imageRepository.save(newImg);
        imageRepository.flush();

        String uploadName = file.getOriginalFilename();
        Path newImgPath = this.rootPath.resolve(
            savedImg.getId().toString() + "." + getImageExtension(uploadName)
        );
        
        try {
            Files.copy(file.getInputStream(), newImgPath);
        } catch (IOException e) {
            imageRepository.delete(savedImg);
            throw e;
        }

        savedImg.setPath(newImgPath.toString());
        return imageRepository.save(savedImg);
    }

    public Resource retrieveImage(Long imgId) {

        Optional<Image> imgEnity = imageRepository.findById(imgId);
        if (!imgEnity.isPresent()) {
            return null;
        }

        Path imgFullPath = Path.of(imgEnity.get().getPath());

        try {
            Resource img = new UrlResource(imgFullPath.toUri());
    
            if (img.isReadable()) {
                return img;
            } else {
                return null;
            }            
        } catch (MalformedURLException e) {
            return null;
        }
    }
}
