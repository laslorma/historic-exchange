package io.catwizard.bsrate.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import io.catwizard.bsrate.domain.enumeration.Sistema;

/**
 * A ExchangeRate.
 */
@Entity
@Table(name = "exchange_rate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExchangeRate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private LocalDate date;

    @Column(name = "fromcurrency")
    private String fromcurrency;

    @Column(name = "tocurrency")
    private String tocurrency;

    @NotNull
    @Column(name = "conversionvalue", precision=10, scale=2, nullable = false)
    private BigDecimal conversionvalue;

    @Enumerated(EnumType.STRING)
    @Column(name = "sistema")
    private Sistema sistema;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public ExchangeRate date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getFromcurrency() {
        return fromcurrency;
    }

    public ExchangeRate fromcurrency(String fromcurrency) {
        this.fromcurrency = fromcurrency;
        return this;
    }

    public void setFromcurrency(String fromcurrency) {
        this.fromcurrency = fromcurrency;
    }

    public String getTocurrency() {
        return tocurrency;
    }

    public ExchangeRate tocurrency(String tocurrency) {
        this.tocurrency = tocurrency;
        return this;
    }

    public void setTocurrency(String tocurrency) {
        this.tocurrency = tocurrency;
    }

    public BigDecimal getConversionvalue() {
        return conversionvalue;
    }

    public ExchangeRate conversionvalue(BigDecimal conversionvalue) {
        this.conversionvalue = conversionvalue;
        return this;
    }

    public void setConversionvalue(BigDecimal conversionvalue) {
        this.conversionvalue = conversionvalue;
    }

    public Sistema getSistema() {
        return sistema;
    }

    public ExchangeRate sistema(Sistema sistema) {
        this.sistema = sistema;
        return this;
    }

    public void setSistema(Sistema sistema) {
        this.sistema = sistema;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ExchangeRate exchangeRate = (ExchangeRate) o;
        if (exchangeRate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), exchangeRate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExchangeRate{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", fromcurrency='" + getFromcurrency() + "'" +
            ", tocurrency='" + getTocurrency() + "'" +
            ", conversionvalue='" + getConversionvalue() + "'" +
            ", sistema='" + getSistema() + "'" +
            "}";
    }
}
