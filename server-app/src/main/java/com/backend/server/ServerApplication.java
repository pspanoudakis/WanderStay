package com.backend.server;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.backend.server.services.ImageService;

@SpringBootApplication
public class ServerApplication{

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	public CommandLineRunner initImageService(ImageService imageService) {
		return args -> {
			imageService.initUploadDirectory();
		};
	}
}
