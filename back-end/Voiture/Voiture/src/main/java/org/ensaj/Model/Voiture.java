package org.ensaj.Model;
import lombok.*;
import org.ensaj.Client;

import javax.persistence.*;


@Entity
@Getter @Setter
public class Voiture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String matricule;
    private String marque;
    private String model;
    @Transient
    private Client client;
    private Long clientId;


    public Voiture(String matricule, String marque, String model, Long clientId) {
        this.matricule = matricule;
        this.marque = marque;
        this.model = model;
        this.clientId = clientId;
    }

    public Voiture() {

    }
}
