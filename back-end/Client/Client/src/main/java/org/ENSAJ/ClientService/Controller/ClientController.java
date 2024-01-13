package org.ENSAJ.ClientService.Controller;

import org.ENSAJ.ClientService.ClientApplication;
import org.ENSAJ.ClientService.Model.Client;
import org.ENSAJ.ClientService.Model.Voiture;
import org.ENSAJ.ClientService.Repository.ClientRepository;
import org.ENSAJ.ClientService.Service.ClientService;
//import org.ENSAJ.ClientService.Model.Voiture;
import org.ENSAJ.ClientService.clients.VoitureClientRest;
import org.ENSAJ.ClientService.dto.ClientDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {


    ClientRepository clientRepository;
    VoitureClientRest voitureClientRest;

    public ClientController(ClientRepository clientRepository, VoitureClientRest voitureClientRest) {
        this.clientRepository = clientRepository;
        this.voitureClientRest = voitureClientRest;
    }



    @GetMapping("/clients")
    public List<Client> chercherClient(){
        return clientRepository.findAll();
    }

    @GetMapping("/clients/client/{id}")
    public ClientDTO chercherUnClient(@PathVariable Long id) throws Exception {
        List<Voiture> voitures = voitureClientRest.getAllVoituresByClientId(id);
        Client c = clientRepository.findById(id).orElseThrow();
        ClientDTO client = new ClientDTO();
        client.setClient(c);
        client.setVoitures(voitures);
        return client;
    }

    @GetMapping("/clients/{id}")
    public Client clientById(@PathVariable long id){
        Client c = clientRepository.findById(id).get();
        return c;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/clients/save")
    public Client save(@RequestBody Client client){
        return clientRepository.save(client);
    }

    @DeleteMapping("/clients/delete/{id}")
    public void delete(@PathVariable Long id){
        clientRepository.deleteById(id);
    }

    @PutMapping("/clients/update")
    public void update(@RequestBody Client client){
        Optional<Client> c = clientRepository.findById(client.getId());
        if (c.isPresent()){
            c.get().setAge(client.getAge());
            c.get().setNom(client.getNom());
            clientRepository.save(c.get());
        }
    }




}
