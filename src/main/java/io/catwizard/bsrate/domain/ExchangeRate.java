package io.catwizard.bsrate.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

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

    @NotNull
    @Column(name = "conversionvalue", precision=10, scale=2, nullable = false)
    private BigDecimal conversionvalue;

    @Column(name = "sueldomin", precision=10, scale=2)
    private BigDecimal sueldomin;

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

    public BigDecimal getSueldomin() {
        return sueldomin;
    }

    public ExchangeRate sueldomin(BigDecimal sueldomin) {
        this.sueldomin = sueldomin;
        return this;
    }

    public void setSueldomin(BigDecimal sueldomin) {
        this.sueldomin = sueldomin;
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
            ", conversionvalue='" + getConversionvalue() + "'" +
            ", sueldomin='" + getSueldomin() + "'" +
            "}";
    }
}
