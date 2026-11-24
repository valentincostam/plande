# Plande

Plande permite consultar planes de estudios y registrar el progreso académico de sus estudiantes.

## Language

**Oferta académica**:
Carrera de una universidad, distinguida por sede o modalidad cuando estas tienen reglas académicas diferentes. Cada oferta reúne sus propios planes de estudios.
_Avoid_: Carrera identificada solo por su nombre.

**Plan de estudios**:
Conjunto de materias y requisitos académicos de una oferta académica, cuyo año puede ser desconocido. Existe un único plan por oferta y año conocido, además de como máximo uno sin año por oferta; los estudiantes colaboran mediante cambios sobre el mismo plan.
_Avoid_: Plan personal, copia del plan por estudiante.

**Año del plan**:
Año que identifica el plan de estudios según su documentación fuente, cuando está indicado. Puede quedar sin especificar.
_Avoid_: Año de ingreso del estudiante, año de carga en Plande.

**Borrador de plan**:
Plan en preparación que los estudiantes pueden completar entre varios y probar antes de su revisión. Todavía no forma parte del catálogo publicado.
_Avoid_: Plan reservado por su creador.

**Revisión académica**:
Comprobación del contenido de un plan de estudios contra su documentación fuente. Un estudiante puede revisar el plan completo y continuar la revisión en distintas sesiones.
_Avoid_: Voto de popularidad, revisión limitada a una parte asignada.

**Fuente del plan**:
Documento o página que los colaboradores usan para respaldar el contenido académico del plan. Puede estar alojado fuera de los sitios de la universidad y no supone procedencia institucional verificada.
_Avoid_: Fuente oficial verificada por Plande.

**Confirmación institucional del contenido**:
Constancia de que una autoridad de la carrera confirmó un contenido concreto del plan, reconocida por el administrador mediante un check. Pierde vigencia si cambia ese contenido académico y permanece en el historial; no concede permisos de edición ni garantiza ausencia de errores.
_Avoid_: Verificación permanente del plan, cuenta institucional verificada.

**Avance de revisión**:
Parte del contenido del plan que un estudiante ya comprobó durante su revisión académica.
_Avoid_: Progreso académico del estudiante.

**Propuesta de cambio**:
Conjunto de modificaciones a un plan que los estudiantes someten a revisión antes de publicarlo. La primera publicación requiere revisar el plan completo; las posteriores requieren revisar los cambios y sus consecuencias.
_Avoid_: Nuevo plan por cada corrección.

**Autor de una propuesta**:
Estudiante que crea o edita directamente el contenido de una propuesta de cambio. Todos sus coautores quedan excluidos de las dos aprobaciones requeridas para esa propuesta.
_Avoid_: Propietario del plan.

**Progreso académico**:
Estados de cursada, aprobaciones, hitos y notas que un estudiante registra en un plan de estudios específico. Los planes distintos tienen progreso independiente, aunque pertenezcan a la misma oferta académica; comenzar otro plan requiere cargar su progreso desde cero.
_Avoid_: Progreso compartido entre planes, equivalencias automáticas.

**Corrección de un plan**:
Cambio publicado sobre un plan existente que actualiza su contenido y las habilitaciones calculadas, conservando los estados y notas registrados por sus estudiantes.
_Avoid_: Traslado a un nuevo plan, borrado automático del progreso.
