package com.backend.server.services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.server.entities.images.Image;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.ImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final Path projectRootPath = Paths.get("").toAbsolutePath();
    // private final Path rootPath = this.projectRootPath.resolve("src/main/resources/images");
    private final Path rootPath = this.projectRootPath.resolve("resources/images");

    private final ImageRepository imageRepository;

    public Image getImageFromIdOrElseThrow(Long imageId) throws BadRequestException{
        return imageRepository.findById(imageId).orElseThrow(
            () -> new BadRequestException(
                    "No image found with id '" + imageId.toString() + "'"
                )
        );
    }

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

    public void deleteImage(Image image) {
        try {
            Files.deleteIfExists(rootPath.resolve(image.getPath()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        imageRepository.delete(image);
    }

    public void deleteImageWithIdOrElseThrow(Long imageId) throws BadRequestException {
        deleteImage(
            getImageFromIdOrElseThrow(imageId)
        );
    }

    public void broadcastImageDeletionsToFs(
        List<Image> newImages, List<Image> oldImages
    ) throws BadRequestException {

        oldImages.forEach(oldImg -> {
            if (!newImages.stream().anyMatch(
                    newImg -> newImg.getId() == oldImg.getId())) {
                deleteImage(oldImg);
            }
        });
    }

    public Image saveImage(MultipartFile file, boolean isMain) throws IOException {
        
        Image newImg = new Image();
        newImg.setMain(isMain);
        Image savedImg = imageRepository.save(newImg);
        imageRepository.flush();

        String uploadName = file.getOriginalFilename();
        String imgRelativePath = savedImg.getId().toString() + "." + getImageExtension(uploadName);
        
        try {
            Files.copy(
                file.getInputStream(), 
                this.rootPath.resolve(imgRelativePath)
            );
        } catch (IOException e) {
            imageRepository.delete(savedImg);
            throw e;
        }

        savedImg.setPath(imgRelativePath);
        return imageRepository.save(savedImg);
    }

    public Resource retrieveImage(Long imgId) throws BadRequestException{

        Optional<Image> imgEntity = imageRepository.findById(imgId);
        if (!imgEntity.isPresent()) {
            throw new BadRequestException(
                "Image with ID '" + imgId.toString() + "' is not present."
            );
        }

        Path imgFullPath = this.rootPath.resolve(imgEntity.get().getPath());

        try {
            Resource img = new UrlResource(imgFullPath.toUri());
    
            if (img.isReadable()) {
                return img;
            } else {
                throw new BadRequestException(
                    "Cannot read image from path '" + imgFullPath + "'."
                );
            }            
        } catch (MalformedURLException e) {
            throw new BadRequestException(e.getMessage());
        }
    }
}
