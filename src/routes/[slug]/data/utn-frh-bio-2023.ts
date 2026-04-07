import type { StudyPlanData } from '$lib/study-plan-data';

export const utnFrhBio2023: StudyPlanData = {
  "info": {
    "degreeName": "Bioingeniería",
    "degreeSlug": "Bio",
    "universityName": "Universidad Tecnológica Nacional",
    "universitySlug": "UTN",
    "collegeName": "Facultad Regional Haedo",
    "collegeSlug": "FRH",
    "year": 2023,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios",
        "url": "https://frh.utn.edu.ar/carreras/bioingenieria/plan-de-estudios-bioingenieria/"
      },
      {
        "id": 2,
        "label": "Ordenanza N° 1944 - Plan de Estudios",
        "url": "https://frh.utn.edu.ar/external/BIO/Plan2023_Ord1944.pdf"
      },
      {
        "id": 3,
        "label": "Ordenanza N° 1945 - Correlatividades",
        "url": "https://frh.utn.edu.ar/external/BIO/Correlatividades_Ord1945.pdf"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "Para rendir **Proyecto Final**, es necesario aprobar todas las asignaturas previas del Plan de Estudios."
      },
      {
        "id": 2,
        "text": "Para iniciar y acreditar la **Práctica Profesional Supervisada**, es necesario cumplir con los requisitos académicos exigidos para la inscripción a **Proyecto Final**."
      },
      {
        "id": 3,
        "text": "**Práctica Profesional Supervisada** no es una materia pero fue agregada como tal porque es requisito para egresarse. Tiene una carga horaria de 5 horas semanales, obtenido de dividir las 150 horas totales exigidas entre 32 semanas (lo que dura un año académico)."
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
      "name": "Ingeniería y Sociedad",
      "code": "1",
      "type": "mandatory",
      "hours": 2,
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
      "id": "2",
      "seqId": 2,
      "kind": "course",
      "name": "Análisis Matemático I",
      "code": "2",
      "type": "mandatory",
      "hours": 5,
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
      "id": "3",
      "seqId": 3,
      "kind": "course",
      "name": "Física I",
      "code": "3",
      "type": "mandatory",
      "hours": 5,
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
      "name": "Álgebra y Geometría Analítica",
      "code": "4",
      "type": "mandatory",
      "hours": 5,
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
      "name": "Sistemas de Representación",
      "code": "5",
      "type": "mandatory",
      "hours": 3,
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
      "id": "6",
      "seqId": 6,
      "kind": "course",
      "name": "Programación I",
      "code": "6",
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
      "id": "7",
      "seqId": 7,
      "kind": "course",
      "name": "Análisis Matemático II",
      "code": "7",
      "type": "mandatory",
      "hours": 5,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "annual"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "2",
          "state": "taken"
        }
      }
    },
    {
      "id": "8",
      "seqId": 8,
      "kind": "course",
      "name": "Análisis de Señales y Sistemas",
      "code": "8",
      "type": "mandatory",
      "hours": 5,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "annual"
        }
      ],
      "requirements": {}
    },
    {
      "id": "9",
      "seqId": 9,
      "kind": "course",
      "name": "Física II",
      "code": "9",
      "type": "mandatory",
      "hours": 5,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "annual"
        }
      ],
      "requirements": {}
    },
    {
      "id": "10",
      "seqId": 10,
      "kind": "course",
      "name": "Programación II",
      "code": "10",
      "type": "mandatory",
      "hours": 5,
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
          "itemId": "6",
          "state": "taken"
        }
      }
    },
    {
      "id": "11",
      "seqId": 11,
      "kind": "course",
      "name": "Redes y Electrotecnia",
      "code": "11",
      "type": "mandatory",
      "hours": 5,
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
          "itemId": "3",
          "state": "taken"
        }
      }
    },
    {
      "id": "12",
      "seqId": 12,
      "kind": "course",
      "name": "Física III",
      "code": "12",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "9",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "13",
      "seqId": 13,
      "kind": "course",
      "name": "Química General",
      "code": "13",
      "type": "mandatory",
      "hours": 5,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "annual"
        }
      ],
      "requirements": {}
    },
    {
      "id": "14",
      "seqId": 14,
      "kind": "course",
      "name": "Inglés I",
      "code": "14",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "annual"
        }
      ],
      "requirements": {}
    },
    {
      "id": "15",
      "seqId": 15,
      "kind": "course",
      "name": "Biología",
      "code": "15",
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
      "requirements": {}
    },
    {
      "id": "16",
      "seqId": 16,
      "kind": "course",
      "name": "Técnicas Digitales I",
      "code": "16",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "4",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "17",
      "seqId": 17,
      "kind": "course",
      "name": "Electrónica Aplicada",
      "code": "17",
      "type": "mandatory",
      "hours": 5,
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "9",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "11",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "18",
      "seqId": 18,
      "kind": "course",
      "name": "Probabilidad y Estadística",
      "code": "18",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "4",
          "state": "taken"
        }
      }
    },
    {
      "id": "19",
      "seqId": 19,
      "kind": "course",
      "name": "Química Biológica",
      "code": "19",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "13",
          "state": "taken"
        }
      }
    },
    {
      "id": "20",
      "seqId": 20,
      "kind": "course",
      "name": "Legislación",
      "code": "20",
      "type": "mandatory",
      "hours": 2,
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
          "itemId": "1",
          "state": "taken"
        }
      }
    },
    {
      "id": "21",
      "seqId": 21,
      "kind": "course",
      "name": "Anatomía",
      "code": "21",
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
          "itemId": "15",
          "state": "taken"
        }
      }
    },
    {
      "id": "22",
      "seqId": 22,
      "kind": "course",
      "name": "Gestión de Calidad, Higiene y Seguridad",
      "code": "22",
      "type": "mandatory",
      "hours": 3,
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "9",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "23",
      "seqId": 23,
      "kind": "course",
      "name": "Inglés II",
      "code": "23",
      "type": "mandatory",
      "hours": 2,
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
          "itemId": "14",
          "state": "taken"
        }
      }
    },
    {
      "id": "24",
      "seqId": 24,
      "kind": "course",
      "name": "Taller de Práctica Profesional I",
      "code": "24",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "annual"
        }
      ],
      "requirements": {}
    },
    {
      "id": "25",
      "seqId": 25,
      "kind": "course",
      "name": "Técnicas Digitales II",
      "code": "25",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "10",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
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
      "id": "26",
      "seqId": 26,
      "kind": "course",
      "name": "Sistemas de Control Básicos",
      "code": "26",
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
              "itemId": "8",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "17",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "27",
      "seqId": 27,
      "kind": "course",
      "name": "Fisiología Humana",
      "code": "27",
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
              "itemId": "21",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "28",
      "seqId": 28,
      "kind": "course",
      "name": "Transductores y Sensores",
      "code": "28",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "3",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "9",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "29",
      "seqId": 29,
      "kind": "course",
      "name": "Biomateriales",
      "code": "29",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "19",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
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
      "name": "Fisiopatología",
      "code": "30",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "27",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "15",
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
      "name": "Economía",
      "code": "31",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "16",
          "state": "taken"
        }
      }
    },
    {
      "id": "32",
      "seqId": 32,
      "kind": "course",
      "name": "Taller de Práctica Profesional II",
      "code": "32",
      "type": "mandatory",
      "hours": 2,
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
          "itemId": "24",
          "state": "taken"
        }
      }
    },
    {
      "id": "33",
      "seqId": 33,
      "kind": "course",
      "name": "Electivas",
      "code": "33",
      "type": "mandatory",
      "hours": 7,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "annual"
        }
      ],
      "requirements": {}
    },
    {
      "id": "34",
      "seqId": 34,
      "kind": "course",
      "name": "Bioinstrumentación",
      "code": "34",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "25",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "27",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "17",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "35",
      "seqId": 35,
      "kind": "course",
      "name": "Biomecánica",
      "code": "35",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "29",
          "state": "taken"
        }
      }
    },
    {
      "id": "36",
      "seqId": 36,
      "kind": "course",
      "name": "Sistema de Gestión por Imágenes",
      "code": "36",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "27",
              "state": "taken"
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
      "id": "37",
      "seqId": 37,
      "kind": "course",
      "name": "Medicina Nuclear",
      "code": "37",
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
          "itemId": "12",
          "state": "taken"
        }
      }
    },
    {
      "id": "38",
      "seqId": 38,
      "kind": "course",
      "name": "Ingeniería Hospitalaria",
      "code": "38",
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
          "itemId": "22",
          "state": "taken"
        }
      }
    },
    {
      "id": "39",
      "seqId": 39,
      "kind": "course",
      "name": "Organización Industrial",
      "code": "39",
      "type": "mandatory",
      "hours": 2,
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
              "itemId": "31",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "25",
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
      "name": "Ingeniería en Rehabilitación",
      "code": "40",
      "type": "mandatory",
      "hours": 3,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "annual"
        }
      ],
      "requirements": {}
    },
    {
      "id": "41",
      "seqId": 41,
      "kind": "course",
      "name": "Proyecto Final",
      "code": "41",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "32",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "25",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "28",
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
      "id": "99",
      "seqId": 42,
      "kind": "course",
      "name": "Práctica Profesional Supervisada",
      "code": "99",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "32",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "25",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "28",
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
