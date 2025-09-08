# Prompt para Detectar Requerimientos Redundantes en Planes de Estudio

## Contexto

Eres un experto en análisis de planes de estudio. Tu tarea es identificar requerimientos redundantes en un plan de estudios basándote en dependencias transitivas entre materias.

## Definición de Redundancia

Un requerimiento es **redundante** cuando ya está implícito a través de otra dependencia. Es decir, si una materia A requiere la materia B, y la materia B requiere la materia C, entonces el requerimiento directo de C en A es redundante porque ya está cubierto por la cadena transitiva A → B → C.

## Estructura de Datos

Trabajarás con un array de materias (`RawCourse[]`) donde cada materia tiene:

- `id`: Identificador único
- `name`: Nombre de la materia
- `requirements`: Array de requerimientos, donde cada uno tiene:
  - `requiredCourseId`: ID de la materia requerida
  - `requiredState`: Estado requerido ('taken' = regular, 'passed' = aprobada)
  - `requiredFor`: Propósito ('enroll' = para cursar, 'complete' = para completar)

## Jerarquía de Estados

Los estados tienen esta jerarquía (mayor incluye menor):

- 'passed' (aprobada) > 'taken' (regular) > 'inProgress' (en curso) > 'notTaken' (no cursada)

Si una dependencia transitiva requiere un estado mayor o igual, cubre el requerimiento directo.

## Algoritmo de Detección

1. **Para cada materia y cada requerimiento:**
   - Identifica otros requerimientos de la misma materia con el mismo `requiredFor` (propósito del requerimiento original)
   - Para cada uno de estos otros requerimientos, analiza recursivamente sus dependencias en función del **estado requerido** por ese otro requerimiento (ver "Recursión guiada por estado")
   - Verifica si el requerimiento actual aparece en esas dependencias transitivas

2. **Verificación de cobertura:**
   - Si el estado transitivo es >= al estado del requerimiento directo, hay redundancia
   - Ejemplo: si transitivamente se requiere 'passed', cubre un requerimiento 'taken'

3. **Evitar ciclos:** Mantén un conjunto de materias visitadas para prevenir loops

### Recursión guiada por estado

La búsqueda transitiva no debe fijarse a un único `requiredFor`. En su lugar, debe guiarse por el **estado objetivo** que se exige sobre cada materia intermedia:

- Si el estado objetivo es `passed` (aprobada), hay que considerar tanto las dependencias para `complete` (rendir/completar) como las de `enroll` (cursar) de esa materia, porque para aprobar típicamente necesitas haber podido cursar.
- Si el estado objetivo es `taken` o `inProgress`, alcanza con seguir `enroll` (cursar).

Esto permite detectar redundancias como pedir "CG I aprobada" y "CG II aprobada" simultáneamente cuando para aprobar "CG II" ya se requiere aprobar "CG I" vía `complete`.

## Ejemplos de Redundancia

### Ejemplo 1: Cadena Simple

```
Estructuras I (17) requiere:
- Matemática I (4) passed para CURSAR ← REDUNDANTE
- Matemática III e Introducción a la Física (12) taken para CURSAR

Matemática III e Introducción a la Física (12) requiere:
- Matemática I (4) passed para CURSAR
```

**Salida esperada:**

```
En **Estructuras I (17)**: El requerimiento **Matemática I (4)** `aprobada` para `CURSAR` es redundante porque para cursar **Matemática III e Introducción a la Física (12)** ya se requiere la cadena: `Matemática III e Introducción a la Física (12) → Matemática I (4)` (`aprobada`)
```

### Ejemplo 2: Propósitos Diferentes

```
Matemática III e Introducción a la Física (12) requiere:
- Matemática I (4) passed para RENDIR ← REDUNDANTE
- Matemática II (7) taken para CURSAR

Matemática II (7) requiere:
- Matemática I (4) passed para RENDIR
```

**Salida esperada:**

```
En **Matemática III e Introducción a la Física (12)**: El requerimiento **Matemática I (4)** `aprobada` para `RENDIR` es redundante porque para rendir **Matemática II (7)** ya se requiere la cadena: `Matemática II (7) → Matemática I (4)` (`aprobada`)
```

### Ejemplo 3: Cadena Profunda

```
Estructuras V (44) requiere:
- Matemática I (4) passed para CURSAR ← REDUNDANTE (5 niveles)
- Estructuras III (30) passed para CURSAR

Cadena: Estructuras III → Estructuras II → Estructuras I → Matemática III → Matemática I
```

### Ejemplo 4: Propósito distinto en eslabones intermedios (estado-driven)

```
Proyecto Final (50) requiere:
- Computación Gráfica I (13) passed para CURSAR ← REDUNDANTE
- Computación Gráfica II (18) passed para CURSAR

Computación Gráfica II (18) requiere:
- Computación Gráfica I (13) passed para COMPLETAR (y transitivamente para CURSAR)
```

**Salida esperada:**

```
En **Proyecto Final (50)**: El requerimiento **Computación Gráfica I (13)** `aprobada` para `CURSAR` es redundante porque para APROBAR **Computación Gráfica II (18)** (que también se requiere `aprobada` por **Proyecto Final**) ya se requiere la cadena: `Computación Gráfica I (13)` (`aprobada`)
```

## Formato de Salida

Para cada redundancia encontrada, genera un mensaje con este formato usando **Markdown**:

