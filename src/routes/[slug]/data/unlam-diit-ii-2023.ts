import type { StudyPlanData } from '$lib/study-plan-data';

export const unlamDiitIi2023: StudyPlanData = {
  "info": {
    "degreeName": "Ingeniería Informática",
    "degreeSlug": "II",
    "universityName": "Universidad Nacional de La Matanza",
    "universitySlug": "UNLaM",
    "collegeName": "Departamento de Ingeniería e Investigaciones Tecnológicas",
    "collegeSlug": "DIIT",
    "year": 2023,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios",
        "url": "https://ingenieria.unlam.edu.ar/index.php?seccion=3&idArticulo=565"
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
    },
    {
      "id": "year-5",
      "label": "5to Año"
    },
    {
      "id": "transversales",
      "label": "Materias Transversales"
    }
  ],
  "items": [
    {
      "id": "3621",
      "seqId": 1,
      "kind": "course",
      "name": "Matemática Discreta",
      "code": "3621",
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
      "id": "3622",
      "seqId": 2,
      "kind": "course",
      "name": "Análisis Matemático I",
      "code": "3622",
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
      "id": "3623",
      "seqId": 3,
      "kind": "course",
      "name": "Programación Inicial",
      "code": "3623",
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
      "id": "3624",
      "seqId": 4,
      "kind": "course",
      "name": "Introducción a los Sistemas de Información",
      "code": "3624",
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
      "id": "3625",
      "seqId": 5,
      "kind": "course",
      "name": "Sistemas de Numeración",
      "code": "3625",
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
      "id": "3626",
      "seqId": 6,
      "kind": "course",
      "name": "Principios de Calidad de Software",
      "code": "3626",
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
      "id": "3627",
      "seqId": 7,
      "kind": "course",
      "name": "Álgebra y Geometría Analítica I",
      "code": "3627",
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
      "id": "3628",
      "seqId": 8,
      "kind": "course",
      "name": "Física I",
      "code": "3628",
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
          "itemId": "3622",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3622",
          "state": "passed"
        }
      }
    },
    {
      "id": "3629",
      "seqId": 9,
      "kind": "course",
      "name": "Programación Estructurada Básica",
      "code": "3629",
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
          "itemId": "3623",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3623",
          "state": "passed"
        }
      }
    },
    {
      "id": "3630",
      "seqId": 10,
      "kind": "course",
      "name": "Introducción a la Gestión de Requisitos",
      "code": "3630",
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
          "itemId": "3624",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3624",
          "state": "passed"
        }
      }
    },
    {
      "id": "3631",
      "seqId": 11,
      "kind": "course",
      "name": "Fundamentos de Sistemas Embebidos",
      "code": "3631",
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
          "itemId": "3625",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3625",
          "state": "passed"
        }
      }
    },
    {
      "id": "3632",
      "seqId": 12,
      "kind": "course",
      "name": "Introducción a Proyectos Informáticos",
      "code": "3632",
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
      "id": "3633",
      "seqId": 13,
      "kind": "course",
      "name": "Análisis Matemático II",
      "code": "3633",
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
          "itemId": "3622",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3622",
          "state": "passed"
        }
      }
    },
    {
      "id": "3634",
      "seqId": 14,
      "kind": "course",
      "name": "Física II",
      "code": "3634",
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
          "itemId": "3628",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3628",
          "state": "passed"
        }
      }
    },
    {
      "id": "3635",
      "seqId": 15,
      "kind": "course",
      "name": "Tópicos de Programación",
      "code": "3635",
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
              "itemId": "3629",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3621",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3629",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3621",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3636",
      "seqId": 16,
      "kind": "course",
      "name": "Bases de Datos",
      "code": "3636",
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
              "itemId": "3629",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3621",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3629",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3621",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3637",
      "seqId": 17,
      "kind": "course",
      "name": "Análisis de Sistemas",
      "code": "3637",
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
          "itemId": "3630",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3630",
          "state": "passed"
        }
      }
    },
    {
      "id": "3638",
      "seqId": 18,
      "kind": "course",
      "name": "Arquitectura de Computadoras",
      "code": "3638",
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
          "itemId": "3631",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3631",
          "state": "passed"
        }
      }
    },
    {
      "id": "3676",
      "seqId": 19,
      "kind": "course",
      "name": "Responsabilidad Social Universitaria",
      "code": "3676",
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
          "itemId": "3626",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3626",
          "state": "passed"
        }
      }
    },
    {
      "id": "3639",
      "seqId": 20,
      "kind": "course",
      "name": "Análisis Matemático III",
      "code": "3639",
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
          "itemId": "3633",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3633",
          "state": "passed"
        }
      }
    },
    {
      "id": "3640",
      "seqId": 21,
      "kind": "course",
      "name": "Algoritmos y Estructuras de Datos",
      "code": "3640",
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
          "itemId": "3635",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3635",
          "state": "passed"
        }
      }
    },
    {
      "id": "3641",
      "seqId": 22,
      "kind": "course",
      "name": "Bases de Datos Aplicada",
      "code": "3641",
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
          "itemId": "3636",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3636",
          "state": "passed"
        }
      }
    },
    {
      "id": "3642",
      "seqId": 23,
      "kind": "course",
      "name": "Principios de Diseño de Sistemas",
      "code": "3642",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3637",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3626",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3637",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3626",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3643",
      "seqId": 24,
      "kind": "course",
      "name": "Redes de Computadoras",
      "code": "3643",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3634",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3634",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3644",
      "seqId": 25,
      "kind": "course",
      "name": "Gestión de las Organizaciones",
      "code": "3644",
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
          "itemId": "3632",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3632",
          "state": "passed"
        }
      }
    },
    {
      "id": "3680",
      "seqId": 26,
      "kind": "course",
      "name": "Taller de Integración",
      "code": "3680",
      "type": "optative",
      "hours": 4,
      "tags": [
        "progress-elective",
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
              "itemId": "3638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3636",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3635",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3632",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3630",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3626",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3625",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3624",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3623",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3621",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3636",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3635",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3632",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3630",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3626",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3625",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3624",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3623",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3621",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3645",
      "seqId": 27,
      "kind": "course",
      "name": "Álgebra y Geometría Analítica II",
      "code": "3645",
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
          "itemId": "3627",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3627",
          "state": "passed"
        }
      }
    },
    {
      "id": "3646",
      "seqId": 28,
      "kind": "course",
      "name": "Paradigmas de Programación",
      "code": "3646",
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
              "itemId": "3640",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3633",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3640",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3633",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3647",
      "seqId": 29,
      "kind": "course",
      "name": "Requisitos Avanzados",
      "code": "3647",
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
          "itemId": "3642",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3642",
          "state": "passed"
        }
      }
    },
    {
      "id": "3648",
      "seqId": 30,
      "kind": "course",
      "name": "Diseño de Software",
      "code": "3648",
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
              "itemId": "3642",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3636",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3642",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3636",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3649",
      "seqId": 31,
      "kind": "course",
      "name": "Sistemas Operativos",
      "code": "3649",
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
          "itemId": "3638",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3638",
          "state": "passed"
        }
      }
    },
    {
      "id": "3650",
      "seqId": 32,
      "kind": "course",
      "name": "Seguridad de la Información",
      "code": "3650",
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
              "itemId": "3643",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3635",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3643",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3635",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3675",
      "seqId": 33,
      "kind": "course",
      "name": "Práctica Profesional Supervisada",
      "code": "3675",
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
          "itemId": "3642",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3642",
          "state": "passed"
        }
      }
    },
    {
      "id": "3651",
      "seqId": 34,
      "kind": "course",
      "name": "Probabilidad y Estadística",
      "code": "3651",
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
              "itemId": "3645",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3639",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3621",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3645",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3639",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3621",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3652",
      "seqId": 35,
      "kind": "course",
      "name": "Programación Avanzada",
      "code": "3652",
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
              "itemId": "3641",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3646",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3641",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3646",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3653",
      "seqId": 36,
      "kind": "course",
      "name": "Arquitecturas de Sistemas Software",
      "code": "3653",
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
          "itemId": "3648",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3648",
          "state": "passed"
        }
      }
    },
    {
      "id": "3654",
      "seqId": 37,
      "kind": "course",
      "name": "Virtualización de Hardware",
      "code": "3654",
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
              "itemId": "3649",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3645",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3640",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3649",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3645",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3640",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3655",
      "seqId": 38,
      "kind": "course",
      "name": "Auditoría y Legislación",
      "code": "3655",
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
          "itemId": "3650",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3650",
          "state": "passed"
        }
      }
    },
    {
      "id": "3656",
      "seqId": 39,
      "kind": "course",
      "name": "Estadística Aplicada",
      "code": "3656",
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
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3651",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3641",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3651",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3641",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3657",
      "seqId": 40,
      "kind": "course",
      "name": "Autómatas y Gramática",
      "code": "3657",
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
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "3646",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3646",
          "state": "passed"
        }
      }
    },
    {
      "id": "3658",
      "seqId": 41,
      "kind": "course",
      "name": "Programación Concurrente",
      "code": "3658",
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
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3654",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3646",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3654",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3646",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3659",
      "seqId": 42,
      "kind": "course",
      "name": "Gestión Aplicada al Desarrollo de Software I",
      "code": "3659",
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
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3653",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3647",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3644",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3653",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3647",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3644",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3660",
      "seqId": 43,
      "kind": "course",
      "name": "Sistemas Operativos Avanzados",
      "code": "3660",
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
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "3654",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3654",
          "state": "passed"
        }
      }
    },
    {
      "id": "3661",
      "seqId": 44,
      "kind": "course",
      "name": "Gestión de Proyectos",
      "code": "3661",
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
      "requirements": {
        "enroll": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3651",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3650",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3644",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3651",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3650",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3644",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3662",
      "seqId": 45,
      "kind": "course",
      "name": "Matemática Aplicada",
      "code": "3662",
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
          "itemId": "3651",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3651",
          "state": "passed"
        }
      }
    },
    {
      "id": "3663",
      "seqId": 46,
      "kind": "course",
      "name": "Lenguajes y Compiladores",
      "code": "3663",
      "type": "mandatory",
      "hours": 4,
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
          "itemId": "3657",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3657",
          "state": "passed"
        }
      }
    },
    {
      "id": "3664",
      "seqId": 47,
      "kind": "course",
      "name": "Inteligencia Artificial",
      "code": "3664",
      "type": "mandatory",
      "hours": 4,
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
              "itemId": "3651",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3646",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3651",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3646",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3665",
      "seqId": 48,
      "kind": "course",
      "name": "Gestión Aplicada al Desarrollo de Software II",
      "code": "3665",
      "type": "mandatory",
      "hours": 4,
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
              "itemId": "3659",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3652",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3659",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3652",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3666",
      "seqId": 49,
      "kind": "course",
      "name": "Seguridad Aplicada y Forensia",
      "code": "3666",
      "type": "mandatory",
      "hours": 4,
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
              "itemId": "3655",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3652",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3649",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3655",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3652",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3649",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3667",
      "seqId": 50,
      "kind": "course",
      "name": "Gestión de la Calidad en Procesos de Sistemas",
      "code": "3667",
      "type": "mandatory",
      "hours": 4,
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
          "itemId": "3647",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3647",
          "state": "passed"
        }
      }
    },
    {
      "id": "3668",
      "seqId": 51,
      "kind": "course",
      "name": "Inteligencia Artificial Aplicada",
      "code": "3668",
      "type": "mandatory",
      "hours": 4,
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
              "itemId": "3664",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3656",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3664",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3656",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3669",
      "seqId": 52,
      "kind": "course",
      "name": "Innovación y Emprendedorismo",
      "code": "3669",
      "type": "mandatory",
      "hours": 4,
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
          "itemId": "3661",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "3661",
          "state": "passed"
        }
      }
    },
    {
      "id": "3670",
      "seqId": 53,
      "kind": "course",
      "name": "Ciencia de Datos",
      "code": "3670",
      "type": "mandatory",
      "hours": 4,
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
              "itemId": "3664",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3656",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3664",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3656",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3671",
      "seqId": 54,
      "kind": "course",
      "name": "Proyecto Final de Carrera",
      "code": "3671",
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
              "itemId": "3667",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3661",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3660",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3659",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3656",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3667",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3661",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3660",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3659",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3656",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3677",
      "seqId": 55,
      "kind": "course",
      "name": "Lenguaje Orientado a Negocios",
      "code": "3677",
      "type": "elective",
      "hours": 4,
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
              "itemId": "3658",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3661",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3663",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3658",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3661",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3663",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3678",
      "seqId": 56,
      "kind": "course",
      "name": "Tecnologías en Seguridad",
      "code": "3678",
      "type": "elective",
      "hours": 4,
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
              "itemId": "3662",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3666",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3662",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3666",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "3679",
      "seqId": 57,
      "kind": "course",
      "name": "Visión Artificial",
      "code": "3679",
      "type": "elective",
      "hours": 4,
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
              "itemId": "3664",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "3665",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "3664",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "3665",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "901",
      "seqId": 58,
      "kind": "course",
      "name": "Inglés Nivel I",
      "code": "901",
      "type": "mandatory",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "902",
      "seqId": 59,
      "kind": "course",
      "name": "Inglés Nivel II",
      "code": "902",
      "type": "mandatory",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "901",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "901",
          "state": "passed"
        }
      }
    },
    {
      "id": "903",
      "seqId": 60,
      "kind": "course",
      "name": "Inglés Nivel III",
      "code": "903",
      "type": "mandatory",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "902",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "902",
          "state": "passed"
        }
      }
    },
    {
      "id": "904",
      "seqId": 61,
      "kind": "course",
      "name": "Inglés Nivel IV",
      "code": "904",
      "type": "mandatory",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "903",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "903",
          "state": "passed"
        }
      }
    },
    {
      "id": "911",
      "seqId": 62,
      "kind": "course",
      "name": "Computacional Nivel I",
      "code": "911",
      "type": "mandatory",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {}
    },
    {
      "id": "912",
      "seqId": 63,
      "kind": "course",
      "name": "Computacional Nivel II",
      "code": "912",
      "type": "mandatory",
      "hours": 4,
      "attributes": [
        "transversal"
      ],
      "placements": [
        {
          "sectionId": "transversales",
          "term": "semestral"
        }
      ],
      "requirements": {
        "enroll": {
          "type": "item",
          "itemId": "911",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "911",
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
