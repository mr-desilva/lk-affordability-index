# 📁 Dataset — CBSL Socio-Economic Data (All Years)

Structured CSV extracts compiled from **four Central Bank of Sri Lanka Socio-Economic Data Folder publications**, covering 2003 to 2024.

---

## Source Publications Used

| Publication | Coverage in Macro Tables | PDF |
|-------------|--------------------------|-----|
| CBSL Socio-Economic Data **2008** (Vol. XXXI) | 2003–2007 | `Sri_Lanka_Socio_Economic_Data_2008_e.pdf` |
| CBSL Socio-Economic Data **2010** (Vol. XXXIII) | 2005–2009 | `Sri_Lanka_Socio_Economic_Data_2010_e.pdf` |
| CBSL Socio-Economic Data **2015** (Vol. XXXVIII) | 2010–2014 | `Sri_Lanka_Socio_Economic_Data_2015_e.pdf` |
| CBSL Socio-Economic Data **2020** (Vol. XLIII) | 2015–2019 | `publication_sri_lanka_socio_economic_data_folder_2020_e.pdf` |
| CBSL Socio-Economic Data **2025** (Vol. XLVIII) | 2019–2024 | `publication_sri_lanka_socio_economic_data_folder_2025_e.pdf` |

All publications are freely available at:
https://www.cbsl.gov.lk/en/publications/other-publications/statistical-publications/sri-lanka-socio-economic-data-folder

---

## Files in This Dataset

| File | Years Covered | Description |
|------|---------------|-------------|
| `hies_national.csv` | 1985/86 – 2019 | National HIES: household income, expenditure, Gini, poverty — unchanged across reports |
| `hies_expenditure_shares.csv` | 1985/86 – 2019 | Monthly expenditure as % share by food and non-food category |
| `macro_indicators_updated.csv` | 2003 – 2024 | GDP, GNI, per capita GNI, inflation, exchange rate, unemployment — full year-by-year series |
| `cpi_subindices_updated.csv` | 2003 – 2024 | CCPI and NCPI index levels and % changes by sub-category across three base year series |
| `wage_indices_updated.csv` | 2002 – 2024 | Nominal wage indices: government, formal private, informal private — across four base year series |
| `exchange_rates_historical.csv` | 2003 – 2024 | Rs./USD and Rs./SDR annual average exchange rates |
| `income_distribution_historical.csv` | 1953 – 2019 | Income deciles and Gini — CFSES and HIES series |
| `province_income_expenditure_2019.csv` | 2019 | Income and expenditure by all 9 provinces |

---

## ⚠️ Critical Notes on Data Comparability

### GDP Base Year Changes
Three different GDP base years appear across the reports. **Do not chain figures across base years without adjustment.**

| Period | GDP Base Year | Reports Using It |
|--------|---------------|-----------------|
| 2003–2009 | **2002 prices** | 2008, 2010 reports |
| 2010–2019 | **2010 prices** | 2015, 2020 reports |
| 2019–2024 | **2015 prices** | 2025 report |

2019 appears in **both** the 2020 and 2025 reports with different values. **Always prefer the 2025 report figure for 2019** as it uses the latest revised methodology. Both rows are retained in `macro_indicators_updated.csv` with a flag.

### CPI Base Year Changes
Three different CCPI base years exist across the historical series:

| Period | CCPI Base | Notes |
|--------|-----------|-------|
| 2003–2009 | **2002 = 100** | Used in 2008 and 2010 reports |
| 2009–2016 | **2006/07 = 100** | Used in 2015 report; overlaps with 2002-base in 2009 |
| 2014–2022 | **2013 = 100** | Used in 2020 report; discontinued Feb 2023 |
| 2022–present | **2021 = 100** | Current official series |

**These series cannot be directly chained.** For plotting a continuous inflation line, use the annual % change column (`ccpi_overall_change_pct`) which is comparable across series, not the index level.

### Wage Index Base Year Changes
Four different base years appear across the wage series:

| Index | Base Year | Years Available |
|-------|-----------|----------------|
| Government/Public sector (old) | **1978 Dec = 100** | 2002–2009 |
| Government employees | **2012 = 100** | 2009–2014 |
| Public sector employees | **2016 = 100** | 2016–2024 |
| Informal private sector | **2012 = 100** | 2016–2019 |
| Informal private sector (rebased) | **2018 = 100** | 2020–2024 |
| Formal private (wage boards) | **1978 Dec = 100** | 2002–2024 (continuous) |

**The wage board (1978 Dec=100) series is the only continuous comparable series across all years.** Use this for long-run wage trend analysis.

### Labour Force Data
- Pre-2012: excludes Northern and/or Eastern provinces (civil war)
- 2012 onwards: full island coverage
- Participation rate base changed from "aged 10+" to "aged 15+" in 2012

---

## Recommended Series for the sl-affordability-index Project

### For inflation comparison (use annual % change, not index level):

| Era | Year | CCPI Annual % Change | Equivalent Purchasing Power Loss |
|-----|------|---------------------|----------------------------------|
| Early 2000s | 2003 | ~9% (est.) | Moderate |
| Mid-2000s | 2004–2006 | 9–11% | High |
| Pre-crisis | 2007–2008 | 15.8 → 22.6% | Very high |
| Post-war recovery | 2009–2011 | 3.4 → 6.7% | Moderate |
| Stable growth | 2012–2018 | 3.3 → 7.6% | Moderate |
| Pre-crisis | 2019 | 4.3% | Low |
| Economic crisis | 2022 | **46.4–50.4%** | Catastrophic |
| Recovery | 2023–2024 | 17.4 → 1.2% | Easing rapidly |

### Salary reference points by era (mean household income, HIES):

| Survey Year | Mean HH Income/Month | Median HH Income/Month |
|-------------|---------------------|----------------------|
| 2002 | Rs. 12,803 | Rs. 8,482 |
| 2006/07 | Rs. 26,286 | Rs. 16,735 |
| 2009/10 | Rs. 36,451 | Rs. 23,746 |
| 2012/13 | Rs. 45,878 | Rs. 30,814 |
| 2016 | Rs. 62,237 | Rs. 43,511 |
| 2019 | Rs. 76,414 | Rs. 53,333 |
| 2025 (est.) | ~Rs. 130,000 | ~Rs. 90,000 |

*Post-2019 HIES not yet published. Estimates derived from CPI adjustment.*

### Exchange rate milestones:

| Year | Rs./USD | Context |
|------|---------|---------|
| 2003 | 96.52 | Pre-liberalisation era |
| 2010 | 113.06 | Post-war recovery |
| 2015 | 135.94 | Moderate depreciation |
| 2019 | 178.78 | Pre-crisis |
| 2022 | 324.55 | Crisis peak (floated April 2022) |
| 2024 | 302.12 | Partial recovery |

---

## Citation Format

> Central Bank of Sri Lanka, Statistics Department. *Sri Lanka Socio-Economic Data Folder*, Volumes XXXI (2008), XXXIII (2010), XXXVIII (2015), XLIII (2020), XLVIII (2025). Colombo: CBSL. Available at: https://www.cbsl.gov.lk

Data structured and compiled for the **sl-affordability-index** project.
