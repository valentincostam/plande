import type { StudyPlanData } from '$lib/study-plan-data';

export const udemmIem: StudyPlanData = {
  "info": {
    "degreeName": "Ingeniería Electromecánica",
    "degreeSlug": "IEM",
    "universityName": "Universidad de la Marina Mercante",
    "universitySlug": "UdeMM",
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios",
        "url": "https://udemm.edu.ar/carreras/ingenieria-electromecanica/#plandeestudios"
      },
      {
        "id": 2,
        "label": "Correlatividades",
        "url": "https://udemm.edu.ar/carreras/ingenieria-electromecanica/correlatividades-ingenieria-electromecanica/"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "La carrera otorga el título intermedio de **Técnico Universitario en Electromecánica**."
      },
      {
        "id": 2,
        "text": "Se normalizó la correlativa de **Proyecto Electromecánico Integrador** de `I1421` a `I1422` por consistencia con el plan y la tabla de materias."
      },
      {
        "id": 3,
        "text": "Para completar la carrera se requiere aprobar **1 materia electiva** del bloque de electivas de 4<sup>to</sup> año."
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
      "id": "transversales",
      "label": "Materias Transversales"
    }
  ],
  "items": [
    {
      "id": "1101",
      "seqId": 1,
      "kind": "course",
      "name": "Análisis Matemático I",
      "code": "I1101",
      "type": "mandatory",
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
      "id": "1102",
      "seqId": 2,
      "kind": "course",
      "name": "Fundamentos de Programación",
      "code": "I1102",
      "type": "mandatory",
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
      "id": "1104",
      "seqId": 3,
      "kind": "course",
      "name": "Sistemas de Representación",
      "code": "I1104",
      "type": "mandatory",
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
      "id": "1106",
      "seqId": 4,
      "kind": "course",
      "name": "Metrología",
      "code": "I1106",
      "type": "mandatory",
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
      "id": "1103",
      "seqId": 5,
      "kind": "course",
      "name": "Organización de Empresas",
      "code": "I1103",
      "type": "mandatory",
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
      "id": "100",
      "seqId": 6,
      "kind": "course",
      "name": "Álgebra y Geometría Analítica",
      "code": "I0100",
      "type": "mandatory",
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
          "itemId": "1101",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1101",
          "state": "passed"
        }
      }
    },
    {
      "id": "106",
      "seqId": 7,
      "kind": "course",
      "name": "Física I",
      "code": "I0106",
      "type": "mandatory",
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
          "itemId": "1101",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1101",
          "state": "passed"
        }
      }
    },
    {
      "id": "1113",
      "seqId": 8,
      "kind": "course",
      "name": "Diseño Digital",
      "code": "I1113",
      "type": "mandatory",
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
          "itemId": "1104",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1104",
          "state": "passed"
        }
      }
    },
    {
      "id": "1112",
      "seqId": 9,
      "kind": "course",
      "name": "Química General",
      "code": "I1112",
      "type": "mandatory",
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
          "itemId": "1101",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1101",
          "state": "passed"
        }
      }
    },
    {
      "id": "1201",
      "seqId": 10,
      "kind": "course",
      "name": "Análisis Matemático II A",
      "code": "I1201",
      "type": "mandatory",
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
              "itemId": "1101",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "100",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1101",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "100",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1202",
      "seqId": 11,
      "kind": "course",
      "name": "Física II A",
      "code": "I1202",
      "type": "mandatory",
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
          "itemId": "106",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "106",
          "state": "passed"
        }
      }
    },
    {
      "id": "1203",
      "seqId": 12,
      "kind": "course",
      "name": "Fundamentos de Economía",
      "code": "I1203",
      "type": "mandatory",
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
      "id": "1204",
      "seqId": 13,
      "kind": "course",
      "name": "Estabilidad I",
      "code": "I1204",
      "type": "mandatory",
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
          "itemId": "100",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "100",
          "state": "passed"
        }
      }
    },
    {
      "id": "1211",
      "seqId": 14,
      "kind": "course",
      "name": "Análisis Matemático II B",
      "code": "I1211",
      "type": "mandatory",
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
          "itemId": "1201",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1201",
          "state": "passed"
        }
      }
    },
    {
      "id": "1212",
      "seqId": 15,
      "kind": "course",
      "name": "Física II B",
      "code": "I1212",
      "type": "mandatory",
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
          "itemId": "106",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "106",
          "state": "passed"
        }
      }
    },
    {
      "id": "401",
      "seqId": 16,
      "kind": "course",
      "name": "Seguridad, Higiene y Medio Ambiente",
      "code": "I0401",
      "type": "mandatory",
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
      "id": "346",
      "seqId": 17,
      "kind": "course",
      "name": "Resistencia de Materiales",
      "code": "I0346",
      "type": "mandatory",
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
              "itemId": "1204",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1201",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1204",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1201",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1214",
      "seqId": 18,
      "kind": "course",
      "name": "Ingeniería de Materiales I",
      "code": "I1214",
      "type": "mandatory",
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
          "itemId": "1112",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1112",
          "state": "passed"
        }
      }
    },
    {
      "id": "484",
      "seqId": 19,
      "kind": "course",
      "name": "Tecnología Mecánica",
      "code": "I0484",
      "type": "mandatory",
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
          "itemId": "106",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "106",
          "state": "passed"
        }
      }
    },
    {
      "id": "345",
      "seqId": 20,
      "kind": "course",
      "name": "Termodinámica",
      "code": "I0345",
      "type": "mandatory",
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
          "itemId": "1212",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1212",
          "state": "passed"
        }
      }
    },
    {
      "id": "328",
      "seqId": 21,
      "kind": "course",
      "name": "Mediciones Eléctricas",
      "code": "I0328",
      "type": "mandatory",
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
          "itemId": "1202",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1202",
          "state": "passed"
        }
      }
    },
    {
      "id": "206",
      "seqId": 22,
      "kind": "course",
      "name": "Electrotecnia",
      "code": "I0206",
      "type": "mandatory",
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
          "itemId": "1202",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1202",
          "state": "passed"
        }
      }
    },
    {
      "id": "1305",
      "seqId": 23,
      "kind": "course",
      "name": "Ingeniería de Materiales II",
      "code": "I1305",
      "type": "mandatory",
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
          "itemId": "1214",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1214",
          "state": "passed"
        }
      }
    },
    {
      "id": "304",
      "seqId": 24,
      "kind": "course",
      "name": "Probabilidad y Estadística",
      "code": "I0304",
      "type": "mandatory",
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
          "itemId": "100",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "100",
          "state": "passed"
        }
      }
    },
    {
      "id": "472",
      "seqId": 25,
      "kind": "course",
      "name": "Mecánica de los Fluidos",
      "code": "I0472",
      "type": "mandatory",
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
              "itemId": "106",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1201",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "106",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1201",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "350",
      "seqId": 26,
      "kind": "course",
      "name": "Máquinas Eléctricas",
      "code": "I0350",
      "type": "mandatory",
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
          "itemId": "206",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "206",
          "state": "passed"
        }
      }
    },
    {
      "id": "442",
      "seqId": 27,
      "kind": "course",
      "name": "Mecánica",
      "code": "I0442",
      "type": "mandatory",
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
              "itemId": "106",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1211",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "106",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1211",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1321",
      "seqId": 28,
      "kind": "course",
      "name": "Fundamentos de Electrónica",
      "code": "I1321",
      "type": "mandatory",
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
          "itemId": "1202",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1202",
          "state": "passed"
        }
      }
    },
    {
      "id": "1404",
      "seqId": 29,
      "kind": "course",
      "name": "Turbomáquinas",
      "code": "I1404",
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
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "472",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "472",
          "state": "passed"
        }
      }
    },
    {
      "id": "1401",
      "seqId": 30,
      "kind": "course",
      "name": "Metodología de la Investigación",
      "code": "I1401",
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
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "304",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "304",
          "state": "passed"
        }
      }
    },
    {
      "id": "1408",
      "seqId": 31,
      "kind": "course",
      "name": "Máquinas Eléctricas II",
      "code": "I1408",
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
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "350",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "350",
          "state": "passed"
        }
      }
    },
    {
      "id": "1402",
      "seqId": 32,
      "kind": "course",
      "name": "Gestión de la Calidad",
      "code": "I1402",
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
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "304",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "304",
          "state": "passed"
        }
      }
    },
    {
      "id": "1403",
      "seqId": 33,
      "kind": "course",
      "name": "Control Industrial",
      "code": "I1403",
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
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "1321",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1321",
          "state": "passed"
        }
      }
    },
    {
      "id": "443",
      "seqId": 34,
      "kind": "course",
      "name": "Elementos de Máquinas y Mecanismos",
      "code": "I0443",
      "type": "mandatory",
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
              "itemId": "1305",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "346",
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
              "itemId": "1305",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "346",
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
      "id": "520",
      "seqId": 35,
      "kind": "course",
      "name": "Máquinas Térmicas",
      "code": "I0520",
      "type": "mandatory",
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
          "itemId": "345",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "345",
          "state": "passed"
        }
      }
    },
    {
      "id": "1422",
      "seqId": 36,
      "kind": "course",
      "name": "Mecanismos Hidráulicos y Neumáticos",
      "code": "I1422",
      "type": "mandatory",
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
          "itemId": "472",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "472",
          "state": "passed"
        }
      }
    },
    {
      "id": "1415",
      "seqId": 37,
      "kind": "course",
      "name": "Gestión y Evaluación de Proyectos",
      "code": "I1415",
      "type": "mandatory",
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
          "itemId": "1103",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1103",
          "state": "passed"
        }
      }
    },
    {
      "id": "1522",
      "seqId": 38,
      "kind": "course",
      "name": "Proyecto Electromecánico Integrador",
      "code": "I1522",
      "type": "mandatory",
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
              "itemId": "1404",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "520",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1422",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1404",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "520",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1422",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1501",
      "seqId": 39,
      "kind": "course",
      "name": "Energías Alternativas",
      "code": "I1501",
      "type": "mandatory",
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
          "itemId": "1408",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1408",
          "state": "passed"
        }
      }
    },
    {
      "id": "1502",
      "seqId": 40,
      "kind": "course",
      "name": "Sistemas de Elevación y Transporte",
      "code": "I1502",
      "type": "mandatory",
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
              "itemId": "443",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1408",
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
              "itemId": "1408",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1503",
      "seqId": 41,
      "kind": "course",
      "name": "Instalaciones Termomecánicas",
      "code": "I1503",
      "type": "mandatory",
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
              "itemId": "472",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "345",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "472",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "345",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1507",
      "seqId": 42,
      "kind": "course",
      "name": "Instalaciones Eléctricas",
      "code": "I1507",
      "type": "mandatory",
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
          "itemId": "206",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "206",
          "state": "passed"
        }
      }
    },
    {
      "id": "1514",
      "seqId": 43,
      "kind": "course",
      "name": "Gestión del Mantenimiento",
      "code": "I1514",
      "type": "mandatory",
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
          "itemId": "1402",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1402",
          "state": "passed"
        }
      }
    },
    {
      "id": "538",
      "seqId": 44,
      "kind": "course",
      "name": "Instalaciones Industriales",
      "code": "I0538",
      "type": "mandatory",
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
              "itemId": "1422",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "520",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "484",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1422",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "520",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "484",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "500",
      "seqId": 45,
      "kind": "course",
      "name": "Legislación y Ejercicio Profesional",
      "code": "I0500",
      "type": "mandatory",
      "tags": [
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
      "id": "1518",
      "seqId": 46,
      "kind": "course",
      "name": "Redes de Distribución Eléctrica",
      "code": "I1518",
      "type": "mandatory",
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
          "itemId": "1507",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1507",
          "state": "passed"
        }
      }
    },
    {
      "id": "555",
      "seqId": 47,
      "kind": "course",
      "name": "Práctica Profesional Supervisada",
      "code": "I0555",
      "type": "mandatory",
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
              "itemId": "1403",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1415",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1408",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1403",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1415",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1408",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1130",
      "seqId": 48,
      "kind": "course",
      "name": "Emprendedorismo I",
      "code": "I1130",
      "type": "mandatory",
      "attributes": [
        "transversal",
        "workshop"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "1131",
      "seqId": 49,
      "kind": "course",
      "name": "Emprendedorismo II",
      "code": "I1131",
      "type": "mandatory",
      "attributes": [
        "transversal",
        "workshop"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "303",
      "seqId": 50,
      "kind": "course",
      "name": "Inglés I",
      "code": "I0303",
      "type": "mandatory",
      "attributes": [
        "transversal",
        "workshop"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "446",
      "seqId": 51,
      "kind": "course",
      "name": "Inglés II",
      "code": "I0446",
      "type": "mandatory",
      "attributes": [
        "transversal",
        "workshop"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "1230",
      "seqId": 52,
      "kind": "course",
      "name": "Comunicación Efectiva I",
      "code": "I1230",
      "type": "mandatory",
      "attributes": [
        "transversal",
        "workshop"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "1231",
      "seqId": 53,
      "kind": "course",
      "name": "Comunicación Efectiva II",
      "code": "I1231",
      "type": "mandatory",
      "attributes": [
        "transversal",
        "workshop"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "1330",
      "seqId": 54,
      "kind": "course",
      "name": "Trabajo Colaborativo I",
      "code": "I1330",
      "type": "mandatory",
      "attributes": [
        "transversal",
        "workshop"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "1332",
      "seqId": 55,
      "kind": "course",
      "name": "Trabajo Colaborativo II",
      "code": "I1332",
      "type": "mandatory",
      "attributes": [
        "transversal",
        "workshop"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "1356",
      "seqId": 56,
      "kind": "course",
      "name": "Estabilidad II",
      "code": "I1356",
      "type": "elective",
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
      "requirements": {}
    },
    {
      "id": "1409",
      "seqId": 57,
      "kind": "course",
      "name": "Tecnología del Calor",
      "code": "I1409",
      "type": "elective",
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
      "requirements": {}
    },
    {
      "id": "501",
      "seqId": 58,
      "kind": "course",
      "name": "Planificación y Control de la Producción",
      "code": "I0501",
      "type": "elective",
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
      "requirements": {}
    },
    {
      "id": "536",
      "seqId": 59,
      "kind": "course",
      "name": "Comercialización",
      "code": "I0536",
      "type": "elective",
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
      "requirements": {}
    },
    {
      "id": "1218",
      "seqId": 60,
      "kind": "course",
      "name": "Contabilidad y Costos Industriales",
      "code": "I1218",
      "type": "elective",
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
      "requirements": {}
    },
    {
      "id": "1326",
      "seqId": 61,
      "kind": "course",
      "name": "Logística Industrial",
      "code": "I1326",
      "type": "elective",
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
      "requirements": {}
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
        "id": "elective-count",
        "label": "Materias electivas requeridas",
        "expr": {
          "type": "count",
          "selector": {
            "type": "tag",
            "tag": "progress-elective"
          },
          "min": 1,
          "state": "passed"
        }
      }
    ]
  }
};
