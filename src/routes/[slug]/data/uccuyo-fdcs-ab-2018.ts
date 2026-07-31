import type { StudyPlanData } from '$lib/study-plan-data';

export const uccuyoFdcsAb2018: StudyPlanData = {
  "info": {
    "degreeName": "Abogacía",
    "degreeSlug": "AB",
    "universityName": "Universidad Católica de Cuyo",
    "universitySlug": "UCCuyo",
    "collegeName": "Facultad de Derecho y Ciencias Sociales",
    "collegeSlug": "FDCS",
    "year": 2018,
    "sources": [
      {
        "id": 1,
        "label": "Tabla de correlatividades 2021 - Abogacía Plan 2018 (Sede San Luis)",
        "url": "https://drive.google.com/file/d/1SdCGKb0X76Jio6FCHXiJV78BdTHzkd_G/view"
      },
      {
        "id": 2,
        "label": "Plan de Estudios 2018 - Abogacía",
        "url": "https://derecho.uccuyosl.edu.ar/wp-content/uploads/2026/02/PlandeEstudio2018_Abogacia.pdf"
      },
      {
        "id": 3,
        "label": "Resolución N° 0526-CS-2018",
        "url": "https://derecho.uccuyosl.edu.ar/wp-content/uploads/2026/02/RESOLUCION_N0526.pdf"
      },
      {
        "id": 4,
        "label": "Resolución N° 65-C.D/F.D.yCs.Soc./2022",
        "url": "https://drive.google.com/file/d/1OSqNLVcivaKDojSvOG7e_kXFnOFTas1Y/view?usp=sharing"
      }
    ],
    "notes": []
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
      "name": "Derecho Penal I",
      "code": "1",
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
      "requirements": {
        "complete": {
          "type": "item",
          "itemId": "4",
          "state": "passed"
        }
      }
    },
    {
      "id": "2",
      "seqId": 2,
      "kind": "course",
      "name": "Nociones Elementales del Derecho Privado",
      "code": "2",
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
      "requirements": {
        "complete": {
          "type": "item",
          "itemId": "4",
          "state": "passed"
        }
      }
    },
    {
      "id": "3",
      "seqId": 3,
      "kind": "course",
      "name": "Introducción a la Filosofía",
      "code": "3",
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
      "name": "Teoría General del Derecho",
      "code": "4",
      "type": "mandatory",
      "hours": 5,
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
      "name": "Oratoria y Análisis Crítico de Textos Jurídicos",
      "code": "5",
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
      "id": "6",
      "seqId": 6,
      "kind": "course",
      "name": "Sociología",
      "code": "6",
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
      "name": "Derecho Comercial - Títulos de Crédito",
      "code": "7",
      "type": "mandatory",
      "hours": 5,
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
      "id": "8",
      "seqId": 8,
      "kind": "course",
      "name": "Derecho de las Obligaciones",
      "code": "8",
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
      "seqId": 9,
      "kind": "course",
      "name": "Derecho de Daños",
      "code": "9",
      "type": "mandatory",
      "hours": 5,
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
      "id": "10",
      "seqId": 10,
      "kind": "course",
      "name": "Derecho Penal II",
      "code": "10",
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
      "name": "Conformación Histórico-Política del Estado Argentino",
      "code": "11",
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
      "requirements": {}
    },
    {
      "id": "12",
      "seqId": 12,
      "kind": "course",
      "name": "Nociones de Ciencias Políticas",
      "code": "12",
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
      "id": "13",
      "seqId": 13,
      "kind": "course",
      "name": "Razonamiento Jurídico Aplicado",
      "code": "13",
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
      "id": "14",
      "seqId": 14,
      "kind": "course",
      "name": "Teología I",
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
      "name": "Contratos Civiles y Comerciales I",
      "code": "15",
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
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
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
      "id": "16",
      "seqId": 16,
      "kind": "course",
      "name": "Contratos Civiles y Comerciales II",
      "code": "16",
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
              "itemId": "15",
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
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "15",
          "state": "passed"
        }
      }
    },
    {
      "id": "17",
      "seqId": 17,
      "kind": "course",
      "name": "Derecho Comercial - Análisis Económico del Derecho",
      "code": "17",
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
              "itemId": "7",
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
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
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
      "id": "18",
      "seqId": 18,
      "kind": "course",
      "name": "Derecho Constitucional",
      "code": "18",
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
              "itemId": "12",
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
            },
            {
              "type": "item",
              "itemId": "6",
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
      "id": "19",
      "seqId": 19,
      "kind": "course",
      "name": "Personas Jurídicas Civiles y Comerciales",
      "code": "19",
      "type": "mandatory",
      "hours": 6,
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
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
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
      "id": "20",
      "seqId": 20,
      "kind": "course",
      "name": "Derecho Procesal Penal",
      "code": "20",
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
            },
            {
              "type": "item",
              "itemId": "6",
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
      "id": "21",
      "seqId": 21,
      "kind": "course",
      "name": "Introducción a las Ciencias Económicas",
      "code": "21",
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
              "itemId": "7",
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
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
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
      "id": "22",
      "seqId": 22,
      "kind": "course",
      "name": "Filosofía del Derecho",
      "code": "22",
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
              "itemId": "23",
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
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "23",
          "state": "passed"
        }
      }
    },
    {
      "id": "23",
      "seqId": 23,
      "kind": "course",
      "name": "Historia Comparada del Derecho",
      "code": "23",
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
              "itemId": "18",
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
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "18",
          "state": "passed"
        }
      }
    },
    {
      "id": "24",
      "seqId": 24,
      "kind": "course",
      "name": "Teología II",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "14",
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
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "14",
          "state": "passed"
        }
      }
    },
    {
      "id": "25",
      "seqId": 25,
      "kind": "course",
      "name": "Derechos Humanos",
      "code": "25",
      "type": "mandatory",
      "hours": 6,
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
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "18",
          "state": "passed"
        }
      }
    },
    {
      "id": "26",
      "seqId": 26,
      "kind": "course",
      "name": "Derecho Comercial - Concursos y Quiebras",
      "code": "26",
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
              "itemId": "17",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
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
          "type": "item",
          "itemId": "17",
          "state": "passed"
        }
      }
    },
    {
      "id": "27",
      "seqId": 27,
      "kind": "course",
      "name": "Derecho Internacional Público y Derecho de la Integración",
      "code": "27",
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
              "itemId": "25",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
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
          "type": "item",
          "itemId": "25",
          "state": "passed"
        }
      }
    },
    {
      "id": "28",
      "seqId": 28,
      "kind": "course",
      "name": "Derecho Laboral",
      "code": "28",
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
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
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
          "type": "item",
          "itemId": "16",
          "state": "passed"
        }
      }
    },
    {
      "id": "29",
      "seqId": 29,
      "kind": "course",
      "name": "Derecho de la Seguridad Social",
      "code": "29",
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
              "itemId": "7",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
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
        }
      }
    },
    {
      "id": "30",
      "seqId": 30,
      "kind": "course",
      "name": "Derecho Procesal Civil y Comercial I",
      "code": "30",
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
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
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
              "itemId": "16",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "26",
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
      "name": "Doctrina Social de la Iglesia",
      "code": "31",
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
              "itemId": "24",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
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
          "type": "item",
          "itemId": "24",
          "state": "passed"
        }
      }
    },
    {
      "id": "32",
      "seqId": 32,
      "kind": "course",
      "name": "Derechos Reales",
      "code": "32",
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
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
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
          "type": "item",
          "itemId": "16",
          "state": "passed"
        }
      }
    },
    {
      "id": "33",
      "seqId": 33,
      "kind": "course",
      "name": "Optativa I",
      "code": "33",
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
              "itemId": "7",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
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
        }
      }
    },
    {
      "id": "34",
      "seqId": 34,
      "kind": "course",
      "name": "Derecho Administrativo",
      "code": "34",
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
      "id": "35",
      "seqId": 35,
      "kind": "course",
      "name": "Derecho de Familia",
      "code": "35",
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
              "itemId": "32",
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
            },
            {
              "type": "item",
              "itemId": "25",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "32",
          "state": "passed"
        }
      }
    },
    {
      "id": "36",
      "seqId": 36,
      "kind": "course",
      "name": "Derecho de los Recursos Naturales y Protección del Medio Ambiente",
      "code": "36",
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
      "id": "37",
      "seqId": 37,
      "kind": "course",
      "name": "Derecho del Consumidor y del Usuario",
      "code": "37",
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
      "id": "38",
      "seqId": 38,
      "kind": "course",
      "name": "Derecho Internacional Privado",
      "code": "38",
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
      "id": "39",
      "seqId": 39,
      "kind": "course",
      "name": "Derecho Sucesorio",
      "code": "39",
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
              "itemId": "35",
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
            },
            {
              "type": "item",
              "itemId": "25",
              "state": "passed"
            }
          ]
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
      "name": "Finanzas Públicas y Derecho Tributario",
      "code": "40",
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
      "id": "41",
      "seqId": 41,
      "kind": "course",
      "name": "Optativa II",
      "code": "41",
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
      "id": "42",
      "seqId": 42,
      "kind": "course",
      "name": "Derecho Procesal Civil y Comercial II",
      "code": "42",
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
              "itemId": "30",
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
            },
            {
              "type": "item",
              "itemId": "25",
              "state": "passed"
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
      "id": "43",
      "seqId": 43,
      "kind": "course",
      "name": "Ética Profesional",
      "code": "43",
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
      "id": "44",
      "seqId": 44,
      "kind": "course",
      "name": "Metodología de la Investigación",
      "code": "44",
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
            },
            {
              "type": "item",
              "itemId": "25",
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
      }
    ]
  }
};
