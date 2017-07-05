package io.catwizard.bsrate.repository;

import io.catwizard.bsrate.domain.ExchangeRate;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.LocalDate;


/**
 * Spring Data JPA repository for the ExchangeRate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExchangeRateRepository extends JpaRepository<ExchangeRate,Long> {

    ExchangeRate findByDate(LocalDate date);
}
