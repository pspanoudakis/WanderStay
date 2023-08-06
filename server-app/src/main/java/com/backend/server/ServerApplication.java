package com.backend.server;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.backend.server.services.ImageService;

// import java.util.Date;
// import java.util.List;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import com.backend.server.entities.users.Admin;
// import com.backend.server.entities.users.Guest;
// import com.backend.server.entities.users.Host;
// import com.backend.server.entities.users.RoleEntityId;
// import com.backend.server.entities.users.User;
// import com.backend.server.repositories.AdminRepository;
// import com.backend.server.repositories.UserRepository;
// import com.backend.server.services.RoleService;
// import java.io.File;
// import java.util.Scanner;
// import com.backend.server.entities.locations.City;
// import com.backend.server.entities.locations.Country;
// import com.backend.server.entities.properties.AvailableTimeSlot;
// import com.backend.server.entities.properties.Property;
// import com.backend.server.entities.properties.PropertyAmenities;
// import com.backend.server.entities.properties.PropertyRules;
// import com.backend.server.entities.properties.PropertyType;
// import com.backend.server.repositories.CityRepository;
// import com.backend.server.repositories.CountryRepository;
// import com.backend.server.repositories.GuestRepository;
// import com.backend.server.repositories.HostRepository;
// import com.backend.server.repositories.PropertyRepository;

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

	// @Bean
	// public CommandLineRunner createAdminUser(
	// 	UserRepository userRepository, 
	// 	AdminRepository adminRepository, 
	// 	GuestRepository guestRepository, 
	// 	HostRepository hostRepository, 
	// 	RoleService roleService,
	// 	PasswordEncoder passwordEncoder
	// ) {
	// 	return args -> {
	// 		User user = userRepository.save(
	// 			User.builder()
	// 				.username("admin")
	// 				.password(passwordEncoder.encode("admin"))
	// 				.isActive(true)
	// 				.roles(List.of(
	// 					roleService.getAdminRole(),
	// 					roleService.getGuestRole(),
	// 					roleService.getHostRole()
	// 				))
	// 				.build()
	// 		);
	// 		adminRepository.save(
	// 			Admin.builder()
	// 				.user(user)
	// 				.id(new RoleEntityId())
	// 				.build()
	// 		);
	// 		guestRepository.save(
	// 			Guest.builder()
	// 				.user(user)
	// 				.id(new RoleEntityId())
	// 				.build()
	// 		);
	// 		hostRepository.save(
	// 			Host.builder()
	// 				.user(user)
	// 				.id(new RoleEntityId())
	// 				.build()
	// 		);
	// 	};
	// }

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

	// @Bean
	// public CommandLineRunner populatePropertiesTable(
	// 	UserRepository userRepository,
	// 	HostRepository hostRepository,
	// 	CityRepository cityRepository,
	// 	PropertyRepository propertyRepository
	// ) {
	// 	return args -> {

	// 		Host host = hostRepository.findByUser(
	// 			userRepository.findByUsername("admin").orElseThrow()	
	// 		).orElseThrow();

	// 		for (byte i = 1; i <= 10; i++) {
	// 			Property property = propertyRepository.save(
	// 				Property.builder()
	// 					.name("Property " + Integer.toString(i))
	// 					.address("Address " + Integer.toString(i))
	// 					.description("Desc " + Integer.toString(i))
	// 					.host(host)
	// 					.city(cityRepository.findById(Long.valueOf(i)).orElseThrow())
	// 					.images(List.of())
	// 					.type(PropertyType.PRIVATE_PROPERTY)
	// 					.availableSlots(null)
	// 					.rules(null)
	// 					.amenities(null)
	// 					.spaceArea((short) 1)
	// 					.build()
	// 			);
	// 			property.setAmenities(
	// 				PropertyAmenities.builder()
	// 					.property(property)
	// 					.hasWifi(i % 2 == 0)
	// 					.hasRefrigerator(i % 2 != 0)
	// 					.hasHeating(i % 2 == 0)
	// 					.hasKitchen(i % 2 != 0)
	// 					.hasTv(i % 2 == 0)
	// 					.hasElevator(i % 2 != 0)
	// 					.hasLounge(i % 2 == 0)
	// 					.hasParking(i % 2 != 0)
	// 					.numBeds(i)
	// 					.numBedrooms(i)
	// 					.numBathrooms(i)
	// 					.build()
	// 			);
	// 			property.setRules(
	// 				PropertyRules.builder()
	// 					.property(property)
	// 					.smokingAllowed(i % 2 == 0)
	// 					.petsAllowed(i % 2 != 0)
	// 					.eventsAllowed(i % 2 == 0)
	// 					.minReservationDays(i)
	// 					.baseDayCost(20)
	// 					.perGuestCost(i)
	// 					.build()
	// 			);
	// 			property.setAvailableSlots(List.of(
	// 				AvailableTimeSlot.builder()
	// 					.property(property)
	// 					.startDate(new Date(123, 9, 1))
	// 					.endDate(new Date(123, 9, i + 3))
	// 					.build()
	// 				,
	// 				AvailableTimeSlot.builder()
	// 					.property(property)
	// 					.startDate(new Date(123, 10, 1))
	// 					.endDate(new Date(123, 10, i + 3))
	// 					.build()
	// 			));
	// 			propertyRepository.save(property);
	// 		}
	// 	};
	// }

}
