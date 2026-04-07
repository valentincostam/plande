import type { StudyPlanData } from '$lib/study-plan-data';

export const unrFapydLdg: StudyPlanData = {
  "info": {
    "degreeName": "Licenciatura en Diseño Gráfico",
    "degreeSlug": "LDG",
    "universityName": "Universidad Nacional de Rosario",
    "universitySlug": "UNR",
    "collegeName": "Facultad de Arquitectura, Planeamiento y Diseño",
    "collegeSlug": "FAPyD",
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios",
        "url": "https://fapyd.unr.edu.ar/wp-content/uploads/2022/05/220304_LDG_PLAN_DE_ESTUDIOS.pdf"
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
    }
  ],
  "items": [
    {
      "id": "101",
      "seqId": 1,
      "kind": "course",
      "name": "Taller de Diseño Gráfico 1",
      "code": "01-01",
      "type": "mandatory",
      "hours": 8,
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
      "id": "102",
      "seqId": 2,
      "kind": "course",
      "name": "Medios Expresivos",
      "code": "01-02",
      "type": "mandatory",
      "hours": 3,
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
      "name": "Tipografía 1",
      "code": "01-03",
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
      "requirements": {}
    },
    {
      "id": "104",
      "seqId": 4,
      "kind": "course",
      "name": "Historia del Diseño",
      "code": "01-04",
      "type": "mandatory",
      "hours": 2,
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
      "id": "105",
      "seqId": 5,
      "kind": "course",
      "name": "Semiótica y Cultura Visual",
      "code": "01-05",
      "type": "mandatory",
      "hours": 2,
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
      "id": "106",
      "seqId": 6,
      "kind": "course",
      "name": "Taller de Escritura",
      "code": "01-06",
      "type": "mandatory",
      "hours": 2,
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
      "id": "107",
      "seqId": 7,
      "kind": "course",
      "name": "Morfología 1",
      "code": "01-07",
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
      "id": "108",
      "seqId": 8,
      "kind": "course",
      "name": "Historia del Diseño Gráfico",
      "code": "01-08",
      "type": "mandatory",
      "hours": 2,
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
        "complete": {
          "type": "item",
          "itemId": "104",
          "state": "passed"
        }
      }
    },
    {
      "id": "109",
      "seqId": 9,
      "kind": "course",
      "name": "Comunicación",
      "code": "01-09",
      "type": "mandatory",
      "hours": 2,
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
        "complete": {
          "type": "item",
          "itemId": "105",
          "state": "passed"
        }
      }
    },
    {
      "id": "210",
      "seqId": 10,
      "kind": "course",
      "name": "Taller de Diseño Gráfico 2",
      "code": "02-10",
      "type": "mandatory",
      "hours": 8,
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
        "complete": {
          "type": "item",
          "itemId": "101",
          "state": "passed"
        }
      }
    },
    {
      "id": "211",
      "seqId": 11,
      "kind": "course",
      "name": "Morfología 2",
      "code": "02-11",
      "type": "mandatory",
      "hours": 3,
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
        "complete": {
          "type": "item",
          "itemId": "107",
          "state": "passed"
        }
      }
    },
    {
      "id": "212",
      "seqId": 12,
      "kind": "course",
      "name": "Tipografía 2",
      "code": "02-12",
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
        "complete": {
          "type": "item",
          "itemId": "103",
          "state": "passed"
        }
      }
    },
    {
      "id": "213",
      "seqId": 13,
      "kind": "course",
      "name": "Tecnología",
      "code": "02-13",
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
      "requirements": {}
    },
    {
      "id": "214",
      "seqId": 14,
      "kind": "course",
      "name": "Escenarios Contemporáneos de la Comunicación",
      "code": "02-14",
      "type": "mandatory",
      "hours": 2,
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
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "105",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "109",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "215",
      "seqId": 15,
      "kind": "course",
      "name": "Ciudadanía y Diversidad Cultural y Derechos Humanos",
      "code": "02-15",
      "type": "mandatory",
      "hours": 2,
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
      "id": "316",
      "seqId": 16,
      "kind": "course",
      "name": "Taller de Diseño Gráfico 3",
      "code": "03-16",
      "type": "mandatory",
      "hours": 8,
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
        "complete": {
          "type": "item",
          "itemId": "210",
          "state": "passed"
        }
      }
    },
    {
      "id": "317",
      "seqId": 17,
      "kind": "course",
      "name": "Laboratorio de gráfica, sonido y movimiento",
      "code": "03-17",
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
        "complete": {
          "type": "item",
          "itemId": "213",
          "state": "passed"
        }
      }
    },
    {
      "id": "318",
      "seqId": 18,
      "kind": "course",
      "name": "Tipografía 3",
      "code": "03-18",
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
        "complete": {
          "type": "item",
          "itemId": "212",
          "state": "passed"
        }
      }
    },
    {
      "id": "319",
      "seqId": 19,
      "kind": "course",
      "name": "Tecnología, Diseño y Sociedad",
      "code": "03-19",
      "type": "mandatory",
      "hours": 2,
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
      "id": "320",
      "seqId": 20,
      "kind": "course",
      "name": "Extensión, territorio y organizaciones",
      "code": "03-20",
      "type": "mandatory",
      "hours": 2,
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
      "id": "321",
      "seqId": 21,
      "kind": "course",
      "name": "Gestión empresarial y mercadotecnia",
      "code": "03-21",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "secondSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "322",
      "seqId": 22,
      "kind": "course",
      "name": "Legislación y práctica profesional",
      "code": "03-22",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "secondSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "323",
      "seqId": 23,
      "kind": "course",
      "name": "Espacio Curricular Optativo 1",
      "code": "03-23",
      "type": "mandatory",
      "hours": 2,
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
      "id": "324",
      "seqId": 24,
      "kind": "course",
      "name": "Espacio Curricular Optativo 2",
      "code": "03-24",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "secondSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "325",
      "seqId": 25,
      "kind": "course",
      "name": "Práctica Social Educativa",
      "code": "03-25",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-3"
      ],
      "placements": [
        {
          "sectionId": "year-3",
          "term": "annual"
        }
      ],
      "requirements": {}
    },
    {
      "id": "326",
      "seqId": 26,
      "kind": "course",
      "name": "Práctica Profesional Supervisada",
      "code": "03-26",
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
      "requirements": {}
    },
    {
      "id": "427",
      "seqId": 27,
      "kind": "course",
      "name": "Taller de Proyecto Final",
      "code": "04-27",
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
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "106",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "108",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "211",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "214",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "215",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "316",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "317",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "318",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "319",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "320",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "321",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "322",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "323",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "324",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "428",
      "seqId": 28,
      "kind": "course",
      "name": "Diseño Estratégico y Sustentable",
      "code": "04-28",
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
        "complete": {
          "type": "item",
          "itemId": "316",
          "state": "passed"
        }
      }
    },
    {
      "id": "429",
      "seqId": 29,
      "kind": "course",
      "name": "Teoría y Crítica del Diseño",
      "code": "04-29",
      "type": "mandatory",
      "hours": 2,
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
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "106",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "108",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "214",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "430",
      "seqId": 30,
      "kind": "course",
      "name": "Laboratorio de multiplataformas y Transmedia",
      "code": "04-30",
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
        "complete": {
          "type": "item",
          "itemId": "317",
          "state": "passed"
        }
      }
    },
    {
      "id": "431",
      "seqId": 31,
      "kind": "course",
      "name": "Diseño Editorial",
      "code": "04-31",
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
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "316",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "318",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "432",
      "seqId": 32,
      "kind": "course",
      "name": "Metodología de la Investigación en Diseño",
      "code": "04-32",
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
      "requirements": {}
    },
    {
      "id": "433",
      "seqId": 33,
      "kind": "course",
      "name": "Espacio Curricular Optativo 3",
      "code": "04-33",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
          "term": "secondSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "434",
      "seqId": 34,
      "kind": "course",
      "name": "Espacio Curricular Optativo 4",
      "code": "04-34",
      "type": "mandatory",
      "hours": 2,
      "tags": [
        "year-4"
      ],
      "placements": [
        {
          "sectionId": "year-4",
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
