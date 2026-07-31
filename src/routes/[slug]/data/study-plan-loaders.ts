import type { StudyPlanData } from '$lib/study-plan-data';

type StudyPlanLoader = () => Promise<StudyPlanData>;

const studyPlanLoaders: Record<string, StudyPlanLoader> = {
	'issd-tscdia': () => import('./issd-tscdia').then((module) => module.issdTscdia),
	'uader-fcyt-it': () => import('./uader-fcyt-it').then((module) => module.uaderFcytIt),
	'uader-fcyt-lsi-2010': () =>
		import('./uader-fcyt-lsi-2010').then((module) => module.uaderFcytLsi2010),
	'uai-fce-cp-2022': () => import('./uai-fce-cp-2022').then((module) => module.uaiFceCp2022),
	'uba-fp-lp-1985': () => import('./uba-fp-lp-1985').then((module) => module.ubaFpLp1985),
	'ucaece-lp-2023': () => import('./ucaece-lp-2023').then((module) => module.ucaeceLp2023),
	'uccuyo-fdcs-ab-2018': () =>
		import('./uccuyo-fdcs-ab-2018').then((module) => module.uccuyoFdcsAb2018),
	'ucu-fau-arq-2007': () => import('./ucu-fau-arq-2007').then((module) => module.ucuFauArq2007),
	'ude-fdcs-ab': () => import('./ude-fdcs-ab').then((module) => module.udeFdcsAb),
	'udemm-iem': () => import('./udemm-iem').then((module) => module.udemmIem),
	'udemm-lp': () => import('./udemm-lp').then((module) => module.udemmLp),
	'udemm-lpe': () => import('./udemm-lpe').then((module) => module.udemmLpe),
	'um-esen-lrp-2023': () => import('./um-esen-lrp-2023').then((module) => module.umEsenLrp2023),
	'unahur-ie-pui-2024': () =>
		import('./unahur-ie-pui-2024').then((module) => module.unahurIePui2024),
	'unahur-iti-li-2016': () =>
		import('./unahur-iti-li-2016').then((module) => module.unahurItiLi2016),
	'unaj-ics-kf-2015': () => import('./unaj-ics-kf-2015').then((module) => module.unajIcsKf2015),
	'unca-fca-tupazsa': () => import('./unca-fca-tupazsa').then((module) => module.uncaFcaTupazsa),
	'uner-fb-bioq-2025': () => import('./uner-fb-bioq-2025').then((module) => module.unerFbBioq2025),
	'uner-fceco-cp-2020': () =>
		import('./uner-fceco-cp-2020').then((module) => module.unerFcecoCp2020),
	'uner-fcs-med-2022': () => import('./uner-fcs-med-2022').then((module) => module.unerFcsMed2022),
	'unlam-dce-lci': () => import('./unlam-dce-lci').then((module) => module.unlamDceLci),
	'unlam-dcs-kf-2011': () => import('./unlam-dcs-kf-2011').then((module) => module.unlamDcsKf2011),
	'unlam-dcs-ln-2011': () => import('./unlam-dcs-ln-2011').then((module) => module.unlamDcsLn2011),
	'unlam-ddcp-ab-2018': () =>
		import('./unlam-ddcp-ab-2018').then((module) => module.unlamDdcpAb2018),
	'unlam-diit-ii-2023': () =>
		import('./unlam-diit-ii-2023').then((module) => module.unlamDiitIi2023),
	'unlp-fahce-pm-2003': () =>
		import('./unlp-fahce-pm-2003').then((module) => module.unlpFahcePm2003),
	'unlp-fi-iem-2018': () => import('./unlp-fi-iem-2018').then((module) => module.unlpFiIem2018),
	'unlp-fp-lp-2012': () => import('./unlp-fp-lp-2012').then((module) => module.unlpFpLp2012),
	'unmdp-fh-lcp': () => import('./unmdp-fh-lcp').then((module) => module.unmdpFhLcp),
	'unpa-uarg-irnr': () => import('./unpa-uarg-irnr').then((module) => module.unpaUargIrnr),
	'unpa-uarg-turnrpf-2007': () =>
		import('./unpa-uarg-turnrpf-2007').then((module) => module.unpaUargTurnrpf2007),
	'unpsjb-fi-if': () => import('./unpsjb-fi-if').then((module) => module.unpsjbFiIf),
	'unr-fapyd-ldg': () => import('./unr-fapyd-ldg').then((module) => module.unrFapydLdg),
	'uns-dcs-le-2017': () => import('./uns-dcs-le-2017').then((module) => module.unsDcsLe2017),
	'unsa-fce-lf-2005': () => import('./unsa-fce-lf-2005').then((module) => module.unsaFceLf2005),
	'unsam-ebyn-lb': () => import('./unsam-ebyn-lb').then((module) => module.unsamEbynLb),
	'utn-frba-iq-1995': () => import('./utn-frba-iq-1995').then((module) => module.utnFrbaIq1995),
	'utn-frba-isi-2008': () => import('./utn-frba-isi-2008').then((module) => module.utnFrbaIsi2008),
	'utn-frba-isi-2023': () => import('./utn-frba-isi-2023').then((module) => module.utnFrbaIsi2023),
	'utn-frc-isi-2023': () => import('./utn-frc-isi-2023').then((module) => module.utnFrcIsi2023),
	'utn-frcu-ic-2023': () => import('./utn-frcu-ic-2023').then((module) => module.utnFrcuIc2023),
	'utn-frcu-ie-2023': () => import('./utn-frcu-ie-2023').then((module) => module.utnFrcuIe2023),
	'utn-frcu-isi-2023': () => import('./utn-frcu-isi-2023').then((module) => module.utnFrcuIsi2023),
	'utn-frcu-loi-1995': () => import('./utn-frcu-loi-1995').then((module) => module.utnFrcuLoi1995),
	'utn-frh-bio-2023': () => import('./utn-frh-bio-2023').then((module) => module.utnFrhBio2023),
	'utn-frh-ia-2023': () => import('./utn-frh-ia-2023').then((module) => module.utnFrhIa2023),
	'utn-frsf-isi-2023': () => import('./utn-frsf-isi-2023').then((module) => module.utnFrsfIsi2023)
};

