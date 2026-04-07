import type { StudyPlanData } from '$lib/study-plan-data';

export const udeFdcsAb: StudyPlanData = {
  "info": {
    "degreeName": "Abogacía",
    "degreeSlug": "Ab",
    "universityName": "Universidad del Este",
    "universitySlug": "UDE",
    "collegeName": "Facultad de Derecho y Ciencias Sociales",
    "collegeSlug": "FDCS",
    "sources": [
      {
        "id": 1,
        "label": "Resolución Ministerial N° 663/09",
        "url": "https://www.ude.edu.ar/wp-content/uploads/2022/03/Resoluci%C3%B3n-N%C2%B0663-09.pdf"
      },
      {
        "id": 2,
        "label": "Plan de Estudios",
        "url": "https://www.ude.edu.ar/wp-content/uploads/2024/10/Abogacia-Plan-de-estudio.pdf"
      },
      {
        "id": 3,
        "label": "Página de la carrera",
        "url": "https://www.ude.edu.ar/facultades/abogacia/"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "Para obtener el título de Abogado/a, los/as estudiantes deberán acreditar el conocimiento de un (1) idioma extranjero: inglés, en dos (2) niveles, establecidos en su respectivo plan de estudios."
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
      "id": "1",
      "seqId": 1,
      "kind": "course",
      "name": "Introducción al Derecho",
      "type": "mandatory",
      "hours": 4,
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
      "id": "2",
      "seqId": 2,
      "kind": "course",
      "name": "Sociología",
      "type": "mandatory",
      "hours": 4,
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
      "id": "3",
      "seqId": 3,
      "kind": "course",
      "name": "Instituciones de Derecho Civil",
      "type": "mandatory",
      "hours": 4,
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
      "id": "4",
      "seqId": 4,
      "kind": "course",
      "name": "Derecho Penal I",
      "type": "mandatory",
      "hours": 4,
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
      "id": "5",
      "seqId": 5,
      "kind": "course",
      "name": "Historia Constitucional",
      "type": "mandatory",
      "hours": 4,
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
      "id": "6",
      "seqId": 6,
      "kind": "course",
      "name": "Derecho Romano",
      "type": "mandatory",
      "hours": 4,
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
      "id": "7",
      "seqId": 7,
      "kind": "course",
      "name": "Derecho Político",
      "type": "mandatory",
      "hours": 4,
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
      "id": "8",
      "seqId": 8,
      "kind": "course",
      "name": "Derecho Constitucional I",
      "type": "mandatory",
      "hours": 4,
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
      "id": "9",
      "seqId": 9,
      "kind": "course",
      "name": "Obligaciones Civiles y Comerciales",
      "type": "mandatory",
      "hours": 4,
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "10",
      "seqId": 10,
      "kind": "course",
      "name": "Derecho Penal II",
      "type": "mandatory",
      "hours": 4,
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
          "itemId": "4",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "4",
          "state": "passed"
        }
      }
    },
    {
      "id": "11",
      "seqId": 11,
      "kind": "course",
      "name": "Derecho Internacional Público",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "firstSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "1",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1",
          "state": "passed"
        }
      }
    },
    {
      "id": "12",
      "seqId": 12,
      "kind": "course",
      "name": "Derecho Constitucional II",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "firstSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "8",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "8",
          "state": "passed"
        }
      }
    },
    {
      "id": "13",
      "seqId": 13,
      "kind": "course",
      "name": "Optativa I",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "firstSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "14",
      "seqId": 14,
      "kind": "course",
      "name": "Derecho Público Provincial y Municipal",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "secondSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "12",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "12",
          "state": "passed"
        }
      }
    },
    {
      "id": "15",
      "seqId": 15,
      "kind": "course",
      "name": "Economía Política",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "secondSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "16",
      "seqId": 16,
      "kind": "course",
      "name": "Optativa II",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "secondSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "17",
      "seqId": 17,
      "kind": "course",
      "name": "Contratos Civiles y Comerciales",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "annual"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "9",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "9",
          "state": "passed"
        }
      }
    },
    {
      "id": "18",
      "seqId": 18,
      "kind": "course",
      "name": "Derecho Financiero",
      "type": "mandatory",
      "hours": 4,
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
              "itemId": "15",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "19",
      "seqId": 19,
      "kind": "course",
      "name": "Derecho Procesal I",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "10",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "10",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "20",
      "seqId": 20,
      "kind": "course",
      "name": "Derecho Laboral",
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
          "itemId": "12",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "12",
          "state": "passed"
        }
      }
    },
    {
      "id": "21",
      "seqId": 21,
      "kind": "course",
      "name": "Optativa III",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "firstSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "22",
      "seqId": 22,
      "kind": "course",
      "name": "Derecho Tributario",
      "type": "mandatory",
      "hours": 4,
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
          "type": "item",
          "itemId": "18",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "18",
          "state": "passed"
        }
      }
    },
    {
      "id": "23",
      "seqId": 23,
      "kind": "course",
      "name": "Sociedades Comerciales",
      "type": "mandatory",
      "hours": 4,
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
          "type": "item",
          "itemId": "17",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "17",
          "state": "passed"
        }
      }
    },
    {
      "id": "24",
      "seqId": 24,
      "kind": "course",
      "name": "Práctica Profesional I",
      "type": "mandatory",
      "hours": 4,
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
          "type": "item",
          "itemId": "19",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "19",
          "state": "passed"
        }
      }
    },
    {
      "id": "25",
      "seqId": 25,
      "kind": "course",
      "name": "Optativa IV",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "secondSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "26",
      "seqId": 26,
      "kind": "course",
      "name": "Filosofía del Derecho",
      "type": "mandatory",
      "hours": 4,
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
              "itemId": "23",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "10",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "23",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "10",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "27",
      "seqId": 27,
      "kind": "course",
      "name": "Derechos Reales",
      "type": "mandatory",
      "hours": 4,
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
          "type": "item",
          "itemId": "17",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "17",
          "state": "passed"
        }
      }
    },
    {
      "id": "28",
      "seqId": 28,
      "kind": "course",
      "name": "Concursos y Quiebras",
      "type": "mandatory",
      "hours": 4,
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
          "type": "item",
          "itemId": "23",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "23",
          "state": "passed"
        }
      }
    },
    {
      "id": "29",
      "seqId": 29,
      "kind": "course",
      "name": "Derecho Procesal II",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "19",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "28",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "19",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "28",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "30",
      "seqId": 30,
      "kind": "course",
      "name": "Derecho Administrativo I",
      "type": "mandatory",
      "hours": 4,
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
              "itemId": "17",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "17",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "31",
      "seqId": 31,
      "kind": "course",
      "name": "Derecho Ambiental",
      "type": "mandatory",
      "hours": 4,
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
          "type": "item",
          "itemId": "27",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "27",
          "state": "passed"
        }
      }
    },
    {
      "id": "32",
      "seqId": 32,
      "kind": "course",
      "name": "Mediación y Resolución de Conflictos",
      "type": "mandatory",
      "hours": 4,
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
          "type": "item",
          "itemId": "29",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "29",
          "state": "passed"
        }
      }
    },
    {
      "id": "33",
      "seqId": 33,
      "kind": "course",
      "name": "Ética",
      "type": "mandatory",
      "hours": 4,
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
          "type": "item",
          "itemId": "26",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "26",
          "state": "passed"
        }
      }
    },
    {
      "id": "34",
      "seqId": 34,
      "kind": "course",
      "name": "Derecho de Familia",
      "type": "mandatory",
      "hours": 4,
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
          "type": "item",
          "itemId": "27",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "27",
          "state": "passed"
        }
      }
    },
    {
      "id": "35",
      "seqId": 35,
      "kind": "course",
      "name": "Derecho de Navegación",
      "type": "mandatory",
      "hours": 4,
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
          "type": "item",
          "itemId": "28",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "28",
          "state": "passed"
        }
      }
    },
    {
      "id": "36",
      "seqId": 36,
      "kind": "course",
      "name": "Derecho de Minería y Energía",
      "type": "mandatory",
      "hours": 4,
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
              "itemId": "27",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "30",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "27",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "30",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "37",
      "seqId": 37,
      "kind": "course",
      "name": "Defensa del Consumidor",
      "type": "mandatory",
      "hours": 4,
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
          "type": "item",
          "itemId": "30",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "30",
          "state": "passed"
        }
      }
    },
    {
      "id": "38",
      "seqId": 38,
      "kind": "course",
      "name": "Derecho Administrativo II",
      "type": "mandatory",
      "hours": 4,
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
          "type": "item",
          "itemId": "30",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "30",
          "state": "passed"
        }
      }
    },
    {
      "id": "39",
      "seqId": 39,
      "kind": "course",
      "name": "Derecho Notarial y Registral",
      "type": "mandatory",
      "hours": 4,
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
              "itemId": "34",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "34",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "40",
      "seqId": 40,
      "kind": "course",
      "name": "Derecho Internacional Privado",
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
              "itemId": "35",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "34",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "35",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "34",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "41",
      "seqId": 41,
      "kind": "course",
      "name": "Práctica Profesional II",
      "type": "mandatory",
      "hours": 4,
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
              "itemId": "24",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "24",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "29",
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
        "type": "allMandatory"
      }
    ]
  }
};
