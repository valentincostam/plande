import type { StudyPlanData } from '$lib/study-plan-data';

export const issdTscdia: StudyPlanData = {
  "info": {
    "degreeName": "Tecnicatura Superior en Ciencia de Datos e Inteligencia Artificial",
    "degreeSlug": "TSCDIA",
    "universityName": "Instituto Superior Santo Domingo",
    "universitySlug": "ISSD",
    "sources": [
      {
        "id": 1,
        "label": "Correlatividades",
        "url": "https://issd.edu.ar/es/correlatividades/"
      },
      {
        "id": 2,
        "label": "Preguntas frecuentes",
        "url": "https://issd.edu.ar/es/preguntas-frecuentes/#sobre-cursado"
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
    }
  ],
  "items": [
    {
      "id": "2",
      "seqId": 1,
      "kind": "course",
      "name": "Inglés Técnico 1",
      "code": "IT1",
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
      "id": "4",
      "seqId": 2,
      "kind": "course",
      "name": "Álgebra",
      "code": "AL",
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
      "id": "5",
      "seqId": 3,
      "kind": "course",
      "name": "Introducción a la Inteligencia Artificial",
      "code": "IIA",
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
      "id": "3",
      "seqId": 4,
      "kind": "course",
      "name": "Sistemas de Comunicación",
      "code": "SC",
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
      "id": "1",
      "seqId": 5,
      "kind": "course",
      "name": "Programación 1",
      "code": "P1",
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
      "id": "7",
      "seqId": 6,
      "kind": "course",
      "name": "Inglés Técnico 2",
      "code": "IT2",
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
          "itemId": "2",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "2",
          "state": "passed"
        }
      }
    },
    {
      "id": "9",
      "seqId": 7,
      "kind": "course",
      "name": "Análisis Matemático 1",
      "code": "AM1",
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
      "requirements": {}
    },
    {
      "id": "10",
      "seqId": 8,
      "kind": "course",
      "name": "Ciencia de Datos",
      "code": "CDA",
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
      "id": "8",
      "seqId": 9,
      "kind": "course",
      "name": "Programación 2",
      "code": "P2",
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
      "id": "6",
      "seqId": 10,
      "kind": "course",
      "name": "Base de Datos",
      "code": "BD",
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
      "id": "11",
      "seqId": 11,
      "kind": "course",
      "name": "Arquitectura de Computadoras",
      "code": "ACO",
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
      "requirements": {}
    },
    {
      "id": "12",
      "seqId": 12,
      "kind": "course",
      "name": "Estadística y Exploración de Datos 1",
      "code": "EED1",
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
              "itemId": "4",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "9",
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
              "itemId": "9",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "16",
      "seqId": 13,
      "kind": "course",
      "name": "Análisis Matemático 2",
      "code": "AM2",
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
      "id": "13",
      "seqId": 14,
      "kind": "course",
      "name": "Minería de Datos",
      "code": "MDA",
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
              "itemId": "10",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3",
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
              "itemId": "3",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "14",
      "seqId": 15,
      "kind": "course",
      "name": "Práctica Profesionalizante 1",
      "code": "PP1",
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
              "itemId": "3",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "10",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
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
              "itemId": "10",
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
      "id": "15",
      "seqId": 16,
      "kind": "course",
      "name": "Estructuras de Datos",
      "code": "ED",
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
      "id": "19",
      "seqId": 17,
      "kind": "course",
      "name": "Estadística y Exploración de Datos 2",
      "code": "EED2",
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
      "seqId": 18,
      "kind": "course",
      "name": "Tecnología y Sociedad",
      "code": "TYS",
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
      "id": "17",
      "seqId": 19,
      "kind": "course",
      "name": "Aprendizaje Automático 1",
      "code": "AA1",
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
      "id": "20",
      "seqId": 20,
      "kind": "course",
      "name": "Procesamiento de Habla",
      "code": "PH",
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
              "itemId": "3",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "10",
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
              "itemId": "10",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "18",
      "seqId": 21,
      "kind": "course",
      "name": "Procesamiento de Datos",
      "code": "PD",
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "15",
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
              "itemId": "15",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "25",
      "seqId": 22,
      "kind": "course",
      "name": "Gestión de Proyectos",
      "code": "GPR",
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
      "requirements": {}
    },
    {
      "id": "23",
      "seqId": 23,
      "kind": "course",
      "name": "Procesamiento de Imágenes",
      "code": "PIM",
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
      "id": "26",
      "seqId": 24,
      "kind": "course",
      "name": "Aprendizaje Automático 2",
      "code": "AA2",
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
      "seqId": 25,
      "kind": "course",
      "name": "Desarrollo de Sistemas de Inteligencia Artificial",
      "code": "DSIA",
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
            }
          ]
        }
      }
    },
    {
      "id": "22",
      "seqId": 26,
      "kind": "course",
      "name": "Práctica Profesionalizante 2",
      "code": "PP2",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "18",
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
              "itemId": "18",
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
      "id": "29",
      "seqId": 27,
      "kind": "course",
      "name": "Ética y Deontología Profesional",
      "code": "EDP",
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
      "requirements": {}
    },
    {
      "id": "27",
      "seqId": 28,
      "kind": "course",
      "name": "Práctica Profesionalizante 3",
      "code": "PP3",
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
              "itemId": "26",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "24",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "25",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "22",
              "state": "taken"
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
              "itemId": "22",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "30",
      "seqId": 29,
      "kind": "course",
      "name": "Sistemas Expertos",
      "code": "SIE",
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
      "id": "28",
      "seqId": 30,
      "kind": "course",
      "name": "Verificación y Validación de Software",
      "code": "VVS",
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
              "itemId": "1",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "18",
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
              "itemId": "18",
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
      "name": "Seguridad y Protección de la Información",
      "code": "SPI",
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
          "itemId": "11",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "11",
          "state": "passed"
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
