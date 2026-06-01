# Dataset Inventory

This inventory maps each README data source to a concrete dataset deliverable (one CSV per source or sub-category).

## Naming convention

- **Path:** `data/{source_slug}/{dataset_slug}.csv`
- **source_slug:** lowercase with dashes (e.g., `cbsl-ccpi`, `world-bank`)
- **dataset_slug:** lowercase with underscores (e.g., `ccpi_monthly`, `gdp_growth`)
- **Legacy:** existing files under `data/cbsl-socioeconomic-2025/` remain unchanged

## Shared metadata

- `data/dataset_metadata.csv` records source URL, retrieval date, methodology notes, and status.

---

## Inventory by source (README order)

### 1. CBSL — Socio-Economic Data (cbsl.gov.lk)
- **Access:** PDF tables from the CBSL Socio-Economic Data Folder volumes.
- **Constraints:** PDF extraction; multiple base-year series; avoid chaining index levels.
- **Datasets (existing):**
  - `data/cbsl-socioeconomic-2025/hies_national.csv` — 1985/86–2019 — `survey_year`, `mean_income_monthly`, `median_income_monthly`, `mean_expenditure_monthly`, `gini`, `poverty_headcount`
  - `data/cbsl-socioeconomic-2025/hies_expenditure_shares.csv` — 1985/86–2019 — `survey_year`, `category`, `share_pct`
  - `data/cbsl-socioeconomic-2025/macro_indicators.csv` — 2003–2024 — `year`, `gdp_current_lkr`, `gdp_constant_lkr`, `gni_per_capita`, `inflation_pct`, `unemployment_pct`
  - `data/cbsl-socioeconomic-2025/cpi_subindices.csv` — 2003–2024 — `year`, `cpi_series`, `category`, `index_level`, `change_pct`
  - `data/cbsl-socioeconomic-2025/wage_indices.csv` — 2002–2024 — `year`, `series`, `index_level`, `base_year`
  - `data/cbsl-socioeconomic-2025/exchange_rates_historical.csv` — 2003–2024 — `year`, `rs_per_usd_avg`, `rs_per_sdr_avg`
  - `data/cbsl-socioeconomic-2025/income_distribution_historical.csv` — 1953–2019 — `survey_year`, `decile`, `income_share_pct`, `gini`
  - `data/cbsl-socioeconomic-2025/province_income_expenditure_all_years.csv` — 2016–2019 — `survey_year`, `province`, `mean_income_monthly`, `mean_expenditure_monthly`
- **Citation:** Central Bank of Sri Lanka, *Sri Lanka Socio-Economic Data Folder* (2008–2025). https://www.cbsl.gov.lk

### 2. CBSL — Economic & Social Statistics (cbsl.gov.lk)
- **Access:** Downloadable Excel/CSV tables (CBSL ESS portal).
- **Constraints:** Versioning across releases; ensure table IDs are preserved.
- **Datasets (planned):**
  - `data/cbsl-ess/national_accounts.csv` — ~2000–present — `year`, `gdp_current_lkr`, `gdp_constant_lkr`, `gni_current_lkr`, `population`
  - `data/cbsl-ess/prices_inflation.csv` — ~2000–present — `year`, `ccpi_change_pct`, `ncpi_change_pct`
  - `data/cbsl-ess/labour_market.csv` — ~2000–present — `year`, `unemployment_pct`, `participation_pct`
- **Citation:** Central Bank of Sri Lanka, *Economic & Social Statistics*. https://www.cbsl.gov.lk

### 3. CBSL — Real Estate Price Indices (cbsl.gov.lk)
- **Access:** CBSL quarterly index releases (Excel/PDF).
- **Constraints:** Provincial coverage changes; index base-year shifts.
- **Datasets (planned):**
  - `data/cbsl-real-estate/land_price_index_quarterly.csv` — ~2017–present — `quarter`, `province`, `index_level`, `yoy_change_pct`, `base_year`
  - `data/cbsl-real-estate/house_price_index_quarterly.csv` — ~2017–present — `quarter`, `province`, `index_level`, `yoy_change_pct`, `base_year`
