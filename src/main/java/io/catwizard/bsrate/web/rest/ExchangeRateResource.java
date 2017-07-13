package io.catwizard.bsrate.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.catwizard.bsrate.domain.ExchangeRate;

import io.catwizard.bsrate.repository.ExchangeRateRepository;
import io.catwizard.bsrate.web.rest.util.HeaderUtil;
import io.catwizard.bsrate.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

/**
 * REST controller for managing ExchangeRate.
 */
@RestController
@RequestMapping("/api")
public class ExchangeRateResource {

    private final Logger log = LoggerFactory.getLogger(ExchangeRateResource.class);

    private static final String ENTITY_NAME = "exchangeRate";

    private final ExchangeRateRepository exchangeRateRepository;

    public ExchangeRateResource(ExchangeRateRepository exchangeRateRepository) {
        this.exchangeRateRepository = exchangeRateRepository;
    }

    /**
     * POST  /exchange-rates : Create a new exchangeRate.
     *
     * @param exchangeRate the exchangeRate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new exchangeRate, or with status 400 (Bad Request) if the exchangeRate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/exchange-rates")
    @Timed
    public ResponseEntity<ExchangeRate> createExchangeRate(@Valid @RequestBody ExchangeRate exchangeRate) throws URISyntaxException {
        log.debug("REST request to save ExchangeRate : {}", exchangeRate);
        if (exchangeRate.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new exchangeRate cannot already have an ID")).body(null);
        }
        ExchangeRate result = exchangeRateRepository.save(exchangeRate);
        return ResponseEntity.created(new URI("/api/exchange-rates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /exchange-rates : Updates an existing exchangeRate.
     *
     * @param exchangeRate the exchangeRate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated exchangeRate,
     * or with status 400 (Bad Request) if the exchangeRate is not valid,
     * or with status 500 (Internal Server Error) if the exchangeRate couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/exchange-rates")
    @Timed
    public ResponseEntity<ExchangeRate> updateExchangeRate(@Valid @RequestBody ExchangeRate exchangeRate) throws URISyntaxException {
        log.debug("REST request to update ExchangeRate : {}", exchangeRate);
        if (exchangeRate.getId() == null) {
            return createExchangeRate(exchangeRate);
        }
        ExchangeRate result = exchangeRateRepository.save(exchangeRate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, exchangeRate.getId().toString()))
            .body(result);
    }

    /**
     * GET  /exchange-rates : get all the exchangeRates.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of exchangeRates in body
     */
    @GetMapping("/exchange-rates")
    @Timed
    public ResponseEntity<List<ExchangeRate>> getAllExchangeRates(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of ExchangeRates");
        Page<ExchangeRate> page = exchangeRateRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/exchange-rates");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /exchange-rates/:id : get the "id" exchangeRate.
     *
     * @param id the id of the exchangeRate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the exchangeRate, or with status 404 (Not Found)
     */
    @GetMapping("/exchange-rates/{id}")
    @Timed
    public ResponseEntity<ExchangeRate> getExchangeRate(@PathVariable Long id) {
        log.debug("REST request to get ExchangeRate : {}", id);
        ExchangeRate exchangeRate = exchangeRateRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(exchangeRate));
    }

    /**
     * DELETE  /exchange-rates/:id : delete the "id" exchangeRate.
     *
     * @param id the id of the exchangeRate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/exchange-rates/{id}")
    @Timed
    public ResponseEntity<Void> deleteExchangeRate(@PathVariable Long id) {
        log.debug("REST request to delete ExchangeRate : {}", id);
        exchangeRateRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    // Por Ernesto


    @GetMapping("/exchange-rates/search/date/{date}")
    @Timed
    public ResponseEntity<ExchangeRate> getExchangeRateByDate(@PathVariable String date) {
        log.debug("REST request to search ExchangeRate By Date : {}", date);


        LocalDate searchableDate = LocalDate.parse(date);
        ExchangeRate exchangeRateResult = exchangeRateRepository.findByDate(searchableDate);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(exchangeRateResult));

    }

    @GetMapping("/exchange-rates/search/latest")
    @Timed
    public ResponseEntity<ExchangeRate> getExchangeLatest() {
        log.debug("REST request to search latest ExchangeRate record ");

        ExchangeRate exchangeRateResult = exchangeRateRepository.findTopByOrderByDateDesc();

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(exchangeRateResult));

    }

    @GetMapping("/exchange-rates/search/first")
        @Timed
        public ResponseEntity<ExchangeRate> getExchangeFirst() {
            log.debug("REST request to search first ExchangeRate record ");

            ExchangeRate exchangeRateResult = exchangeRateRepository.findFirstByOrderByDateDesc();

            return ResponseUtil.wrapOrNotFound(Optional.ofNullable(exchangeRateResult));

        }

}
