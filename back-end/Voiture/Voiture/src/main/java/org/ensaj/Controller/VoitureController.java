package org.ensaj.Controller;

import org.ensaj.Client;
import org.ensaj.Model.Voiture;
import org.ensaj.Repository.VoitureRepository;
import org.ensaj.Service.VoitureService;
import org.ensaj.clients.ClientRest;
import org.ensaj.config.MQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class VoitureController {


    VoitureRepository voitureRepository;


    VoitureService voitureService;

    ClientRest clientRest;


    @Autowired
    private RabbitTemplate template;

    public VoitureController(VoitureRepository voitureRepository, VoitureService voitureService, ClientRest clientRest) {
        this.voitureRepository = voitureRepository;
        this.voitureService = voitureService;
        this.clientRest = clientRest;
    }

    @GetMapping(value ="/voitures")
    public List<Voiture> chercherVoiture(){
        return voitureRepository.findAll();
    }

    @GetMapping("/voitures/{Id}")
    public Voiture chercherUneVoiture(@PathVariable Long Id) throws Exception{
        Voiture voiture = voitureRepository.findById(Id).get();
        Client client = clientRest.findClientByID(voiture.getClientId());

        template.convertAndSend(MQConfig.EXCHANGE,MQConfig.ROUTING_KEY,voiture.getClientId());
//        System.out.println(voiture.getClientId());
//        System.out.println(client.getNom());
//        System.out.println(client.getId());
        voiture.setClient(client);
        return voiture;
    }

    @GetMapping("/voitures/client/{id}")
    public List<Voiture> allVoituresByClient(@PathVariable Long id){
        return voitureRepository.findByClientId(id);
    }


    @PostMapping("/voitures")
    public Voiture enregistrerUneVoiture(@RequestBody Voiture voiture){
        return voitureService.enregistrerVoiture(voiture);
    }

    @DeleteMapping("/voitures/delete/{id}")
    public void delete(@PathVariable Long id){
        voitureRepository.deleteById(id);
    }

    @PutMapping("/voitures/update")
    public Voiture update(@RequestBody Voiture voiture){
        Optional<Voiture> v = voitureRepository.findById(voiture.getId());
        if (v.isPresent()){
            v.get().setMarque(voiture.getMarque());
            v.get().setModel(voiture.getModel());
            v.get().setMatricule(voiture.getMatricule());
            v.get().setClientId(voiture.getClientId());
            return voitureRepository.save(v.get());
        }
        return null;
    }


    @PostMapping("/Message")
    public String envoyerMessage() {
        template.convertAndSend(MQConfig.EXCHANGE,MQConfig.ROUTING_KEY,"Hello ELBAHJA how are you ?");
        return "Message envoyé avec succès.";
    }





}
