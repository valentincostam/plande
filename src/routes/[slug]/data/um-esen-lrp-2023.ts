import type { StudyPlanData } from '$lib/study-plan-data';

export const umEsenLrp2023: StudyPlanData = {
  "info": {
    "degreeName": "Licenciatura en Relaciones Públicas",
    "degreeSlug": "LRP",
    "universityName": "Universidad de Morón",
    "universitySlug": "UM",
    "collegeName": "Escuela Superior de Economía y Negocios",
    "collegeSlug": "ESEN",
    "year": 2023,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios 2023",
        "url": "https://venialaum.unimoron.edu.ar/carreras/escuela-superior-de-economia-y-negocios/de-grado/licenciatura-en-relaciones-publicas/2023?e=4&c=14"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "La carrera otorga el título intermedio de **Analista en Relaciones Públicas** al completar el 2<sup>do</sup> año."
      },
      {
        "id": 2,
        "text": "Para completar la carrera se deben aprobar **2 asignaturas electivas** de la lista disponible, equivalentes a **12 créditos**."
      },
      {
        "id": 3,
        "text": "Se corrige un probable error tipográfico del sitio oficial en **Investigación de Mercado (10411)**: la correlativa publicada como **663(A)** se interpreta como **Estadística Social (633)**, ya que no existe una materia 663 en el plan."
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
      "id": "electivas",
      "label": "Materias Electivas"
    }
  ],
  "items": [
    {
      "id": "661",
      "seqId": 1,
      "kind": "course",
      "name": "Relaciones Públicas I",
      "code": "661",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "689",
      "seqId": 2,
      "kind": "course",
      "name": "Funciones y Competencias de las Relaciones Públicas",
      "code": "689",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "661",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "661",
          "state": "passed"
        }
      }
    },
    {
      "id": "636",
      "seqId": 3,
      "kind": "course",
      "name": "Teoría y Medios de Comunicación Social",
      "code": "636",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "690",
      "seqId": 4,
      "kind": "course",
      "name": "Filosofía y Lógica Aplicada",
      "code": "690",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "691",
      "seqId": 5,
      "kind": "course",
      "name": "Teoría y Práctica de la Producción de Textos",
      "code": "691",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "680",
      "seqId": 6,
      "kind": "course",
      "name": "Medios de Comunicación I: Gráficos",
      "code": "680",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "636",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "636",
          "state": "passed"
        }
      }
    },
    {
      "id": "624",
      "seqId": 7,
      "kind": "course",
      "name": "Psicología General",
      "code": "624",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "20501",
      "seqId": 8,
      "kind": "course",
      "name": "Inglés I",
      "code": "20501",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "666",
      "seqId": 9,
      "kind": "course",
      "name": "Oratoria",
      "code": "666",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "631",
      "seqId": 10,
      "kind": "course",
      "name": "Administración de las Organizaciones",
      "code": "631",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "4185",
      "seqId": 11,
      "kind": "course",
      "name": "Taller de Informática Aplicada al Diseño Publicitario",
      "code": "4185",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-1"
      ],
      "placements": [
        {
          "sectionId": "year-1",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "687",
      "seqId": 12,
      "kind": "course",
      "name": "Relaciones Públicas II",
      "code": "687",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "661",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "689",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "661",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "689",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "710",
      "seqId": 13,
      "kind": "course",
      "name": "Derecho de las Comunicaciones",
      "code": "710",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "682",
      "seqId": 14,
      "kind": "course",
      "name": "Medios de Comunicación II: Radio, TV, Cine e Internet",
      "code": "682",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "680",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "680",
          "state": "passed"
        }
      }
    },
    {
      "id": "692",
      "seqId": 15,
      "kind": "course",
      "name": "Sociología y Estudio de la Opinión Pública",
      "code": "692",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "680",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "680",
          "state": "passed"
        }
      }
    },
    {
      "id": "20502",
      "seqId": 16,
      "kind": "course",
      "name": "Inglés II",
      "code": "20502",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "20501",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "20501",
          "state": "passed"
        }
      }
    },
    {
      "id": "683",
      "seqId": 17,
      "kind": "course",
      "name": "Planificación de Campañas de Relaciones Públicas",
      "code": "683",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "661",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "689",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "661",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "689",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "633",
      "seqId": 18,
      "kind": "course",
      "name": "Estadística Social",
      "code": "633",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "667",
      "seqId": 19,
      "kind": "course",
      "name": "Públicos Internos y Externos",
      "code": "667",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "661",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "689",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "661",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "689",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "629",
      "seqId": 20,
      "kind": "course",
      "name": "Psicología Social",
      "code": "629",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "624",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "624",
          "state": "passed"
        }
      }
    },
    {
      "id": "671",
      "seqId": 21,
      "kind": "course",
      "name": "Imagen Institucional",
      "code": "671",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "661",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "689",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "661",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "689",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "626",
      "seqId": 22,
      "kind": "course",
      "name": "Economía",
      "code": "626",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-2"
      ],
      "placements": [
        {
          "sectionId": "year-2",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "669",
      "seqId": 23,
      "kind": "course",
      "name": "Asuntos Públicos",
      "code": "669",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "687",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "687",
          "state": "passed"
        }
      }
    },
    {
      "id": "10229",
      "seqId": 24,
      "kind": "course",
      "name": "Comercialización Estratégica",
      "code": "10229",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "683",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "687",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "683",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "687",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "684",
      "seqId": 25,
      "kind": "course",
      "name": "Comunicación en Casos de Crisis",
      "code": "684",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "667",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "691",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "667",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "691",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "639",
      "seqId": 26,
      "kind": "course",
      "name": "Dinámica de Grupos",
      "code": "639",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "629",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "629",
          "state": "passed"
        }
      }
    },
    {
      "id": "642",
      "seqId": 27,
      "kind": "course",
      "name": "Psicosociología de las Organizaciones",
      "code": "642",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "629",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "692",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "629",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "692",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "693",
      "seqId": 28,
      "kind": "course",
      "name": "Periodismo y Redacción Periodística",
      "code": "693",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "691",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "691",
          "state": "passed"
        }
      }
    },
    {
      "id": "668",
      "seqId": 29,
      "kind": "course",
      "name": "Protocolo y Ceremonial",
      "code": "668",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "693",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "693",
          "state": "passed"
        }
      }
    },
    {
      "id": "4198",
      "seqId": 30,
      "kind": "course",
      "name": "Técnicas de Promoción y Activación de Marca",
      "code": "4198",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "10229",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "10229",
          "state": "passed"
        }
      }
    },
    {
      "id": "10411",
      "seqId": 31,
      "kind": "course",
      "name": "Investigación de Mercado",
      "code": "10411",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "667",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "633",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "633",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "667",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "20503",
      "seqId": 32,
      "kind": "course",
      "name": "Inglés III",
      "code": "20503",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "20502",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "20502",
          "state": "passed"
        }
      }
    },
    {
      "id": "913",
      "seqId": 33,
      "kind": "course",
      "name": "Ética y Deontología",
      "code": "913",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "690",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "690",
          "state": "passed"
        }
      }
    },
    {
      "id": "694",
      "seqId": 34,
      "kind": "course",
      "name": "Gestión en Redes Sociales",
      "code": "694",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "693",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "683",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "683",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "693",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "695",
      "seqId": 35,
      "kind": "course",
      "name": "Costos y Presupuesto",
      "code": "695",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "626",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "626",
          "state": "passed"
        }
      }
    },
    {
      "id": "4195",
      "seqId": 36,
      "kind": "course",
      "name": "Estrategia y Planificación de Medios Publicitarios",
      "code": "4195",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "682",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "683",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "682",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "683",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "696",
      "seqId": 37,
      "kind": "course",
      "name": "Sostenibilidad y Responsabilidad Social Empresaria Aplicada",
      "code": "696",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "642",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "642",
          "state": "passed"
        }
      }
    },
    {
      "id": "10111",
      "seqId": 38,
      "kind": "course",
      "name": "Gerencia y Liderazgo",
      "code": "10111",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "639",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "639",
          "state": "passed"
        }
      }
    },
    {
      "id": "4190",
      "seqId": 39,
      "kind": "course",
      "name": "Taller de Publicidad Digital y Contenidos Interactivos",
      "code": "4190",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "683",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "693",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "683",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "693",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "697",
      "seqId": 40,
      "kind": "course",
      "name": "Taller Práctico Final de Relaciones Públicas",
      "code": "697",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "669",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "4195",
              "state": "passed"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "669",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "4195",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "4187",
      "seqId": 41,
      "kind": "course",
      "name": "Taller de Fotografía Publicitaria",
      "code": "4187",
      "type": "elective",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "4188",
      "seqId": 42,
      "kind": "course",
      "name": "Taller de Publicidad Radial",
      "code": "4188",
      "type": "elective",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "4189",
      "seqId": 43,
      "kind": "course",
      "name": "Taller de Publicidad Gráfica",
      "code": "4189",
      "type": "elective",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "10550",
      "seqId": 44,
      "kind": "course",
      "name": "Capital Humano",
      "code": "10550",
      "type": "elective",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "759",
      "seqId": 45,
      "kind": "course",
      "name": "Atracción de Talento",
      "code": "759",
      "type": "elective",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "4186",
      "seqId": 46,
      "kind": "course",
      "name": "Semiótica Publicitaria",
      "code": "4186",
      "type": "elective",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "10147",
      "seqId": 47,
      "kind": "course",
      "name": "Técnicas Gerenciales de Negociación",
      "code": "10147",
      "type": "elective",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "735",
      "seqId": 48,
      "kind": "course",
      "name": "Italiano Nivel I",
      "code": "735",
      "type": "elective",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "741",
      "seqId": 49,
      "kind": "course",
      "name": "Portugués Nivel I",
      "code": "741",
      "type": "elective",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "911",
      "seqId": 50,
      "kind": "course",
      "name": "Creatividad e Innovación",
      "code": "911",
      "type": "elective",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "20504",
      "seqId": 51,
      "kind": "course",
      "name": "Inglés IV",
      "code": "20504",
      "type": "elective",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "tags": [
        "progress-elective"
      ],
      "placements": [
        {
          "sectionId": "electivas",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "20503",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "20503",
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
          "min": 2,
          "state": "passed"
        }
      }
    ]
  }
};
