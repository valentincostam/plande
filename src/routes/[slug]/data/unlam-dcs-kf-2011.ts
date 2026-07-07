import type { StudyPlanData } from '$lib/study-plan-data';

export const unlamDcsKf2011: StudyPlanData = {
  "info": {
    "degreeName": "Licenciatura en Kinesiología y Fisiatría",
    "degreeSlug": "KF",
    "universityName": "Universidad Nacional de La Matanza",
    "universitySlug": "UNLaM",
    "collegeName": "Departamento de Ciencias de la Salud",
    "collegeSlug": "DCS",
    "year": 2011,
    "sources": [
      {
        "id": 1,
        "label": "Plan de Estudios",
        "url": "https://salud.unlam.edu.ar/index.php?seccion=3&idArticulo=17"
      }
    ],
    "notes": [
      {
        "id": 1,
        "text": "Se omiten requisitos redundantes. Por ejemplo, **Anatomía descriptiva y topográfica I** de 1<sup>er</sup> año no se exige para cursar **Biomecánica y análisis del movimiento** de 2<sup>do</sup> año porque ya es requisito para cursar **Anatomía descriptiva y topográfica II** de 2<sup>do</sup> año, que también es necesaria para cursar **Biomecánica y análisis del movimiento**."
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
    },
    {
      "id": "transversales",
      "label": "Materias Transversales"
    }
  ],
  "items": [
    {
      "id": "1627",
      "seqId": 1,
      "kind": "course",
      "name": "Anatomía descriptiva y topográfica I",
      "code": "1627",
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
      "id": "1628",
      "seqId": 2,
      "kind": "course",
      "name": "Bioquímica",
      "code": "1628",
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
      "id": "1629",
      "seqId": 3,
      "kind": "course",
      "name": "Citología e Histología",
      "code": "1629",
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
      "id": "1630",
      "seqId": 4,
      "kind": "course",
      "name": "Educación para la salud",
      "code": "1630",
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
      "id": "1631",
      "seqId": 5,
      "kind": "course",
      "name": "Introducción al Pensamiento Científico",
      "code": "1631",
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
      "id": "1632",
      "seqId": 6,
      "kind": "course",
      "name": "Biofísica",
      "code": "1632",
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
      "id": "1633",
      "seqId": 7,
      "kind": "course",
      "name": "Psicosiociales",
      "code": "1633",
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
      "id": "1634",
      "seqId": 8,
      "kind": "course",
      "name": "Embriología y desarrollo",
      "code": "1634",
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
      "id": "1635",
      "seqId": 9,
      "kind": "course",
      "name": "Historia de la Kinesiología",
      "code": "1635",
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
      "id": "1636",
      "seqId": 10,
      "kind": "course",
      "name": "Fisiología",
      "code": "1636",
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
              "itemId": "1627",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1628",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1629",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1634",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1627",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1628",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1629",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1634",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1637",
      "seqId": 11,
      "kind": "course",
      "name": "Anatomía descriptiva y topográfica II",
      "code": "1637",
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
          "itemId": "1627",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1627",
          "state": "passed"
        }
      }
    },
    {
      "id": "1638",
      "seqId": 12,
      "kind": "course",
      "name": "Biomecánica y análisis del movimiento",
      "code": "1638",
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
              "itemId": "1632",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1637",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1632",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1637",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1639",
      "seqId": 13,
      "kind": "course",
      "name": "Psicología social e institucional",
      "code": "1639",
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
      "requirements": {}
    },
    {
      "id": "1640",
      "seqId": 14,
      "kind": "course",
      "name": "Epidemiología",
      "code": "1640",
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
      "id": "1641",
      "seqId": 15,
      "kind": "course",
      "name": "Técnicas y evaluaciones kinésicas I",
      "code": "1641",
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
              "itemId": "1632",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1637",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1632",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1637",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1642",
      "seqId": 16,
      "kind": "course",
      "name": "Atención primaria de la salud I",
      "code": "1642",
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
      "requirements": {}
    },
    {
      "id": "1643",
      "seqId": 17,
      "kind": "course",
      "name": "Kinefilaxia",
      "code": "1643",
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
      "requirements": {}
    },
    {
      "id": "1644",
      "seqId": 18,
      "kind": "course",
      "name": "Administración, organización y gestión de servicios de la salud",
      "code": "1644",
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
          "itemId": "1630",
          "state": "taken"
        },
        "complete": {
          "type": "item",
          "itemId": "1630",
          "state": "passed"
        }
      }
    },
    {
      "id": "1645",
      "seqId": 19,
      "kind": "course",
      "name": "Diagnóstico por imágenes",
      "code": "1645",
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
      "requirements": {}
    },
    {
      "id": "1651",
      "seqId": 20,
      "kind": "course",
      "name": "Atención comunitaria I",
      "code": "1651",
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
              "itemId": "1627",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1628",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1629",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1630",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1632",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1634",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1627",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1628",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1629",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1630",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1632",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1634",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1646",
      "seqId": 21,
      "kind": "course",
      "name": "Técnica y evaluaciones kinésicas II",
      "code": "1646",
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
              "itemId": "1628",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1629",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1630",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1634",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1628",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1629",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1630",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1634",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1647",
      "seqId": 22,
      "kind": "course",
      "name": "Kinefisiatría pediátrica y neonatal",
      "code": "1647",
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
              "itemId": "1630",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1636",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1630",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1636",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1648",
      "seqId": 23,
      "kind": "course",
      "name": "Kinefisiatría cardiorrespiratoria",
      "code": "1648",
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
              "itemId": "1630",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1636",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1630",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1636",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1649",
      "seqId": 24,
      "kind": "course",
      "name": "Kinefisiatría Traumato-ortopédica",
      "code": "1649",
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
              "itemId": "1630",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1636",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1630",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1636",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1650",
      "seqId": 25,
      "kind": "course",
      "name": "Prótesis y ortesis",
      "code": "1650",
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
              "itemId": "1628",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1629",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1630",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1634",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1628",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1629",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1630",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1634",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1652",
      "seqId": 26,
      "kind": "course",
      "name": "Psicomotricidad y estimulación temprana",
      "code": "1652",
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
              "itemId": "1628",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1629",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1630",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1634",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1628",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1629",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1630",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1634",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1653",
      "seqId": 27,
      "kind": "course",
      "name": "Farmacología general",
      "code": "1653",
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
              "itemId": "1630",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1632",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1636",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1630",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1632",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1636",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1654",
      "seqId": 28,
      "kind": "course",
      "name": "Fisioterapia I",
      "code": "1654",
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
              "itemId": "1627",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1628",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1629",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1630",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1632",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1634",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1627",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1628",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1629",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1630",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1631",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1632",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1633",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1634",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1635",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1655",
      "seqId": 29,
      "kind": "course",
      "name": "Técnicas y evaluaciones kinésicas III",
      "code": "1655",
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
              "itemId": "1636",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1646",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1636",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1646",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1656",
      "seqId": 30,
      "kind": "course",
      "name": "Atención comunitaria II",
      "code": "1656",
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
              "itemId": "1636",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1651",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1636",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1651",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1657",
      "seqId": 31,
      "kind": "course",
      "name": "Metodología de la investigación",
      "code": "1657",
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
              "itemId": "1636",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1636",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1658",
      "seqId": 32,
      "kind": "course",
      "name": "Historia argentina y latinoamericana de las Ciencias de la Salud",
      "code": "1658",
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
              "itemId": "1636",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1636",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1659",
      "seqId": 33,
      "kind": "course",
      "name": "Deontología",
      "code": "1659",
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
              "itemId": "1639",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1639",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1660",
      "seqId": 34,
      "kind": "course",
      "name": "Intensivismo",
      "code": "1660",
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
              "itemId": "1639",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1639",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1661",
      "seqId": 35,
      "kind": "course",
      "name": "Fisioterapia II",
      "code": "1661",
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
              "itemId": "1638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1662",
      "seqId": 36,
      "kind": "course",
      "name": "Kinefisiatría gerontológica",
      "code": "1662",
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
              "itemId": "1639",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1639",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1663",
      "seqId": 37,
      "kind": "course",
      "name": "Kinefisiatría estética",
      "code": "1663",
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
              "itemId": "1638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1664",
      "seqId": 38,
      "kind": "course",
      "name": "Kinefisiatría neurológica",
      "code": "1664",
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
              "itemId": "1636",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1646",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1636",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1646",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1665",
      "seqId": 39,
      "kind": "course",
      "name": "Bioética y ética profesional",
      "code": "1665",
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
              "itemId": "1636",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1636",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1638",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1639",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1640",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1641",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1642",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1643",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1644",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1645",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1666",
      "seqId": 40,
      "kind": "course",
      "name": "Kinefisiatría deportiva",
      "code": "1666",
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
              "itemId": "1646",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1651",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1652",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1661",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1646",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1651",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1652",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1661",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1667",
      "seqId": 41,
      "kind": "course",
      "name": "Rehabilitación computacional",
      "code": "1667",
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
              "itemId": "1646",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1651",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1652",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "904",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "911",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1646",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1651",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1652",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "904",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "911",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1668",
      "seqId": 42,
      "kind": "course",
      "name": "Auditoría y Kinesiología legal",
      "code": "1668",
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
              "itemId": "1646",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1651",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1652",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1646",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1651",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1652",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1669",
      "seqId": 43,
      "kind": "course",
      "name": "Kinesiología ocupacional y laboral",
      "code": "1669",
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
              "itemId": "1646",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1651",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1652",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1646",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1651",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1652",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1670",
      "seqId": 44,
      "kind": "course",
      "name": "Ergonomía",
      "code": "1670",
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
              "itemId": "1646",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1651",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1652",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1646",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1647",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1648",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1649",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1651",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1652",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1671",
      "seqId": 45,
      "kind": "course",
      "name": "Kinefisiatría en Cuidados paliativos",
      "code": "1671",
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
              "itemId": "1646",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1652",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1656",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1659",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1660",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1646",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1650",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1652",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1653",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1654",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1656",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1659",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1660",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "1672",
      "seqId": 46,
      "kind": "course",
      "name": "Seminario de integración y Práctica profesional",
      "code": "1672",
      "type": "mandatory",
      "hours": 40,
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
              "itemId": "1655",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1656",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1657",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1658",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1659",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1660",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1662",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1663",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1664",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1665",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1666",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1667",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1668",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1669",
              "state": "taken"
            },
            {
              "type": "item",
              "itemId": "1670",
              "state": "taken"
            }
          ]
        },
        "complete": {
          "type": "all",
          "rules": [
            {
              "type": "item",
              "itemId": "1655",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1656",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1657",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1658",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1659",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1660",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1662",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1663",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1664",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1665",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1666",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1667",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1668",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1669",
              "state": "passed"
            },
            {
              "type": "item",
              "itemId": "1670",
              "state": "passed"
            }
          ]
        }
      }
    },
    {
      "id": "901",
      "seqId": 47,
      "kind": "course",
      "name": "Inglés I",
      "code": "0901",
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
      "seqId": 48,
      "kind": "course",
      "name": "Inglés II",
      "code": "0902",
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
      "seqId": 49,
      "kind": "course",
      "name": "Inglés III",
      "code": "0903",
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
      "seqId": 50,
      "kind": "course",
      "name": "Inglés IV",
      "code": "0904",
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
      "seqId": 51,
      "kind": "course",
      "name": "Computación I",
      "code": "0911",
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
      "seqId": 52,
      "kind": "course",
      "name": "Computación II",
      "code": "0912",
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
