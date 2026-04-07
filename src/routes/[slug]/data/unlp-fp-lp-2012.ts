import type { StudyPlanData } from '$lib/study-plan-data';

export const unlpFpLp2012: StudyPlanData = {
  "info": {
    "degreeName": "Licenciatura en Psicología",
    "degreeSlug": "LP",
    "universityName": "Universidad Nacional de La Plata",
    "universitySlug": "UNLP",
    "collegeName": "Facultad de Psicología",
    "collegeSlug": "FP",
    "year": 2012,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios (PDF)",
        "url": "https://wp-psico-admin.psico.unlp.edu.ar/wp-content/uploads/2025/06/plan-de-estudio-Licenciatura.pdf"
      },
      {
        "id": 2,
        "label": "Plan de Estudios (web)",
        "url": "https://www.psico.unlp.edu.ar/carreras/licenciatura_en_psicolog%C3%ADa"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "**Estadística Aplicada a la Psicología (424)**: además de las correlativas, tiene como requisito haber ingresado a la carrera al menos un año antes (o con anterioridad)."
      },
      {
        "id": 2,
        "text": "**Neuroanatomía y Neurofisiología (43A)**: además de las correlativas, tiene como requisito haber ingresado a la carrera al menos dos años antes (o con anterioridad)."
      },
      {
        "id": 3,
        "text": "**Capacitación en Idioma**: el plan establece como requisito tener 12 materias con finales rendidos para cursar (pueden rendirse en calidad de libre)."
      },
      {
        "id": 4,
        "text": "**Taller de Producción Textual**: tiene como requisito contar con cursadas aprobadas de las asignaturas de 4º año."
      },
      {
        "id": 5,
        "text": "**Trabajo Integrador Final (TIF)**: tiene como requisito contar con las asignaturas de 4º año aprobadas y con el 50% de las cursadas aprobadas de 5º año (condición porcentual no representada como correlativas de materias individuales)."
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
    },
    {
      "id": "year-6",
      "label": "6to Año"
    }
  ],
  "items": [
    {
      "id": "412",
      "seqId": 1,
      "kind": "course",
      "name": "Psicología I",
      "code": "412",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "annual"
        }
      ],
      "requirements": {}
    },
    {
      "id": "414",
      "seqId": 2,
      "kind": "course",
      "name": "Antropología Cultural y Social",
      "code": "414",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "firstSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "415",
      "seqId": 3,
      "kind": "course",
      "name": "Lógica",
      "code": "415",
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
      "id": "416",
      "seqId": 4,
      "kind": "course",
      "name": "Introducción a la Filosofía",
      "code": "416",
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
      "id": "411",
      "seqId": 5,
      "kind": "course",
      "name": "Biología Humana",
      "code": "411",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "secondSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "422",
      "seqId": 6,
      "kind": "course",
      "name": "Psicología II",
      "code": "422",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "annual"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "412",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "412",
          "state": "passed"
        }
      }
    },
    {
      "id": "421",
      "seqId": 7,
      "kind": "course",
      "name": "Teoría Psicoanalítica",
      "code": "421",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "annual"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "412",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "412",
          "state": "passed"
        }
      }
    },
    {
      "id": "425",
      "seqId": 8,
      "kind": "course",
      "name": "Sociología General",
      "code": "425",
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
        "complete": {
          "type": "item",
          "itemId": "414",
          "state": "passed"
        }
      }
    },
    {
      "id": "423",
      "seqId": 9,
      "kind": "course",
      "name": "Psicología Genética",
      "code": "423",
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
          "itemId": "412",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "412",
          "state": "passed"
        }
      }
    },
    {
      "id": "424",
      "seqId": 10,
      "kind": "course",
      "name": "Estadística Aplicada a la Psicología",
      "code": "424",
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
      "requirements": {}
    },
    {
      "id": "426",
      "seqId": 11,
      "kind": "course",
      "name": "Lingüística General",
      "code": "426",
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
          "itemId": "415",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "415",
          "state": "passed"
        }
      }
    },
    {
      "id": "430",
      "seqId": 12,
      "kind": "course",
      "name": "Neuroanatomía y Neurofisiología",
      "code": "43A",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "firstSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "411",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "411",
          "state": "passed"
        }
      }
    },
    {
      "id": "434",
      "seqId": 13,
      "kind": "course",
      "name": "Epistemología y Metodología de la Investigación Psicológica",
      "code": "434",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "firstSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "412",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "415",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "422",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "421",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "415",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "422",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "421",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "433",
      "seqId": 14,
      "kind": "course",
      "name": "Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica I",
      "code": "433",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "firstSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "412",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "415",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "422",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "424",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "421",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "424",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "434",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "431",
      "seqId": 15,
      "kind": "course",
      "name": "Corrientes Actuales en Psicología",
      "code": "431",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "secondSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "412",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "415",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "422",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "426",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "422",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "426",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "432",
      "seqId": 16,
      "kind": "course",
      "name": "Psicología Evolutiva I",
      "code": "432",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "firstSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "412",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "423",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "421",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "423",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "421",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "435",
      "seqId": 17,
      "kind": "course",
      "name": "Psicología Evolutiva II",
      "code": "435",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "secondSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "412",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "432",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "432",
          "state": "passed"
        }
      }
    },
    {
      "id": "436",
      "seqId": 18,
      "kind": "course",
      "name": "Psicología Social",
      "code": "436",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "secondSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "412",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "414",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "415",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "422",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "425",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "421",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "425",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "434",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "441",
      "seqId": 19,
      "kind": "course",
      "name": "Psicopatología I",
      "code": "441",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "annual"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "411",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "423",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "421",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "430",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "435",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "430",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "435",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "444",
      "seqId": 20,
      "kind": "course",
      "name": "Psicología Institucional",
      "code": "444",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "firstSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "415",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "422",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "425",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "424",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "434",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "436",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "434",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "436",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "445",
      "seqId": 21,
      "kind": "course",
      "name": "Seminario de Psicología Experimental",
      "code": "445",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "firstSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "415",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "422",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "424",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "421",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "434",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "433",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "434",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "433",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "443",
      "seqId": 22,
      "kind": "course",
      "name": "Psicopatología II",
      "code": "443",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "secondSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "411",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "423",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "421",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "430",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "432",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "435",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "441",
          "state": "passed"
        }
      }
    },
    {
      "id": "442",
      "seqId": 23,
      "kind": "course",
      "name": "Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II",
      "code": "442",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "secondSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "415",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "422",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "424",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "421",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "434",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "433",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "434",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "433",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "490",
      "seqId": 24,
      "kind": "course",
      "name": "Capacitación en Idioma",
      "type": "mandatory",
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "firstSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "451",
      "seqId": 25,
      "kind": "course",
      "name": "Psicodiagnóstico",
      "code": "451",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "annual"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "430",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "435",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "433",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "441",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "443",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "442",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "443",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "442",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "452",
      "seqId": 26,
      "kind": "course",
      "name": "Psicología Educacional",
      "code": "452",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "firstSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "430",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "435",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "433",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "436",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "441",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "443",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "442",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "444",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "442",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "444",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "453",
      "seqId": 27,
      "kind": "course",
      "name": "Psicoterapia I",
      "code": "453",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "firstSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "430",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "435",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "441",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "443",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "443",
          "state": "passed"
        }
      }
    },
    {
      "id": "454",
      "seqId": 28,
      "kind": "course",
      "name": "Psicoterapia II",
      "code": "454",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "secondSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "430",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "435",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "436",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "441",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "443",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "444",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "443",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "444",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "455",
      "seqId": 29,
      "kind": "course",
      "name": "Psicología Preventiva",
      "code": "455",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "secondSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "430",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "435",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "436",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "441",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "443",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "444",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "444",
          "state": "passed"
        }
      }
    },
    {
      "id": "456",
      "seqId": 30,
      "kind": "course",
      "name": "Taller de Producción Textual",
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
              "itemId": "441",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "444",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "445",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "443",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "442",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "461",
      "seqId": 31,
      "kind": "course",
      "name": "Psicología Clínica de Niños y Adolescentes",
      "code": "461",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-6"
      ],
      "placements": [
        {
          "sectionId": "year-6",
          "term": "annual"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "443",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "442",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "444",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "451",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "453",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "454",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "451",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "453",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "454",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "462",
      "seqId": 32,
      "kind": "course",
      "name": "Psicología Clínica de Adultos y Gerontes",
      "code": "462",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-6"
      ],
      "placements": [
        {
          "sectionId": "year-6",
          "term": "annual"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "441",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "442",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "444",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "451",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "453",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "454",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "451",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "453",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "454",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "465",
      "seqId": 33,
      "kind": "course",
      "name": "Orientación Vocacional",
      "code": "465",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-6"
      ],
      "placements": [
        {
          "sectionId": "year-6",
          "term": "firstSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "443",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "442",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "444",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "451",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "455",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "451",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "455",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "463",
      "seqId": 34,
      "kind": "course",
      "name": "Psicología Laboral",
      "code": "463",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-6"
      ],
      "placements": [
        {
          "sectionId": "year-6",
          "term": "secondSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "441",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "442",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "444",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "451",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "455",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "451",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "455",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "464",
      "seqId": 35,
      "kind": "course",
      "name": "Psicología Forense",
      "code": "464",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-6"
      ],
      "placements": [
        {
          "sectionId": "year-6",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "443",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "442",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "444",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "451",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "455",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "451",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "455",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "510",
      "seqId": 36,
      "kind": "course",
      "name": "Trabajo Integrador Final (TIF)",
      "type": "mandatory",
      "hours": 6,
      "tags": [
        "year-6"
      ],
      "placements": [
        {
          "sectionId": "year-6",
          "term": "annual"
        }
      ],
      "requirements": {}
    }
  ],
  "requirements": {
    "graduation": [
      {
        "id": "mandatory",
        "label": "Materias obligatorias",
        "type": "allMandatory"
      }
    ]
  }
};
