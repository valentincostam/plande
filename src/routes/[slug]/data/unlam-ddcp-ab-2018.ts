import type { StudyPlanData } from '$lib/study-plan-data';

export const unlamDdcpAb2018: StudyPlanData = {
  "info": {
    "degreeName": "Abogacía",
    "degreeSlug": "AB",
    "universityName": "Universidad Nacional de La Matanza",
    "universitySlug": "UNLaM",
    "collegeName": "Departamento de Derecho y Ciencia Política",
    "collegeSlug": "DDCP",
    "year": 2018,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios 2018",
        "url": "https://www.unlam.edu.ar/wp-content/uploads/2024/08/Abogacia-PLAN-DE-ESTUDIOS.pdf"
      }
    ]
  },
  "sections": [
    {
      "id": "year-1",
      "label": "1er Año"
    },
    {
      "id": "year-2",
      "label": "2do Año"
    },
    {
      "id": "year-3",
      "label": "3er Año"
    },
    {
      "id": "year-4",
      "label": "4to Año"
    },
    {
      "id": "year-5",
      "label": "5to Año"
    }
  ],
  "items": [
    {
      "id": "2302",
      "seqId": 1,
      "kind": "course",
      "name": "Derecho Político",
      "code": "02302",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "2340",
      "seqId": 2,
      "kind": "course",
      "name": "Introducción al Estudio del Derecho",
      "code": "02340",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "2341",
      "seqId": 3,
      "kind": "course",
      "name": "Historia y Evolución de las Instituciones del Derecho",
      "code": "02341",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "901",
      "seqId": 4,
      "kind": "course",
      "name": "Inglés Nivel I",
      "code": "00901",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "2304",
      "seqId": 5,
      "kind": "course",
      "name": "Derecho Constitucional I",
      "code": "02304",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2302",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2340",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2302",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2340",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "2306",
      "seqId": 6,
      "kind": "course",
      "name": "Filosofía del Derecho",
      "code": "02306",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "2309",
      "seqId": 7,
      "kind": "course",
      "name": "Economía Política",
      "code": "02309",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "2342",
      "seqId": 8,
      "kind": "course",
      "name": "Derecho Civil y Comercial I (Parte General)",
      "code": "02342",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2340",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2341",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2340",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2341",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "911",
      "seqId": 9,
      "kind": "course",
      "name": "Computación Nivel I",
      "code": "00911",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "2305",
      "seqId": 10,
      "kind": "course",
      "name": "Sociología",
      "code": "02305",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2306",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2306",
          "state": "passed"
        }
      }
    },
    {
      "id": "2314",
      "seqId": 11,
      "kind": "course",
      "name": "Derecho Constitucional II",
      "code": "02314",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2304",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2304",
          "state": "passed"
        }
      }
    },
    {
      "id": "2333",
      "seqId": 12,
      "kind": "course",
      "name": "Derecho Público: Provincial y Municipal",
      "code": "02333",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2304",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2304",
          "state": "passed"
        }
      }
    },
    {
      "id": "2343",
      "seqId": 13,
      "kind": "course",
      "name": "Derecho Civil y Comercial II (Obligaciones Civiles y Comerciales)",
      "code": "02343",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2342",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2342",
          "state": "passed"
        }
      }
    },
    {
      "id": "902",
      "seqId": 14,
      "kind": "course",
      "name": "Inglés Nivel II",
      "code": "00902",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "901",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "901",
          "state": "passed"
        }
      }
    },
    {
      "id": "2307",
      "seqId": 15,
      "kind": "course",
      "name": "Derecho Penal I",
      "code": "02307",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2304",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2304",
          "state": "passed"
        }
      }
    },
    {
      "id": "2318",
      "seqId": 16,
      "kind": "course",
      "name": "Derecho Administrativo I",
      "code": "02318",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2304",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2304",
          "state": "passed"
        }
      }
    },
    {
      "id": "2344",
      "seqId": 17,
      "kind": "course",
      "name": "Derecho Civil y Comercial III (Contratos Civiles y Comerciales)",
      "code": "02344",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2343",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2343",
          "state": "passed"
        }
      }
    },
    {
      "id": "912",
      "seqId": 18,
      "kind": "course",
      "name": "Computación Nivel II",
      "code": "00912",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "911",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "911",
          "state": "passed"
        }
      }
    },
    {
      "id": "2311",
      "seqId": 19,
      "kind": "course",
      "name": "Derecho Penal II",
      "code": "02311",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2307",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2307",
          "state": "passed"
        }
      }
    },
    {
      "id": "2345",
      "seqId": 20,
      "kind": "course",
      "name": "Derecho Civil y Comercial IV (Derechos Reales y Garantías)",
      "code": "02345",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2344",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2344",
          "state": "passed"
        }
      }
    },
    {
      "id": "2346",
      "seqId": 21,
      "kind": "course",
      "name": "Derecho Empresario I (Sociedades Comerciales y Concursos)",
      "code": "02346",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2344",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2344",
          "state": "passed"
        }
      }
    },
    {
      "id": "2316",
      "seqId": 22,
      "kind": "course",
      "name": "Derecho Procesal I",
      "code": "02316",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2314",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2311",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2314",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2311",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "2327",
      "seqId": 23,
      "kind": "course",
      "name": "Derecho Administrativo II",
      "code": "02327",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2318",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2318",
          "state": "passed"
        }
      }
    },
    {
      "id": "2347",
      "seqId": 24,
      "kind": "course",
      "name": "Derecho Civil y Comercial V (Derecho de Familia y Sucesiones)",
      "code": "02347",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2345",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2345",
          "state": "passed"
        }
      }
    },
    {
      "id": "903",
      "seqId": 25,
      "kind": "course",
      "name": "Inglés Nivel III",
      "code": "00903",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "902",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "902",
          "state": "passed"
        }
      }
    },
    {
      "id": "2323",
      "seqId": 26,
      "kind": "course",
      "name": "Derecho Procesal II",
      "code": "02323",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2316",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2347",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2316",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2347",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "2324",
      "seqId": 27,
      "kind": "course",
      "name": "Derecho Internacional Público",
      "code": "02324",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2314",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2314",
          "state": "passed"
        }
      }
    },
    {
      "id": "2348",
      "seqId": 28,
      "kind": "course",
      "name": "Derecho del Trabajo y la Seguridad Social",
      "code": "02348",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2344",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2344",
          "state": "passed"
        }
      }
    },
    {
      "id": "904",
      "seqId": 29,
      "kind": "course",
      "name": "Inglés Nivel IV",
      "code": "00904",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "903",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "903",
          "state": "passed"
        }
      }
    },
    {
      "id": "2312",
      "seqId": 30,
      "kind": "course",
      "name": "Finanzas y Derecho Tributario",
      "code": "02312",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2323",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2309",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2323",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2309",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "2319",
      "seqId": 31,
      "kind": "course",
      "name": "Política Económica",
      "code": "02319",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2309",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2309",
          "state": "passed"
        }
      }
    },
    {
      "id": "2338",
      "seqId": 32,
      "kind": "course",
      "name": "Taller de Retórica y Oratoria Forense",
      "code": "02338",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2309",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2309",
          "state": "passed"
        }
      }
    },
    {
      "id": "2349",
      "seqId": 33,
      "kind": "course",
      "name": "Derecho Empresario II (Títulos Valores, Concursos y Quiebras)",
      "code": "02349",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2348",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2346",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2323",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2348",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2346",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2323",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "2325",
      "seqId": 34,
      "kind": "course",
      "name": "Metodología de la Investigación Jurídica",
      "code": "02325",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2349",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2347",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2306",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2349",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2347",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2306",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "2328",
      "seqId": 35,
      "kind": "course",
      "name": "Derecho Ambiental y de los Recursos Naturales",
      "code": "02328",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2314",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2314",
          "state": "passed"
        }
      }
    },
    {
      "id": "2334",
      "seqId": 36,
      "kind": "course",
      "name": "Seminario de Resolución Adecuada de Controversias",
      "code": "02334",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2323",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2323",
          "state": "passed"
        }
      }
    },
    {
      "id": "2335",
      "seqId": 37,
      "kind": "course",
      "name": "Práctica Profesional I",
      "code": "02335",
      "type": "mandatory",
      "hours": 8,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2323",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2327",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2348",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2323",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2327",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2348",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "2329",
      "seqId": 38,
      "kind": "course",
      "name": "Derecho Internacional Privado",
      "code": "02329",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2349",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2323",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2349",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2323",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "2336",
      "seqId": 39,
      "kind": "course",
      "name": "Práctica Profesional II",
      "code": "02336",
      "type": "mandatory",
      "hours": 8,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2335",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2335",
          "state": "passed"
        }
      }
    },
    {
      "id": "2337",
      "seqId": 40,
      "kind": "course",
      "name": "Seminario de Derecho de los Consumidores",
      "code": "02337",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2346",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2327",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "2323",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2346",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2327",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2323",
              "state": "passed"
            }
          ]
        }
      }
    }
  ],
  "requirements": {
    "graduation": [
      {
        "id": "mandatory",
        "label": "Materias obligatorias",
        "expr": {
          "type": "percent",
          "selector": {
            "type": "all",
            "courseType": "mandatory"
          },
          "minPercent": 100,
          "state": "passed"
        }
      }
    ]
  }
};
