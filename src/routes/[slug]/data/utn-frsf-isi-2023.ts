import type { StudyPlanData } from '$lib/study-plan-data';

export const utnFrsfIsi2023: StudyPlanData = {
  "info": {
    "degreeName": "Ingeniería en Sistemas de Información",
    "degreeSlug": "ISI",
    "universityName": "Universidad Tecnológica Nacional",
    "universitySlug": "UTN",
    "collegeName": "Facultad Regional Santa Fe",
    "collegeSlug": "FRSF",
    "year": 2023,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios 2023",
        "url": "https://www.frsf.utn.edu.ar/images/mbeninte/SISTEMAS_Plan_de_Estudios_2023.pdf"
      },
      {
        "id": 2,
        "label": "Régimen de Correlatividades Plan 2023",
        "url": "https://www.frsf.utn.edu.ar/images/mbeninte/SISTEMAS_Correlatividades_Plan_2023.pdf"
      },
      {
        "id": 3,
        "label": "Electivas CEUT FRSF",
        "url": "https://www.ceut-frsf.com.ar/electivas"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "Para rendir **Proyecto Final**, es necesario aprobar todas las asignaturas previas del Plan de Estudios."
      },
      {
        "id": 2,
        "text": "Para iniciar y acreditar la **Práctica Profesional Supervisada**, es necesario cumplir con los requisitos para cursar **Proyecto Final**."
      },
      {
        "id": 3,
        "text": "**Práctica Profesional Supervisada** no es una materia pero fue agregada como tal porque es requisito para egresarse. Tiene una carga horaria de 6 horas semanales, obtenido de dividir las 200 horas totales exigidas entre 32 semanas (lo que dura un año académico)."
      },
      {
        "id": 4,
        "text": "Las **materias electivas** se exigen por carga horaria total (40 horas) y se distribuyen por nivel en la documentación oficial (3<sup>er</sup>, 4<sup>to</sup> y 5<sup>to</sup> año)."
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
          "term": "annual"
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
      "name": "Inglés I",
      "code": "4",
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
      "id": "5",
      "seqId": 5,
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
          "term": "firstSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "6",
      "seqId": 6,
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
      "seqId": 7,
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
      "seqId": 8,
      "kind": "course",
      "name": "Sistemas y Procesos de Negocio",
      "code": "8",
      "type": "mandatory",
      "hours": 3,
      "attributes": [
        "integrative"
      ],
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
            }
          ]
        }
      }
    },
    {
      "id": "11",
      "seqId": 11,
      "kind": "course",
      "name": "Ingeniería y Sociedad",
      "code": "11",
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
      "id": "12",
      "seqId": 12,
      "kind": "course",
      "name": "Inglés II",
      "code": "12",
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
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "4",
          "state": "taken"
        }
      }
    },
    {
      "id": "13",
      "seqId": 13,
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
          "term": "firstSemester"
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
      "seqId": 14,
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
          "term": "firstSemester"
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
      "seqId": 15,
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
          "term": "firstSemester"
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
      "seqId": 16,
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
      "seqId": 17,
      "kind": "course",
      "name": "Probabilidad y Estadística",
      "code": "17",
      "type": "mandatory",
      "hours": 3,
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
          "term": "firstSemester"
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
          "term": "firstSemester"
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
          "term": "secondSemester"
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
          "term": "firstSemester"
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
      "id": "22",
      "seqId": 22,
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
      "seqId": 23,
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
      "seqId": 24,
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
          "term": "firstSemester"
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
      "seqId": 25,
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
          "term": "secondSemester"
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
      "id": "26",
      "seqId": 26,
      "kind": "course",
      "name": "Redes de Datos",
      "code": "26",
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
          "term": "firstSemester"
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
          "term": "firstSemester"
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
      "id": "30",
      "seqId": 30,
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
      "seqId": 31,
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
          "term": "firstSemester"
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
      "id": "32",
      "seqId": 32,
      "kind": "course",
      "name": "Ciencia de Datos",
      "code": "32",
      "type": "mandatory",
      "hours": 3,
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
          "term": "firstSemester"
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
          "term": "secondSemester"
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
      "id": "101",
      "seqId": 37,
      "kind": "course",
      "name": "Química",
      "code": "101",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
      "id": "102",
      "seqId": 38,
      "kind": "course",
      "name": "Programación Competitiva I",
      "code": "102",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
          "itemId": "6",
          "state": "passed"
        }
      }
    },
    {
      "id": "103",
      "seqId": 39,
      "kind": "course",
      "name": "Sistemas de Representación",
      "code": "103",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
      "id": "104",
      "seqId": 40,
      "kind": "course",
      "name": "Bases de Datos NoSQL",
      "code": "104",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "14",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "19",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "105",
      "seqId": 41,
      "kind": "course",
      "name": "Estadística Aplicada",
      "code": "105",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "17",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "106",
      "seqId": 42,
      "kind": "course",
      "name": "Taller de Redes",
      "code": "106",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "26",
          "state": "passed"
        }
      }
    },
    {
      "id": "107",
      "seqId": 43,
      "kind": "course",
      "name": "Taller de Sistemas de Información ERP",
      "code": "107",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "23",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "26",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "33",
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
              "itemId": "33",
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
      "id": "108",
      "seqId": 44,
      "kind": "course",
      "name": "Ética Profesional",
      "code": "108",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
      "id": "109",
      "seqId": 45,
      "kind": "course",
      "name": "Desarrollo de Aplicaciones en la Nube",
      "code": "109",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "23",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "19",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "25",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "25",
          "state": "passed"
        }
      }
    },
    {
      "id": "110",
      "seqId": 46,
      "kind": "course",
      "name": "Dinámica de Sistemas",
      "code": "110",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "firstSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "111",
      "seqId": 47,
      "kind": "course",
      "name": "Innovación y Emprendedorismo",
      "code": "111",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
          "type": "item",
          "itemId": "16",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "16",
          "state": "passed"
        }
      }
    },
    {
      "id": "112",
      "seqId": 48,
      "kind": "course",
      "name": "Modelado Semántico de Datos",
      "code": "112",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "16",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "19",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "25",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "23",
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
              "itemId": "23",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "113",
      "seqId": 49,
      "kind": "course",
      "name": "Sistemas de Información Geográficos",
      "code": "113",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "23",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "19",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "30",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "33",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "30",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "33",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "114",
      "seqId": 50,
      "kind": "course",
      "name": "Administración y Finanzas",
      "code": "114",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
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
      "id": "115",
      "seqId": 51,
      "kind": "course",
      "name": "Auditoría Informática",
      "code": "115",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "17",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "30",
              "state": "passed"
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
              "itemId": "30",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "116",
      "seqId": 52,
      "kind": "course",
      "name": "Desarrollo de Aplicaciones Móviles",
      "code": "116",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "14",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "23",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "19",
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
              "itemId": "19",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "117",
      "seqId": 53,
      "kind": "course",
      "name": "Inteligencia Computacional",
      "code": "117",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "31",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "31",
          "state": "passed"
        }
      }
    },
    {
      "id": "118",
      "seqId": 54,
      "kind": "course",
      "name": "Inteligencia de Negocio: Data Warehouse y Data Mining",
      "code": "118",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
          "type": "item",
          "itemId": "33",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "33",
          "state": "passed"
        }
      }
    },
    {
      "id": "119",
      "seqId": 55,
      "kind": "course",
      "name": "Programación Competitiva II",
      "code": "119",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
          "type": "item",
          "itemId": "102",
          "state": "passed"
        }
      }
    },
    {
      "id": "120",
      "seqId": 56,
      "kind": "course",
      "name": "Programación Concurrente",
      "code": "120",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "14",
              "state": "passed"
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
      "id": "121",
      "seqId": 57,
      "kind": "course",
      "name": "Seguridad en Aplicaciones Web",
      "code": "121",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "secondSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "99",
      "seqId": 58,
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
          "term": "secondSemester"
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
