package org.ensaj.clients;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.ensaj.Client;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "SERVICE-CLIENT")
public interface ClientRest {
    @GetMapping("/clients/{id}")
    @CircuitBreaker(name = "serviceCLIENT", fallbackMethod = "defaultClient")
    Client findClientByID(@PathVariable Long id);

    @GetMapping("/clients")
    List<Client> allClient();

    default Client defaultClient(Long id,Exception e){
        Client c = new Client();
        c.setId(id);
        c.setNom("Client service not available !");
        c.setAge(Float.valueOf(0));
        return c;
    }
}