- **Citation:** Central Bank of Sri Lanka, *Residential Property Price Index*. https://www.cbsl.gov.lk

### 4. CBSL — Condominium Market Survey (cbsl.gov.lk)
- **Access:** Quarterly survey PDF/Excel.
- **Constraints:** Colombo-only coverage; methodology updates by quarter.
- **Datasets (planned):**
  - `data/cbsl-condominium/condo_prices_quarterly.csv` — 2017–present — `quarter`, `price_per_sqm`, `median_price`, `unit_size_sqm`
  - `data/cbsl-condominium/condo_sales_volume_quarterly.csv` — 2017–present — `quarter`, `sales_count`, `new_supply_units`
- **Citation:** Central Bank of Sri Lanka, *Condominium Market Survey*. https://www.cbsl.gov.lk

### 5. CBSL — Annual Report Ch.4 (cbsl.gov.lk)
- **Access:** Annual Report PDF tables.
- **Constraints:** Manual extraction; changes in table layouts year-to-year.
- **Datasets (planned):**
  - `data/cbsl-annual-report/wage_rates_daily.csv` — ~1990–present — `year`, `sector`, `daily_wage_lkr`, `region`
- **Citation:** Central Bank of Sri Lanka, *Annual Report* (Chapter 4). https://www.cbsl.gov.lk

### 6. DCS — HIES Survey (statistics.gov.lk)
- **Access:** HIES PDF reports and/or tabular annexes.
- **Constraints:** Survey-year only; category definitions change over time.
- **Datasets (planned):**
  - `data/dcs-hies/income_expenditure_by_category.csv` — 2002–2019 — `survey_year`, `category`, `mean_income_monthly`, `mean_expenditure_monthly`, `share_pct`
- **Citation:** Department of Census and Statistics, *Household Income and Expenditure Survey*. https://www.statistics.gov.lk

### 7. DCS — Census of Population & Housing (statistics.gov.lk)
- **Access:** Census reports (PDF/Excel).
- **Constraints:** Only 2001 and 2012 census releases.
- **Datasets (planned):**
  - `data/dcs-census/housing_stock.csv` — 2001, 2012 — `census_year`, `housing_type`, `tenure_type`, `households`, `avg_household_size`
- **Citation:** Department of Census and Statistics, *Census of Population & Housing*. https://www.statistics.gov.lk

### 8. DCS — Quarterly Labour Force Survey (statistics.gov.lk)
- **Access:** Quarterly PDF/Excel releases.
- **Constraints:** Coverage definitions changed in 2012 (age/region).
- **Datasets (planned):**
  - `data/dcs-qlfs/labour_force_quarterly.csv` — 2000–present — `quarter`, `unemployment_pct`, `participation_pct`, `employment_sector_share`
- **Citation:** Department of Census and Statistics, *Quarterly Labour Force Survey*. https://www.statistics.gov.lk

### 9. Ministry of Finance — Salary Circulars (treasury.gov.lk)
- **Access:** PDF circulars and gazettes.
- **Constraints:** Manual extraction; salary scales differ by grade/service.
- **Datasets (planned):**
  - `data/treasury-salary-circulars/public_service_salary_scales.csv` — 2004–present — `circular_date`, `grade`, `step`, `monthly_salary_lkr`
- **Citation:** Ministry of Finance, *Salary Circulars*. https://www.treasury.gov.lk

### 10. World Bank Open Data (data.worldbank.org)
- **Access:** World Bank API (JSON/CSV).
- **Constraints:** Indicator codes must be preserved for reproducibility.
- **Datasets (planned):**
  - `data/world-bank/open_data_indicators.csv` — 1960–2024 — `indicator_code`, `indicator_name`, `year`, `value`
- **Citation:** World Bank Open Data (country code `LK`). https://data.worldbank.org

