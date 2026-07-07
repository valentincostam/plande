import type { StudyPlanData } from '$lib/study-plan-data';

export const unpaUargIrnr: StudyPlanData = {
  "info": {
    "degreeName": "Ingeniería en Recursos Naturales Renovables",
    "degreeSlug": "IRNR",
    "universityName": "Universidad Nacional de la Patagonia Austral",
    "universitySlug": "UNPA",
    "collegeName": "Unidad Académica Río Gallegos",
    "collegeSlug": "UARG",
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios",
        "url": "https://propuestaacademica.unpa.edu.ar/controladores/descargarPlan.php?plan=RN04&nombre=Ingenier%C3%ADa%20en%20Recursos%20Naturales"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "**Seminario**: Una vez al año, la Universidad ofrecerá un Seminario de 40 hs de duración como mínimo. Los alumnos deberán aprobar un Seminario a lo largo de la Carrera. Sólo podrán cursarlo aquellos alumnos que posean al menos 15 asignaturas del plan de estudios en condición regular."
      },
      {
        "id": 2,
        "text": "**Idioma**: El alumno deberá aprobar el Idioma Inglés, con nivel de suficiencia para interpretación de textos, antes de cursar el primer cuatrimestre del 3° año de la Carrera."
      },
      {
        "id": 3,
        "text": "**Trabajos de Campo o Práctica Profesional**: Requisito adicional para completar la carrera."
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
      "id": "388",
      "seqId": 1,
      "kind": "course",
      "name": "Sistemas Naturales",
      "code": "0388",
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
      "id": "1527",
      "seqId": 3,
      "kind": "course",
      "name": "Química General",
      "code": "1527",
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
      "id": "12",
      "seqId": 4,
      "kind": "course",
      "name": "Introducción al Conocimiento Científico",
      "code": "0012",
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
      "id": "901",
      "seqId": 5,
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
      "id": "390",
      "seqId": 6,
      "kind": "course",
      "name": "Matemática II",
      "code": "0390",
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
      "id": "324",
      "seqId": 7,
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
          "term": "secondSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "391",
      "seqId": 8,
      "kind": "course",
      "name": "Principios de Geología",
      "code": "0391",
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
      "requirements": {}
    },
    {
      "id": "393",
      "seqId": 9,
      "kind": "course",
      "name": "Estadística y Diseño Experimental",
      "code": "0393",
      "type": "mandatory",
      "hours": 9,
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
      "id": "399",
      "seqId": 10,
      "kind": "course",
      "name": "Física Aplicada",
      "code": "0399",
      "type": "mandatory",
      "hours": 9,
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
          "itemId": "390",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "390",
          "state": "passed"
        }
      }
    },
    {
      "id": "396",
      "seqId": 11,
      "kind": "course",
      "name": "Botánica",
      "code": "0396",
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
      "id": "397",
      "seqId": 12,
      "kind": "course",
      "name": "Zoología",
      "code": "0397",
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
      "id": "1903",
      "seqId": 13,
      "kind": "course",
      "name": "Química Biológica",
      "code": "1903",
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
          "itemId": "1527",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1527",
          "state": "passed"
        }
      }
    },
    {
      "id": "407",
      "seqId": 14,
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
          "itemId": "391",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "391",
          "state": "passed"
        }
      }
    },
    {
      "id": "395",
      "seqId": 15,
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
          "term": "secondSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "404",
      "seqId": 16,
      "kind": "course",
      "name": "Edafología",
      "code": "0404",
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
              "itemId": "1527",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "391",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1527",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "391",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "402",
      "seqId": 17,
      "kind": "course",
      "name": "Ecología",
      "code": "0402",
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
              "itemId": "393",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "396",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "397",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "393",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "396",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "397",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "403",
      "seqId": 18,
      "kind": "course",
      "name": "Nutrición Animal",
      "code": "0403",
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
              "itemId": "397",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1903",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "397",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1903",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "392",
      "seqId": 19,
      "kind": "course",
      "name": "Administración Estratégica",
      "code": "0392",
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
      "id": "1904",
      "seqId": 20,
      "kind": "course",
      "name": "Tecnología de Gestión de las Organizaciones",
      "code": "1904",
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
          "itemId": "392",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "392",
          "state": "passed"
        }
      }
    },
    {
      "id": "408",
      "seqId": 21,
      "kind": "course",
      "name": "Relación Suelo-Planta-Animal",
      "code": "0408",
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
      "id": "398",
      "seqId": 22,
      "kind": "course",
      "name": "Genética",
      "code": "0398",
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
              "itemId": "324",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "393",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "324",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "393",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "394",
      "seqId": 23,
      "kind": "course",
      "name": "Fundamentos de Limnología y Oceanografía",
      "code": "0394",
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
      "id": "1905",
      "seqId": 24,
      "kind": "course",
      "name": "Manejo de Recursos Hídricos",
      "code": "1905",
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
      "id": "1906",
      "seqId": 25,
      "kind": "course",
      "name": "Manejo de Recursos Bioacuáticos",
      "code": "1906",
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
          "itemId": "394",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "394",
          "state": "passed"
        }
      }
    },
    {
      "id": "425",
      "seqId": 26,
      "kind": "course",
      "name": "Dinámica Poblacional",
      "code": "0425",
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
      "id": "410",
      "seqId": 27,
      "kind": "course",
      "name": "Manejo de Bosques",
      "code": "0410",
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
      "id": "1907",
      "seqId": 28,
      "kind": "course",
      "name": "Evaluación y Manejo de Pastizales",
      "code": "1907",
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
          "itemId": "408",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "408",
          "state": "passed"
        }
      }
    },
    {
      "id": "415",
      "seqId": 29,
      "kind": "course",
      "name": "Formulación de Proyectos",
      "code": "0415",
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
          "type": "item",
          "itemId": "1904",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1904",
          "state": "passed"
        }
      }
    },
    {
      "id": "424",
      "seqId": 30,
      "kind": "course",
      "name": "Impacto Ambiental",
      "code": "0424",
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
      "id": "409",
      "seqId": 31,
      "kind": "course",
      "name": "Manejo de Fauna",
      "code": "0409",
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
          "type": "item",
          "itemId": "425",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "425",
          "state": "passed"
        }
      }
    },
    {
      "id": "413",
      "seqId": 32,
      "kind": "course",
      "name": "Forrajes",
      "code": "0413",
      "type": "optative",
      "hours": 6,
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "403",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "408",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "403",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "408",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "432",
      "seqId": 33,
      "kind": "course",
      "name": "Forestación y Viveros",
      "code": "0432",
      "type": "optative",
      "hours": 6,
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "396",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "404",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "396",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "404",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "417",
      "seqId": 34,
      "kind": "course",
      "name": "Producción Ovina",
      "code": "0417",
      "type": "optative",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "403",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1907",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "403",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1907",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "416",
      "seqId": 35,
      "kind": "course",
      "name": "Tecnología Pesquera",
      "code": "0416",
      "type": "optative",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "1903",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1906",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1903",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1906",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "406",
      "seqId": 36,
      "kind": "course",
      "name": "Acuicultura",
      "code": "0406",
      "type": "optative",
      "hours": 6,
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
          "itemId": "394",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "394",
          "state": "passed"
        }
      }
    },
    {
      "id": "433",
      "seqId": 37,
      "kind": "course",
      "name": "Frutihorticultura",
      "code": "0433",
      "type": "optative",
      "hours": 6,
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "396",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "404",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "396",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "404",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "418",
      "seqId": 38,
      "kind": "course",
      "name": "Producción Bovina",
      "code": "0418",
      "type": "optative",
      "hours": 6,
      "tags": [
        "progress-elective",
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
              "itemId": "403",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1907",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "403",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1907",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1908",
      "seqId": 39,
      "kind": "course",
      "name": "Energías Renovables",
      "code": "1908",
      "type": "optative",
      "hours": 6,
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "390",
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
              "itemId": "390",
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
          "min": 4,
          "state": "passed"
        }
      }
    ]
  }
};
