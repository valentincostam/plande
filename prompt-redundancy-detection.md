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
  - `requiredState`: Estado requerido ('taken' = cursada, 'passed' = aprobada)
  - `requiredFor`: Propósito ('enroll' = para cursar, 'complete' = para completar)

## Jerarquía de Estados

Los estados tienen esta jerarquía (mayor incluye menor):

- 'passed' (aprobada) > 'taken' (cursada) > 'inProgress' (en curso) > 'notTaken' (no cursada)

Si una dependencia transitiva requiere un estado mayor o igual, cubre el requerimiento directo.

## Algoritmo de Detección

1. **Para cada materia y cada requerimiento:**
   - Identifica otros requerimientos de la misma materia (mismo `requiredFor`)
   - Para cada uno de estos otros requerimientos, analiza recursivamente sus dependencias
   - Verifica si el requerimiento actual aparece en esas dependencias transitivas

2. **Verificación de cobertura:**
   - Si el estado transitivo es >= al estado del requerimiento directo, hay redundancia
   - Ejemplo: si transitivamente se requiere 'passed', cubre un requerimiento 'taken'

3. **Evitar ciclos:** Mantén un conjunto de materias visitadas para prevenir loops

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

## Formato de Salida

Para cada redundancia encontrada, genera un mensaje con este formato usando **Markdown**:

```
En **[MATERIA] ([ID])**: El requerimiento **[MATERIA_REQUERIDA] ([ID_REQUERIDA])** `[ESTADO]` para `[PROPÓSITO]` es redundante porque para [PROPÓSITO_TRANSITIVO] **[MATERIA_INTERMEDIA] ([ID_INTERMEDIA])** ya se requiere la cadena: `[CADENA_DEPENDENCIAS]` (`[ESTADO_TRANSITIVO]`)
```

Donde:

- `[MATERIA]`: Nombre de la materia que tiene el requerimiento redundante
- `[ID]`: ID numérico de la materia (para fácil identificación)
- `[MATERIA_REQUERIDA]`: Nombre de la materia que es redundante
- `[ID_REQUERIDA]`: ID de la materia requerida
- `[ESTADO]`: "no cursada", "en curso", "cursada" o "aprobada" (usar labels femeninos)
- `[PROPÓSITO]`: "CURSAR" o "RENDIR" (en mayúsculas)
- `[PROPÓSITO_TRANSITIVO]`: "cursar" o "rendir" (en minúsculas, debe coincidir con el propósito original)
- `[MATERIA_INTERMEDIA]`: Materia que provee la dependencia transitiva
- `[ID_INTERMEDIA]`: ID de la materia intermedia
- `[CADENA_DEPENDENCIAS]`: Secuencia completa con IDs: "Materia A (ID) → Materia B (ID)"
- `[ESTADO_TRANSITIVO]`: Estado que se requiere transitivamente

## Casos Especiales

1. **Estados diferentes:** Si transitivamente se requiere 'passed' y directamente 'taken', hay redundancia
2. **Una sola razón por redundancia:** Si un requerimiento es redundante por múltiples cadenas, reporta solo UNA (la primera encontrada)
3. **Misma materia, diferentes propósitos:** Analiza 'enroll' y 'complete' por separado
4. **Propósito consistente:** El `[PROPÓSITO_TRANSITIVO]` debe coincidir con el propósito del requerimiento original
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

### **Profundidad Ilimitada**

El algoritmo debe usar recursión para detectar cadenas de cualquier longitud:

```typescript
const getTransitivePrerequisites = (courseId, requiredFor, visited = new Set()) => {
	if (visited.has(courseId)) return new Map(); // Evitar ciclos
	visited.add(courseId);

	// Procesar recursivamente TODOS los niveles
	for (const req of course.requirements) {
		const transitivePrereqs = getTransitivePrerequisites(
			req.requiredCourseId,
			requiredFor,
			new Set(visited)
		);
		// Combinar resultados...
	}
};
```

## Instrucciones Finales

- ✅ **Analiza TODAS las materias sistemáticamente** (50 materias aprox.)
- ✅ **Detecta dependencias de cualquier profundidad** (2, 3, 4, 5+ niveles)
- ✅ **Una sola explicación por redundancia** (evita duplicados conceptuales)
- ✅ **Usa formatting Markdown** (negrita para materias, backticks para estados)
- ✅ **Incluye IDs en todo** (materias y cadenas de dependencias)
- ✅ **Propósitos consistentes** (CURSAR/RENDIR según corresponda)
- ✅ **Estados con labels correctos** (cursada/aprobada en español)
- ✅ **Prioriza claridad y precisión** en cada explicación

---

**Ahora analiza el siguiente array de materias y encuentra TODOS los requerimientos redundantes:**
