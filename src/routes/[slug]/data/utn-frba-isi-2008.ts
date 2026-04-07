import type { StudyPlanData } from '$lib/study-plan-data';

export const utnFrbaIsi2008: StudyPlanData = {
  "info": {
    "degreeName": "Ingeniería en Sistemas de Información",
    "degreeSlug": "ISI",
    "universityName": "Universidad Tecnológica Nacional",
    "universitySlug": "UTN",
    "collegeName": "Facultad Regional Buenos Aires",
    "collegeSlug": "FRBA",
    "year": 2008,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios (Web)",
        "url": "https://frba.utn.edu.ar/sistemas/plan-de-estudios/"
      },
      {
        "id": 2,
        "label": "Ordenanza N° 1150 - Diseño Curricular (PDF)",
        "url": "https://www.frba.utn.edu.ar/wp-content/uploads/2022/01/1150.pdf"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "El plan de estudios 2008 (K08) está vigente **hasta 2028 para ingresantes hasta 2022**. A partir de 2023 rige el plan de estudios 2023 (K23)."
      },
      {
        "id": 2,
        "text": "Se requieren **44 horas de materias electivas** (de cursado cuatrimestral) para egresarse."
      },
      {
        "id": 3,
        "text": "La carrera incluye una **Práctica Profesional Supervisada** de 200 horas reloj como requisito para egresarse."
      },
      {
        "id": 4,
        "text": "Para rendir el **Proyecto Final** se requiere tener aprobadas **todas** las materias obligatorias."
      },
      {
        "id": 5,
        "text": "Se omiten requisitos redundantes en **Proyecto Final**. Por ejemplo, **Análisis Matemático I** de 1<sup>er</sup> año no se exige explícitamente para rendir porque ya es requisito para aprobar **Análisis Matemático II** de 2<sup>do</sup> año, que sí se requiere aprobada. De esta manera, si se cumple con los requisitos directos (como aprobar Análisis Matemático II), automáticamente se cumple con los requisitos indirectos (como aprobar Análisis Matemático I)."
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
      "name": "Matemática Discreta",
      "code": "3",
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
      "id": "4",
      "seqId": 4,
      "kind": "course",
      "name": "Sistemas y Organizaciones",
      "code": "4",
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
          "term": "annual"
        }
      ],
      "requirements": {}
    },
    {
      "id": "5",
      "seqId": 5,
      "kind": "course",
      "name": "Algoritmos y Estructura de Datos",
      "code": "5",
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
      "id": "6",
      "seqId": 6,
      "kind": "course",
      "name": "Arquitectura de Computadoras",
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
      "id": "9",
      "seqId": 7,
      "kind": "course",
      "name": "Química",
      "code": "9",
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
      "id": "22",
      "seqId": 8,
      "kind": "course",
      "name": "Ingeniería y Sociedad",
      "code": "22",
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
      "seqId": 9,
      "kind": "course",
      "name": "Física I",
      "code": "7",
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
      "name": "Análisis Matemático II",
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
              "itemId": "2",
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
              "itemId": "2",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "12",
      "seqId": 11,
      "kind": "course",
      "name": "Análisis de Sistemas",
      "code": "12",
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
              "itemId": "4",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "5",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "4",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "5",
              "state": "passed"
            }
          ]
        }
      }
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
              "itemId": "5",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "5",
              "state": "passed"
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
              "itemId": "5",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "5",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "16",
      "seqId": 14,
      "kind": "course",
      "name": "Sistemas de Representación",
      "code": "16",
      "type": "mandatory",
      "hours": 3,
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
      "id": "8",
      "seqId": 15,
      "kind": "course",
      "name": "Inglés I",
      "code": "8",
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
      "seqId": 16,
      "kind": "course",
      "name": "Probabilidad y Estadística",
      "code": "17",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "2",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "18",
      "seqId": 17,
      "kind": "course",
      "name": "Diseño de Sistemas",
      "code": "18",
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
              "itemId": "12",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "4",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "5",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
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
      "id": "15",
      "seqId": 18,
      "kind": "course",
      "name": "Sistemas Operativos",
      "code": "15",
      "type": "mandatory",
      "hours": 8,
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
              "state": "taken"
            },
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3",
              "state": "passed"
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
      "id": "11",
      "seqId": 19,
      "kind": "course",
      "name": "Física II",
      "code": "11",
      "type": "mandatory",
      "hours": 10,
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
              "itemId": "1",
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
      "id": "23",
      "seqId": 20,
      "kind": "course",
      "name": "Economía",
      "code": "23",
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
              "itemId": "12",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "4",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "5",
              "state": "passed"
            }
          ]
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
      "name": "Gestión de Datos",
      "code": "21",
      "type": "mandatory",
      "hours": 8,
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
              "itemId": "12",
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
            },
            {
              "type": "item",
              "itemId": "3",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "4",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "5",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "24",
      "seqId": 22,
      "kind": "course",
      "name": "Inglés II",
      "code": "24",
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
          "itemId": "8",
          "state": "passed"
        }
      }
    },
    {
      "id": "20",
      "seqId": 23,
      "kind": "course",
      "name": "Matemática Superior",
      "code": "20",
      "type": "mandatory",
      "hours": 8,
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
              "itemId": "10",
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
        },
        "complete": {
          "type": "item",
          "itemId": "10",
          "state": "passed"
        }
      }
    },
    {
      "id": "31",
      "seqId": 24,
      "kind": "course",
      "name": "Legislación",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "22",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "4",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "5",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
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
      "id": "26",
      "seqId": 25,
      "kind": "course",
      "name": "Administración de Recursos",
      "code": "26",
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
              "itemId": "15",
              "state": "taken"
            },
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
              "itemId": "6",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "14",
              "state": "passed"
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
              "itemId": "18",
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
      "id": "29",
      "seqId": 26,
      "kind": "course",
      "name": "Ingeniería de Software",
      "code": "29",
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
              "itemId": "17",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
              "itemId": "18",
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
      "id": "30",
      "seqId": 27,
      "kind": "course",
      "name": "Teoría de Control",
      "code": "30",
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
              "itemId": "9",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "10",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "11",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "9",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "19",
      "seqId": 28,
      "kind": "course",
      "name": "Comunicaciones",
      "code": "19",
      "type": "mandatory",
      "hours": 8,
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "10",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "11",
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
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "passed"
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
              "itemId": "10",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "11",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "25",
      "seqId": 29,
      "kind": "course",
      "name": "Redes de Información",
      "code": "25",
      "type": "mandatory",
      "hours": 8,
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
              "itemId": "15",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "19",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3",
              "state": "passed"
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
            },
            {
              "type": "item",
              "itemId": "10",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "11",
              "state": "passed"
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
              "itemId": "19",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "27",
      "seqId": 30,
      "kind": "course",
      "name": "Investigación Operativa",
      "code": "27",
      "type": "mandatory",
      "hours": 10,
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
              "itemId": "17",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "10",
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
              "itemId": "20",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "28",
      "seqId": 31,
      "kind": "course",
      "name": "Simulación",
      "code": "28",
      "type": "mandatory",
      "hours": 8,
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
              "itemId": "17",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "10",
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
              "itemId": "20",
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
      "name": "Proyecto Final",
      "code": "32",
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
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "31",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "16",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "17",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "19",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "22",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "23",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "24",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "16",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "24",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "25",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "26",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "27",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "28",
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
            },
            {
              "type": "item",
              "itemId": "31",
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
      "name": "Inteligencia Artificial",
      "code": "33",
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
              "itemId": "27",
              "state": "taken"
            },
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
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "passed"
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
              "itemId": "28",
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
      "name": "Administración Gerencial",
      "code": "34",
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
              "itemId": "26",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "27",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "17",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "18",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "26",
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
      "id": "35",
      "seqId": 35,
      "kind": "course",
      "name": "Sistemas de Gestión",
      "code": "35",
      "type": "mandatory",
      "hours": 8,
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
              "itemId": "26",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "27",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "17",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "18",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "26",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "27",
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
      "id": "200",
      "seqId": 36,
      "kind": "course",
      "name": "Gestión del Talento Humano",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "201",
      "seqId": 37,
      "kind": "course",
      "name": "Metodología de la Investigación Científico – Tecnológica",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "202",
      "seqId": 38,
      "kind": "course",
      "name": "Ciberseguridad",
      "code": "082031",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "203",
      "seqId": 39,
      "kind": "course",
      "name": "Técnicas Avanzadas de Programación",
      "code": "082065",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "204",
      "seqId": 40,
      "kind": "course",
      "name": "Técnicas de Gráficos por Computadoras",
      "code": "082066",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "205",
      "seqId": 41,
      "kind": "course",
      "name": "Metodología de la Conducción de Equipos de Trabajo",
      "code": "082075",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "206",
      "seqId": 42,
      "kind": "course",
      "name": "Creatividad e Innovación",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "207",
      "seqId": 43,
      "kind": "course",
      "name": "Procesamiento Lenguaje Natural",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "208",
      "seqId": 44,
      "kind": "course",
      "name": "Tendencias y Escenarios Tecnológicos",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "209",
      "seqId": 45,
      "kind": "course",
      "name": "Patrones Algorítmicos para Estructuras Avanzadas",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "210",
      "seqId": 46,
      "kind": "course",
      "name": "Ingeniería de Requisitos",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "211",
      "seqId": 47,
      "kind": "course",
      "name": "Transformación Digital",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "213",
      "seqId": 48,
      "kind": "course",
      "name": "Experiencia de Usuario y Accesibilidad",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "12",
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
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
      "id": "214",
      "seqId": 49,
      "kind": "course",
      "name": "Tecnologías Avanzadas en la Construcción de Software",
      "code": "082073",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "18",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
              "itemId": "15",
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
      "id": "215",
      "seqId": 50,
      "kind": "course",
      "name": "Administración Estratégica del Capital Humano",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "18",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
              "itemId": "15",
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
      "id": "216",
      "seqId": 51,
      "kind": "course",
      "name": "Criptografía",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "18",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
              "itemId": "15",
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
      "id": "217",
      "seqId": 52,
      "kind": "course",
      "name": "Gerenciamiento de Proyectos de Sistemas de Información",
      "code": "082074",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "18",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
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
              "itemId": "15",
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
      "id": "218",
      "seqId": 53,
      "kind": "course",
      "name": "Bioinformática",
      "code": "082045",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "219",
      "seqId": 54,
      "kind": "course",
      "name": "Ciberseguridad Industrial",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "220",
      "seqId": 55,
      "kind": "course",
      "name": "Ciudades Digitales y Gobierno Electrónico",
      "code": "082011",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "221",
      "seqId": 56,
      "kind": "course",
      "name": "Desarrollo de Aplicaciones para Dispositivos Móviles",
      "code": "082010",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "222",
      "seqId": 57,
      "kind": "course",
      "name": "Dirección Estratégica",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "223",
      "seqId": 58,
      "kind": "course",
      "name": "Gestión de Empresas Digitales",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "224",
      "seqId": 59,
      "kind": "course",
      "name": "Gestión de la Transformación Organizacional",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "225",
      "seqId": 60,
      "kind": "course",
      "name": "Arquitecturas de Software Concurrente",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "226",
      "seqId": 61,
      "kind": "course",
      "name": "Base de Datos NoSQL",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "227",
      "seqId": 62,
      "kind": "course",
      "name": "Plataformas de Virtualización",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "228",
      "seqId": 63,
      "kind": "course",
      "name": "Inteligencia Artificial Avanzada",
      "code": "082017",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "229",
      "seqId": 64,
      "kind": "course",
      "name": "Inteligencia de Negocios",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "230",
      "seqId": 65,
      "kind": "course",
      "name": "Sistemas Avanzados de Telecomunicaciones",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "231",
      "seqId": 66,
      "kind": "course",
      "name": "Economía del Conocimiento",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "232",
      "seqId": 67,
      "kind": "course",
      "name": "Modelos Organizacionales",
      "code": "082084",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "233",
      "seqId": 68,
      "kind": "course",
      "name": "Pericias Informáticas",
      "code": "082085",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "234",
      "seqId": 69,
      "kind": "course",
      "name": "Procesamiento de Imágenes y Señales",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "235",
      "seqId": 70,
      "kind": "course",
      "name": "Seguridad en Aplicaciones Web",
      "code": "082016",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "236",
      "seqId": 71,
      "kind": "course",
      "name": "Sistemas de Costos y Presupuestos",
      "code": "082088",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "237",
      "seqId": 72,
      "kind": "course",
      "name": "Tecnologías Aplicadas a Soluciones de Datos",
      "code": "082014",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "238",
      "seqId": 73,
      "kind": "course",
      "name": "Tecnología Avanzada en Redes",
      "code": "082091",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "239",
      "seqId": 74,
      "kind": "course",
      "name": "Marcos de Referencia de Calidad en TI",
      "code": "082081",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "240",
      "seqId": 75,
      "kind": "course",
      "name": "Gestión Comercial de Soluciones de Tecnologías de la Información",
      "code": "082078",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "241",
      "seqId": 76,
      "kind": "course",
      "name": "Desarrollo de Modelos Analíticos (Machine Learning)",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
              "itemId": "29",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "242",
      "seqId": 77,
      "kind": "course",
      "name": "Neurociencia Aplicada",
      "type": "elective",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "25",
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
      },
      {
        "id": "elective-hours",
        "label": "Horas electivas requeridas",
        "type": "sum",
        "selector": {
          "type": "tag",
          "tag": "progress-elective"
        },
        "metric": "hours",
        "min": 44,
        "state": "passed",
        "weight": 11
      }
    ]
  }
};
