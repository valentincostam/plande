import type { StudyPlanData } from '$lib/study-plan-data';

export const uaderFcytLsi2010: StudyPlanData = {
  "info": {
    "degreeName": "Licenciatura en Sistemas de Información",
    "degreeSlug": "LSI",
    "universityName": "Universidad Autónoma de Entre Ríos",
    "universitySlug": "UADER",
    "collegeName": "Facultad de Ciencia y Tecnología",
    "collegeSlug": "FCyT",
    "year": 2010,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios 2010",
        "url": "https://fcytcdelu.uader.edu.ar/sistemas"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "En 2025, las materias optativas son:\n        \n - Optativa I (2<sup>do</sup> año): **Diseño de Experiencia de Usuario e Interfaz de Usuario**\n        \n - Optativa II (3<sup>er</sup> año): **Patrones de Arquitectura de Software**\n        \n - Optativa III (4<sup>to</sup> año): **Bases de Datos NoSQL**\n        \n - Optativa IV (4<sup>to</sup> año): **Desarrollo y Arquitecturas en Programación Móvil**\n        \n - Optativa V (5<sup>to</sup> año): **Gestión de Costos y Financiamiento de Proyectos Tecnológicos**\n      "
      },
      {
        "id": 2,
        "text": "En la materia **Optativa II** de 3<sup>er</sup> año, se omite el requerimiento de **Lecto-Comprehensión en Inglés** de 1<sup>er</sup> año _regular_ porque ya es requerido por **Programación Orientada a Objetos** de 2<sup>do</sup> año, que también es requerido por **Optativa II**."
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
      "id": "340101",
      "seqId": 1,
      "kind": "course",
      "name": "Sistemas y Organizaciones",
      "code": "101",
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
      "id": "340102",
      "seqId": 2,
      "kind": "course",
      "name": "Fundamentos de Programación",
      "code": "102",
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
      "id": "340103",
      "seqId": 3,
      "kind": "course",
      "name": "Cálculo Diferencial e Integral",
      "code": "103",
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
      "id": "340104",
      "seqId": 4,
      "kind": "course",
      "name": "Lógica y Álgebra",
      "code": "104",
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
      "id": "340105",
      "seqId": 5,
      "kind": "course",
      "name": "Lecto-Comprehensión en Inglés",
      "code": "105",
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
      "id": "340106",
      "seqId": 6,
      "kind": "course",
      "name": "Derechos Humanos y Tecnología",
      "code": "106",
      "type": "mandatory",
      "hours": 1,
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
      "id": "340107",
      "seqId": 7,
      "kind": "course",
      "name": "Fundamentos de Computación",
      "code": "107",
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
      "id": "340208",
      "seqId": 8,
      "kind": "course",
      "name": "Ingeniería de Software I",
      "code": "208",
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
              "itemId": "340101",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340102",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340209",
      "seqId": 9,
      "kind": "course",
      "name": "Algoritmos y Estructura de Datos",
      "code": "209",
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
              "itemId": "340102",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340104",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340210",
      "seqId": 10,
      "kind": "course",
      "name": "Programación Orientada a Objetos",
      "code": "210",
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
              "itemId": "340102",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340105",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340107",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340211",
      "seqId": 11,
      "kind": "course",
      "name": "Matemática Discreta",
      "code": "211",
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
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "340104",
          "state": "taken"
        }
      }
    },
    {
      "id": "340212",
      "seqId": 12,
      "kind": "course",
      "name": "Ecuaciones Diferenciales y Cálculo Multivariado",
      "code": "212",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "340103",
          "state": "taken"
        }
      }
    },
    {
      "id": "340213",
      "seqId": 13,
      "kind": "course",
      "name": "Arquitectura de Computadoras",
      "code": "213",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "340102",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340107",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340299",
      "seqId": 14,
      "kind": "course",
      "name": "Optativa I",
      "code": "299",
      "type": "mandatory",
      "hours": 1.5,
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
              "itemId": "340102",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340105",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340107",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340314",
      "seqId": 15,
      "kind": "course",
      "name": "Ingeniería de Software II",
      "code": "314",
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
              "itemId": "340208",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340209",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340210",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340315",
      "seqId": 16,
      "kind": "course",
      "name": "Bases de Datos",
      "code": "315",
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
              "itemId": "340209",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340210",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340211",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340316",
      "seqId": 17,
      "kind": "course",
      "name": "Sistemas Operativos",
      "code": "316",
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
              "itemId": "340209",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340211",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340213",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340317",
      "seqId": 18,
      "kind": "course",
      "name": "Probabilidad y Estadística",
      "code": "317",
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
              "itemId": "340211",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340212",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340318",
      "seqId": 19,
      "kind": "course",
      "name": "Paradigmas y Lenguajes",
      "code": "318",
      "type": "mandatory",
      "hours": 2,
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
              "itemId": "340209",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340210",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340213",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340319",
      "seqId": 20,
      "kind": "course",
      "name": "Ética Profesional",
      "code": "319",
      "type": "mandatory",
      "hours": 1.5,
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
              "itemId": "340106",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340208",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340320",
      "seqId": 21,
      "kind": "course",
      "name": "Programación Avanzada",
      "code": "320",
      "type": "mandatory",
      "hours": 2,
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
              "itemId": "340209",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340210",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340399",
      "seqId": 22,
      "kind": "course",
      "name": "Optativa II",
      "code": "399",
      "type": "mandatory",
      "hours": 1.5,
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
              "itemId": "340208",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340209",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340210",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340321",
      "seqId": 23,
      "kind": "course",
      "name": "Taller de Integración",
      "code": "321",
      "type": "mandatory",
      "hours": 1.5,
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
              "itemId": "340208",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340209",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340210",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340211",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340212",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340213",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340299",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "340314",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "340315",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "340316",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "340317",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "340318",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "340319",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "340320",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "340399",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "340422",
      "seqId": 24,
      "kind": "course",
      "name": "Inteligencia Artificial",
      "code": "422",
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
              "itemId": "340315",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340317",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340318",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340423",
      "seqId": 25,
      "kind": "course",
      "name": "Bases de Datos Avanzadas",
      "code": "423",
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
              "itemId": "340315",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340320",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340424",
      "seqId": 26,
      "kind": "course",
      "name": "Comunicaciones y Redes",
      "code": "424",
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
              "itemId": "340316",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340317",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340425",
      "seqId": 27,
      "kind": "course",
      "name": "Metodología de la Investigación",
      "code": "425",
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
              "itemId": "340208",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340317",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340426",
      "seqId": 28,
      "kind": "course",
      "name": "Investigación Operativa",
      "code": "426",
      "type": "mandatory",
      "hours": 1.5,
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
          "itemId": "340317",
          "state": "taken"
        }
      }
    },
    {
      "id": "340427",
      "seqId": 29,
      "kind": "course",
      "name": "Optativa III",
      "code": "427",
      "type": "mandatory",
      "hours": 1.5,
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
              "itemId": "340314",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340315",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340320",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340321",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340428",
      "seqId": 30,
      "kind": "course",
      "name": "Computación Avanzada",
      "code": "428",
      "type": "mandatory",
      "hours": 1.5,
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
              "itemId": "340315",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340316",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340429",
      "seqId": 31,
      "kind": "course",
      "name": "Optativa IV",
      "code": "429",
      "type": "mandatory",
      "hours": 1.5,
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
              "itemId": "340316",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340318",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340320",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340530",
      "seqId": 32,
      "kind": "course",
      "name": "Seguridad y Auditoría",
      "code": "530",
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
              "itemId": "340319",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340424",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340531",
      "seqId": 33,
      "kind": "course",
      "name": "Administración de Recursos",
      "code": "531",
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
              "itemId": "340423",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340424",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340532",
      "seqId": 34,
      "kind": "course",
      "name": "Teoría de Computabilidad",
      "code": "532",
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
              "itemId": "340318",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340423",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340424",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340533",
      "seqId": 35,
      "kind": "course",
      "name": "Tesina de Grado",
      "code": "533",
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
              "itemId": "340423",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340424",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340425",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "340530",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "340531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "340532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "340534",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "340535",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "340534",
      "seqId": 36,
      "kind": "course",
      "name": "Interfaz Hombre Máquina",
      "code": "534",
      "type": "mandatory",
      "hours": 2,
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
              "itemId": "340320",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "340428",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "340535",
      "seqId": 37,
      "kind": "course",
      "name": "Optativa V",
      "code": "535",
      "type": "mandatory",
      "hours": 1.5,
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
          "type": "item",
          "itemId": "340423",
          "state": "taken"
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