```
En **[MATERIA] ([ID])**: El requerimiento **[MATERIA_REQUERIDA] ([ID_REQUERIDA])** `[ESTADO]` para `[PROPÓSITO]` es redundante porque para [ACCION_TRANSITIVA] **[MATERIA_INTERMEDIA] ([ID_INTERMEDIA])** (que también se requiere `[ESTADO_OTRO_REQ]` por **[MATERIA]**) ya se requiere la cadena: `[CADENA_DEPENDENCIAS]` (`[ESTADO_TRANSITIVO]`)
```

Donde:

- `[MATERIA]`: Nombre de la materia que tiene el requerimiento redundante
- `[ID]`: ID numérico de la materia (para fácil identificación)
- `[MATERIA_REQUERIDA]`: Nombre de la materia que es redundante
- `[ID_REQUERIDA]`: ID de la materia requerida
- `[ESTADO]`: "no cursada", "en curso", "regular" o "aprobada" (usar labels femeninos)
- `[PROPÓSITO]`: "CURSAR" o "RENDIR" (en mayúsculas)
- `[ACCION_TRANSITIVA]`: "APROBAR" si el otro requerimiento exige estado `aprobada`, en caso contrario "CURSAR`
- `[ESTADO_OTRO_REQ]`: Estado exigido por el otro requerimiento (usar labels femeninos)
- `[MATERIA_INTERMEDIA]`: Materia que provee la dependencia transitiva
- `[ID_INTERMEDIA]`: ID de la materia intermedia
- `[CADENA_DEPENDENCIAS]`: Secuencia completa con IDs: "Materia A (ID) → Materia B (ID)"
- `[ESTADO_TRANSITIVO]`: Estado que se requiere transitivamente

## Casos Especiales

1. **Estados diferentes:** Si transitivamente se requiere 'passed' y directamente 'taken', hay redundancia
2. **Una sola razón por redundancia:** Si un requerimiento es redundante por múltiples cadenas, reporta solo UNA (la primera encontrada)
3. **Propósito en la recursión:** La recursión usa el/los propósitos derivados del estado objetivo (ver mapeo estado→propósito más abajo)
4. **Redacción de la acción transitiva:** En el mensaje usa `[ACCION_TRANSITIVA]` guiado por el estado del otro requerimiento (si exige `aprobada` → "APROBAR", si no → "CURSAR"). La primera parte "para `[PROPÓSITO]`" siempre conserva el propósito del requerimiento analizado.
5. **Dependencias profundas:** El algoritmo debe detectar cadenas de cualquier longitud (3, 4, 5+ niveles)
6. **Validación de datos:** Si los comentarios no coinciden con los IDs, usa los IDs (los datos son la fuente de verdad)

## Optimizaciones del Algoritmo

### **Evitar Redundancias Múltiples**

Para cada requerimiento redundante, reporta **solo UNA razón**, no todas las posibles cadenas:

```typescript
// Crear clave única por requerimiento
const requirementKey = `${requiredCourseId}-${requiredState}-${requiredFor}`;

// Si ya procesamos este requerimiento, saltarlo
if (processedRedundancies.has(requirementKey)) continue;

// Marcar como procesado al encontrar primera redundancia
processedRedundancies.add(requirementKey);
break; // Salir del loop
```

### **Profundidad Ilimitada (recursión guiada por estado)**

El algoritmo debe usar recursión y guiarse por el estado objetivo para detectar cadenas de cualquier longitud. Mapea estado→propósito, y combina resultados usando el estado más fuerte:

```typescript
// Mapeo estado→propósitos a seguir
const purposesForState = (state) => {
	if (state === 'passed') return ['complete', 'enroll'];
	if (state === 'taken' || state === 'inProgress') return ['enroll'];
	return [];
};

// Devuelve Map<courseId, { state, path[] }>
const getTransitivePrerequisites = (courseId, desiredStateForCourse, visited = new Set()) => {
	if (visited.has(courseId)) return new Map();
	visited.add(courseId);

	const results = new Map();
	for (const purpose of purposesForState(desiredStateForCourse)) {
		for (const req of course.requirements.filter((r) => r.requiredFor === purpose)) {
			const currentPath = [`${reqCourse.name} (${reqCourse.id})`];
			// Agrega directo (fusiona por estado más fuerte)
			merge(results, req.requiredCourseId, { state: req.requiredState, path: currentPath });
			// Recurre usando el estado que se exige en este eslabón
			const deeper = getTransitivePrerequisites(
				req.requiredCourseId,
				req.requiredState,
				new Set(visited)
			);
			mergeAll(results, deeper, withPrefix(currentPath));
		}
	}
	return results;
};

// Al comparar requerimientos dentro de una misma materia:
// para cada otro requerimiento (mismo requiredFor) calcular:
//   transitive = getTransitivePrerequisites(otro.requiredCourseId, otro.requiredState)
// y verificar si incluye (requiredCourseId del requerimiento actual) con estado >= requerido.
```

## Instrucciones Finales

- ✅ **Analiza TODAS las materias sistemáticamente** (50 materias aprox.)
- ✅ **Detecta dependencias de cualquier profundidad** (2, 3, 4, 5+ niveles)
- ✅ **Una sola explicación por redundancia** (evita duplicados conceptuales)
- ✅ **Usa formatting Markdown** (negrita para materias, backticks para estados)
- ✅ **Incluye IDs en todo** (materias y cadenas de dependencias)
- ✅ **Propósitos consistentes** (CURSAR/RENDIR según corresponda)
- ✅ **Estados con labels correctos** (regular/aprobada en español)
- ✅ **Prioriza claridad y precisión** en cada explicación

---

**Ahora analiza el siguiente array de materias y encuentra TODOS los requerimientos redundantes:**
