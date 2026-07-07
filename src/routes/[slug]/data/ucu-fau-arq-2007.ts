import type { StudyPlanData } from '$lib/study-plan-data';

export const ucuFauArq2007: StudyPlanData = {
  "info": {
    "degreeName": "Arquitectura",
    "degreeSlug": "ARQ",
    "universityName": "Universidad de Concepción del Uruguay",
    "universitySlug": "UCU",
    "collegeName": "Facultad de Arquitectura y Urbanismo",
    "collegeSlug": "FAU",
    "year": 2007,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios",
        "url": "https://ucu.edu.ar/project/arquitecto-a/"
      },
      {
        "id": 2,
        "label": "Correlativas para cursar",
        "url": "https://drive.google.com/file/d/1M6FKoKi3z9XypMPOVQdY_1h9lwD_Dwra/view"
      },
      {
        "id": 3,
        "label": "Correlativas para rendir",
        "url": "https://drive.google.com/file/d/1ovdo9xZ1tckg38yiMiDbhBsiRnGvfu8d/view"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "Para cursar **Proyecto Final**, deberás tener al menos una materia optativa _aprobada_, o bien, **Gestión Ambiental** _regular_."
      },
      {
        "id": 2,
        "text": "Para rendir **Proyecto Final**, deberás tener al menos una materia optativa _aprobada_."
      },
      {
        "id": 3,
        "text": "Es requisito para egresarse realizar la **Práctica Profesional Supervisada**."
      },
      {
        "id": 4,
        "text": "Se omiten requisitos redundantes. Por ejemplo, **Introducción a la Arquitectura** de 1<sup>er</sup> año _aprobada_ no se exige para rendir **Arquitectura II** de 2<sup>do</sup> año porque ya es requisito para rendir **Arquitectura I** de 1<sup>er</sup> año, que también debe estar _aprobada_ para rendir **Arquitectura II**."
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
      "name": "Introducción a la Arquitectura",
      "code": "1.01",
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
      "id": "2",
      "seqId": 2,
      "kind": "course",
      "name": "Técnicas de Representación I",
      "code": "1.02",
      "type": "mandatory",
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
      "name": "Sistemas de Representación I",
      "code": "1.03",
      "type": "mandatory",
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
      "name": "Matemática I",
      "code": "1.04",
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
      "seqId": 5,
      "kind": "course",
      "name": "Introducción a la Construcción",
      "code": "1.05",
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
      "id": "6",
      "seqId": 6,
      "kind": "course",
      "name": "Arquitectura I",
      "code": "1.06",
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
              "state": "inProgress"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "1",
          "state": "passed"
        }
      }
    },
    {
      "id": "7",
      "seqId": 7,
      "kind": "course",
      "name": "Matemática II",
      "code": "1.07",
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
      "id": "8",
      "seqId": 8,
      "kind": "course",
      "name": "Construcciones I",
      "code": "1.08",
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
      "id": "9",
      "seqId": 9,
      "kind": "course",
      "name": "Arquitectura II",
      "code": "2.01",
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
              "itemId": "2",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
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
      "name": "Técnicas de Representación II",
      "code": "2.02",
      "type": "mandatory",
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
          "itemId": "2",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "2",
          "state": "passed"
        }
      }
    },
    {
      "id": "11",
      "seqId": 11,
      "kind": "course",
      "name": "Sistemas de Representación II",
      "code": "2.03",
      "type": "mandatory",
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
        },
        "complete": {
          "type": "item",
          "itemId": "3",
          "state": "passed"
        }
      }
    },
    {
      "id": "12",
      "seqId": 12,
      "kind": "course",
      "name": "Matemática III e Introducción a la Física",
      "code": "2.04",
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
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "7",
          "state": "passed"
        }
      }
    },
    {
      "id": "13",
      "seqId": 13,
      "kind": "course",
      "name": "Computación Gráfica I",
      "code": "2.05",
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
      "id": "14",
      "seqId": 14,
      "kind": "course",
      "name": "Instalaciones I",
      "code": "2.06",
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
      "id": "15",
      "seqId": 15,
      "kind": "course",
      "name": "Historia de la Arquitectura I",
      "code": "2.07",
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
      "id": "16",
      "seqId": 16,
      "kind": "course",
      "name": "Arquitectura III",
      "code": "2.08",
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
              "itemId": "9",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "10",
              "state": "inProgress"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "9",
          "state": "passed"
        }
      }
    },
    {
      "id": "17",
      "seqId": 17,
      "kind": "course",
      "name": "Estructuras I",
      "code": "2.09",
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
      "id": "18",
      "seqId": 18,
      "kind": "course",
      "name": "Computación Gráfica II",
      "code": "2.10",
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
          "itemId": "13",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "13",
          "state": "passed"
        }
      }
    },
    {
      "id": "19",
      "seqId": 19,
      "kind": "course",
      "name": "Instalaciones II",
      "code": "2.11",
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
      "id": "20",
      "seqId": 20,
      "kind": "course",
      "name": "Historia de la Arquitectura II",
      "code": "2.12",
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
      "id": "21",
      "seqId": 21,
      "kind": "course",
      "name": "Metodología de la Investigación",
      "code": "2.13",
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
      "id": "22",
      "seqId": 22,
      "kind": "course",
      "name": "Arquitectura IV",
      "code": "3.01",
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
              "itemId": "10",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "16",
              "state": "passed"
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
              "itemId": "16",
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
      "name": "Técnicas de Representación III",
      "code": "3.02",
      "type": "mandatory",
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
          "itemId": "10",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "10",
          "state": "passed"
        }
      }
    },
    {
      "id": "24",
      "seqId": 24,
      "kind": "course",
      "name": "Documentación de Obra",
      "code": "3.03",
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
          "itemId": "11",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "11",
          "state": "passed"
        }
      }
    },
    {
      "id": "25",
      "seqId": 25,
      "kind": "course",
      "name": "Estructuras II",
      "code": "3.04",
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
              "itemId": "7",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "17",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "17",
          "state": "passed"
        }
      }
    },
    {
      "id": "26",
      "seqId": 26,
      "kind": "course",
      "name": "Construcciones II",
      "code": "3.05",
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
              "itemId": "5",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "19",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "19",
          "state": "passed"
        }
      }
    },
    {
      "id": "27",
      "seqId": 27,
      "kind": "course",
      "name": "Historia de la Arquitectura III",
      "code": "3.06",
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
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "20",
          "state": "passed"
        }
      }
    },
    {
      "id": "28",
      "seqId": 28,
      "kind": "course",
      "name": "Computación Gráfica III",
      "code": "Op1",
      "type": "optative",
      "tags": [
        "progress-elective",
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
      "id": "29",
      "seqId": 29,
      "kind": "course",
      "name": "Arquitectura V",
      "code": "3.07",
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
              "itemId": "22",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "23",
              "state": "inProgress"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "22",
          "state": "passed"
        }
      }
    },
    {
      "id": "30",
      "seqId": 30,
      "kind": "course",
      "name": "Estructuras III",
      "code": "3.08",
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
              "itemId": "12",
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
      "id": "31",
      "seqId": 31,
      "kind": "course",
      "name": "Construcciones III",
      "code": "3.09",
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
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "26",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "26",
          "state": "passed"
        }
      }
    },
    {
      "id": "32",
      "seqId": 32,
      "kind": "course",
      "name": "Historia de la Arquitectura IV",
      "code": "3.10",
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
              "itemId": "20",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "27",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "27",
          "state": "passed"
        }
      }
    },
    {
      "id": "33",
      "seqId": 33,
      "kind": "course",
      "name": "Arquitectura Legal y Ética Profesional",
      "code": "3.11",
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
          "itemId": "8",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "8",
          "state": "passed"
        }
      }
    },
    {
      "id": "34",
      "seqId": 34,
      "kind": "course",
      "name": "Arquitectura VI",
      "code": "4.01",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "23",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "passed"
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
              "itemId": "29",
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
      "name": "Dirección y Organización de Obra I",
      "code": "4.02",
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
          "itemId": "31",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "31",
          "state": "passed"
        }
      }
    },
    {
      "id": "36",
      "seqId": 36,
      "kind": "course",
      "name": "Estructuras IV",
      "code": "4.03",
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
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "30",
          "state": "passed"
        }
      }
    },
    {
      "id": "37",
      "seqId": 37,
      "kind": "course",
      "name": "Instalaciones III",
      "code": "4.04",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "19",
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
      "id": "38",
      "seqId": 38,
      "kind": "course",
      "name": "Historia Política, Social y Económica de la Arquitectura Argentina I",
      "code": "4.05",
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
          "itemId": "32",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "32",
          "state": "passed"
        }
      }
    },
    {
      "id": "39",
      "seqId": 39,
      "kind": "course",
      "name": "Patrimonio y Conservación",
      "code": "4.06",
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
          "itemId": "20",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "20",
          "state": "passed"
        }
      }
    },
    {
      "id": "40",
      "seqId": 40,
      "kind": "course",
      "name": "Taller de Creatividad",
      "code": "Op2",
      "type": "optative",
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
          "type": "item",
          "itemId": "23",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "23",
          "state": "passed"
        }
      }
    },
    {
      "id": "41",
      "seqId": 41,
      "kind": "course",
      "name": "Arquitectura VII",
      "code": "4.07",
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
          "itemId": "34",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "34",
          "state": "passed"
        }
      }
    },
    {
      "id": "42",
      "seqId": 42,
      "kind": "course",
      "name": "Teoría y Crítica de la Arquitectura y el Urbanismo",
      "code": "4.08",
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
          "itemId": "34",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "34",
          "state": "passed"
        }
      }
    },
    {
      "id": "43",
      "seqId": 43,
      "kind": "course",
      "name": "Dirección y Organización de Obra II",
      "code": "4.09",
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
      "id": "44",
      "seqId": 44,
      "kind": "course",
      "name": "Estructuras V",
      "code": "4.10",
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
              "itemId": "30",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "36",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "36",
          "state": "passed"
        }
      }
    },
    {
      "id": "45",
      "seqId": 45,
      "kind": "course",
      "name": "Infraestructura Urbana",
      "code": "4.11",
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
      "id": "46",
      "seqId": 46,
      "kind": "course",
      "name": "Historia Política, Social y Económica de la Arquitectura Argentina II",
      "code": "4.12",
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
              "itemId": "27",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "38",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "38",
          "state": "passed"
        }
      }
    },
    {
      "id": "47",
      "seqId": 47,
      "kind": "course",
      "name": "Gestión Ambiental",
      "code": "Op3",
      "type": "optative",
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
      "id": "48",
      "seqId": 48,
      "kind": "course",
      "name": "Planificación Urbanística",
      "code": "5.01",
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
          "type": "item",
          "itemId": "41",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "41",
          "state": "passed"
        }
      }
    },
    {
      "id": "50",
      "seqId": 49,
      "kind": "course",
      "name": "Proyecto Final",
      "code": "5.02",
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
              "itemId": "18",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "24",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "33",
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
            },
            {
              "type": "item",
              "itemId": "37",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "38",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "39",
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
            },
            {
              "type": "item",
              "itemId": "45",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "46",
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
              "itemId": "21",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "24",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "33",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "39",
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
            },
            {
              "type": "item",
              "itemId": "45",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "46",
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