### 11. IMF World Economic Outlook (imf.org)
- **Access:** WEO Excel/CSV downloads.
- **Constraints:** Licensing allows use with attribution; keep WEO release version.
- **Datasets (planned):**
  - `data/imf-weo/macro_forecasts.csv` — 1980–2029 — `year`, `gdp_growth_pct`, `inflation_pct`, `exchange_rate_lkr_usd`, `unemployment_pct`
- **Citation:** IMF, *World Economic Outlook* database. https://www.imf.org

### 12. CEIC Data (ceicdata.com)
- **Access:** Paid subscription (CSV/Excel export).
- **Constraints:** Commercial license; may restrict redistribution.
- **Datasets (planned, needs approval):**
  - `data/ceic/hies_cleaned.csv` — 1981–2019 — `survey_year`, `mean_income_monthly`, `median_income_monthly`, `mean_expenditure_monthly`
- **Citation:** CEIC Data, HIES series. https://www.ceicdata.com

### 13. Macrotrends (macrotrends.net)
- **Access:** Web table (HTML/CSV download).
- **Constraints:** Check terms for automated access.
- **Datasets (planned):**
  - `data/macrotrends/cpi_inflation_annual.csv` — 1960–2024 — `year`, `inflation_pct`
- **Citation:** Macrotrends Sri Lanka Inflation. https://www.macrotrends.net/countries/LKA

### 14. WorldData.info (worlddata.info)
- **Access:** Web table.
- **Constraints:** Verify terms for reuse and automation.
- **Datasets (planned):**
  - `data/worlddata/inflation_cumulative.csv` — 1960–present — `year`, `cumulative_inflation_pct`, `price_index`
- **Citation:** WorldData.info Sri Lanka inflation. https://www.worlddata.info/asia/sri-lanka

### 15. LankaPropertyWeb (lankapropertyweb.com)
- **Access:** Annual reports (PDF) and index summaries.
- **Constraints:** Private publisher; confirm permission to reuse.
- **Datasets (planned, needs approval):**
  - `data/lpw/land_price_index_annual.csv` — ~2015–present — `year`, `province`, `index_level`, `change_pct`
  - `data/lpw/house_price_index_annual.csv` — ~2015–present — `year`, `province`, `index_level`, `change_pct`
- **Citation:** LankaPropertyWeb, *Property Index Reports*. https://www.lankapropertyweb.com

### 16. Global Property Guide (globalpropertyguide.com)
- **Access:** Web tables/reports.
- **Constraints:** Check re-use rights; may restrict scraping.
- **Datasets (planned, needs approval):**
  - `data/global-property-guide/colombo_house_prices_usd_sqm.csv` — ~2010–present — `year`, `price_usd_per_sqm`, `source_note`
- **Citation:** Global Property Guide, Sri Lanka. https://www.globalpropertyguide.com/asia/sri-lanka

### 17. Advocata Institute (advocata.org)
- **Access:** Research PDFs/briefs.
- **Constraints:** Manual extraction; cite report title/date.
- **Datasets (planned):**
  - `data/advocata/housing_affordability_metrics.csv` — report years — `report_year`, `affordability_index`, `income_to_price_ratio`, `notes`
- **Citation:** Advocata Institute research publications. https://www.advocata.org

### 18. Verité Research (veriteresearch.org)
- **Access:** Research briefs/PDFs.
- **Constraints:** Manual extraction; cite report title/date.
- **Datasets (planned):**
  - `data/verite/household_finance_metrics.csv` — report years — `report_year`, `real_income_change_pct`, `poverty_estimate_pct`, `notes`
- **Citation:** Verité Research publications. https://www.veriteresearch.org

### 19. PriceLanka.lk (pricelanka.lk)
- **Access:** Web listings.
- **Constraints:** Private marketplace; scraping may violate terms.
- **Datasets (planned, needs approval):**
  - `data/pricelanka/vehicle_prices_by_model.csv` — 2018–present — `as_of_date`, `make`, `model`, `condition`, `price_lkr`
- **Citation:** PriceLanka.lk listings. https://www.pricelanka.lk

