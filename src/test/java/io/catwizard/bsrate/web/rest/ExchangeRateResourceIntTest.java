package io.catwizard.bsrate.web.rest;

import io.catwizard.bsrate.BsrateApp;

import io.catwizard.bsrate.domain.ExchangeRate;
import io.catwizard.bsrate.repository.ExchangeRateRepository;
import io.catwizard.bsrate.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.catwizard.bsrate.domain.enumeration.Sistema;
/**
 * Test class for the ExchangeRateResource REST controller.
 *
 * @see ExchangeRateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BsrateApp.class)
public class ExchangeRateResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_FROMCURRENCY = "AAAAAAAAAA";
    private static final String UPDATED_FROMCURRENCY = "BBBBBBBBBB";

    private static final String DEFAULT_TOCURRENCY = "AAAAAAAAAA";
    private static final String UPDATED_TOCURRENCY = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_CONVERSIONVALUE = new BigDecimal(1);
    private static final BigDecimal UPDATED_CONVERSIONVALUE = new BigDecimal(2);

    private static final Sistema DEFAULT_SISTEMA = Sistema.NEGRO;
    private static final Sistema UPDATED_SISTEMA = Sistema.CADIVI;

    @Autowired
    private ExchangeRateRepository exchangeRateRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restExchangeRateMockMvc;

    private ExchangeRate exchangeRate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ExchangeRateResource exchangeRateResource = new ExchangeRateResource(exchangeRateRepository);
        this.restExchangeRateMockMvc = MockMvcBuilders.standaloneSetup(exchangeRateResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExchangeRate createEntity(EntityManager em) {
        ExchangeRate exchangeRate = new ExchangeRate()
            .date(DEFAULT_DATE)
            .fromcurrency(DEFAULT_FROMCURRENCY)
            .tocurrency(DEFAULT_TOCURRENCY)
            .conversionvalue(DEFAULT_CONVERSIONVALUE)
            .sistema(DEFAULT_SISTEMA);
        return exchangeRate;
    }

    @Before
    public void initTest() {
        exchangeRate = createEntity(em);
    }

    @Test
    @Transactional
    public void createExchangeRate() throws Exception {
        int databaseSizeBeforeCreate = exchangeRateRepository.findAll().size();

        // Create the ExchangeRate
        restExchangeRateMockMvc.perform(post("/api/exchange-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exchangeRate)))
            .andExpect(status().isCreated());

        // Validate the ExchangeRate in the database
        List<ExchangeRate> exchangeRateList = exchangeRateRepository.findAll();
        assertThat(exchangeRateList).hasSize(databaseSizeBeforeCreate + 1);
        ExchangeRate testExchangeRate = exchangeRateList.get(exchangeRateList.size() - 1);
        assertThat(testExchangeRate.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testExchangeRate.getFromcurrency()).isEqualTo(DEFAULT_FROMCURRENCY);
        assertThat(testExchangeRate.getTocurrency()).isEqualTo(DEFAULT_TOCURRENCY);
        assertThat(testExchangeRate.getConversionvalue()).isEqualTo(DEFAULT_CONVERSIONVALUE);
        assertThat(testExchangeRate.getSistema()).isEqualTo(DEFAULT_SISTEMA);
    }

    @Test
    @Transactional
    public void createExchangeRateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exchangeRateRepository.findAll().size();

        // Create the ExchangeRate with an existing ID
        exchangeRate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExchangeRateMockMvc.perform(post("/api/exchange-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exchangeRate)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<ExchangeRate> exchangeRateList = exchangeRateRepository.findAll();
        assertThat(exchangeRateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = exchangeRateRepository.findAll().size();
        // set the field null
        exchangeRate.setDate(null);

        // Create the ExchangeRate, which fails.

        restExchangeRateMockMvc.perform(post("/api/exchange-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exchangeRate)))
            .andExpect(status().isBadRequest());

        List<ExchangeRate> exchangeRateList = exchangeRateRepository.findAll();
        assertThat(exchangeRateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkConversionvalueIsRequired() throws Exception {
        int databaseSizeBeforeTest = exchangeRateRepository.findAll().size();
        // set the field null
        exchangeRate.setConversionvalue(null);

        // Create the ExchangeRate, which fails.

        restExchangeRateMockMvc.perform(post("/api/exchange-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exchangeRate)))
            .andExpect(status().isBadRequest());

        List<ExchangeRate> exchangeRateList = exchangeRateRepository.findAll();
        assertThat(exchangeRateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExchangeRates() throws Exception {
        // Initialize the database
        exchangeRateRepository.saveAndFlush(exchangeRate);

        // Get all the exchangeRateList
        restExchangeRateMockMvc.perform(get("/api/exchange-rates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exchangeRate.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].fromcurrency").value(hasItem(DEFAULT_FROMCURRENCY.toString())))
            .andExpect(jsonPath("$.[*].tocurrency").value(hasItem(DEFAULT_TOCURRENCY.toString())))
            .andExpect(jsonPath("$.[*].conversionvalue").value(hasItem(DEFAULT_CONVERSIONVALUE.intValue())))
            .andExpect(jsonPath("$.[*].sistema").value(hasItem(DEFAULT_SISTEMA.toString())));
    }

    @Test
    @Transactional
    public void getExchangeRate() throws Exception {
        // Initialize the database
        exchangeRateRepository.saveAndFlush(exchangeRate);

        // Get the exchangeRate
        restExchangeRateMockMvc.perform(get("/api/exchange-rates/{id}", exchangeRate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(exchangeRate.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.fromcurrency").value(DEFAULT_FROMCURRENCY.toString()))
            .andExpect(jsonPath("$.tocurrency").value(DEFAULT_TOCURRENCY.toString()))
            .andExpect(jsonPath("$.conversionvalue").value(DEFAULT_CONVERSIONVALUE.intValue()))
            .andExpect(jsonPath("$.sistema").value(DEFAULT_SISTEMA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExchangeRate() throws Exception {
        // Get the exchangeRate
        restExchangeRateMockMvc.perform(get("/api/exchange-rates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExchangeRate() throws Exception {
        // Initialize the database
        exchangeRateRepository.saveAndFlush(exchangeRate);
        int databaseSizeBeforeUpdate = exchangeRateRepository.findAll().size();

        // Update the exchangeRate
        ExchangeRate updatedExchangeRate = exchangeRateRepository.findOne(exchangeRate.getId());
        updatedExchangeRate
            .date(UPDATED_DATE)
            .fromcurrency(UPDATED_FROMCURRENCY)
            .tocurrency(UPDATED_TOCURRENCY)
            .conversionvalue(UPDATED_CONVERSIONVALUE)
            .sistema(UPDATED_SISTEMA);

        restExchangeRateMockMvc.perform(put("/api/exchange-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExchangeRate)))
            .andExpect(status().isOk());

        // Validate the ExchangeRate in the database
        List<ExchangeRate> exchangeRateList = exchangeRateRepository.findAll();
        assertThat(exchangeRateList).hasSize(databaseSizeBeforeUpdate);
        ExchangeRate testExchangeRate = exchangeRateList.get(exchangeRateList.size() - 1);
        assertThat(testExchangeRate.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testExchangeRate.getFromcurrency()).isEqualTo(UPDATED_FROMCURRENCY);
        assertThat(testExchangeRate.getTocurrency()).isEqualTo(UPDATED_TOCURRENCY);
        assertThat(testExchangeRate.getConversionvalue()).isEqualTo(UPDATED_CONVERSIONVALUE);
        assertThat(testExchangeRate.getSistema()).isEqualTo(UPDATED_SISTEMA);
    }

    @Test
    @Transactional
    public void updateNonExistingExchangeRate() throws Exception {
        int databaseSizeBeforeUpdate = exchangeRateRepository.findAll().size();

        // Create the ExchangeRate

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restExchangeRateMockMvc.perform(put("/api/exchange-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exchangeRate)))
            .andExpect(status().isCreated());

        // Validate the ExchangeRate in the database
        List<ExchangeRate> exchangeRateList = exchangeRateRepository.findAll();
        assertThat(exchangeRateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteExchangeRate() throws Exception {
        // Initialize the database
        exchangeRateRepository.saveAndFlush(exchangeRate);
        int databaseSizeBeforeDelete = exchangeRateRepository.findAll().size();

        // Get the exchangeRate
        restExchangeRateMockMvc.perform(delete("/api/exchange-rates/{id}", exchangeRate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ExchangeRate> exchangeRateList = exchangeRateRepository.findAll();
        assertThat(exchangeRateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExchangeRate.class);
        ExchangeRate exchangeRate1 = new ExchangeRate();
        exchangeRate1.setId(1L);
        ExchangeRate exchangeRate2 = new ExchangeRate();
        exchangeRate2.setId(exchangeRate1.getId());
        assertThat(exchangeRate1).isEqualTo(exchangeRate2);
        exchangeRate2.setId(2L);
        assertThat(exchangeRate1).isNotEqualTo(exchangeRate2);
        exchangeRate1.setId(null);
        assertThat(exchangeRate1).isNotEqualTo(exchangeRate2);
    }

    // Tests de Ernesto
    @Test
    @Transactional
    public void searchByDate() throws Exception {

        // Initialize the database
        exchangeRateRepository.saveAndFlush(exchangeRate);

          //
        restExchangeRateMockMvc.perform(get("/api/exchange-rates/search/date")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exchangeRate)))
            .andExpect(status().isOk());


    }
}
