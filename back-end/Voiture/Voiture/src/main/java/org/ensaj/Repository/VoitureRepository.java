package org.ensaj.Repository;

import org.ensaj.Model.Voiture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoitureRepository extends JpaRepository<Voiture, Long> {

    @Query("SELECT v FROM Voiture v WHERE v.clientId = :clientId")
    List<Voiture> findByClientId(@Param("clientId") Long clientId);
}
