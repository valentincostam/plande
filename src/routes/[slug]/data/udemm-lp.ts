import type { StudyPlanData } from '$lib/study-plan-data';

export const udemmLp: StudyPlanData = {
  "info": {
    "degreeName": "Licenciatura en Psicología",
    "degreeSlug": "LP",
    "universityName": "Universidad de la Marina Mercante",
    "universitySlug": "UdeMM",
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios",
        "url": "https://udemm.edu.ar/carreras/licenciatura-en-psicologia/"
      },
      {
        "id": 2,
        "label": "Correlatividades",
        "url": "https://udemm.edu.ar/carreras/licenciatura-en-psicologia/correlatividades-licenciatura-en-psicologia/"
      },
      {
        "id": 3,
        "label": "Plan de Estudios (PDF)",
        "url": "https://drive.google.com/file/d/1-KeqTTU5E1pyPxeHh5D4a8KPYEXFbjyZ/view?usp=sharing"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "Para rendir el examen final de **Trabajo Integrador Final** (5<sup>to</sup> año) se debe estar aprobada todas las asignaturas curriculares, extracurriculares y las electivas correspondientes del plan de estudios."
      },
      {
        "id": 2,
        "text": "Las opciones de materias electivas de 3<sup>er</sup> año son:\n        \n - H0043. **Psicopedagogía en Educación Especial I**\n        \n - H0220. **Investigación de Mercados**\n        \n - H0222. **Psicología de la Tercera Edad**\n        \n - H0218. **Comunicación**\n        \n - H0258. **Género, Sexualidad y Subjetividad**\n      "
      },
      {
        "id": 3,
        "text": "Las opciones de materias electivas de 5<sup>to</sup> año son:\n        \n - H0219. **Publicidad y Promoción**\n        \n - H0259. **Psicología de las Nuevas Tecnologías**\n        \n - H0225. **Introducción a la Psicología del Deporte**\n        \n - H0221. **Comportamiento del Consumidor**\n      "
      },
      {
        "id": 4,
        "text": "Se simplificaron las correlatividades eliminando requisitos redundantes para facilitar la lectura del plan, especialmente en materias con requisitos como *\"Todo 1º A 2º año\"*."
      },
      {
        "id": 5,
        "text": "La carrera otorga el título intermedio de **Acompañante Terapéutico**."
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
      "id": "200",
      "seqId": 1,
      "kind": "course",
      "name": "Psicología General I",
      "code": "H0200",
      "type": "mandatory",
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
      "name": "Bases Biológicas y Neurológicas del Comportamiento",
      "code": "H0002",
      "type": "mandatory",
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
      "name": "Historia de la Psicología",
      "code": "H0003",
      "type": "mandatory",
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
      "id": "202",
      "seqId": 4,
      "kind": "course",
      "name": "Epistemología y Lógica",
      "code": "H0202",
      "type": "mandatory",
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
      "id": "203",
      "seqId": 5,
      "kind": "course",
      "name": "Filosofía",
      "code": "H0203",
      "type": "mandatory",
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
      "id": "9",
      "seqId": 6,
      "kind": "course",
      "name": "Fundamentos de Sociología",
      "code": "H0009",
      "type": "mandatory",
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
      "id": "254",
      "seqId": 7,
      "kind": "course",
      "name": "Inglés I",
      "code": "H0254",
      "type": "mandatory",
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
      "id": "201",
      "seqId": 8,
      "kind": "course",
      "name": "Psicología General II",
      "code": "H0201",
      "type": "mandatory",
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
          "itemId": "200",
          "state": "passed"
        }
      }
    },
    {
      "id": "12",
      "seqId": 9,
      "kind": "course",
      "name": "Neuropsicología",
      "code": "H0012",
      "type": "mandatory",
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
          "state": "passed"
        }
      }
    },
    {
      "id": "4",
      "seqId": 10,
      "kind": "course",
      "name": "Teorías Psicológicas Contemporáneas",
      "code": "H0004",
      "type": "mandatory",
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
          "itemId": "3",
          "state": "passed"
        }
      }
    },
    {
      "id": "204",
      "seqId": 11,
      "kind": "course",
      "name": "Metodología de las Ciencias",
      "code": "H0204",
      "type": "mandatory",
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
          "itemId": "202",
          "state": "passed"
        }
      }
    },
    {
      "id": "205",
      "seqId": 12,
      "kind": "course",
      "name": "Antropología",
      "code": "H0205",
      "type": "mandatory",
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
      "id": "13",
      "seqId": 13,
      "kind": "course",
      "name": "Psicología de la Personalidad",
      "code": "H0013",
      "type": "mandatory",
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
          "itemId": "200",
          "state": "passed"
        }
      }
    },
    {
      "id": "235",
      "seqId": 14,
      "kind": "course",
      "name": "Fundamentos del Psicoanálisis I",
      "code": "H0235",
      "type": "mandatory",
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
              "itemId": "201",
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
      "id": "206",
      "seqId": 15,
      "kind": "course",
      "name": "Psicología del Desarrollo I",
      "code": "H0206",
      "type": "mandatory",
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
          "itemId": "201",
          "state": "passed"
        }
      }
    },
    {
      "id": "208",
      "seqId": 16,
      "kind": "course",
      "name": "Cultura y Subjetividad",
      "code": "H0208",
      "type": "mandatory",
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
          "itemId": "203",
          "state": "passed"
        }
      }
    },
    {
      "id": "209",
      "seqId": 17,
      "kind": "course",
      "name": "Lenguaje y Comunicación",
      "code": "H0209",
      "type": "mandatory",
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
          "itemId": "201",
          "state": "passed"
        }
      }
    },
    {
      "id": "10",
      "seqId": 18,
      "kind": "course",
      "name": "Psicología Social",
      "code": "H0010",
      "type": "mandatory",
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
          "itemId": "9",
          "state": "passed"
        }
      }
    },
    {
      "id": "237",
      "seqId": 19,
      "kind": "course",
      "name": "Psicopatología I",
      "code": "H0237",
      "type": "mandatory",
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
              "itemId": "201",
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
      "id": "255",
      "seqId": 20,
      "kind": "course",
      "name": "Inglés II",
      "code": "H0255",
      "type": "mandatory",
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
          "itemId": "254",
          "state": "passed"
        }
      }
    },
    {
      "id": "239",
      "seqId": 21,
      "kind": "course",
      "name": "Psicoanálisis: Escuela Francesa",
      "code": "H0239",
      "type": "mandatory",
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
              "itemId": "236",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "209",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "238",
      "seqId": 22,
      "kind": "course",
      "name": "Psicopatología II",
      "code": "H0238",
      "type": "mandatory",
      "attributes": [
        "mandatoryFinalExam"
      ],
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
          "itemId": "237",
          "state": "passed"
        }
      }
    },
    {
      "id": "207",
      "seqId": 23,
      "kind": "course",
      "name": "Psicología del Desarrollo II",
      "code": "H0207",
      "type": "mandatory",
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
          "itemId": "206",
          "state": "passed"
        }
      }
    },
    {
      "id": "236",
      "seqId": 24,
      "kind": "course",
      "name": "Fundamentos del Psicoanálisis II",
      "code": "H0236",
      "type": "mandatory",
      "attributes": [
        "mandatoryFinalExam"
      ],
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
          "itemId": "235",
          "state": "passed"
        }
      }
    },
    {
      "id": "20",
      "seqId": 25,
      "kind": "course",
      "name": "Dinámica de Grupos",
      "code": "H0020",
      "type": "mandatory",
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
          "itemId": "9",
          "state": "passed"
        }
      }
    },
    {
      "id": "15",
      "seqId": 26,
      "kind": "course",
      "name": "Evaluación y Técnicas Psicológicas I",
      "code": "H0015",
      "type": "mandatory",
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
          "itemId": "206",
          "state": "passed"
        }
      }
    },
    {
      "id": "21",
      "seqId": 27,
      "kind": "course",
      "name": "Psicosociología Educacional",
      "code": "H0021",
      "type": "mandatory",
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
          "itemId": "9",
          "state": "passed"
        }
      }
    },
    {
      "id": "18",
      "seqId": 28,
      "kind": "course",
      "name": "Evaluación y Técnicas Psicológicas II",
      "code": "H0018",
      "type": "mandatory",
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
              "itemId": "15",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "236",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "241",
      "seqId": 29,
      "kind": "course",
      "name": "Abordajes Actuales en Psicopatología",
      "code": "H0241",
      "type": "mandatory",
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
          "itemId": "238",
          "state": "passed"
        }
      }
    },
    {
      "id": "14",
      "seqId": 30,
      "kind": "course",
      "name": "Técnicas de Abordaje e Intervención en Crisis",
      "code": "H0014",
      "type": "mandatory",
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
          "itemId": "238",
          "state": "passed"
        }
      }
    },
    {
      "id": "243",
      "seqId": 31,
      "kind": "course",
      "name": "Observación y Práctica Profesional: Abordaje Socio-educacional",
      "code": "H0243",
      "type": "mandatory",
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
              "itemId": "12",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "4",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "204",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "205",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "208",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "10",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "255",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "238",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "207",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
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
      "id": "23",
      "seqId": 32,
      "kind": "course",
      "name": "Psicología Organizacional",
      "code": "H0023",
      "type": "mandatory",
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
          "itemId": "20",
          "state": "passed"
        }
      }
    },
    {
      "id": "91",
      "seqId": 33,
      "kind": "course",
      "name": "Materia Electiva I",
      "type": "elective",
      "tags": [
        "progress-elective",
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
              "itemId": "12",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "4",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "204",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "205",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "208",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "10",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "255",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "238",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "207",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "15",
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
      "id": "240",
      "seqId": 34,
      "kind": "course",
      "name": "Intervenciones en Psicoanálisis",
      "code": "H0240",
      "type": "mandatory",
      "attributes": [
        "mandatoryFinalExam"
      ],
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
          "itemId": "239",
          "state": "passed"
        }
      }
    },
    {
      "id": "242",
      "seqId": 35,
      "kind": "course",
      "name": "Modelos y Estrategias de Intervención en Psicopatología",
      "code": "H0242",
      "type": "mandatory",
      "attributes": [
        "mandatoryFinalExam"
      ],
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
          "itemId": "241",
          "state": "passed"
        }
      }
    },
    {
      "id": "244",
      "seqId": 36,
      "kind": "course",
      "name": "Observación y Práctica Profesional II: Abordaje Socio-comunitario",
      "code": "H0244",
      "type": "mandatory",
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
          "itemId": "243",
          "state": "passed"
        }
      }
    },
    {
      "id": "19",
      "seqId": 37,
      "kind": "course",
      "name": "Evaluación y Técnicas Psicológicas III",
      "code": "H0019",
      "type": "mandatory",
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
          "itemId": "18",
          "state": "passed"
        }
      }
    },
    {
      "id": "22",
      "seqId": 38,
      "kind": "course",
      "name": "Psicología Jurídica",
      "code": "H0022",
      "type": "mandatory",
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
              "itemId": "9",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "205",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "210",
      "seqId": 39,
      "kind": "course",
      "name": "Ética y Deontología Profesional",
      "code": "H0210",
      "type": "mandatory",
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
          "itemId": "208",
          "state": "passed"
        }
      }
    },
    {
      "id": "211",
      "seqId": 40,
      "kind": "course",
      "name": "Métodos y Técnicas Psicoterapéuticas I",
      "code": "H0211",
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
          "type": "item",
          "itemId": "242",
          "state": "passed"
        }
      }
    },
    {
      "id": "29",
      "seqId": 41,
      "kind": "course",
      "name": "Psicología Clínica de Niños y Adolescentes",
      "code": "H0029",
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
              "itemId": "206",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "242",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "213",
      "seqId": 42,
      "kind": "course",
      "name": "Psicología Preventiva y Salud Comunitaria I",
      "code": "H0213",
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
          "type": "item",
          "itemId": "242",
          "state": "passed"
        }
      }
    },
    {
      "id": "256",
      "seqId": 43,
      "kind": "course",
      "name": "Computación",
      "code": "H0256",
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
      "requirements": {}
    },
    {
      "id": "35",
      "seqId": 44,
      "kind": "course",
      "name": "Psicoterapia Familiar",
      "code": "H0035",
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
              "itemId": "242",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "20",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "245",
      "seqId": 45,
      "kind": "course",
      "name": "Observación y Práctica Profesional III: Clínica",
      "code": "H0245",
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
          "type": "item",
          "itemId": "244",
          "state": "passed"
        }
      }
    },
    {
      "id": "246",
      "seqId": 46,
      "kind": "course",
      "name": "Observación y Práctica Profesional IV: Institucional y Jurídica",
      "code": "H0246",
      "type": "mandatory",
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
          "itemId": "245",
          "state": "passed"
        }
      }
    },
    {
      "id": "232",
      "seqId": 47,
      "kind": "course",
      "name": "Práctica Profesional Supervisada I",
      "code": "H0232",
      "type": "mandatory",
      "attributes": [
        "mandatoryFinalExam"
      ],
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
              "itemId": "14",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "23",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "240",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "19",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "22",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "210",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "211",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "29",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "213",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "256",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "35",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "245",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "33",
      "seqId": 48,
      "kind": "course",
      "name": "Orientación Vocacional y Ocupacional",
      "code": "H0033",
      "type": "mandatory",
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
          "itemId": "18",
          "state": "passed"
        }
      }
    },
    {
      "id": "214",
      "seqId": 49,
      "kind": "course",
      "name": "Psicología Preventiva y Salud Comunitaria II",
      "code": "H0214",
      "type": "mandatory",
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
          "itemId": "213",
          "state": "passed"
        }
      }
    },
    {
      "id": "30",
      "seqId": 50,
      "kind": "course",
      "name": "Psicología Clínica de Adultos",
      "code": "H0030",
      "type": "mandatory",
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
          "itemId": "29",
          "state": "passed"
        }
      }
    },
    {
      "id": "212",
      "seqId": 51,
      "kind": "course",
      "name": "Métodos y Técnicas Psicoterapéuticas II",
      "code": "H0212",
      "type": "mandatory",
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
          "itemId": "211",
          "state": "passed"
        }
      }
    },
    {
      "id": "257",
      "seqId": 52,
      "kind": "course",
      "name": "Trabajo Integrador Final",
      "code": "H0257",
      "type": "mandatory",
      "attributes": [
        "mandatoryFinalExam"
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
              "itemId": "246",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "232",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "33",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "214",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "30",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "212",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "233",
      "seqId": 53,
      "kind": "course",
      "name": "Práctica Profesional Supervisada II",
      "code": "H0233",
      "type": "mandatory",
      "attributes": [
        "mandatoryFinalExam"
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
          "type": "item",
          "itemId": "232",
          "state": "passed"
        }
      }
    },
    {
      "id": "92",
      "seqId": 54,
      "kind": "course",
      "name": "Materia Electiva II",
      "type": "elective",
      "tags": [
        "progress-elective",
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
              "itemId": "14",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "23",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "240",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "244",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "19",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "22",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "210",
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
          "min": 2,
          "state": "passed"
        }
      }
    ]
  }
};
