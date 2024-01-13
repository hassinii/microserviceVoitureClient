package org.ensaj.Service;

import org.ensaj.Model.Voiture;
import org.ensaj.Repository.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoitureService {

    @Autowired
    private VoitureRepository voitureRepository;

    public Voiture enregistrerVoiture(Voiture voiture){
        return voitureRepository.save(voiture);
    }
}
