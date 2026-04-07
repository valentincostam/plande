import type { StudyPlanData } from '$lib/study-plan-data';

export const uaiFceCp2022: StudyPlanData = {
  "info": {
    "degreeName": "Contador Público",
    "degreeSlug": "CP",
    "universityName": "Universidad Abierta Interamericana",
    "universitySlug": "UAI",
    "collegeName": "Facultad de Ciencias Económicas",
    "collegeSlug": "FCE",
    "year": 2022,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios",
        "url": "https://uai.edu.ar/facultades/ciencias-económicas/contador-público/plandeestudios/"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "La carga horaria semanal de las materias es obtenida dividiendo la carga horaria total de la materia entre las 16 semanas que dura un cuatrimestre."
      },
      {
        "id": 2,
        "text": "Se omiten requisitos redundantes. Por ejemplo, **Administración I** de 1<sup>er</sup> año no se exige para cursar **Práctica Profesional Supervisada** de 5<sup>to</sup> año porque ya es requisito para cursar **Administración II** de 1<sup>er</sup> año, que también es necesaria para cursar **Práctica Profesional Supervisada**."
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
      "name": "Administración I",
      "code": "01",
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
      "name": "Comercialización",
      "code": "02",
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
      "name": "Contabilidad I",
      "code": "03",
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
      "id": "4",
      "seqId": 4,
      "kind": "course",
      "name": "Historia Social y Económica",
      "code": "04",
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
      "id": "5",
      "seqId": 5,
      "kind": "course",
      "name": "Inglés I",
      "code": "05",
      "type": "mandatory",
      "hours": 2,
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
      "name": "Comercio Internacional",
      "code": "06",
      "type": "mandatory",
      "hours": 3,
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
      "name": "Principios de Economía",
      "code": "07",
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
      "name": "Matemática I",
      "code": "08",
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
      "name": "Administración II",
      "code": "09",
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
      "id": "10",
      "seqId": 10,
      "kind": "course",
      "name": "Informática",
      "code": "10",
      "type": "mandatory",
      "hours": 3,
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
      "id": "11",
      "seqId": 11,
      "kind": "course",
      "name": "Inglés II",
      "code": "11",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "secondSemester"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "5",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "5",
          "state": "passed"
        }
      }
    },
    {
      "id": "12",
      "seqId": 12,
      "kind": "course",
      "name": "Matemática II",
      "code": "12",
      "type": "mandatory",
      "hours": 5,
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
      "name": "Microeconomía",
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
          "type": "item",
          "itemId": "7",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "7",
          "state": "passed"
        }
      }
    },
    {
      "id": "14",
      "seqId": 14,
      "kind": "course",
      "name": "Contabilidad II",
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
          "type": "item",
          "itemId": "3",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3",
          "state": "passed"
        }
      }
    },
    {
      "id": "15",
      "seqId": 15,
      "kind": "course",
      "name": "Teoría de las Organizaciones",
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
      "id": "16",
      "seqId": 16,
      "kind": "course",
      "name": "Derecho Constitucional y Administrativo",
      "code": "16",
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
      "id": "17",
      "seqId": 17,
      "kind": "course",
      "name": "Psicología Aplicada",
      "code": "17",
      "type": "mandatory",
      "hours": 3,
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
      "id": "18",
      "seqId": 18,
      "kind": "course",
      "name": "Sistemas de Información",
      "code": "18",
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
          "itemId": "15",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "15",
          "state": "passed"
        }
      }
    },
    {
      "id": "19",
      "seqId": 19,
      "kind": "course",
      "name": "Macroeconomía",
      "code": "19",
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
          "itemId": "7",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "7",
          "state": "passed"
        }
      }
    },
    {
      "id": "20",
      "seqId": 20,
      "kind": "course",
      "name": "Informática Aplicada",
      "code": "20",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "10",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "10",
          "state": "passed"
        }
      }
    },
    {
      "id": "21",
      "seqId": 21,
      "kind": "course",
      "name": "Problemática del Mundo Actual",
      "code": "21",
      "type": "mandatory",
      "hours": 3,
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
      "id": "22",
      "seqId": 22,
      "kind": "course",
      "name": "Matemática Financiera",
      "code": "22",
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
      "id": "23",
      "seqId": 23,
      "kind": "course",
      "name": "Derecho Civil y Comercial",
      "code": "23",
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
      "id": "24",
      "seqId": 24,
      "kind": "course",
      "name": "Estadística",
      "code": "24",
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
      "id": "25",
      "seqId": 25,
      "kind": "course",
      "name": "Costos I",
      "code": "25",
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
              "itemId": "14",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
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
      "name": "Estructura y Política Económica Argentina",
      "code": "26",
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
      "id": "27",
      "seqId": 27,
      "kind": "course",
      "name": "Administración Financiera",
      "code": "27",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "22",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "25",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "22",
              "state": "passed"
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
      "id": "28",
      "seqId": 28,
      "kind": "course",
      "name": "Sociedades",
      "code": "28",
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
      "name": "Análisis de Estados Contables",
      "code": "29",
      "type": "mandatory",
      "hours": 5,
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
          "itemId": "14",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "14",
          "state": "passed"
        }
      }
    },
    {
      "id": "30",
      "seqId": 30,
      "kind": "course",
      "name": "Seminario en Administración Contable: Taller de Integración",
      "code": "30",
      "type": "mandatory",
      "hours": 5,
      "attributes": [
        "integrative"
      ],
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
              "itemId": "18",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "25",
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
      "name": "Costos II",
      "code": "31",
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
          "itemId": "25",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "25",
          "state": "passed"
        }
      }
    },
    {
      "id": "32",
      "seqId": 32,
      "kind": "course",
      "name": "Derecho Laboral y Previsional",
      "code": "32",
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
      "id": "33",
      "seqId": 33,
      "kind": "course",
      "name": "Evaluación de Proyectos",
      "code": "33",
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
              "itemId": "2",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "27",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "27",
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
      "name": "Auditoría",
      "code": "34",
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
      "id": "35",
      "seqId": 35,
      "kind": "course",
      "name": "Finanzas Públicas y Derecho Tributario",
      "code": "35",
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
      "id": "36",
      "seqId": 36,
      "kind": "course",
      "name": "Metodología de la Investigación",
      "code": "36",
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
          "itemId": "24",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "24",
          "state": "passed"
        }
      }
    },
    {
      "id": "37",
      "seqId": 37,
      "kind": "course",
      "name": "Concursos y Quiebras",
      "code": "37",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "32",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "28",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "32",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "38",
      "seqId": 38,
      "kind": "course",
      "name": "Impuesto a las Rentas y Patrimonio",
      "code": "38",
      "type": "mandatory",
      "hours": 5,
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
          "itemId": "35",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "35",
          "state": "passed"
        }
      }
    },
    {
      "id": "39",
      "seqId": 39,
      "kind": "course",
      "name": "Impuesto sobre los Consumos y Procedimiento Tributario",
      "code": "39",
      "type": "mandatory",
      "hours": 5,
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
          "itemId": "35",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "35",
          "state": "passed"
        }
      }
    },
    {
      "id": "40",
      "seqId": 40,
      "kind": "course",
      "name": "Técnicas Cuantitativas",
      "code": "40",
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
          "type": "item",
          "itemId": "24",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "24",
          "state": "passed"
        }
      }
    },
    {
      "id": "41",
      "seqId": 41,
      "kind": "course",
      "name": "Taller de Trabajo Final",
      "code": "41",
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
          "type": "item",
          "itemId": "36",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "36",
          "state": "passed"
        }
      }
    },
    {
      "id": "42",
      "seqId": 42,
      "kind": "course",
      "name": "Práctica Profesional Impositiva",
      "code": "42",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "38",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "39",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "38",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "39",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "43",
      "seqId": 43,
      "kind": "course",
      "name": "Práctica Profesional Administrativo-Contable",
      "code": "43",
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
              "itemId": "29",
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
              "itemId": "29",
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
      "id": "44",
      "seqId": 44,
      "kind": "course",
      "name": "Práctica Profesional Jurídica-Contable",
      "code": "44",
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
          "itemId": "37",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "37",
          "state": "passed"
        }
      }
    },
    {
      "id": "45",
      "seqId": 45,
      "kind": "course",
      "name": "Práctica Profesional Supervisada",
      "code": "45",
      "type": "mandatory",
      "hours": 6.25,
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "9",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "11",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "17",
              "state": "taken"
            },
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
              "itemId": "21",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "26",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "30",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "31",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "32",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "33",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "34",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "35",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "36",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "11",
              "state": "passed"
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
            },
            {
              "type": "item",
              "itemId": "26",
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
            },
            {
              "type": "item",
              "itemId": "31",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "32",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "33",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "34",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "35",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "36",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "46",
      "seqId": 46,
      "kind": "course",
      "name": "Trabajo Final",
      "code": "46",
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "9",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "11",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "17",
              "state": "taken"
            },
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
              "itemId": "21",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "26",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "31",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "33",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "34",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "40",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "41",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "42",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "43",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "44",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "11",
              "state": "passed"
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
            },
            {
              "type": "item",
              "itemId": "26",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "31",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "33",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "34",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "40",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "41",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "42",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "43",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "44",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "47",
      "seqId": 47,
      "kind": "course",
      "name": "Experiencias Formativas Obligatorias de Carácter Electivo",
      "code": "47",
      "type": "mandatory",
      "hours": 5,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "firstSemester"
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
