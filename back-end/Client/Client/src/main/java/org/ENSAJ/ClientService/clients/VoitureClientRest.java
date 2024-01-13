package org.ENSAJ.ClientService.clients;

import org.ENSAJ.ClientService.Model.Voiture;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "SERVICE-VOITURE")
public interface VoitureClientRest {
    @GetMapping("/voitures/client/{id}")
    List<Voiture> getAllVoituresByClientId(@PathVariable Long id);


}
