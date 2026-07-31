import type { StudyPlanData } from "$lib/study-plan-data";

export const ucaeceLp2023: StudyPlanData = {
  "info": {
    "degreeName": "Licenciatura en Psicología",
    "degreeSlug": "LP",
    "universityName": "Universidad CAECE",
    "universitySlug": "UCAECE",
    "year": 2023,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios (Web)",
        "url": "https://www.ucaece.edu.ar/carrera/lic-en-psicologia-presencial?caece___carrera___curso_de_interes=P049"
      },
      {
        "id": 2,
        "label": "Plan de Estudios (PDF)",
        "url": "https://drive.google.com/file/d/1prxPQVlINUmrdGGmT-fFTkOA8vQkkxe4/view?usp=sharing"
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
      "name": "Biología Humana",
      "code": "2013/05P",
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
      "name": "Sociología",
      "code": "2015/05P",
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
      "name": "Introducción a la Psicología",
      "code": "2115/11P",
      "type": "mandatory",
      "hours": 8,
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
      "name": "Historia de la Psicología",
      "code": "2118/11Z",
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
      "id": "6",
      "seqId": 6,
      "kind": "course",
      "name": "Neurología y Neurociencias",
      "code": "1775/05P",
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
      "id": "5",
      "seqId": 5,
      "kind": "course",
      "name": "Historia Contemporánea",
      "code": "1852/11P",
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
      "name": "Psicología Social",
      "code": "2035/11Z",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "2",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "4",
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
              "itemId": "4",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "8",
      "seqId": 8,
      "kind": "course",
      "name": "Teoría y Práctica en Psicoanálisis I",
      "code": "2116/11Z",
      "type": "mandatory",
      "hours": 8,
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
              "itemId": "3",
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
              "itemId": "3",
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
      "id": "9",
      "seqId": 9,
      "kind": "course",
      "name": "Antropología",
      "code": "1030/05P",
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
      "id": "11",
      "seqId": 11,
      "kind": "course",
      "name": "Lingüística",
      "code": "2004/11P",
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
      "id": "12",
      "seqId": 12,
      "kind": "course",
      "name": "Psicología del Desarrollo I",
      "code": "2117/11Z",
      "type": "mandatory",
      "hours": 8,
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
      "id": "10",
      "seqId": 10,
      "kind": "course",
      "name": "Filosofía",
      "code": "4844/05P",
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
      "id": "15",
      "seqId": 15,
      "kind": "course",
      "name": "Psicopatología",
      "code": "1803/11Z",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "8",
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
              "itemId": "8",
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
      "id": "14",
      "seqId": 14,
      "kind": "course",
      "name": "Psicología del Desarrollo II",
      "code": "2119/11Z",
      "type": "mandatory",
      "hours": 8,
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
      "id": "16",
      "seqId": 16,
      "kind": "course",
      "name": "Teoría y Práctica en Psicoanálisis II",
      "code": "2120/11Z",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "11",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "8",
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
      "id": "13",
      "seqId": 13,
      "kind": "course",
      "name": "Filosofía Contemporánea",
      "code": "5502/11P",
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
      "id": "19",
      "seqId": 19,
      "kind": "course",
      "name": "Estadística Aplicada a la Psicología e Investigación",
      "code": "2121/11P",
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
      "id": "20",
      "seqId": 20,
      "kind": "course",
      "name": "Psicoterapias Cognitivas",
      "code": "2122/11Z",
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
      "id": "17",
      "seqId": 17,
      "kind": "course",
      "name": "Clínica Psicopatológica",
      "code": "2123/11Z",
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
              "itemId": "14",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "15",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "16",
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
              "itemId": "14",
              "state": "passed"
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
              "itemId": "25",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "18",
      "seqId": 18,
      "kind": "course",
      "name": "Dinámica de Grupos",
      "code": "2177/11Z",
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
      "name": "Psicología de la Educación",
      "code": "2046/11Z",
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
      "id": "23",
      "seqId": 23,
      "kind": "course",
      "name": "Teorías y Técnicas de la Exploración y Evaluación Psicológica I",
      "code": "2136/11P",
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
          "type": "item",
          "itemId": "19",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "19",
          "state": "passed"
        }
      }
    },
    {
      "id": "21",
      "seqId": 21,
      "kind": "course",
      "name": "Métodos de Investigación",
      "code": "2191/11P",
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
              "itemId": "13",
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
              "itemId": "13",
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
      "id": "25",
      "seqId": 24,
      "kind": "course",
      "name": "Inglés Técnico",
      "code": "1001/91",
      "type": "mandatory",
      "hours": 0,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "26",
      "seqId": 25,
      "kind": "course",
      "name": "Psicología de las Instituciones y Organizaciones",
      "code": "1780/11Z",
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
      "id": "27",
      "seqId": 26,
      "kind": "course",
      "name": "Psicofarmacología",
      "code": "1791/11Z",
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
      "id": "28",
      "seqId": 27,
      "kind": "course",
      "name": "Teoría y Técnica de la Clínica Sistémica",
      "code": "2127/11Z",
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
      "id": "29",
      "seqId": 28,
      "kind": "course",
      "name": "Teorías y Técnicas de la Exploración y Evaluación Psicológica II",
      "code": "2137/11Z",
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
              "itemId": "8",
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
              "itemId": "8",
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
      "id": "30",
      "seqId": 29,
      "kind": "course",
      "name": "Clínica de Niños y Adolescentes",
      "code": "1793/11Z",
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
      "id": "33",
      "seqId": 32,
      "kind": "course",
      "name": "Psicología del Trabajo",
      "code": "1794/11Z",
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
          "type": "item",
          "itemId": "26",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "26",
          "state": "passed"
        }
      }
    },
    {
      "id": "31",
      "seqId": 30,
      "kind": "course",
      "name": "Cultura y Problemáticas Psicosociales",
      "code": "2128/11Z",
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
              "itemId": "9",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "26",
              "state": "taken"
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
              "itemId": "26",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "32",
      "seqId": 31,
      "kind": "course",
      "name": "Epistemología",
      "code": "5521/11P",
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
      "id": "36",
      "seqId": 35,
      "kind": "course",
      "name": "Psicología Forense y Jurisprudencia",
      "code": "1799/11Z",
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
      "id": "34",
      "seqId": 33,
      "kind": "course",
      "name": "Clínica de Adultos y Gerontes",
      "code": "2130/11Z",
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
              "itemId": "30",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "37",
      "seqId": 36,
      "kind": "course",
      "name": "Salud Mental y Comunitaria",
      "code": "2131/11Z",
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
              "itemId": "20",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "31",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "20",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "28",
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
      "id": "35",
      "seqId": 34,
      "kind": "course",
      "name": "Prácticas Profesionales Supervisadas I",
      "code": "2132/11Z",
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
              "itemId": "20",
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
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "20",
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
            }
          ]
        }
      }
    },
    {
      "id": "38",
      "seqId": 37,
      "kind": "course",
      "name": "Ética y Deontología Profesional",
      "code": "1180/11P",
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
      "id": "39",
      "seqId": 38,
      "kind": "course",
      "name": "Prácticas Profesionales Supervisadas II",
      "code": "2133/11Z",
      "type": "mandatory",
      "hours": 8,
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
              "itemId": "34",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "35",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "34",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "35",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "40",
      "seqId": 39,
      "kind": "course",
      "name": "Psiconeuroinmunoendocrinología",
      "code": "2134/11Z",
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
              "itemId": "20",
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
              "itemId": "34",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "20",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "31",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "34",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "41",
      "seqId": 40,
      "kind": "course",
      "name": "Trabajo Integrador Final",
      "code": "2135/11Z",
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
