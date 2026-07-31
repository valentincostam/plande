import { buildStudyPlanCatalogMaps } from '$lib/study-plan-catalog';
import type { StudyPlanData } from '$lib/study-plan-data';
import { issdTscdia } from './issd-tscdia';
import { ubaFpLp1985 } from './uba-fp-lp-1985';
import { uaderFcytIt } from './uader-fcyt-it';
import { uaderFcytLsi2010 } from './uader-fcyt-lsi-2010';
import { uaiFceCp2022 } from './uai-fce-cp-2022';
import { ucaeceLp2023 } from './ucaece-lp-2023';
import { uccuyoFdcsAb2018 } from './uccuyo-fdcs-ab-2018';
import { ucuFauArq2007 } from './ucu-fau-arq-2007';
import { udeFdcsAb } from './ude-fdcs-ab';
import { udemmIem } from './udemm-iem';
import { udemmLp } from './udemm-lp';
import { udemmLpe } from './udemm-lpe';
import { unahurIePui2024 } from './unahur-ie-pui-2024';
import { unahurItiLi2016 } from './unahur-iti-li-2016';
import { unajIcsKf2015 } from './unaj-ics-kf-2015';
import { uncaFcaTupazsa } from './unca-fca-tupazsa';
import { unerFbBioq2025 } from './uner-fb-bioq-2025';
import { unerFcecoCp2020 } from './uner-fceco-cp-2020';
import { unerFcsMed2022 } from './uner-fcs-med-2022';
import { unlamDceLci } from './unlam-dce-lci';
import { unlamDcsKf2011 } from './unlam-dcs-kf-2011';
import { unlamDcsLn2011 } from './unlam-dcs-ln-2011';
import { unlamDdcpAb2018 } from './unlam-ddcp-ab-2018';
import { unlamDiitIi2023 } from './unlam-diit-ii-2023';
import { unlpFahcePm2003 } from './unlp-fahce-pm-2003';
import { unlpFiIem2018 } from './unlp-fi-iem-2018';
import { unlpFpLp2012 } from './unlp-fp-lp-2012';
import { unmdpFhLcp } from './unmdp-fh-lcp';
import { unpaUargIrnr } from './unpa-uarg-irnr';
import { unpaUargTurnrpf2007 } from './unpa-uarg-turnrpf-2007';
import { unrFapydLdg } from './unr-fapyd-ldg';
import { umEsenLrp2023 } from './um-esen-lrp-2023';
import { unsaFceLf2005 } from './unsa-fce-lf-2005';
import { unsDcsLe2017 } from './uns-dcs-le-2017';
import { unsamEbynLb } from './unsam-ebyn-lb';
import { unpsjbFiIf } from './unpsjb-fi-if';
import { utnFrbaIq1995 } from './utn-frba-iq-1995';
import { utnFrbaIsi2008 } from './utn-frba-isi-2008';
import { utnFrbaIsi2023 } from './utn-frba-isi-2023';
import { utnFrcIsi2023 } from './utn-frc-isi-2023';
import { utnFrcuIc2023 } from './utn-frcu-ic-2023';
import { utnFrcuIe2023 } from './utn-frcu-ie-2023';
import { utnFrcuIsi2023 } from './utn-frcu-isi-2023';
import { utnFrcuLoi1995 } from './utn-frcu-loi-1995';
import { utnFrhBio2023 } from './utn-frh-bio-2023';
import { utnFrhIa2023 } from './utn-frh-ia-2023';
import { utnFrsfIsi2023 } from './utn-frsf-isi-2023';

export const allStudyPlans: StudyPlanData[] = [
	unlpFahcePm2003,
	uncaFcaTupazsa,
	issdTscdia,
	uaderFcytIt,
	uaderFcytLsi2010,
	uaiFceCp2022,
	ubaFpLp1985,
	ucaeceLp2023,
	uccuyoFdcsAb2018,
	ucuFauArq2007,
	udeFdcsAb,
	udemmIem,
	udemmLp,
	udemmLpe,
	unahurIePui2024,
	unahurItiLi2016,
	unajIcsKf2015,
	unerFbBioq2025,
	unerFcecoCp2020,
	unerFcsMed2022,
	unlamDceLci,
	unlamDcsKf2011,
	unlamDcsLn2011,
	unlamDdcpAb2018,
	unlamDiitIi2023,
	unlpFpLp2012,
	unlpFiIem2018,
	unmdpFhLcp,
	unpaUargIrnr,
	unpaUargTurnrpf2007,
	unrFapydLdg,
	umEsenLrp2023,
	unsDcsLe2017,
	unsaFceLf2005,
	unsamEbynLb,
	unpsjbFiIf,
	utnFrbaIq1995,
	utnFrbaIsi2008,
	utnFrbaIsi2023,
	utnFrcIsi2023,
	utnFrcuIsi2023,
	utnFrcuIc2023,
	utnFrcuIe2023,
	utnFrcuLoi1995,
	utnFrhBio2023,
	utnFrhIa2023,
	utnFrsfIsi2023
];

export const { slugMap: studyPlanSlugMap, slugWithYearMap: studyPlanSlugWithYearMap } =
	buildStudyPlanCatalogMaps(allStudyPlans);
