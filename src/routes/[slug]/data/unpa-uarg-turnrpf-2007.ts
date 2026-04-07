import type { StudyPlanData } from '$lib/study-plan-data';

export const unpaUargTurnrpf2007: StudyPlanData = {
  "info": {
    "degreeName": "Tecnicatura Universitaria en Recursos Naturales Renovables (Orientación Producción Frutihortícola)",
    "degreeSlug": "TURNRPF",
    "universityName": "Universidad Nacional de la Patagonia Austral",
    "universitySlug": "UNPA",
    "collegeName": "Unidad Académica Río Gallegos",
    "collegeSlug": "UARG",
    "year": 2007,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios",
        "url": "https://propuestaacademica.unpa.edu.ar/controladores/descargarPlan.php?plan=RN03&nombre=Tec.%20Univ.%20en%20Rec.%20Nat.%20Renov.%20%28Or.%20Prod.%20Frutihort%C3%ADcola%29"
      },
      {
        "id": 2,
        "label": "Resolución RCS 130/2007",
        "url": "https://www.uarg.unpa.edu.ar/apps/digesto/INSTRU_LEGALES/RECT/CS/2007/RCS20070130.pdf"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "**Práctica**: Práctica de Horticultura y Fruticultura requerida para obtener el título."
      },
      {
        "id": 2,
        "text": "**Idioma/Ofimática**: Aprobar examen de suficiencia de Idioma Inglés y nivel de Ofimática antes de cursar el 3° año (se ofrecerán cursos extracurriculares opcionales)."
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
      "id": "420",
      "seqId": 1,
      "kind": "course",
      "name": "Química I",
      "code": "0420",
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
      "id": "387",
      "seqId": 2,
      "kind": "course",
      "name": "Matemática I",
      "code": "0387",
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
      "id": "324",
      "seqId": 3,
      "kind": "course",
      "name": "Biología General",
      "code": "0324",
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
      "id": "901",
      "seqId": 4,
      "kind": "course",
      "name": "Análisis y Producción del Discurso",
      "code": "0901",
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
      "id": "1669",
      "seqId": 5,
      "kind": "course",
      "name": "Estadística",
      "code": "1669",
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
          "itemId": "387",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "387",
          "state": "passed"
        }
      }
    },
    {
      "id": "399",
      "seqId": 6,
      "kind": "course",
      "name": "Física Aplicada",
      "code": "0399",
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
          "itemId": "387",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "387",
          "state": "passed"
        }
      }
    },
    {
      "id": "396",
      "seqId": 7,
      "kind": "course",
      "name": "Botánica",
      "code": "0396",
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
          "itemId": "324",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "324",
          "state": "passed"
        }
      }
    },
    {
      "id": "1685",
      "seqId": 8,
      "kind": "course",
      "name": "Agrometeorología",
      "code": "1685",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "399",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1669",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "399",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1669",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "400",
      "seqId": 9,
      "kind": "course",
      "name": "Química II",
      "code": "0400",
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
          "itemId": "420",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "420",
          "state": "passed"
        }
      }
    },
    {
      "id": "395",
      "seqId": 10,
      "kind": "course",
      "name": "Economía General",
      "code": "0395",
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
          "itemId": "387",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "387",
          "state": "passed"
        }
      }
    },
    {
      "id": "404",
      "seqId": 11,
      "kind": "course",
      "name": "Edafología",
      "code": "0404",
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
              "itemId": "420",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "399",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "420",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "399",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1686",
      "seqId": 12,
      "kind": "course",
      "name": "Manejo de Aguas",
      "code": "1686",
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
          "itemId": "404",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "404",
          "state": "passed"
        }
      }
    },
    {
      "id": "1752",
      "seqId": 13,
      "kind": "course",
      "name": "Fisiología Vegetal",
      "code": "1752",
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
              "itemId": "400",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "396",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "400",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "396",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "402",
      "seqId": 14,
      "kind": "course",
      "name": "Ecología",
      "code": "0402",
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
          "itemId": "396",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "396",
          "state": "passed"
        }
      }
    },
    {
      "id": "407",
      "seqId": 15,
      "kind": "course",
      "name": "Cartografía y Teledetección",
      "code": "0407",
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
          "itemId": "1669",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1669",
          "state": "passed"
        }
      }
    },
    {
      "id": "1753",
      "seqId": 16,
      "kind": "course",
      "name": "Cultivos Intensivos I",
      "code": "1753",
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
              "itemId": "402",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1752",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "402",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1752",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "424",
      "seqId": 17,
      "kind": "course",
      "name": "Impacto Ambiental",
      "code": "0424",
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
              "itemId": "407",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "402",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "407",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "402",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1705",
      "seqId": 18,
      "kind": "course",
      "name": "Producción Ovina",
      "code": "1705",
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
          "itemId": "402",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "402",
          "state": "passed"
        }
      }
    },
    {
      "id": "1709",
      "seqId": 19,
      "kind": "course",
      "name": "Administración y Comercialización",
      "code": "1709",
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
          "itemId": "395",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "395",
          "state": "passed"
        }
      }
    },
    {
      "id": "1754",
      "seqId": 20,
      "kind": "course",
      "name": "Cultivos Intensivos II",
      "code": "1754",
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
          "itemId": "1753",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1753",
          "state": "passed"
        }
      }
    },
    {
      "id": "415",
      "seqId": 21,
      "kind": "course",
      "name": "Formulación de Proyectos",
      "code": "0415",
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
          "itemId": "1709",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1709",
          "state": "passed"
        }
      }
    },
    {
      "id": "1755",
      "seqId": 22,
      "kind": "course",
      "name": "Evaluación de Pastizales",
      "code": "1755",
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
          "itemId": "407",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "407",
          "state": "passed"
        }
      }
    },
    {
      "id": "1756",
      "seqId": 23,
      "kind": "course",
      "name": "Seminario Optativo",
      "code": "1756",
      "type": "optative",
      "hours": 4,
      "tags": [
        "progress-elective",
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
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
        "type": "allMandatory"
      }
    ]
  }
};
