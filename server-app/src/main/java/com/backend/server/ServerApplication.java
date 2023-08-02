package com.backend.server;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.server.services.ImageService;
import com.backend.server.entities.users.Admin;
import com.backend.server.entities.users.RoleEntityId;
import com.backend.server.entities.users.User;
import com.backend.server.repositories.AdminRepository;
import com.backend.server.repositories.UserRepository;
import com.backend.server.services.RoleService;
// import java.io.File;
// import java.util.Scanner;
// import com.backend.server.entities.locations.City;
// import com.backend.server.entities.locations.Country;
// import com.backend.server.repositories.CityRepository;
// import com.backend.server.repositories.CountryRepository;

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

	@Bean
	public CommandLineRunner createAdminUser(
		UserRepository userRepository, 
		AdminRepository adminRepository, 
		RoleService roleService,
		PasswordEncoder passwordEncoder
	) {
		return args -> {
			User user = userRepository.save(
				User.builder()
					.username("admin")
					.password(passwordEncoder.encode("admin"))
					.isActive(true)
					.roles(List.of(roleService.getAdminRole()))
					.build()
			);
			adminRepository.save(
				Admin.builder()
					.user(user)
					.id(new RoleEntityId())
					.build()
			);
		};
	}

	// @Bean
	// public CommandLineRunner populateCountriesDB(CountryRepository countryRepository, CityRepository cityRepository) {
	// 	return args -> {
	// 		Scanner s = new Scanner(new File("/home/pavlos/AppBase/server-app/big-cities.csv"));
	// 		s.useDelimiter(System.lineSeparator());

	// 		while (s.hasNext()) {
	// 			String[] lineData = s.next().split(",");
	// 			String cityName = lineData[1];
				
	// 			String countryName;
	// 			try {
	// 				countryName = lineData[2].replace("\"", "");
	// 			} catch (ArrayIndexOutOfBoundsException e) {
	// 				continue;
	// 			}

	// 			Country country = countryRepository.findByName(countryName).orElseGet(
	// 				() -> countryRepository.save(
	// 						Country.builder().name(countryName).build()
	// 					)
	// 			);

	// 			cityRepository.save(
	// 				City.builder().country(country).name(cityName).build()
	// 			);
	// 		}
	// 		s.close();
	// 	};
	// }

}
