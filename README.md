# lk-affordability-index
An open, interactive tool that compares the real cost of living in Sri Lanka across generations — housing, land, vehicles, childcare, and monthly household expenditure — alongside a salary calculator showing what you actually need to earn to afford a basic or comfortable life in each era.

## 🔎 What It Shows
 
- **Major life assets** — average house, land, and vehicle prices across 2000, 2010, 2019, and 2025
- **Monthly household basket** — food, utilities, transport, health, education, and communication costs per era
- **Raising a child** — estimated monthly cost from birth to age 23
- **Salary calculator** — minimum survivable and recommended comfortable salary, adjustable by housing type, vehicle, and number of children
- **Generational comparison** — how many months of average salary it takes to buy a house, land, or car in each era vs. 2000
 
---
 
## 📊 Data Sources
 
All data is sourced from publicly available official and independent sources. Post-2022 figures are estimates derived by applying the Colombo Consumer Price Index (CCPI) to the 2019 HIES baseline, and are clearly flagged as such.
 
| # | Source | Category | What's Available |
|---|--------|----------|-----------------|
| 1 | **CBSL — Socio-Economic Data** (cbsl.gov.lk) | Income & Expenditure | Mean/median household income and total consumer expenditure per month, going back to 1981 across all HIES survey periods |
| 2 | **CBSL — Economic & Social Statistics** (cbsl.gov.lk) | Multi-category | Long-series data on prices, wages, employment, national output — downloadable online from 2024 onwards |
| 3 | **CBSL — Real Estate Price Indices** (cbsl.gov.lk) | Property | Residential land and house price indices by province, quarterly from ~2017 |
| 4 | **CBSL — Condominium Market Survey** (cbsl.gov.lk) | Property | Colombo apartment/condo prices and sales volume, quarterly from Q3 2017 |
| 5 | **CBSL — Annual Report Ch.4** (cbsl.gov.lk) | Wages | Average daily wage rates for construction, estate, and public sector workers historically |
| 6 | **DCS — HIES Survey** (statistics.gov.lk) | Income & Expenditure | Full household income and expenditure breakdown by category — food, education, health, transport, clothing — surveyed in 2002, 2006/07, 2009/10, 2012/13, 2016, 2019 |
| 7 | **DCS — Census of Population & Housing** (statistics.gov.lk) | Housing | Housing stock, tenure type (owner/renter), housing quality, and household size — 2001 and 2012 |
| 8 | **DCS — Quarterly Labour Force Survey** (statistics.gov.lk) | Wages & Employment | Average wage by sector (public, private, formal, informal), unemployment rate, labour participation |
| 9 | **Ministry of Finance — Salary Circulars** (treasury.gov.lk) | Wages | Government salary scales and minimum wage gazette notifications historically |
| 10 | **World Bank Open Data** (data.worldbank.org) | Inflation & Poverty | CPI inflation 1960–2024 (free API), poverty headcount at $3.65/day, per capita GNI, household consumption — country code `LK` |
| 11 | **IMF World Economic Outlook** (imf.org) | Macro | GDP growth, inflation forecasts, exchange rate history, wage indices — internationally comparable |
| 12 | **CEIC Data** (ceicdata.com) | Income & Expenditure | Cleaned, tabular version of DCS HIES data — household income and expenditure per month 1981–2019, easier to work with than raw PDFs |
| 13 | **Macrotrends** (macrotrends.net/countries/LKA) | Inflation | Annual CPI inflation rate 1960–2024 in one clean downloadable table — ideal for charting |
| 14 | **WorldData.info** (worlddata.info/asia/sri-lanka) | Inflation | Cumulative inflation calculator — shows what Rs. 100 in any past year costs today |
| 15 | **LankaPropertyWeb (LPW)** (lankapropertyweb.com) | Property | Land Price Index and House Price Index by province, quarterly from ~2015. Publishes annual reports with % change data |
| 16 | **Global Property Guide** (globalpropertyguide.com/asia/sri-lanka) | Property | Historical house prices per sqm in Colombo (~2010 onwards), rental yields, mortgage rates, affordability commentary |
| 17 | **Advocata Institute** (advocata.org) | Housing & Cost of Living | Independent research on housing affordability, cost of living, wage-to-price ratios — free, citable, well-sourced |
| 18 | **Verité Research** (veriteresearch.org) | Income & Poverty | Economic briefs on household finances, poverty, wages — frequently updated and cited by mainstream media |
| 19 | **PriceLanka.lk** (pricelanka.lk) | Vehicles | New and reconditioned vehicle prices for all major brands — good coverage from 2018 onwards |
| 20 | **Riyasewana** (riyasewana.com) | Vehicles | Used car marketplace — cross-reference manufacture year with listing price to estimate historical used car values |
| 21 | **ikman.lk / AutoLanka** (ikman.lk) | Vehicles | Secondary vehicle market listings — useful for verifying price ranges by model and year |
| 22 | **Global Living Wage Coalition** (globallivingwage.org) | Wages | Published Living Wage Reference Value for Urban Sri Lanka 2022 (Rs. 84,231/month) — useful as a benchmark |
| 23 | **ILO ILOSTAT** (ilostat.ilo.org) | Wages | Mean nominal wages for Sri Lanka, internationally comparable, useful for cross-country context |
| 24 | **Ministry of Education** (moe.gov.lk) | Education | School fee structures and government education expenditure data |
| 25 | **Ministry of Health — Annual Health Bulletin** (health.gov.lk) | Healthcare | Outpatient and inpatient cost data, health expenditure per capita over time |
| 26 | **World Bank HNP Data** (data.worldbank.org) | Healthcare | Per capita health expenditure in LKR and USD historically — country code `LK` |
| 27 | **CBSL — CCPI Monthly** (cbsl.gov.lk) | Inflation | Colombo Consumer Price Index monthly — rebased to 2021; older series on 2013 and 2006/07 base years |
| 28 | **UN Data** (data.un.org) | Education & Health | Education expenditure as % of household income, child mortality, health spending per capita |
 
---

## 🧮 Methodology
 
Data is sourced from official publications wherever possible. Where exact year-by-year data is unavailable (e.g. between HIES survey years), figures are interpolated using the published Colombo Consumer Price Index (CCPI). Post-2022 figures are clearly marked as estimates.
 
See [`METHODOLOGY.md`](./METHODOLOGY.md) for a full explanation of how each figure is derived, its confidence level, and the exact source citation.
 
---
 
## 🤝 Contributing
 
Contributions are welcome — especially if you have access to more granular HIES data, historical property price records, or can help with the Sinhala language version.
 
Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before submitting a pull request. All data additions must include a source citation.
 
### Priority contributions needed
- [ ] District-level data (not just Colombo / Western Province)
- [ ] Sinhala (`si`) language support
- [ ] Post-2022 HIES data when published by DCS
- [ ] Historical vehicle prices pre-2015
- [ ] Private school fee data by era
 
---
 
## ⚠️ Disclaimer
 
This project is non-partisan. It does not endorse any political party, government, or policy position. All data is drawn from public sources and presented as-is. Estimates are clearly marked and explained in the methodology documentation.
 
This tool is intended for public education. It should not be used as the sole basis for financial decisions. Always verify figures against the original official sources linked above.
 
---
 
## 📄 License
 
MIT License — free to use, adapt, and share with attribution.
 
---
 
## 🙏 Acknowledgements
 
Built on data published by the Central Bank of Sri Lanka, the Department of Census and Statistics, and independent researchers at the Advocata Institute and Verité Research. Their work makes this possible.
 
*Made in Sri Lanka 🇱🇰 — for Sri Lankans, wherever you are.*
