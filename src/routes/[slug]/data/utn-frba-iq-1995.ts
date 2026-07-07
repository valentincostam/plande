import type { StudyPlanData } from '$lib/study-plan-data';

export const utnFrbaIq1995: StudyPlanData = {
  "info": {
    "degreeName": "Ingeniería Química",
    "degreeSlug": "IQ",
    "universityName": "Universidad Tecnológica Nacional",
    "universitySlug": "UTN",
    "collegeName": "Facultad Regional Buenos Aires",
    "collegeSlug": "FRBA",
    "year": 1995,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios 1995",
        "url": "https://frba.utn.edu.ar/quimica/plan-estudios-95-adecuado/"
      },
      {
        "id": 2,
        "label": "Correlativas de Plan de Estudios 1995",
        "url": "https://frba.utn.edu.ar/quimica/correlativas-plan-estudios-95-adecuado/"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "Para rendir **Proyecto Final (Integración V)**, es necesario aprobar todas las materias del Plan de Estudios."
      },
      {
        "id": 2,
        "text": "**Práctica Profesional Supervisada** no es una materia pero fue agregada como tal porque es requisito para egresarse. Tiene una carga horaria de 6 horas semanales, obtenido de dividir las 200 horas totales exigidas entre 32 semanas (lo que dura un año académico)."
      },
      {
        "id": 3,
        "text": "Debes aprobar **44 horas de cursado cuatrimestral** (o 22 horas de cursado anual) de materias electivas para cumplir con los requisitos del plan. Las electivas pueden cursarse en cualquier momento durante la carrera, siempre que se cumplan sus correlatividades (requisitos previos)."
      },
      {
        "id": 4,
        "text": "Se omiten requisitos redundantes. Por ejemplo, **Análisis Matemático II** de 1<sup>er</sup> año _regular_ no se exige para cursar **Fisicoquímica** de 3<sup>er</sup> año porque ya es requisito para cursar **Termodinámica** de 3<sup>er</sup> año, que también debe estar _regular_ para rendir **Fisicoquímica**."
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
      "id": "electivas",
      "label": "Materias Electivas"
    }
  ],
  "items": [
    {
      "id": "951190",
      "seqId": 1,
      "kind": "course",
      "name": "Integración I",
      "code": "951190",
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
      "id": "951604",
      "seqId": 2,
      "kind": "course",
      "name": "Ingeniería y Sociedad",
      "code": "951604",
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
      "id": "950701",
      "seqId": 3,
      "kind": "course",
      "name": "Álgebra y Geometría Analítica",
      "code": "950701",
      "type": "mandatory",
      "hours": 10,
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
      "id": "950702",
      "seqId": 4,
      "kind": "course",
      "name": "Análisis Matemático I",
      "code": "950702",
      "type": "mandatory",
      "hours": 10,
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
      "id": "950703",
      "seqId": 5,
      "kind": "course",
      "name": "Análisis Matemático II",
      "code": "950703",
      "type": "mandatory",
      "hours": 10,
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
              "itemId": "950701",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950702",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950701",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950702",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "951407",
      "seqId": 6,
      "kind": "course",
      "name": "Química General",
      "code": "951407",
      "type": "mandatory",
      "hours": 10,
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
      "id": "951601",
      "seqId": 7,
      "kind": "course",
      "name": "Sistemas de Representación",
      "code": "951601",
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
      "id": "951199",
      "seqId": 8,
      "kind": "course",
      "name": "Fundamentos de Informática",
      "code": "951199",
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
      "id": "951191",
      "seqId": 9,
      "kind": "course",
      "name": "Integración II",
      "code": "951191",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "951190",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950702",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951407",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951190",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950702",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951407",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "950704",
      "seqId": 10,
      "kind": "course",
      "name": "Probabilidad y Estadística",
      "code": "950704",
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
              "itemId": "950701",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950702",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950701",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950702",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "951122",
      "seqId": 11,
      "kind": "course",
      "name": "Química Inorgánica",
      "code": "951122",
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
          "itemId": "951407",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "951407",
          "state": "passed"
        }
      }
    },
    {
      "id": "950605",
      "seqId": 12,
      "kind": "course",
      "name": "Física I",
      "code": "950605",
      "type": "mandatory",
      "hours": 10,
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
      "id": "950606",
      "seqId": 13,
      "kind": "course",
      "name": "Física II",
      "code": "950606",
      "type": "mandatory",
      "hours": 10,
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
              "itemId": "950702",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950605",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950702",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950605",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "951123",
      "seqId": 14,
      "kind": "course",
      "name": "Química Orgánica",
      "code": "951123",
      "type": "mandatory",
      "hours": 6,
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
          "itemId": "951407",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "951407",
          "state": "passed"
        }
      }
    },
    {
      "id": "951602",
      "seqId": 15,
      "kind": "course",
      "name": "Inglés I",
      "code": "951602",
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
      "id": "951198",
      "seqId": 16,
      "kind": "course",
      "name": "Matemática Superior Aplicada",
      "code": "951198",
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
              "itemId": "950703",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950701",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950702",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "950703",
          "state": "passed"
        }
      }
    },
    {
      "id": "951192",
      "seqId": 17,
      "kind": "course",
      "name": "Integración III",
      "code": "951192",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "950703",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951191",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951190",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950702",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951407",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951199",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950605",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950703",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951191",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "951125",
      "seqId": 18,
      "kind": "course",
      "name": "Termodinámica",
      "code": "951125",
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
              "itemId": "950703",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950701",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950702",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951407",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950605",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950703",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951191",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "950309",
      "seqId": 19,
      "kind": "course",
      "name": "Economía",
      "code": "950309",
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
              "itemId": "951191",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951604",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "951191",
          "state": "passed"
        }
      }
    },
    {
      "id": "950310",
      "seqId": 20,
      "kind": "course",
      "name": "Legislación",
      "code": "950310",
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
              "itemId": "951191",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951604",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "951191",
          "state": "passed"
        }
      }
    },
    {
      "id": "951127",
      "seqId": 21,
      "kind": "course",
      "name": "Mecánica Eléctrica Industrial",
      "code": "951127",
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
              "itemId": "950606",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950702",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950605",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "950606",
          "state": "passed"
        }
      }
    },
    {
      "id": "951128",
      "seqId": 22,
      "kind": "course",
      "name": "Fisicoquímica",
      "code": "951128",
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
              "itemId": "951122",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951125",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951122",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951125",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "951129",
      "seqId": 23,
      "kind": "course",
      "name": "Fenómenos del Transporte",
      "code": "951129",
      "type": "mandatory",
      "hours": 10,
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
          "itemId": "951125",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "951125",
          "state": "passed"
        }
      }
    },
    {
      "id": "951130",
      "seqId": 24,
      "kind": "course",
      "name": "Química Analítica",
      "code": "951130",
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
              "itemId": "951122",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950702",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951407",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950605",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951122",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "951603",
      "seqId": 25,
      "kind": "course",
      "name": "Inglés II",
      "code": "951603",
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
          "itemId": "951602",
          "state": "passed"
        }
      }
    },
    {
      "id": "951131",
      "seqId": 26,
      "kind": "course",
      "name": "Integración IV",
      "code": "951131",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "951192",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951127",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951129",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950703",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951191",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951122",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951602",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951601",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951192",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951127",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951129",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "951132",
      "seqId": 27,
      "kind": "course",
      "name": "Operaciones Unitarias I",
      "code": "951132",
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
          "type": "item",
          "itemId": "951129",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "951129",
          "state": "passed"
        }
      }
    },
    {
      "id": "951133",
      "seqId": 28,
      "kind": "course",
      "name": "Tecnología de la Energía Térmica",
      "code": "951133",
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
          "type": "item",
          "itemId": "951129",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "951129",
          "state": "passed"
        }
      }
    },
    {
      "id": "951193",
      "seqId": 29,
      "kind": "course",
      "name": "Biotecnología",
      "code": "951193",
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
              "itemId": "951128",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950703",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951122",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951123",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "951128",
          "state": "passed"
        }
      }
    },
    {
      "id": "951135",
      "seqId": 30,
      "kind": "course",
      "name": "Operaciones Unitarias II",
      "code": "951135",
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
              "itemId": "951128",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951129",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950703",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951122",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951128",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951129",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "951194",
      "seqId": 31,
      "kind": "course",
      "name": "Ingeniería de las Reacciones Químicas",
      "code": "951194",
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
              "itemId": "951128",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951129",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950703",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951122",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951128",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951129",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "951197",
      "seqId": 32,
      "kind": "course",
      "name": "Organización Industrial",
      "code": "951197",
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
              "itemId": "950309",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950310",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951191",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950309",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950310",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "951196",
      "seqId": 33,
      "kind": "course",
      "name": "Integración V - Proyecto Final",
      "code": "951196",
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
              "itemId": "951131",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951194",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951192",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951127",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951129",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951603",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "951138",
      "seqId": 34,
      "kind": "course",
      "name": "Control Automático de Procesos",
      "code": "951138",
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
              "itemId": "951198",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951133",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951129",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951198",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951133",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "951147",
      "seqId": 35,
      "kind": "course",
      "name": "Control Estadístico de Procesos",
      "code": "951147",
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
              "itemId": "951128",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950703",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950704",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951122",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "951128",
          "state": "passed"
        }
      }
    },
    {
      "id": "951699",
      "seqId": 36,
      "kind": "course",
      "name": "Práctica Profesional Supervisada",
      "code": "951699",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "951192",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951127",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951129",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950703",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951191",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951122",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951602",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951601",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951131",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951194",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951603",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1",
      "seqId": 37,
      "kind": "course",
      "name": "Gestión de la Calidad",
      "code": "951170",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951604",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951190",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951604",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951190",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "2",
      "seqId": 38,
      "kind": "course",
      "name": "Cálculo por Elementos Finitos",
      "code": "951159",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "951198",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "951198",
          "state": "passed"
        }
      }
    },
    {
      "id": "3",
      "seqId": 39,
      "kind": "course",
      "name": "Química Analítica Aplicada",
      "code": "951179",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951130",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951122",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950703",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "951130",
          "state": "passed"
        }
      }
    },
    {
      "id": "4",
      "seqId": 40,
      "kind": "course",
      "name": "Seguridad e Higiene Laboral",
      "code": "951171",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951190",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950605",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951122",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951190",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950605",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951122",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "5",
      "seqId": 41,
      "kind": "course",
      "name": "Introducción a la Ciencia e Ingeniería de los Materiales Metálicos",
      "code": "951168",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951122",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950703",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950703",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951122",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "6",
      "seqId": 42,
      "kind": "course",
      "name": "Materiales Cerámicos",
      "code": "951163",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950703",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951122",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950703",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950606",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951122",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "7",
      "seqId": 43,
      "kind": "course",
      "name": "Radioquímica y Aplicaciones Nucleares",
      "code": "951180",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950606",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951407",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950702",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "950606",
          "state": "passed"
        }
      }
    },
    {
      "id": "8",
      "seqId": 44,
      "kind": "course",
      "name": "Electrónica para Ing. Química",
      "code": "951172",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "950606",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "950606",
          "state": "passed"
        }
      }
    },
    {
      "id": "9",
      "seqId": 45,
      "kind": "course",
      "name": "Electrónica para Ing. Química II",
      "code": "951154",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "950606",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "950606",
          "state": "passed"
        }
      }
    },
    {
      "id": "10",
      "seqId": 46,
      "kind": "course",
      "name": "Ing. de las Instalaciones",
      "code": "951178",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "951127",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "951127",
          "state": "passed"
        }
      }
    },
    {
      "id": "11",
      "seqId": 47,
      "kind": "course",
      "name": "Inglés Comunicacional I",
      "code": "951660",
      "type": "elective",
      "hours": 6,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "951603",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "951603",
          "state": "passed"
        }
      }
    },
    {
      "id": "12",
      "seqId": 48,
      "kind": "course",
      "name": "Inglés Comunicacional II",
      "code": "951661",
      "type": "elective",
      "hours": 6,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951603",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951603",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "item",
          "itemId": "951603",
          "state": "passed"
        }
      }
    },
    {
      "id": "13",
      "seqId": 49,
      "kind": "course",
      "name": "Tecnología y Gestión de la Energía",
      "code": "952567",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951127",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951125",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951127",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951125",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "14",
      "seqId": 50,
      "kind": "course",
      "name": "Innovación y Emprendedorismo",
      "code": "952566",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "951197",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "951197",
          "state": "passed"
        }
      }
    },
    {
      "id": "15",
      "seqId": 51,
      "kind": "course",
      "name": "Diseño de Equipos",
      "code": "951177",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951135",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951194",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951135",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951194",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "16",
      "seqId": 52,
      "kind": "course",
      "name": "Alimentos de Origen Animal",
      "code": "951183",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950310",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950309",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951193",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951192",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951130",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950310",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950309",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951193",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "17",
      "seqId": 53,
      "kind": "course",
      "name": "Alimentos de Origen Vegetal",
      "code": "951182",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950310",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950309",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951193",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951192",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951130",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950310",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950309",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951193",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "18",
      "seqId": 54,
      "kind": "course",
      "name": "Evaluación de Impacto Ambiental y Sustentabilidad",
      "code": "951181",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950310",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950309",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951193",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951192",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951130",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950310",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950309",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951193",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "19",
      "seqId": 55,
      "kind": "course",
      "name": "Ingeniería y Factibilidad Ambiental",
      "code": "951176",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950310",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950309",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951193",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951192",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951130",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950310",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950309",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951193",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "20",
      "seqId": 56,
      "kind": "course",
      "name": "Ingeniería Ambiental y Sustentabilidad",
      "code": "951104",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950310",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "950309",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951193",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951135",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951192",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951130",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "950310",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "950309",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951193",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951135",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "21",
      "seqId": 57,
      "kind": "course",
      "name": "Biotecnología Ambiental",
      "code": "951185",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951193",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951193",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "22",
      "seqId": 58,
      "kind": "course",
      "name": "Tratamiento Fisicoquímico de Efluentes",
      "code": "951186",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951130",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951128",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951130",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951128",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951132",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "23",
      "seqId": 59,
      "kind": "course",
      "name": "Reactores Biológicos",
      "code": "951187",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951193",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951194",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951135",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951193",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951194",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951135",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "24",
      "seqId": 60,
      "kind": "course",
      "name": "Reactores Nucleares",
      "code": "951102",
      "type": "elective",
      "hours": 5,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "unknown"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951132",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "951133",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "951132",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "951133",
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
        "id": "elective-hours",
        "label": "Horas electivas requeridas",
        "expr": {
          "type": "sum",
          "selector": {
            "type": "tag",
            "tag": "progress-elective"
          },
          "metric": "hours",
          "min": 44,
          "state": "passed"
        },
        "weight": 11
      }
    ]
  }
};
