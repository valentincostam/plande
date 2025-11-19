import { getStudyPlanSlug, getStudyPlanSlugWithYear } from '$lib/study-plan';
import { utnFrcuIsi2023 } from './data/utn-frcu-isi-2023';
import { utnFrcuIe2023 } from './data/utn-frcu-ie-2023';
import { ucuFauArq2007 } from './data/ucu-fau-arq-2007';
import { uaderFcytLsi2010 } from './data/uader-fcyt-lsi-2010';
import { uaderFcytIt } from './data/uader-fcyt-it';
import { unerFcsMed2022 } from './data/uner-fcs-med-2022';
import { utnFrcuIc2023 } from './data/utn-frcu-ic-2023';
import { utnFrcuLoi1995 } from './data/utn-frcu-loi-1995';
import { uncaFcaTupazsa } from './data/unca-fca-tupazsa';
import { udemmLp } from './data/udemm-lp';
import { udemmLpe } from './data/udemm-lpe';
import { utnFrbaIq1995 } from './data/utn-frba-iq-1995';
import { unrFapydLdg } from './data/unr-fapyd-ldg';
import { unerFcecoCP2020 } from './data/uner-fceco-cp-2020';
import { uaiFceCp2022 } from './data/uai-fce-cp-2022';
import { unlamDcsKf2011 } from './data/unlam-dcs-kf-2011';
import { utnFrcIsi2023 } from './data/utn-frc-isi-2023';
import { unahurItiLi2016 } from './data/unahur-iti-li-2016';
import { unsaFceLf2005 } from './data/unsa-fce-lf-2005';

export const studyPlanSlugMap = {
	[getStudyPlanSlug(uaderFcytIt)]: uaderFcytIt,
	[getStudyPlanSlug(uaderFcytLsi2010)]: uaderFcytLsi2010,
	[getStudyPlanSlug(uaiFceCp2022)]: uaiFceCp2022,
	[getStudyPlanSlug(ucuFauArq2007)]: ucuFauArq2007,
	[getStudyPlanSlug(udemmLp)]: udemmLp,
	[getStudyPlanSlug(udemmLpe)]: udemmLpe,
	[getStudyPlanSlug(uncaFcaTupazsa)]: uncaFcaTupazsa,
	[getStudyPlanSlug(unerFcecoCP2020)]: unerFcecoCP2020,
	[getStudyPlanSlug(unerFcsMed2022)]: unerFcsMed2022,
	[getStudyPlanSlug(unlamDcsKf2011)]: unlamDcsKf2011,
	[getStudyPlanSlug(unrFapydLdg)]: unrFapydLdg,
	[getStudyPlanSlug(utnFrbaIq1995)]: utnFrbaIq1995,
	[getStudyPlanSlug(utnFrcIsi2023)]: utnFrcIsi2023,
	[getStudyPlanSlug(utnFrcuIc2023)]: utnFrcuIc2023,
	[getStudyPlanSlug(utnFrcuIe2023)]: utnFrcuIe2023,
	[getStudyPlanSlug(utnFrcuIsi2023)]: utnFrcuIsi2023,
	[getStudyPlanSlug(utnFrcuLoi1995)]: utnFrcuLoi1995,
	[getStudyPlanSlug(unahurItiLi2016)]: unahurItiLi2016,
	[getStudyPlanSlug(unsaFceLf2005)]: unsaFceLf2005
};

export const studyPlanSlugWithYearMap = {
	[getStudyPlanSlugWithYear(uaderFcytIt)]: uaderFcytIt,
	[getStudyPlanSlugWithYear(uaderFcytLsi2010)]: uaderFcytLsi2010,
	[getStudyPlanSlugWithYear(uaiFceCp2022)]: uaiFceCp2022,
	[getStudyPlanSlugWithYear(ucuFauArq2007)]: ucuFauArq2007,
	[getStudyPlanSlugWithYear(udemmLp)]: udemmLp,
	[getStudyPlanSlugWithYear(udemmLpe)]: udemmLpe,
	[getStudyPlanSlugWithYear(uncaFcaTupazsa)]: uncaFcaTupazsa,
	[getStudyPlanSlugWithYear(unerFcecoCP2020)]: unerFcecoCP2020,
	[getStudyPlanSlugWithYear(unerFcsMed2022)]: unerFcsMed2022,
	[getStudyPlanSlugWithYear(unlamDcsKf2011)]: unlamDcsKf2011,
	[getStudyPlanSlugWithYear(unrFapydLdg)]: unrFapydLdg,
	[getStudyPlanSlugWithYear(utnFrbaIq1995)]: utnFrbaIq1995,
	[getStudyPlanSlugWithYear(utnFrcIsi2023)]: utnFrcIsi2023,
	[getStudyPlanSlugWithYear(utnFrcuIc2023)]: utnFrcuIc2023,
	[getStudyPlanSlugWithYear(utnFrcuIe2023)]: utnFrcuIe2023,
	[getStudyPlanSlugWithYear(utnFrcuIsi2023)]: utnFrcuIsi2023,
	[getStudyPlanSlugWithYear(utnFrcuLoi1995)]: utnFrcuLoi1995,
	[getStudyPlanSlugWithYear(unahurItiLi2016)]: unahurItiLi2016,
	[getStudyPlanSlugWithYear(unsaFceLf2005)]: unsaFceLf2005
};
