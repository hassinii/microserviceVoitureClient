package org.ENSAJ.ClientService;

import org.ENSAJ.ClientService.Model.Client;
import org.ENSAJ.ClientService.Repository.ClientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;

@EnableFeignClients
@EnableDiscoveryClient
@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000")
public class ClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClientApplication.class, args);
	}

	@Bean
	CommandLineRunner initialiserBaseH2(ClientRepository clientRepository){
		return args -> {
			clientRepository.save(new Client(Long.parseLong("1"), "HASSINI Yassine", Float.parseFloat("26")));
			clientRepository.save(new Client(Long.parseLong("2"), " hassini Ayoub", Float.parseFloat("28")));
			clientRepository.save(new Client(Long.parseLong("3"), "DAOUDI Said", Float.parseFloat("22")));
			clientRepository.save(new Client(Long.parseLong("4"), "MERZOUGUI Achraf", Float.parseFloat("25")));

		};
	}

}