### 20. Riyasewana (riyasewana.com)
- **Access:** Web listings.
- **Constraints:** Private marketplace; scraping may violate terms.
- **Datasets (planned, needs approval):**
  - `data/riyasewana/used_vehicle_listings.csv` — ~2010–present — `listing_date`, `make`, `model`, `model_year`, `price_lkr`, `mileage_km`
- **Citation:** Riyasewana listings. https://www.riyasewana.com

### 21. ikman.lk / AutoLanka (ikman.lk)
- **Access:** Web listings.
- **Constraints:** Private marketplace; scraping may violate terms.
- **Datasets (planned, needs approval):**
  - `data/ikman/used_vehicle_listings.csv` — ~2010–present — `listing_date`, `make`, `model`, `model_year`, `price_lkr`, `mileage_km`
- **Citation:** ikman.lk auto listings. https://ikman.lk

### 22. Global Living Wage Coalition (globallivingwage.org)
- **Access:** PDF report.
- **Constraints:** Single-point estimate; cite report year.
- **Datasets (planned):**
  - `data/glwc/living_wage_reference.csv` — 2022 — `year`, `location`, `living_wage_monthly_lkr`, `methodology`
- **Citation:** Global Living Wage Coalition, Living Wage Reference Value. https://www.globallivingwage.org

### 23. ILO ILOSTAT (ilostat.ilo.org)
- **Access:** ILOSTAT API/CSV export.
- **Constraints:** Indicator codes and metadata must be preserved.
- **Datasets (planned):**
  - `data/ilo/mean_wages_annual.csv` — 1990–present — `indicator_code`, `year`, `value`, `unit`
- **Citation:** ILOSTAT database. https://ilostat.ilo.org

### 24. Ministry of Education (moe.gov.lk)
- **Access:** Annual reports/fee circulars.
- **Constraints:** Fragmented; may require manual extraction.
- **Datasets (planned):**
  - `data/moe/private_school_fees.csv` — report years — `year`, `school_type`, `grade_band`, `monthly_fee_lkr`, `notes`
- **Citation:** Ministry of Education publications. https://www.moe.gov.lk

### 25. Ministry of Health — Annual Health Bulletin (health.gov.lk)
- **Access:** Annual Health Bulletin PDFs.
- **Constraints:** Manual extraction; health cost series may be partial.
- **Datasets (planned):**
  - `data/moh/health_expenditure_per_capita.csv` — 2000–present — `year`, `health_expenditure_lkr`, `health_expenditure_usd`, `notes`
- **Citation:** Ministry of Health, Annual Health Bulletin. https://www.health.gov.lk

### 26. World Bank HNP Data (data.worldbank.org)
- **Access:** World Bank API (HNP indicators).
- **Constraints:** Indicator codes must be preserved.
- **Datasets (planned):**
  - `data/world-bank-hnp/health_expenditure.csv` — 1995–present — `indicator_code`, `year`, `value`
- **Citation:** World Bank HNP Data. https://data.worldbank.org

### 27. CBSL — CCPI Monthly (cbsl.gov.lk)
- **Access:** CBSL monthly CCPI releases (Excel/CSV).
- **Constraints:** Base-year changes; include base_year column.
- **Datasets (planned):**
  - `data/cbsl-ccpi/ccpi_monthly.csv` — 2003–present — `month`, `index_level`, `yoy_change_pct`, `base_year`
- **Citation:** Central Bank of Sri Lanka, CCPI monthly data. https://www.cbsl.gov.lk

### 28. UN Data (data.un.org)
- **Access:** UN Data API/CSV.
- **Constraints:** Indicator codes must be preserved.
- **Datasets (planned):**
  - `data/un-data/education_health_spending.csv` — 1990–present — `indicator_code`, `year`, `value`
- **Citation:** UN Data. https://data.un.org

---

## Gaps / approval needed before extraction

- **Private marketplaces:** PriceLanka.lk, Riyasewana, ikman.lk (vehicle listings) — confirm permission or provide alternatives.
- **Paid source:** CEIC Data — confirm license and redistribution rights or provide a free alternative.
- **Potential restrictions:** Global Property Guide, LankaPropertyWeb — confirm permission for automated access and reuse.
