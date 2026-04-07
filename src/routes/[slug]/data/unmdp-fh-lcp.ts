import type { StudyPlanData } from '$lib/study-plan-data';

export const unmdpFhLcp: StudyPlanData = {
  "info": {
    "degreeName": "Licenciatura en Ciencia Política",
    "degreeSlug": "LCP",
    "universityName": "Universidad Nacional de Mar del Plata",
    "universitySlug": "UNMDP",
    "collegeName": "Facultad de Humanidades",
    "collegeSlug": "FH",
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios",
        "url": "https://humanidades.mdp.edu.ar/departamento-de-ciencia-politica/licenciatura-en-ciencia-politica/"
      },
      {
        "id": 2,
        "label": "Estructura de Cursada Recomendada",
        "url": "https://drive.google.com/file/d/1F6Ar-Cd-J22RWTlW11DKKUZK0gZJAsyl/view?usp=sharing"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "El **Seminario 2** (5° año) es a elección del estudiante."
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
      "name": "Taller de Aprendizaje Científico y Académico",
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
      "name": "Introducción a la Ciencia Política",
      "code": "02",
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
      "id": "3",
      "seqId": 3,
      "kind": "course",
      "name": "Introducción a la Sociología",
      "code": "03",
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
      "id": "4",
      "seqId": 4,
      "kind": "course",
      "name": "Teoría y Metodología de la Investigación Social",
      "code": "04",
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
      "id": "5",
      "seqId": 5,
      "kind": "course",
      "name": "Teoría Política I",
      "code": "05",
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
      "id": "6",
      "seqId": 6,
      "kind": "course",
      "name": "Filosofía",
      "code": "06",
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
      "id": "7",
      "seqId": 7,
      "kind": "course",
      "name": "Metodología Cualitativa",
      "code": "07",
      "type": "mandatory",
      "hours": 6,
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
      "id": "8",
      "seqId": 8,
      "kind": "course",
      "name": "Teoría Política II",
      "code": "08",
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
            }
          ]
        }
      }
    },
    {
      "id": "9",
      "seqId": 9,
      "kind": "course",
      "name": "Metodología Cuantitativa I",
      "code": "09",
      "type": "mandatory",
      "hours": 6,
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
      "id": "10",
      "seqId": 10,
      "kind": "course",
      "name": "Principios de Economía",
      "code": "10",
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
      "requirements": {}
    },
    {
      "id": "11",
      "seqId": 11,
      "kind": "course",
      "name": "Historia General Americana Contemporánea",
      "code": "11",
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
      "requirements": {}
    },
    {
      "id": "12",
      "seqId": 12,
      "kind": "course",
      "name": "Derecho Político",
      "code": "12",
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
              "itemId": "2",
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
              "itemId": "2",
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
      "seqId": 13,
      "kind": "course",
      "name": "Geografía Política",
      "code": "13",
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
      "id": "14",
      "seqId": 14,
      "kind": "course",
      "name": "Metodología Cuantitativa II",
      "code": "14",
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
      "id": "15",
      "seqId": 15,
      "kind": "course",
      "name": "Historia Universal Contemporánea",
      "code": "15",
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
      "requirements": {}
    },
    {
      "id": "16",
      "seqId": 16,
      "kind": "course",
      "name": "Opinión Pública",
      "code": "16",
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
              "itemId": "4",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "5",
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
              "itemId": "5",
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
      "id": "17",
      "seqId": 17,
      "kind": "course",
      "name": "Sistemas Políticos Comparados",
      "code": "17",
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
              "itemId": "15",
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
              "itemId": "15",
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
      "id": "18",
      "seqId": 18,
      "kind": "course",
      "name": "Historia General Argentina I",
      "code": "18",
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
              "itemId": "2",
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
              "itemId": "2",
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
      "id": "19",
      "seqId": 19,
      "kind": "course",
      "name": "Sociología del Estado y Políticas Públicas",
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
      "id": "20",
      "seqId": 20,
      "kind": "course",
      "name": "Política Exterior Argentina",
      "code": "20",
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
              "itemId": "4",
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
              "itemId": "4",
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
      "id": "21",
      "seqId": 21,
      "kind": "course",
      "name": "Historia Argentina General II",
      "code": "21",
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
      "id": "22",
      "seqId": 22,
      "kind": "course",
      "name": "Política Internacional Contemporánea",
      "code": "22",
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
              "itemId": "8",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "16",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "17",
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
              "itemId": "16",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "17",
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
      "name": "Administración Pública Comparada",
      "code": "23",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "19",
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
      "name": "Partidos Políticos y Sistemas Electorales",
      "code": "24",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "8",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "25",
      "seqId": 25,
      "kind": "course",
      "name": "Análisis del Discurso y Comunicación Política",
      "code": "25",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "5",
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
      "id": "26",
      "seqId": 26,
      "kind": "course",
      "name": "Estructura Social Argentina",
      "code": "26",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "18",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "21",
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
            }
          ]
        }
      }
    },
    {
      "id": "27",
      "seqId": 27,
      "kind": "course",
      "name": "Seminario 1. Teoría Política Contemporánea",
      "code": "27",
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
              "itemId": "19",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "17",
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
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "17",
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
      "name": "Seminario 2. A elección",
      "code": "28",
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
              "itemId": "19",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "17",
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
              "itemId": "8",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "17",
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
      "name": "Seminario de Investigación en Ciencia Política",
      "code": "29",
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
              "itemId": "9",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
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
              "itemId": "9",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "8",
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
      "id": "30",
      "seqId": 30,
      "kind": "course",
      "name": "Práctica Profesional",
      "code": "30",
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
      "requirements": {}
    },
    {
      "id": "31",
      "seqId": 31,
      "kind": "course",
      "name": "Tesis de Licenciatura",
      "code": "31",
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
          "itemId": "29",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "29",
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
