import type { StudyPlanData } from '$lib/study-plan-data';

export const utnFrbaIsi2023: StudyPlanData = {
  "info": {
    "degreeName": "Ingeniería en Sistemas de Información",
    "degreeSlug": "ISI",
    "universityName": "Universidad Tecnológica Nacional",
    "universitySlug": "UTN",
    "collegeName": "Facultad Regional Buenos Aires",
    "collegeSlug": "FRBA",
    "year": 2023,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios 2023",
        "url": "https://frba.utn.edu.ar/sistemas/plan-de-estudios-2023/"
      },
      {
        "id": 2,
        "label": "Ordenanza N° 1877",
        "url": "https://frba.utn.edu.ar/wp-content/uploads/2022/12/Ordenanza-1877-Plan-ISI2023.pdf"
      },
      {
        "id": 3,
        "label": "Correlatividades",
        "url": "https://frba.utn.edu.ar/wp-content/uploads/2023/11/Correlativas-plan-2023.pdf"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "Para rendir **Proyecto Final**, es necesario aprobar todas las asignaturas del Plan de Estudios."
      },
      {
        "id": 2,
        "text": "Para iniciar y acreditar la **Práctica Profesional Supervisada**, es necesario cumplir con los requisitos para cursar **Proyecto Final**."
      },
      {
        "id": 3,
        "text": "**Práctica Profesional Supervisada** no es una materia pero fue agregada como tal porque es requisito para egresarse. Tiene una carga horaria de 6 horas semanales, obtenido de dividir las 200 horas totales exigidas entre ~32 semanas."
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
      "id": "electivas",
      "label": "Materias Electivas"
    }
  ],
  "items": [
    {
      "id": "1",
      "seqId": 1,
      "kind": "course",
      "name": "Análisis Matemático I",
      "code": "1",
      "type": "mandatory",
      "hours": 5,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "annualOrSemestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "2",
      "seqId": 2,
      "kind": "course",
      "name": "Álgebra y Geometría Analítica",
      "code": "2",
      "type": "mandatory",
      "hours": 5,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "annualOrSemestral"
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
          "term": "annualOrSemestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "5",
      "seqId": 4,
      "kind": "course",
      "name": "Lógica y Estructuras Discretas",
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
      "seqId": 5,
      "kind": "course",
      "name": "Algoritmos y Estructuras de Datos",
      "code": "6",
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
      "id": "7",
      "seqId": 6,
      "kind": "course",
      "name": "Arquitectura de Computadoras",
      "code": "7",
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
      "id": "8",
      "seqId": 7,
      "kind": "course",
      "name": "Sistemas y Procesos de Negocio",
      "code": "8",
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
      "id": "11",
      "seqId": 8,
      "kind": "course",
      "name": "Ingeniería y Sociedad",
      "code": "11",
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
      "id": "9",
      "seqId": 9,
      "kind": "course",
      "name": "Análisis Matemático II",
      "code": "9",
      "type": "mandatory",
      "hours": 5,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "annualOrSemestral"
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
              "itemId": "2",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "10",
      "seqId": 10,
      "kind": "course",
      "name": "Física II",
      "code": "10",
      "type": "mandatory",
      "hours": 5,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "annualOrSemestral"
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
            }
          ]
        }
      }
    },
    {
      "id": "4",
      "seqId": 11,
      "kind": "course",
      "name": "Inglés I",
      "code": "4",
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
      "requirements": {}
    },
    {
      "id": "13",
      "seqId": 12,
      "kind": "course",
      "name": "Sintaxis y Semántica de los Lenguajes",
      "code": "13",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "5",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "14",
      "seqId": 13,
      "kind": "course",
      "name": "Paradigmas de Programación",
      "code": "14",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "5",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "15",
      "seqId": 14,
      "kind": "course",
      "name": "Sistemas Operativos",
      "code": "15",
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
          "itemId": "7",
          "state": "taken"
        }
      }
    },
    {
      "id": "16",
      "seqId": 15,
      "kind": "course",
      "name": "Análisis de Sistemas de Información",
      "code": "16",
      "type": "mandatory",
      "hours": 6,
      "attributes": [
        "integrative"
      ],
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "17",
      "seqId": 16,
      "kind": "course",
      "name": "Probabilidad y Estadística",
      "code": "17",
      "type": "mandatory",
      "hours": 3,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "annualOrSemestral"
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
              "itemId": "2",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "12",
      "seqId": 17,
      "kind": "course",
      "name": "Inglés II",
      "code": "12",
      "type": "mandatory",
      "hours": 2,
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
          "itemId": "4",
          "state": "taken"
        }
      }
    },
    {
      "id": "18",
      "seqId": 18,
      "kind": "course",
      "name": "Economía",
      "code": "18",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "1",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2",
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
      "name": "Bases de Datos",
      "code": "19",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "5",
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
      "id": "20",
      "seqId": 20,
      "kind": "course",
      "name": "Desarrollo de Software",
      "code": "20",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "5",
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
      "id": "21",
      "seqId": 21,
      "kind": "course",
      "name": "Comunicación de Datos",
      "code": "21",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3",
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
      "id": "26",
      "seqId": 22,
      "kind": "course",
      "name": "Redes de Datos",
      "code": "26",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "15",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "22",
      "seqId": 23,
      "kind": "course",
      "name": "Análisis Numérico",
      "code": "22",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "9",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "2",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "23",
      "seqId": 24,
      "kind": "course",
      "name": "Diseño de Sistemas de Información",
      "code": "23",
      "type": "mandatory",
      "hours": 6,
      "attributes": [
        "integrative"
      ],
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
              "itemId": "14",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "4",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "24",
      "seqId": 25,
      "kind": "course",
      "name": "Legislación",
      "code": "24",
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
          "itemId": "11",
          "state": "taken"
        }
      }
    },
    {
      "id": "25",
      "seqId": 26,
      "kind": "course",
      "name": "Ingeniería y Calidad de Software",
      "code": "25",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "19",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "23",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "14",
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
      "name": "Investigación Operativa",
      "code": "27",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "17",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "22",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "28",
      "seqId": 28,
      "kind": "course",
      "name": "Simulación",
      "code": "28",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "17",
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
      "id": "29",
      "seqId": 29,
      "kind": "course",
      "name": "Tecnologías para la Automatización",
      "code": "29",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "10",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "22",
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
      "id": "32",
      "seqId": 30,
      "kind": "course",
      "name": "Ciencia de Datos",
      "code": "32",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "17",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "19",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "30",
      "seqId": 31,
      "kind": "course",
      "name": "Administración de Sistemas de Información",
      "code": "30",
      "type": "mandatory",
      "hours": 6,
      "attributes": [
        "integrative"
      ],
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
              "itemId": "18",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "23",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "16",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "31",
      "seqId": 32,
      "kind": "course",
      "name": "Inteligencia Artificial",
      "code": "31",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "17",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "22",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "33",
      "seqId": 33,
      "kind": "course",
      "name": "Sistemas de Gestión",
      "code": "33",
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
              "itemId": "18",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "27",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "23",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "34",
      "seqId": 34,
      "kind": "course",
      "name": "Gestión Gerencial",
      "code": "34",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "24",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "30",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
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
      "name": "Seguridad en los Sistemas de Información",
      "code": "35",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "26",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "30",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "36",
      "seqId": 36,
      "kind": "course",
      "name": "Proyecto Final",
      "code": "36",
      "type": "mandatory",
      "hours": 6,
      "attributes": [
        "integrative"
      ],
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
              "itemId": "25",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "26",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "30",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "23",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "99",
      "seqId": 37,
      "kind": "course",
      "name": "Práctica Profesional Supervisada",
      "code": "99",
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
              "itemId": "25",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "26",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "30",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "23",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "100",
      "seqId": 38,
      "kind": "course",
      "name": "Administración Estratégica del Capital Humano",
      "code": "E1",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "101",
      "seqId": 39,
      "kind": "course",
      "name": "Ciberseguridad",
      "code": "E2",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "102",
      "seqId": 40,
      "kind": "course",
      "name": "Comunicación Gráfica y Visual",
      "code": "E3",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "103",
      "seqId": 41,
      "kind": "course",
      "name": "Creatividad e Innovación",
      "code": "E4",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "104",
      "seqId": 42,
      "kind": "course",
      "name": "Criptografía",
      "code": "E5",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "105",
      "seqId": 43,
      "kind": "course",
      "name": "Experiencia de Usuario y Accesibilidad",
      "code": "E6",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "106",
      "seqId": 44,
      "kind": "course",
      "name": "Gerenciamiento de Proyectos de Sistemas de Información",
      "code": "E7",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "107",
      "seqId": 45,
      "kind": "course",
      "name": "Gestión del Talento Humano",
      "code": "E8",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "108",
      "seqId": 46,
      "kind": "course",
      "name": "Ingeniería de Requisitos",
      "code": "E9",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "109",
      "seqId": 47,
      "kind": "course",
      "name": "Metodología de Investigación Científico-Tecnológica",
      "code": "E10",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "110",
      "seqId": 48,
      "kind": "course",
      "name": "Metodología de la Conducción de Equipos de Trabajo",
      "code": "E11",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "111",
      "seqId": 49,
      "kind": "course",
      "name": "Patrones Algorítmicos",
      "code": "E12",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "112",
      "seqId": 50,
      "kind": "course",
      "name": "Procesamiento del Lenguaje Natural",
      "code": "E13",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "113",
      "seqId": 51,
      "kind": "course",
      "name": "Química Ambiental",
      "code": "E14",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "114",
      "seqId": 52,
      "kind": "course",
      "name": "Técnicas Avanzadas de Programación",
      "code": "E15",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "115",
      "seqId": 53,
      "kind": "course",
      "name": "Técnicas de Gráficos por Computadora",
      "code": "E16",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "116",
      "seqId": 54,
      "kind": "course",
      "name": "Tecnologías Avanzadas en la Construcción de Software",
      "code": "E17",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "117",
      "seqId": 55,
      "kind": "course",
      "name": "Tendencias y Escenarios Tecnológicos",
      "code": "E18",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "118",
      "seqId": 56,
      "kind": "course",
      "name": "Transformación Digital",
      "code": "E19",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
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
      },
      {
        "id": "elective-hours",
        "label": "Horas electivas requeridas",
        "expr": {
          "type": "sum",
          "selector": {
            "type": "tag",
            "tag": "progress-elective"
          },
          "metric": "hours",
          "min": 40,
          "state": "passed"
        },
        "weight": 10
      }
    ]
  }
};
