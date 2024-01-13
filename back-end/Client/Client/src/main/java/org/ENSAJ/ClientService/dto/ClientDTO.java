package org.ENSAJ.ClientService.dto;

import lombok.Getter;
import lombok.Setter;
import org.ENSAJ.ClientService.Model.Client;
import org.ENSAJ.ClientService.Model.Voiture;

import java.util.List;

@Getter @Setter
public class ClientDTO {
    private Client client;
    private List<Voiture> voitures;

}
