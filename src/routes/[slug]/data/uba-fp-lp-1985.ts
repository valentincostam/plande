import type { StudyPlanData } from '$lib/study-plan-data';

export const ubaFpLp1985: StudyPlanData = {
  "info": {
    "degreeName": "Licenciatura en Psicología",
    "degreeSlug": "LP",
    "universityName": "Universidad de Buenos Aires",
    "universitySlug": "UBA",
    "collegeName": "Facultad de Psicología",
    "collegeSlug": "FP",
    "year": 1985,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios 1985 - Resolución UBA",
        "url": "https://codigo.rec.uba.ar/libro-xiv-facultad-de-psicologia-titulo-3-licenciatura-en-psicologia/"
      },
      {
        "id": 2,
        "label": "Diagrama de correlatividades oficial",
        "url": "https://www.psi.uba.ar/psicologia/plan_estudios_psicologia_2025.png"
      },
      {
        "id": 3,
        "label": "EDI Psicología UBA - Información de cátedras y plan",
        "url": "https://edipsicouba.net.ar/uncategorized/psicologia/"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "**Distribución por años**: El plan oficial no asigna materias a años específicos, solo define ciclos (CBC, CFG, CFP) y correlatividades. La distribución por años en esta herramienta se basa en el análisis de correlatividades, priorizando materias que desbloquean más opciones (ej: Psicopatología desbloquea 5+ materias del CFP) y respetando las restricciones del plan (materias anuales como Psicoanálisis y Psicopatología)."
      },
      {
        "id": 2,
        "text": "**Flexibilidad**: Podés armar tu propia distribución respetando las correlatividades. Esta es una guía sugerida para completar la carrera en 5 años cursando ~6 materias por año."
      },
      {
        "id": 3,
        "text": "**Cursado simultáneo permitido**: Niñez y Adolescencia pueden cursarse en el mismo cuatrimestre. Lo mismo aplica para Psicopatología, TTED I (Psicométricas) y TTED II (Proyectivas)."
      },
      {
        "id": 4,
        "text": "**Ciclo Básico Común (CBC)**: No incluido en este plan. Son 6 materias previas al ingreso a la Facultad: Pensamiento Científico, Sociedad y Estado, Psicología, Biología, Semiología y Matemáticas."
      },
      {
        "id": 5,
        "text": "**Idioma**: Se requiere aprobar Idioma 1 e Idioma 2 (Inglés o Francés). Requisito para inscribirse: tener aprobadas Procesos Psicológicos Básicos y Psicoanálisis: Freud."
      },
      {
        "id": 6,
        "text": "**Tesis de Licenciatura**: Obligatoria para estudiantes ingresantes desde 2011 provenientes del CBC (Res. CS 6768/13)."
      },
      {
        "id": 7,
        "text": "**Materias electivas**: Se requieren 5 electivas en total: 2 del Ciclo de Formación General (CFG) y 3 del Ciclo de Formación Profesional (CFP). Dentro de las 3 electivas del CFP se puede elegir hacer otra Práctica Profesional y de Investigación."
      },
      {
        "id": 8,
        "text": "**Práctica Profesional**: Las correlatividades varían según el área elegida (Clínica, Educacional, Justicia, Social-Comunitaria, Trabajo o Investigación). Consultar el plan de estudios oficial para los requisitos específicos de cada área."
      },
      {
        "id": 9,
        "text": "**Siglas**:\n\t\t\t\t\n - **CBC**: Ciclo Básico Común (ingreso a la universidad)\n\t\t\t\t\n - **CFG**: Ciclo de Formación General\n\t\t\t\t\n - **CFP**: Ciclo de Formación Profesional"
      },
      {
        "id": 10,
        "text": "**Materias del CFG** (Ciclo de Formación General):\n\t\t\t\t\n - Psicoanálisis: Freud\n\t\t\t\t\n - Procesos Psicológicos Básicos\n\t\t\t\t\n - Psicología Social\n\t\t\t\t\n - Estadística\n\t\t\t\t\n - Psicología del Aprendizaje\n\t\t\t\t\n - Neurofisiología\n\t\t\t\t\n - Historia de la Psicología\n\t\t\t\t\n - Metodología de la Investigación\n\t\t\t\t\n - Teoría y Técnica de Grupos\n\t\t\t\t\n - Psicología Evolutiva: Niñez\n\t\t\t\t\n - Psicología Evolutiva: Adolescencia\n\t\t\t\t\n - Salud Pública y Salud Mental\n\t\t\t\t\n - Psicopatología\n\t\t\t\t\n - TTED I y II\n\t\t\t\t\n - Idioma 1 y 2\n\t\t\t\t\n - 2 Electivas CFG"
      },
      {
        "id": 11,
        "text": "**Materias del CFP** (Ciclo de Formación Profesional):\n\t\t\t\t\n - Psicología, Ética y Derechos Humanos\n\t\t\t\t\n - Psicología Institucional\n\t\t\t\t\n - Psicología Educacional\n\t\t\t\t\n - Psicología del Trabajo\n\t\t\t\t\n - Clínica Psicológica y Psicoterapias: Clínica de Adultos\n\t\t\t\t\n - Psicología Jurídica\n\t\t\t\t\n - Clínica Psicológica y Psicoterapias: Emergencia e Interconsultas\n\t\t\t\t\n - Práctica Profesional y de Investigación\n\t\t\t\t\n - 3 Electivas CFP"
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
      "name": "Psicoanálisis: Freud",
      "type": "mandatory",
      "hours": 6,
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
      "id": "2",
      "seqId": 2,
      "kind": "course",
      "name": "Procesos Psicológicos Básicos",
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
      "id": "3",
      "seqId": 3,
      "kind": "course",
      "name": "Psicología Social",
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
      "id": "4",
      "seqId": 4,
      "kind": "course",
      "name": "Estadística",
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
      "name": "Psicología del Aprendizaje",
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
      "id": "6",
      "seqId": 6,
      "kind": "course",
      "name": "Neurofisiología",
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
      "id": "7",
      "seqId": 7,
      "kind": "course",
      "name": "Historia de la Psicología",
      "type": "mandatory",
      "hours": 6,
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
      "name": "Metodología de la Investigación",
      "type": "mandatory",
      "hours": 6,
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
      "id": "9",
      "seqId": 9,
      "kind": "course",
      "name": "Teorías y Técnicas de Grupos",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "1",
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
      "id": "10",
      "seqId": 10,
      "kind": "course",
      "name": "Psicología Evolutiva: Niñez",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "1",
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
      "id": "11",
      "seqId": 11,
      "kind": "course",
      "name": "Psicología Evolutiva: Adolescencia",
      "type": "mandatory",
      "hours": 6,
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
      "id": "12",
      "seqId": 12,
      "kind": "course",
      "name": "Salud Pública y Salud Mental",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "3",
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
              "itemId": "3",
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
      "name": "Psicopatología",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "6",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "11",
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
              "itemId": "6",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "11",
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
      "name": "Teoría y Técnica de Exploración y Diagnóstico Psicológico I",
      "type": "mandatory",
      "hours": 6,
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
          "itemId": "8",
          "state": "taken"
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
            }
          ]
        }
      }
    },
    {
      "id": "15",
      "seqId": 15,
      "kind": "course",
      "name": "Teoría y Técnica de Exploración y Diagnóstico Psicológico II",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "14",
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
      "name": "Idioma 1",
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
              "itemId": "2",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1",
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
      "name": "Idioma 2",
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
          "itemId": "16",
          "state": "passed"
        }
      }
    },
    {
      "id": "18",
      "seqId": 18,
      "kind": "course",
      "name": "Materia Electiva CFG 1",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
      "id": "19",
      "seqId": 19,
      "kind": "course",
      "name": "Materia Electiva CFG 2",
      "type": "elective",
      "hours": 4,
      "tags": [
        "progress-elective",
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
      "id": "20",
      "seqId": 20,
      "kind": "course",
      "name": "Psicología, Ética y Derechos Humanos",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "7",
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
              "itemId": "7",
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
      "id": "21",
      "seqId": 21,
      "kind": "course",
      "name": "Psicología Institucional",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "9",
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
      "id": "22",
      "seqId": 22,
      "kind": "course",
      "name": "Psicología Educacional",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "11",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "9",
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
              "itemId": "11",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "9",
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
      "id": "23",
      "seqId": 23,
      "kind": "course",
      "name": "Psicología del Trabajo",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "14",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
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
      "name": "Clínica Psicológica y Psicoterapias: Clínica de Adultos",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "14",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
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
      "name": "Psicología Jurídica",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "14",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
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
      "name": "Clínica Psicológica y Psicoterapias: Emergencia e Interconsultas",
      "type": "mandatory",
      "hours": 6,
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
              "itemId": "14",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
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
      "name": "Práctica Profesional y de Investigación",
      "type": "mandatory",
      "hours": 6,
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
      "id": "28",
      "seqId": 28,
      "kind": "course",
      "name": "Materia Electiva CFP 1",
      "type": "elective",
      "hours": 4,
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
      "requirements": {}
    },
    {
      "id": "29",
      "seqId": 29,
      "kind": "course",
      "name": "Materia Electiva CFP 2",
      "type": "elective",
      "hours": 4,
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
      "requirements": {}
    },
    {
      "id": "30",
      "seqId": 30,
      "kind": "course",
      "name": "Materia Electiva CFP 3",
      "type": "elective",
      "hours": 4,
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
      "requirements": {}
    },
    {
      "id": "31",
      "seqId": 31,
      "kind": "course",
      "name": "Tesis de Licenciatura",
      "type": "mandatory",
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
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