export const studyPlanSlugs = Object.keys(studyPlanLoaders);

const canonicalSlugByShortSlug: Record<string, string> = {
	'uader-fcyt-lsi': 'uader-fcyt-lsi-2010',
	'uai-fce-cp': 'uai-fce-cp-2022',
	'uba-fp-lp': 'uba-fp-lp-1985',
	'ucaece-lp': 'ucaece-lp-2023',
	'uccuyo-fdcs-ab': 'uccuyo-fdcs-ab-2018',
	'ucu-fau-arq': 'ucu-fau-arq-2007',
	'um-esen-lrp': 'um-esen-lrp-2023',
	'unahur-ie-pui': 'unahur-ie-pui-2024',
	'unahur-iti-li': 'unahur-iti-li-2016',
	'unaj-ics-kf': 'unaj-ics-kf-2015',
	'uner-fb-bioq': 'uner-fb-bioq-2025',
	'uner-fceco-cp': 'uner-fceco-cp-2020',
	'uner-fcs-med': 'uner-fcs-med-2022',
	'unlam-dcs-kf': 'unlam-dcs-kf-2011',
	'unlam-dcs-ln': 'unlam-dcs-ln-2011',
	'unlam-ddcp-ab': 'unlam-ddcp-ab-2018',
	'unlam-diit-ii': 'unlam-diit-ii-2023',
	'unlp-fahce-pm': 'unlp-fahce-pm-2003',
	'unlp-fi-iem': 'unlp-fi-iem-2018',
	'unlp-fp-lp': 'unlp-fp-lp-2012',
	'unpa-uarg-turnrpf': 'unpa-uarg-turnrpf-2007',
	'uns-dcs-le': 'uns-dcs-le-2017',
	'unsa-fce-lf': 'unsa-fce-lf-2005',
	'utn-frba-iq': 'utn-frba-iq-1995',
	'utn-frba-isi': 'utn-frba-isi-2023',
	'utn-frc-isi': 'utn-frc-isi-2023',
	'utn-frcu-ic': 'utn-frcu-ic-2023',
	'utn-frcu-ie': 'utn-frcu-ie-2023',
	'utn-frcu-isi': 'utn-frcu-isi-2023',
	'utn-frcu-loi': 'utn-frcu-loi-1995',
	'utn-frh-bio': 'utn-frh-bio-2023',
	'utn-frh-ia': 'utn-frh-ia-2023',
	'utn-frsf-isi': 'utn-frsf-isi-2023'
};

export const getCanonicalStudyPlanSlug = (slug: string) =>
	canonicalSlugByShortSlug[slug.toLowerCase()] ?? slug.toLowerCase();

export const loadStudyPlan = async (slug: string) =>
	studyPlanLoaders[getCanonicalStudyPlanSlug(slug)]?.();
