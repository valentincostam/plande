import type { StudyPlanData } from '$lib/study-plan-data';

export const unlamDcsLn2011: StudyPlanData = {
  "info": {
    "degreeName": "Licenciatura en Nutrición",
    "degreeSlug": "LN",
    "universityName": "Universidad Nacional de La Matanza",
    "universitySlug": "UNLaM",
    "collegeName": "Departamento de Ciencias de la Salud",
    "collegeSlug": "DCS",
    "year": 2011,
    "sources": [
      {
        "id": 1,
        "label": "Sitio web de la carrera",
        "url": "https://www.unlam.edu.ar/academicas/nutricion/"
      },
      {
        "id": 2,
        "label": "Plan de Estudios (PDF)",
        "url": "https://www.unlam.edu.ar/wp-content/uploads/2024/06/Licenciatura-en-Nutricion-PLAN-DE-ESTUDIOS.pdf"
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
      "id": "1533",
      "seqId": 1,
      "kind": "course",
      "name": "Educación para la Salud",
      "code": "01533",
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
      "id": "1534",
      "seqId": 2,
      "kind": "course",
      "name": "Introducción al Pensamiento Científico I",
      "code": "01534",
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
      "id": "1535",
      "seqId": 3,
      "kind": "course",
      "name": "Biofísica",
      "code": "01535",
      "type": "mandatory",
      "hours": 2,
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
      "id": "1536",
      "seqId": 4,
      "kind": "course",
      "name": "Psicosociales",
      "code": "01536",
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
      "id": "1537",
      "seqId": 5,
      "kind": "course",
      "name": "Embriología y Desarrollo",
      "code": "01537",
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
      "id": "1538",
      "seqId": 6,
      "kind": "course",
      "name": "Nutrición del Niño y Adolescente Sano",
      "code": "01538",
      "type": "mandatory",
      "hours": 2,
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
      "id": "1530",
      "seqId": 7,
      "kind": "course",
      "name": "Anatomía Descriptiva y Topográfica I",
      "code": "01530",
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
      "id": "1531",
      "seqId": 8,
      "kind": "course",
      "name": "Bioquímica",
      "code": "01531",
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
      "id": "1532",
      "seqId": 9,
      "kind": "course",
      "name": "Nutrición Normal",
      "code": "01532",
      "type": "mandatory",
      "hours": 5,
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
      "id": "901",
      "seqId": 10,
      "kind": "course",
      "name": "Inglés Nivel I",
      "code": "00901",
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
      "id": "911",
      "seqId": 11,
      "kind": "course",
      "name": "Computación Nivel I",
      "code": "00911",
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
      "id": "1541",
      "seqId": 12,
      "kind": "course",
      "name": "Psicología Social e Institucional",
      "code": "01541",
      "type": "mandatory",
      "hours": 2,
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
              "itemId": "1533",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1533",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1542",
      "seqId": 13,
      "kind": "course",
      "name": "Epidemiología",
      "code": "01542",
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
          "itemId": "1534",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1534",
          "state": "passed"
        }
      }
    },
    {
      "id": "1543",
      "seqId": 14,
      "kind": "course",
      "name": "Bromatología y Tecnología de los Alimentos",
      "code": "01543",
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
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1544",
      "seqId": 15,
      "kind": "course",
      "name": "Atención Primaria para la Salud",
      "code": "01544",
      "type": "mandatory",
      "hours": 8,
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
              "itemId": "1532",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1545",
      "seqId": 16,
      "kind": "course",
      "name": "Administración, Organización y Gestión de Servicios",
      "code": "01545",
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
          "itemId": "1541",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1541",
          "state": "passed"
        }
      }
    },
    {
      "id": "1539",
      "seqId": 17,
      "kind": "course",
      "name": "Fisiología",
      "code": "01539",
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
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1530",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1530",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1540",
      "seqId": 18,
      "kind": "course",
      "name": "Técnicas y Manejo de Alimentos",
      "code": "01540",
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
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "902",
      "seqId": 19,
      "kind": "course",
      "name": "Inglés Nivel II",
      "code": "00902",
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
      "id": "912",
      "seqId": 20,
      "kind": "course",
      "name": "Computación Nivel II",
      "code": "00912",
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
          "itemId": "911",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "911",
          "state": "passed"
        }
      }
    },
    {
      "id": "1549",
      "seqId": 21,
      "kind": "course",
      "name": "Microbiología",
      "code": "01549",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "1530",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1530",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1550",
      "seqId": 22,
      "kind": "course",
      "name": "Farmacología General",
      "code": "01550",
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
              "itemId": "1530",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1530",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1551",
      "seqId": 23,
      "kind": "course",
      "name": "Fisiopatología y Dietoterapia del Niño y del Adolescente",
      "code": "01551",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "1530",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1530",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1552",
      "seqId": 24,
      "kind": "course",
      "name": "Antropología, Cultura y Nutrición",
      "code": "01552",
      "type": "mandatory",
      "hours": 3,
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
              "itemId": "1530",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1530",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1553",
      "seqId": 25,
      "kind": "course",
      "name": "Toxicología de los Alimentos",
      "code": "01553",
      "type": "mandatory",
      "hours": 2,
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
              "itemId": "1530",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1530",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1546",
      "seqId": 26,
      "kind": "course",
      "name": "Técnica Dietoterápica",
      "code": "01546",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "1530",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1530",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1547",
      "seqId": 27,
      "kind": "course",
      "name": "Fisiopatología y Dietoterapia del Adulto",
      "code": "01547",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "1530",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1530",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1548",
      "seqId": 28,
      "kind": "course",
      "name": "Atención Comunitaria I",
      "code": "01548",
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
              "itemId": "1530",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1530",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1555",
      "seqId": 29,
      "kind": "course",
      "name": "Atención Comunitaria II",
      "code": "01555",
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
              "itemId": "1545",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1545",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1556",
      "seqId": 30,
      "kind": "course",
      "name": "Metodología de la Investigación I",
      "code": "01556",
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
              "itemId": "1545",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1545",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1557",
      "seqId": 31,
      "kind": "course",
      "name": "Soporte Nutricional",
      "code": "01557",
      "type": "mandatory",
      "hours": 2,
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
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1558",
      "seqId": 32,
      "kind": "course",
      "name": "Historia Argentina y Latinoamericana de las Ciencias de la Salud",
      "code": "01558",
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
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1559",
      "seqId": 33,
      "kind": "course",
      "name": "Deontología",
      "code": "01559",
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
              "itemId": "1545",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1545",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1560",
      "seqId": 34,
      "kind": "course",
      "name": "Política y Evaluación en Nutrición",
      "code": "01560",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "1545",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1545",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1561",
      "seqId": 35,
      "kind": "course",
      "name": "Economía, Comercialización y Distribución de Alimentos",
      "code": "01561",
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
              "itemId": "1545",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1545",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1562",
      "seqId": 36,
      "kind": "course",
      "name": "Técnicas Pedagógicas en Nutrición",
      "code": "01562",
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
              "itemId": "1545",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1545",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1563",
      "seqId": 37,
      "kind": "course",
      "name": "Nutrición y Deporte",
      "code": "01563",
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
              "itemId": "1545",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1545",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1564",
      "seqId": 38,
      "kind": "course",
      "name": "Marketing, Investigación y Desarrollo de Alimentos",
      "code": "01564",
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
              "itemId": "1545",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1545",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1565",
      "seqId": 39,
      "kind": "course",
      "name": "Bioética y Ética Profesional",
      "code": "01565",
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
          "itemId": "1559",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1559",
          "state": "passed"
        }
      }
    },
    {
      "id": "1554",
      "seqId": 40,
      "kind": "course",
      "name": "Administración en Servicios de Alimentación",
      "code": "01554",
      "type": "mandatory",
      "hours": 5,
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
              "itemId": "1545",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1545",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "903",
      "seqId": 41,
      "kind": "course",
      "name": "Inglés Nivel III",
      "code": "00903",
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
      "id": "1566",
      "seqId": 42,
      "kind": "course",
      "name": "Práctica Profesional en Servicios de Alimentación",
      "code": "01566",
      "type": "mandatory",
      "hours": 25,
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
              "itemId": "1530",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1541",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1542",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1544",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1545",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1549",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1550",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1530",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1541",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1542",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1544",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1545",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1549",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1550",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1567",
      "seqId": 43,
      "kind": "course",
      "name": "Práctica Profesional en Nutrición Clínica",
      "code": "01567",
      "type": "mandatory",
      "hours": 25,
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
              "itemId": "1530",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1541",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1542",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1544",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1545",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1549",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1550",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1551",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1552",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1553",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1554",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1555",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1556",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1557",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1558",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1559",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1560",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1561",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1562",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1563",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1564",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1565",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1530",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1531",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1532",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1533",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1534",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1535",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1536",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1537",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1538",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1539",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1540",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1541",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1542",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1543",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1544",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1545",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1546",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1547",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1548",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1549",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1550",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1551",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1552",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1553",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1554",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1555",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1556",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1557",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1558",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1559",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1560",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1561",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1562",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1563",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1564",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1565",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "904",
      "seqId": 44,
      "kind": "course",
      "name": "Inglés Nivel IV",
      "code": "00904",
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
          "itemId": "903",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "903",
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
      }
    ]
  }
};
