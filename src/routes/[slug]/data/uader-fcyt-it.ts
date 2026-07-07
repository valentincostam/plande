import type { StudyPlanData } from '$lib/study-plan-data';

export const uaderFcytIt: StudyPlanData = {
  "info": {
    "degreeName": "Ingeniería en Telecomunicaciones",
    "degreeSlug": "IT",
    "universityName": "Universidad Autónoma de Entre Ríos",
    "universitySlug": "UADER",
    "collegeName": "Facultad de Ciencia y Tecnología",
    "collegeSlug": "FCyT",
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios",
        "url": "https://fcytcdelu.uader.edu.ar/telecomunicaciones"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "Las materias optativas de 4<sup>to</sup> año son:\n        \n - **Sistemas de Posicionamiento Global**\n        \n - **Sistemas RADAR**\n      "
      },
      {
        "id": 2,
        "text": "Las materias optativas de 5<sup>to</sup> año son:\n        \n - **Redes Inalámbricas**\n        \n - **Seguridad en Redes**\n      "
      },
      {
        "id": 3,
        "text": "En la materia **Teoría de Circuitos** de 2<sup>do</sup> año, se omite el requerimiento de **Análisis Matemático I** de 1<sup>er</sup> año _regular_ porque ya es requerido por **Física II** de 2<sup>do</sup> año, que también es requerido por **Teoría de Circuitos**."
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
      "id": "437101",
      "seqId": 1,
      "kind": "course",
      "name": "Análisis Matemático I",
      "code": "101",
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
      "id": "437102",
      "seqId": 2,
      "kind": "course",
      "name": "Física I",
      "code": "102",
      "type": "mandatory",
      "hours": 5,
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
      "id": "437103",
      "seqId": 3,
      "kind": "course",
      "name": "Derechos Humanos y Tecnología",
      "code": "103",
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
      "id": "437104",
      "seqId": 4,
      "kind": "course",
      "name": "Fundamentos de Informática",
      "code": "104",
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
      "id": "437105",
      "seqId": 5,
      "kind": "course",
      "name": "Fundamentos de Programación",
      "code": "105",
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
      "id": "437106",
      "seqId": 6,
      "kind": "course",
      "name": "Álgebra",
      "code": "106",
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
      "id": "437107",
      "seqId": 7,
      "kind": "course",
      "name": "Sistemas de Representación",
      "code": "107",
      "type": "mandatory",
      "hours": 3,
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
      "id": "437108",
      "seqId": 8,
      "kind": "course",
      "name": "Química",
      "code": "108",
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
      "id": "437109",
      "seqId": 9,
      "kind": "course",
      "name": "Metodologías de Programación",
      "code": "109",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "437105",
          "state": "taken"
        }
      }
    },
    {
      "id": "437110",
      "seqId": 10,
      "kind": "course",
      "name": "Inglés I",
      "code": "110",
      "type": "mandatory",
      "hours": 3,
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
      "id": "437211",
      "seqId": 11,
      "kind": "course",
      "name": "Análisis Matemático II",
      "code": "211",
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
          "itemId": "437101",
          "state": "taken"
        }
      }
    },
    {
      "id": "437212",
      "seqId": 12,
      "kind": "course",
      "name": "Física II",
      "code": "212",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "437101",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437102",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437213",
      "seqId": 13,
      "kind": "course",
      "name": "Sistemas Digitales",
      "code": "213",
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
          "itemId": "437101",
          "state": "taken"
        }
      }
    },
    {
      "id": "437214",
      "seqId": 14,
      "kind": "course",
      "name": "Inglés II",
      "code": "214",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "437110",
          "state": "taken"
        }
      }
    },
    {
      "id": "437215",
      "seqId": 15,
      "kind": "course",
      "name": "Arquitectura de Computadoras",
      "code": "215",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "437104",
          "state": "taken"
        }
      }
    },
    {
      "id": "437216",
      "seqId": 16,
      "kind": "course",
      "name": "Electrónica Básica",
      "code": "216",
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
              "itemId": "437101",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437108",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437217",
      "seqId": 17,
      "kind": "course",
      "name": "Teoría de Circuitos",
      "code": "217",
      "type": "mandatory",
      "hours": 5,
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
          "itemId": "437212",
          "state": "taken"
        }
      }
    },
    {
      "id": "437218",
      "seqId": 18,
      "kind": "course",
      "name": "Microprocesadores y Microcontroladores",
      "code": "218",
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
          "itemId": "437213",
          "state": "taken"
        }
      }
    },
    {
      "id": "437219",
      "seqId": 19,
      "kind": "course",
      "name": "Instrumentos y Mediciones",
      "code": "219",
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
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "437212",
          "state": "taken"
        }
      }
    },
    {
      "id": "437220",
      "seqId": 20,
      "kind": "course",
      "name": "Probabilidades y Procesos Aleatorios",
      "code": "220",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "437101",
          "state": "taken"
        }
      }
    },
    {
      "id": "437321",
      "seqId": 21,
      "kind": "course",
      "name": "Cálculo Superior",
      "code": "321",
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
              "itemId": "437106",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437211",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437322",
      "seqId": 22,
      "kind": "course",
      "name": "Campos y Ondas",
      "code": "322",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "437211",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437212",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437323",
      "seqId": 23,
      "kind": "course",
      "name": "Análisis de Circuitos",
      "code": "323",
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
          "type": "item",
          "itemId": "437217",
          "state": "taken"
        }
      }
    },
    {
      "id": "437324",
      "seqId": 24,
      "kind": "course",
      "name": "Sistemas Operativos",
      "code": "324",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "437109",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437215",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437325",
      "seqId": 25,
      "kind": "course",
      "name": "Electrónica de Comunicaciones",
      "code": "325",
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
          "itemId": "437216",
          "state": "taken"
        }
      }
    },
    {
      "id": "437326",
      "seqId": 26,
      "kind": "course",
      "name": "Señales y Sistemas",
      "code": "326",
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
          "itemId": "437321",
          "state": "taken"
        }
      }
    },
    {
      "id": "437327",
      "seqId": 27,
      "kind": "course",
      "name": "Transmisión y Propagación de Ondas",
      "code": "327",
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
          "itemId": "437322",
          "state": "taken"
        }
      }
    },
    {
      "id": "437328",
      "seqId": 28,
      "kind": "course",
      "name": "Instrumentos y Mediciones en Telecomunicaciones",
      "code": "328",
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
          "type": "item",
          "itemId": "437219",
          "state": "taken"
        }
      }
    },
    {
      "id": "437329",
      "seqId": 29,
      "kind": "course",
      "name": "Bases de Datos",
      "code": "329",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "437109",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437215",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437330",
      "seqId": 30,
      "kind": "course",
      "name": "Teoría de la Comunicación",
      "code": "330",
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
              "itemId": "437211",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437220",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437431",
      "seqId": 31,
      "kind": "course",
      "name": "Procesamiento de Señales",
      "code": "431",
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
          "itemId": "437326",
          "state": "taken"
        }
      }
    },
    {
      "id": "437432",
      "seqId": 32,
      "kind": "course",
      "name": "Ingeniería del Software",
      "code": "432",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "437109",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437219",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437433",
      "seqId": 33,
      "kind": "course",
      "name": "Sistemas de Sonido e Imagen",
      "code": "433",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "437322",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437325",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437434",
      "seqId": 34,
      "kind": "course",
      "name": "Comunicaciones Ópticas y Satelitales",
      "code": "434",
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
              "itemId": "437322",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437325",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437435",
      "seqId": 35,
      "kind": "course",
      "name": "Ingeniería Legal",
      "code": "435",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "437103",
          "state": "taken"
        }
      }
    },
    {
      "id": "437436",
      "seqId": 36,
      "kind": "course",
      "name": "Comunicaciones Móviles",
      "code": "436",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "437327",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437330",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437437",
      "seqId": 37,
      "kind": "course",
      "name": "Telecomunicaciones y Redes",
      "code": "437",
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
              "itemId": "437327",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437330",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437438",
      "seqId": 38,
      "kind": "course",
      "name": "Redes de Datos",
      "code": "438",
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
              "itemId": "437219",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437327",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437330",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437439",
      "seqId": 39,
      "kind": "course",
      "name": "Diseño de Sistemas Digitales",
      "code": "439",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "437109",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437218",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437440",
      "seqId": 40,
      "kind": "course",
      "name": "Optativa I",
      "code": "440",
      "type": "mandatory",
      "hours": 3,
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
      "id": "437541",
      "seqId": 41,
      "kind": "course",
      "name": "Laboratorio de Interconexión de Redes",
      "code": "541",
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
          "itemId": "437438",
          "state": "taken"
        }
      }
    },
    {
      "id": "437542",
      "seqId": 42,
      "kind": "course",
      "name": "Desarrollo de Aplicaciones Distribuidas",
      "code": "542",
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
              "itemId": "437329",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437432",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437543",
      "seqId": 43,
      "kind": "course",
      "name": "Servicios de Telecomunicaciones y Redes",
      "code": "543",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "437437",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437438",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437544",
      "seqId": 44,
      "kind": "course",
      "name": "Higiene, Seguridad y Medioambiente",
      "code": "544",
      "type": "mandatory",
      "hours": 3,
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
          "itemId": "437435",
          "state": "taken"
        }
      }
    },
    {
      "id": "437545",
      "seqId": 45,
      "kind": "course",
      "name": "Proyecto Final",
      "code": "545",
      "type": "mandatory",
      "hours": 4,
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
              "itemId": "437431",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437432",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437433",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437434",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437435",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437436",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437437",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437438",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437439",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437440",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437546",
      "seqId": 46,
      "kind": "course",
      "name": "Economía y Mercados Tecnológicos",
      "code": "546",
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
          "type": "item",
          "itemId": "437435",
          "state": "taken"
        }
      }
    },
    {
      "id": "437547",
      "seqId": 47,
      "kind": "course",
      "name": "Metodología de la Investigación",
      "code": "547",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "437103",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437433",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437434",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437436",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437437",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437438",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437548",
      "seqId": 48,
      "kind": "course",
      "name": "Diseño de Redes y Sistemas de Telecomunicaciones",
      "code": "548",
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
              "itemId": "437431",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437434",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437436",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437437",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437438",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "437439",
              "state": "taken"
            }
          ]
        }
      }
    },
    {
      "id": "437549",
      "seqId": 49,
      "kind": "course",
      "name": "Administración y Gestión de Organizaciones",
      "code": "549",
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
          "type": "item",
          "itemId": "437435",
          "state": "taken"
        }
      }
    },
    {
      "id": "437550",
      "seqId": 50,
      "kind": "course",
      "name": "Optativa II",
      "code": "550",
      "type": "mandatory",
      "hours": 3,
      "tags": [
        "year-5"
      ],
      "placements": [
        {
          "sectionId": "year-5",
          "term": "secondSemester"
        }
      ],
      "requirements": {}
    },
    {
      "id": "437599",
      "seqId": 51,
      "kind": "course",
      "name": "Práctica Profesional Supervisada",
      "code": "PPS",
      "type": "mandatory",
      "hours": 12.5,
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
              "itemId": "437431",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "437432",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "437433",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "437434",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "437435",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "437436",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "437437",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "437438",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "437439",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "437440",
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
      }
    ]
  }
};
