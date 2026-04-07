import type { StudyPlanData } from '$lib/study-plan-data';

export const unajIcsKf2015: StudyPlanData = {
  "info": {
    "degreeName": "Licenciatura en Kinesiología y Fisiatría",
    "degreeSlug": "KF",
    "universityName": "Universidad Nacional Arturo Jauretche",
    "universitySlug": "UNAJ",
    "collegeName": "Instituto de Ciencias de la Salud",
    "collegeSlug": "ICS",
    "year": 2015,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios 2015",
        "url": "https://www.unaj.edu.ar/wp-content/uploads/2022/02/Licenciatura-en-Kinesiologia-y-Fisiatria-Plan-2015_Listado-de-asignaturas-y-correlatividades.pdf"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "Para aprobar la **Tesina** se deberá tener aprobadas todas las materias del plan de estudios."
      },
      {
        "id": 2,
        "text": "Las materias **Inglés** (IG001) e **Informática** (IF001) son extracurriculares obligatorias y deben aprobarse para cumplir con los requisitos de cursado de ciertas materias."
      },
      {
        "id": 3,
        "text": "Las opciones de materias optativas son:\n        \n - **Optativa 1** (4<sup>to</sup> año): *Kinesiología Oncológica* y *Sujeto y Sociedad*\n        \n - **Optativa 2** (5<sup>to</sup> año): *Nuevas tendencias en Rehabilitación* y *Taller de Formación Docente*"
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
      "name": "Problemas de Historia Argentina",
      "code": "1",
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
      "id": "2",
      "seqId": 2,
      "kind": "course",
      "name": "Taller de Lectura y Escritura",
      "code": "2",
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
      "id": "3",
      "seqId": 3,
      "kind": "course",
      "name": "Matemática",
      "code": "3",
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
      "id": "4",
      "seqId": 4,
      "kind": "course",
      "name": "Prácticas Culturales",
      "code": "4",
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
      "id": "5",
      "seqId": 5,
      "kind": "course",
      "name": "Conocimiento y Ciencias de la Salud",
      "code": "5",
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
      "id": "6",
      "seqId": 6,
      "kind": "course",
      "name": "Biología para Ciencias de la Salud",
      "code": "6",
      "type": "mandatory",
      "hours": 6,
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
      "id": "7",
      "seqId": 7,
      "kind": "course",
      "name": "Física y Química para Ciencias de la Salud",
      "code": "7",
      "type": "mandatory",
      "hours": 6,
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
      "id": "8",
      "seqId": 8,
      "kind": "course",
      "name": "Salud Pública",
      "code": "8",
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
      "id": "9",
      "seqId": 9,
      "kind": "course",
      "name": "Histología, Embriología y Genética",
      "code": "9",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "1",
              "state": "taken"
            },
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
              "itemId": "7",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
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
            }
          ]
        }
      }
    },
    {
      "id": "10",
      "seqId": 10,
      "kind": "course",
      "name": "Biofísica",
      "code": "10",
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
              "itemId": "1",
              "state": "taken"
            },
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
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
            }
          ]
        }
      }
    },
    {
      "id": "11",
      "seqId": 11,
      "kind": "course",
      "name": "Epidemiología",
      "code": "11",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "1",
              "state": "taken"
            },
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
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
            }
          ]
        }
      }
    },
    {
      "id": "12",
      "seqId": 12,
      "kind": "course",
      "name": "Anatomía",
      "code": "12",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "1",
              "state": "taken"
            },
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
              "itemId": "7",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
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
            }
          ]
        }
      }
    },
    {
      "id": "13",
      "seqId": 13,
      "kind": "course",
      "name": "Fisiología",
      "code": "13",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1",
              "state": "taken"
            },
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
              "itemId": "7",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
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
            }
          ]
        }
      }
    },
    {
      "id": "14",
      "seqId": 14,
      "kind": "course",
      "name": "Psicología",
      "code": "14",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "1",
              "state": "taken"
            },
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
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
            }
          ]
        }
      }
    },
    {
      "id": "15",
      "seqId": 15,
      "kind": "course",
      "name": "Bioética",
      "code": "15",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "1",
              "state": "taken"
            },
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
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
            }
          ]
        }
      }
    },
    {
      "id": "16",
      "seqId": 16,
      "kind": "course",
      "name": "Inglés aplicado a Ciencias de la Salud I",
      "code": "16",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "49",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "49",
          "state": "passed"
        }
      }
    },
    {
      "id": "17",
      "seqId": 17,
      "kind": "course",
      "name": "Kinefisiatría Legal y Deontología",
      "code": "17",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "1",
              "state": "taken"
            },
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
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
            }
          ]
        }
      }
    },
    {
      "id": "18",
      "seqId": 18,
      "kind": "course",
      "name": "Kinefilaxia",
      "code": "18",
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
              "itemId": "1",
              "state": "taken"
            },
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "7",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "8",
              "state": "taken"
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
            }
          ]
        }
      }
    },
    {
      "id": "19",
      "seqId": 19,
      "kind": "course",
      "name": "Biomecánica",
      "code": "19",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "10",
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
      "id": "20",
      "seqId": 20,
      "kind": "course",
      "name": "Semiopatología Clínica",
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
              "itemId": "12",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "13",
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
      "name": "Técnicas Kinésicas I",
      "code": "21",
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
      "id": "22",
      "seqId": 22,
      "kind": "course",
      "name": "Evaluaciones Kinefisiátricas",
      "code": "22",
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
      "id": "23",
      "seqId": 23,
      "kind": "course",
      "name": "Semiopatología Quirúrgica",
      "code": "23",
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
              "itemId": "12",
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
              "itemId": "12",
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
      "id": "24",
      "seqId": 24,
      "kind": "course",
      "name": "Agentes Físicos",
      "code": "24",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "9",
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
              "itemId": "9",
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
      "id": "25",
      "seqId": 25,
      "kind": "course",
      "name": "Práctica Kinésica I",
      "code": "25",
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
              "itemId": "9",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "10",
              "state": "taken"
            },
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
              "itemId": "13",
              "state": "taken"
            },
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
            },
            {
              "type": "item",
              "itemId": "15",
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
            }
          ]
        }
      }
    },
    {
      "id": "26",
      "seqId": 26,
      "kind": "course",
      "name": "Técnicas Kinésicas II",
      "code": "26",
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
              "itemId": "19",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "21",
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
              "itemId": "23",
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
      "name": "Ortesis y Prótesis",
      "code": "27",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "23",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "23",
          "state": "passed"
        }
      }
    },
    {
      "id": "28",
      "seqId": 28,
      "kind": "course",
      "name": "Metodología de la Investigación Científica",
      "code": "28",
      "type": "mandatory",
      "hours": 3,
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
      "id": "29",
      "seqId": 29,
      "kind": "course",
      "name": "Terapéutica Kinefisiátrica en Traumatología, Ortopedia y Reumatología",
      "code": "29",
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
              "itemId": "19",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "23",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "24",
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
              "itemId": "23",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "24",
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
      "name": "Psicomotricidad y Neurodesarrollo",
      "code": "30",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "12",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "12",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "13",
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
      "name": "Organización de Servicios de Salud",
      "code": "31",
      "type": "mandatory",
      "hours": 3,
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
      "id": "32",
      "seqId": 32,
      "kind": "course",
      "name": "Optativa 1",
      "code": "32",
      "type": "optative",
      "hours": 3,
      "tags": [
        "progress-elective",
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
          "itemId": "25",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "25",
          "state": "passed"
        }
      }
    },
    {
      "id": "33",
      "seqId": 33,
      "kind": "course",
      "name": "Farmacología",
      "code": "33",
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
              "itemId": "9",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "13",
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
              "itemId": "13",
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
      "name": "Práctica Kinésica II",
      "code": "34",
      "type": "mandatory",
      "hours": 8,
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
              "itemId": "19",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "21",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "22",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "23",
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
      "name": "Terapéutica Kinefisiatrica en Pediatría",
      "code": "35",
      "type": "mandatory",
      "hours": 3,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
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
      "id": "36",
      "seqId": 36,
      "kind": "course",
      "name": "Kinesiología y Fisioterapia en Neurología",
      "code": "36",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
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
              "itemId": "26",
              "state": "passed"
            },
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
      "seqId": 37,
      "kind": "course",
      "name": "Terapéutica Kinefisiatrica Cardiorespiratoria",
      "code": "37",
      "type": "mandatory",
      "hours": 4,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
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
      "id": "38",
      "seqId": 38,
      "kind": "course",
      "name": "Kinesiología y Fisioterapia Deportiva",
      "code": "38",
      "type": "mandatory",
      "hours": 3,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
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
              "itemId": "29",
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
              "itemId": "29",
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
      "name": "Kinefisiatría Estética",
      "code": "39",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
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
              "itemId": "33",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "24",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "33",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "40",
      "seqId": 40,
      "kind": "course",
      "name": "Taller de Tesina",
      "code": "40",
      "type": "mandatory",
      "hours": 5,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "28",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "28",
          "state": "passed"
        }
      }
    },
    {
      "id": "41",
      "seqId": 41,
      "kind": "course",
      "name": "Bioinformática y Rehabilitación Computacional",
      "code": "41",
      "type": "mandatory",
      "hours": 3,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "50",
          "state": "passed"
        },
        "complete": {
          "type": "item",
          "itemId": "50",
          "state": "passed"
        }
      }
    },
    {
      "id": "42",
      "seqId": 42,
      "kind": "course",
      "name": "Kinesiología y Fisioterapia Ocupacional y Laboral. Auditoría Kinésica",
      "code": "42",
      "type": "mandatory",
      "hours": 3,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "25",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "25",
          "state": "passed"
        }
      }
    },
    {
      "id": "43",
      "seqId": 43,
      "kind": "course",
      "name": "Optativa 2",
      "code": "43",
      "type": "optative",
      "hours": 3,
      "tags": [
        "progress-elective",
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "34",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "34",
          "state": "passed"
        }
      }
    },
    {
      "id": "44",
      "seqId": 44,
      "kind": "course",
      "name": "Práctica Kinésica III",
      "code": "44",
      "type": "mandatory",
      "hours": 8,
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
              "itemId": "26",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "27",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "28",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "29",
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
            },
            {
              "type": "item",
              "itemId": "33",
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
              "itemId": "26",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "27",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "28",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "29",
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
            },
            {
              "type": "item",
              "itemId": "33",
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
      "id": "49",
      "seqId": 45,
      "kind": "course",
      "name": "Inglés",
      "code": "IG001",
      "type": "mandatory",
      "hours": 3,
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
      "id": "50",
      "seqId": 46,
      "kind": "course",
      "name": "Informática",
      "code": "IF001",
      "type": "mandatory",
      "hours": 3,
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
