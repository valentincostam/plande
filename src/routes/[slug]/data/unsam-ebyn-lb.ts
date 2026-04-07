import type { StudyPlanData } from '$lib/study-plan-data';

export const unsamEbynLb: StudyPlanData = {
  "info": {
    "degreeName": "Licenciatura en Biotecnología",
    "degreeSlug": "LB",
    "universityName": "Universidad Nacional de San Martín",
    "universitySlug": "UNSAM",
    "collegeName": "Escuela de Bio y Nanotecnologías",
    "collegeSlug": "EByN",
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios (Web)",
        "url": "https://www.unsam.edu.ar/escuelas/ebyn/233/ebyn/biotecnologia"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "Para cursar asignaturas del **7° cuatrimestre o posteriores** (4<sup>to</sup> año en adelante), se debe haber aprobado un examen de suficiencia de idioma **inglés escrito**, consistente en la lectura y comprensión de textos científicos."
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
      "name": "Análisis I",
      "code": "N1",
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
      "id": "102",
      "seqId": 2,
      "kind": "course",
      "name": "Ciencia, Tecnología y Sociedad",
      "code": "CB02",
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
      "id": "103",
      "seqId": 3,
      "kind": "course",
      "name": "Química General",
      "code": "CB03",
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
      "id": "104",
      "seqId": 4,
      "kind": "course",
      "name": "Biología I",
      "code": "CB04",
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
      "seqId": 5,
      "kind": "course",
      "name": "Introducción a la Biotecnología",
      "code": "N2",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "104",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "102",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "104",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "102",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "106",
      "seqId": 6,
      "kind": "course",
      "name": "Álgebra y Geometría Analítica",
      "code": "CB06",
      "type": "mandatory",
      "hours": 6,
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
      "id": "107",
      "seqId": 7,
      "kind": "course",
      "name": "Biología II",
      "code": "CB07",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "103",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "104",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "103",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "104",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "108",
      "seqId": 8,
      "kind": "course",
      "name": "Química Inorgánica",
      "code": "CB08",
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
              "itemId": "1",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "103",
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
              "itemId": "103",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "112",
      "seqId": 9,
      "kind": "course",
      "name": "Química Orgánica",
      "code": "CB12",
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
          "itemId": "108",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "108",
          "state": "passed"
        }
      }
    },
    {
      "id": "10",
      "seqId": 10,
      "kind": "course",
      "name": "Análisis II",
      "code": "N10",
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
      "id": "110",
      "seqId": 11,
      "kind": "course",
      "name": "Física I",
      "code": "CB10",
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
      "id": "3",
      "seqId": 12,
      "kind": "course",
      "name": "Física II",
      "code": "N3",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "10",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "110",
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
              "itemId": "110",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "111",
      "seqId": 13,
      "kind": "course",
      "name": "Biología III",
      "code": "CB11",
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
          "type": "item",
          "itemId": "107",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "107",
          "state": "passed"
        }
      }
    },
    {
      "id": "114",
      "seqId": 14,
      "kind": "course",
      "name": "Estadística Aplicada",
      "code": "CB14",
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
              "itemId": "106",
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
              "itemId": "106",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "4",
      "seqId": 15,
      "kind": "course",
      "name": "Química Biológica I",
      "code": "N4",
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
              "itemId": "107",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "112",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "107",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "112",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "116",
      "seqId": 16,
      "kind": "course",
      "name": "Fisicoquímica",
      "code": "CB16",
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
              "itemId": "108",
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
              "itemId": "108",
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
      "id": "117",
      "seqId": 17,
      "kind": "course",
      "name": "Genética General",
      "code": "CB17",
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
              "itemId": "107",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "114",
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
              "itemId": "107",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "114",
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
      "id": "5",
      "seqId": 18,
      "kind": "course",
      "name": "Química Biológica II",
      "code": "N5",
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
      "id": "119",
      "seqId": 19,
      "kind": "course",
      "name": "Biología IV",
      "code": "CB19",
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
              "itemId": "107",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "112",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "107",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "112",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "11",
      "seqId": 20,
      "kind": "course",
      "name": "Microbiología",
      "code": "N11",
      "type": "mandatory",
      "hours": 12,
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
              "itemId": "2",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "5",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "117",
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
              "itemId": "5",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "117",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "122",
      "seqId": 21,
      "kind": "course",
      "name": "Biología Celular",
      "code": "CB22",
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
              "itemId": "5",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "111",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "5",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "111",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "7",
      "seqId": 22,
      "kind": "course",
      "name": "Introducción a la Bioinformática",
      "code": "N7",
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
              "itemId": "114",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "107",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "114",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "107",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "123",
      "seqId": 23,
      "kind": "course",
      "name": "Inmunología Básica",
      "code": "CB23",
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
              "itemId": "5",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "117",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "5",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "117",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "12",
      "seqId": 24,
      "kind": "course",
      "name": "Genética Molecular",
      "code": "N12",
      "type": "mandatory",
      "hours": 14,
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
              "itemId": "117",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "11",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "122",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "117",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "11",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "122",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "6",
      "seqId": 25,
      "kind": "course",
      "name": "Química Analítica",
      "code": "N6",
      "type": "mandatory",
      "hours": 6.5,
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
              "itemId": "112",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "114",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "116",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "112",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "114",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "116",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "157",
      "seqId": 26,
      "kind": "course",
      "name": "Inmunología Molecular",
      "code": "00157",
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
              "itemId": "123",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "123",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "162",
      "seqId": 27,
      "kind": "course",
      "name": "Biotecnología Animal",
      "code": "00162",
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
      "id": "155",
      "seqId": 28,
      "kind": "course",
      "name": "Bioquímica de Proteínas",
      "code": "00155",
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
              "itemId": "5",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "116",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
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
              "itemId": "116",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "159",
      "seqId": 29,
      "kind": "course",
      "name": "Biotecnología Vegetal",
      "code": "00159",
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
              "itemId": "119",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "119",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "8",
      "seqId": 30,
      "kind": "course",
      "name": "Bioprocesos",
      "code": "N8",
      "type": "mandatory",
      "hours": 9,
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
              "itemId": "11",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "12",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "116",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
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
              "itemId": "116",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "13",
      "seqId": 31,
      "kind": "course",
      "name": "Métodos de Análisis de Biomoléculas",
      "code": "N13",
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "157",
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
              "itemId": "6",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "157",
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
      "id": "9",
      "seqId": 32,
      "kind": "course",
      "name": "Proyectos Biotecnológicos",
      "code": "N9",
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
              "itemId": "13",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "159",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "162",
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
              "itemId": "13",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "159",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "162",
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
