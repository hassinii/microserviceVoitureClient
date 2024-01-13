package org.ENSAJ.ClientService.Model;

import lombok.*;
import org.ENSAJ.ClientService.Model.Client;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Voiture {

    private Long Id;
    private String marque;
    private String matricule;
    private String model;
    private Long id_client;
    private Client client;

}
