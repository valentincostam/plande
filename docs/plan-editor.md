# Editor del borrador

## Probar el editor localmente

Con Supabase local y la app de QA en `http://127.0.0.1:5174`:

```sh
bun scripts/demo-plan-editor.ts
```

Abre una ventana de Chromium con una cuenta temporal y una propuesta de demostración con dos materias. Permite editar, guardar y abrir la revisión sin configurar Google. La sesión sólo existe en esa ventana. Cerrar la pestaña elimina los datos de la demostración; no usarla para cargar un plan real.

El comando no inicia ni reinicia servidores. `bun scripts/demo-plan-editor.ts --smoke` comprueba la apertura y elimina sus datos sin dejar una ventana abierta.

## Alcance

El editor permite completar secciones no anuales, materias e hitos sobre el mismo borrador compartido. No publica contenido ni transfiere progreso académico.

La decisión de interfaz para este editor es shadcn-svelte, con componentes propios y primitivas de Bits UI. Conserva Noto Sans y los colores del plan público. No usa DaisyUI. Esta decisión explícita del usuario sustituye la indicación genérica anterior para estos formularios.

El alta de planes en `/plans/new` usa Superforms y el esquema Zod compartido de `src/lib/new-plan-form.ts`. Valida en cliente y servidor, conserva los valores ante errores y relaciona cada mensaje con su campo. Las reglas de identidad y creación siguen en el dominio y PostgreSQL. Superforms no reemplaza el controlador del editor ni su protocolo de conflictos.

## Documento incompleto

`draft_envelopes.content` guarda un sobre propio. No se convierte en `StudyPlanData` durante la carga. La publicación posterior deberá exigir el esquema completo y ejecutar `preparePlan`.

El contenido inicial `{}` se interpreta como:

```json
{
	"schemaVersion": 1,
	"document": { "nextSeqId": 0, "sections": [], "items": [], "requirements": {} },
	"unknownRequirements": [],
	"unsupportedContent": []
}
```

Las materias nuevas agregan dudas explícitas para cursar y completar; los hitos nuevos, para completar. Una duda no significa que no haya requisitos. Las expresiones nativas existentes que este editor todavía no permite modificar se conservan. `unsupportedContent` conserva otros datos en las rutas nativas permitidas.

El constructor agrega condiciones completas y permite combinarlas con «todas» o «al menos una», también dentro de otros grupos. El diálogo no modifica el árbol hasta confirmar. Quitar una condición conserva el grupo restante; no genera un grupo vacío que pueda interpretarse como satisfecho.

Una cantidad de condiciones (`countOf`) cuenta reglas cumplidas; una cantidad de materias o hitos (`count`) cuenta elementos de un conjunto. Los porcentajes y las sumas de horas, horas totales o créditos también conservan su expresión nativa. Los selectores por etiqueta, sección, período o tipo permanecen dinámicos; no se convierten en listas de identificadores. El motor resuelve exclusiones y ubicaciones repetidas.

Los formularios no interpretan un umbral vacío como cero. Una condición aún sin confirmar no modifica el árbol; los umbrales numéricos que el motor considere inválidos pueden conservarse en el borrador con un aviso. Cambiar el tipo elimina los campos que ya no corresponden, sin descartar la etiqueta nativa. Los elementos o secciones referenciados que ya no existen se muestran sin retirarlos automáticamente.

Los diagnósticos del borrador reutilizan `preparePlan` sobre la estructura nativa, sin inventar metadatos de publicación. Muestran el primer problema detectado y permiten guardar para corregirlo después. La ausencia de un aviso no equivale a una aprobación del plan ni elimina las dudas pendientes.

Los bloques de graduación conservan identidad, etiqueta, expresión y peso opcional. Un bloque nuevo puede guardarse sin expresión, con una duda explícita. Esa ausencia solo está permitida en el borrador; no cambia el esquema nativo de publicación. El editor reutiliza el constructor de requisitos sin crear una materia ficticia.

«Probar graduación» calcula el avance con el evaluador nativo y estados simulados que viven únicamente en la página. No modifica el borrador guardado ni el progreso personal. Recargar descarta esos estados. Los bloques incompletos o inválidos impiden calcular la simulación, pero no guardar el borrador.

Cada ítem conserva su `id`, `seqId` y tipo de elemento. Las ubicaciones tienen identidades propias y pueden repetir un ítem sin duplicar su identidad académica. `nextSeqId` aumenta con cada alta y no disminuye al retirar elementos.

## Guardado y concurrencia

### Importación opcional

En un borrador vacío se puede copiar un prompt nuevo para usar con una IA externa, pegar su respuesta JSON y revisar una vista previa antes de confirmar. Plande no llama a una IA ni recibe archivos fuente. Los errores incluyen un pedido de corrección para volver a usar con esa IA.

El contrato de importación usa `schemaVersion: 1` y el sobre de borrador. Se validan tamaño, profundidad, cantidad, estructura e identidades antes de llamar al motor. Los identificadores externos se remapean junto con referencias y ubicaciones; no sustituyen elementos existentes. Las dudas y el contenido no representable permanecen en el borrador. Una importación no concede aprobaciones ni publica el plan.

El texto pegado vive en la página, no en logs ni almacenamiento local. Ante un conflicto de confirmación permanece disponible mientras la página siga abierta. Recargar antes de importar lo descarta.

El servidor limita el cuerpo de la solicitud antes de leer el formulario, valida de nuevo el JSON, comprueba la cuenta, la versión y la vaciedad. Guarda usando esa misma versión, sin combinar la importación con cambios remotos. El bloqueo y la comparación de versión del RPC existente impiden sobrescribir una escritura concurrente.

### Edición manual

El formulario envía operaciones concretas y una versión base. La lista implementada está en `sectionPatchSchema`, en `src/lib/plan-editor/section-patches.ts`. Los campos opcionales se limpian mediante `null`; el servidor elimina la propiedad. No se envía el documento completo del navegador como una sobrescritura.

En desktop, las secciones y los elementos se pueden ordenar desde su asa. Las materias y los hitos también se pueden mover entre secciones; un hito puede volver a Hitos generales. Cada operación tiene el mismo equivalente en el menú de tres puntos, que queda disponible en mobile y para teclado. El orden de los hitos generales se guarda con `unplaced.reorder` sin modificar sus `seqId` estables.

El servidor lee la revisión base y el documento actual. Combina cambios compatibles por campo y conserva el valor actual cuando encuentra un conflicto. Devuelve la versión actual para mostrar alternativas. Si otra escritura gana después de esa lectura, devuelve un conflicto recuperable sin sobrescribirla.

Cada requisito de cursada o finalización se cambia con `requirement.replace`. El campo completo incluye una expresión nativa, la declaración explícita de que no hay requisitos o una duda con su nota. Dos cambios distintos sobre ese campo requieren elegir una alternativa; no se mezclan posiciones de los árboles. Los requisitos de inicio de hitos que ya existían se conservan, aunque la UI nueva solo edita su finalización.

La copia pendiente del navegador se separa por cuenta y UUID del borrador. Incluye el documento editado y su base. Al recargar se compara con el documento actual. No contiene tokens. Si el almacenamiento local falla, la interfaz advierte que no podrá conservar la copia al cerrar o recargar.

Si otro estudiante retiró un elemento mientras se editaba, la elección local solicita recuperarlo desde una revisión histórica. El servidor lee esa revisión del mismo borrador; no acepta una copia histórica enviada por el navegador. Conserva identidades y rechaza la recuperación si faltan dependencias. La copia pendiente incluye la referencia a esa revisión para poder retomar la elección tras recargar.

Retirar una sección requiere resolver primero sus ubicaciones y los selectores de requisitos que la referencian. El diálogo identifica los requisitos o elementos afectados y no ofrece confirmar el retiro mientras existan referencias.

La autoridad del autor procede de `locals.auth.subject`, verificado por el servidor. La identidad mostrada en el formulario solo permite detectar un cambio de cuenta en otra pestaña; no concede permisos.

## Persistencia en PostgreSQL

- `plan_collaboration.read_draft_editor` devuelve contenido, versión y marca de invalidación de revisión del borrador actual.
- `plan_collaboration.read_draft_revision` permite consultar la base de una edición.
- `plan_collaboration.save_draft_document` bloquea el borrador, valida actor y versión y confirma documento, historial, coautoría e invalidación en una transacción.

Estas funciones se conceden al rol restringido de colaboración. El navegador no recibe acceso directo a las tablas. La base rechaza la reutilización de secuencias y los cambios de dueño de una ubicación. `version_conflict` no modifica nada; `unchanged` no inventa una revisión.

El controlador PostgreSQL puede devolver `bigint` como texto. El adaptador convierte las versiones a enteros seguros antes de entregarlas a la aplicación.

## Revisión del plan

`/draft/[id]/review` permite leer el plan completo sin cuenta. Cada estudiante autenticado guarda sus propias comprobaciones explícitas. Abrir una pantalla no cuenta como revisión. Cada comprobación declara que pudo comparar el contenido con fuentes accesibles sin pedir permiso; Plande no verifica automáticamente el acceso ni la procedencia de un enlace.

El servidor calcula huellas canónicas por identidad, fuente, ítem y bloque de graduación. Usa los selectores del motor para incluir sus miembros y contexto. Una modificación conserva solo las comprobaciones cuyas huellas siguen coincidiendo. Cambiar fuentes puede afectar varias unidades académicas porque el piloto no exige asociar una fuente a cada materia.

La aprobación requiere cobertura completa, contenido técnicamente válido, ausencia de dudas y un revisor que no sea coautor. Crear el borrador, editar el documento, completar el año o agregar una fuente registra coautoría. Las aprobaciones se vinculan a `review_invalidation_revision`; una modificación efectiva las vuelve obsoletas en la misma transacción. Este flujo no publica planes.

Las operaciones de revisión bloquean el documento antes de leer identidad, fuentes y comprobaciones. El servidor calcula el manifiesto dentro de esa transacción y nunca acepta huellas ni actores del navegador. Los formularios incluyen la cuenta y revisión esperadas para rechazar pestañas obsoletas; la autoridad proviene de la sesión verificada.

Los borradores anteriores a registrar al creador conservan `review_authorship_known=false`. Se pueden consultar y editar, pero no aprobar hasta resolver su autoría con evidencia. No se atribuyen a quien los visite ni se descartan sus datos.

`bun scripts/test-draft-review.ts` verifica la base local con rollback de fixtures. Requiere las migraciones `20260908090000` y `20260908093000`. No modifica credenciales ni reinicia servicios. Los modos `--migration-smoke` y `--source-migration-smoke` son solo para etapas previas a aplicar sus respectivas migraciones, no para el stack ya actualizado.

`e2e/draft-review-controlled.spec.ts` mantiene un solo flujo crítico con tres cuentas: alta de fuente, revisión reanudable, exclusión del autor, aprobación, edición concurrente y conservación de comprobaciones vigentes.

## Objeciones documentadas

Los aportes públicos conservan el contenido referido, argumento, fuente y referencia dentro de la fuente. Comentar no registra coautoría. Las objeciones pendientes o con error confirmado bloquean la futura publicación, pero no retiran una publicación existente.

Confirmar o descartar requiere un participante que no haya editado el plan ni participado en la disputa. Confirmar un error elimina las comprobaciones del contenido afectado. Para comprobar su corrección debe cambiar ese contenido y un participante independiente debe revisarlo de nuevo. Las demás comprobaciones se conservan cuando su contenido sigue vigente.

Reabrir exige declarar evidencia nueva y conserva el historial. Repetir el mismo aporte ya resuelto no lo reabre. Plande registra estas declaraciones, pero no verifica automáticamente la verdad de una fuente o la novedad semántica de la evidencia.

Las escrituras comprueban tanto la revisión académica como la de discusión bajo bloqueo. Los identificadores de solicitud permiten reintentar sin duplicar aportes o resoluciones. La publicación comprueba ambas revisiones y los bloqueos dentro de su propia transacción.

## Primera publicación

La revisión permite solicitar la primera publicación. El servidor valida el documento nativo completo antes de enviar el candidato a la base. La transacción comprueba que el contenido no cambió, que dos estudiantes habilitados y ajenos a la autoría aprobaron todas las unidades vigentes y que no quedan objeciones pendientes. Guarda la instantánea inmutable, su recibo y el puntero publicado juntos.

Publicar cierra el borrador. Sus enlaces anteriores redirigen al plan publicado. Los reintentos comprueban actor, identificador de solicitud y revisiones antes de devolver una publicación existente. El año desconocido permanece ausente; no se inventan facultades ni se trasladan progresos entre planes.

## Correcciones de publicaciones

VAL-35 conserva el mismo plan y abre una propuesta compartida sin retirar la publicación vigente. La entrada usa Superforms para exigir argumento. El formulario de publicación usa mejora progresiva para conservar el `409` visible si otra solicitud gana la carrera. La comparación muestra contenido anterior y propuesto, incluidas notas de identidad. Publicar una corrección o una reversión agrega una instantánea; no reemplaza ni borra el historial.

La lectura anónima de una propuesta muestra su argumento y comparación de contexto, pero no concede comprobaciones, aprobación ni publicación.

La propuesta conserva IDs académicos y aplica el piso histórico de `nextSeqId`. Fuentes, notas y slugs de la fuente se conservan al construir el candidato, con el slug canónico vigente del plan. Las notas forman parte de la huella de identidad sólo cuando existen. Los gates SQL separan coautoría, comprobaciones y discusiones por ronda, rechazan pestañas obsoletas y sólo aceptan el reintento de su propia publicación.

El progreso necesita posiciones estables aunque se retire una materia. `progress_item_order` conserva el orden de la primera publicación y agrega IDs nuevos al final. No elimina posiciones históricas. `PlanSession`, URL, almacenamiento local, página e imagen compartida usan ese orden; la presentación sigue `seqId`. Un lector sin columna conserva el orden original. Una columna presente pero inválida se rechaza.

Las migraciones `20260908130000_plan_proposals.sql`, `20260908133000` y `20260908134000` están aplicadas localmente. El comando de ronda aplicado fue:

```sh
bun scripts/test-plan-proposals.ts --round-commands
```

Los modos de smoke de migración quedan prohibidos sobre el stack actual, porque vuelven a cargar migraciones dentro de su transacción. El E2E `e2e/plan-proposal-controlled.spec.ts` pasó 1/1 en 7.5 s: propuesta, lectura anónima sin permisos, ganador único y conflicto visible en la publicación concurrente, más limpieza de fixtures.

```sh
PLANDE_CONTROLLED_COLLABORATION=1 BASE_URL=http://127.0.0.1:5174 bunx playwright test e2e/plan-proposal-controlled.spec.ts --reporter=line
```

## Correcciones y trayectoria, VAL-36

La lectura pública devuelve el documento, sus posiciones estables de progreso y el ID de publicación en una misma fila. Una publicación distinta reinicia la sesión del plan con ese documento y recupera el progreso. La copia local registra la publicación vista para mostrar los argumentos de las correcciones posteriores. No anuncia versiones más nuevas que el documento cargado.

El retiro de una materia publicada explica que dejará de aparecer y que se conservan sus estados y notas. El borrado de un ítem nuevo sigue siendo una operación del borrador. Ambos mantienen el bloqueo por referencias pendientes.

El año desconocido puede completarse en una propuesta. La identidad pública sólo cambia junto con la publicación aprobada. Un conflicto con otro plan de la misma oferta impide publicar, sin fusionar planes ni trasladar progreso.

Las migraciones locales `20260908135000`, `20260908136000`, `20260908137000` y `20260908140000` están aplicadas. La validación de progreso admite ítems retirados únicamente cuando hay evidencia de publicación del mismo plan. Rechaza ítems de otro plan, snapshots nunca publicados y tipos históricos contradictorios. La lectura pública incluye el tipo de cada posición histórica, sin exponer progreso personal, para recuperar enlaces antiguos incluso sin copia local.

```sh
bun scripts/test-private-progress-history.ts --applied
bun scripts/test-plan-proposals.ts --round-commands
```

Estas comprobaciones revierten sus fixtures. No ejecutar los modos `--migration-smoke`, `--kinds-smoke` o `--year-migration-smoke` sobre la base actual.

La prueba `e2e/publication-progress-controlled.spec.ts` pasó 1/1 en 8.0 s. Comprueba retiro confirmado, nueva condición de graduación, aprobación y publicación, aviso al volver, recuperación en un dispositivo limpio y guardado desde una pestaña antigua sin resucitar contenido. La limpieza de datos temporales terminó sin errores. La prueba de aislamiento de progreso pasó 1/1 en 7.8 s y la suite de dominio y comandos pasó 390/390.

La recuperación desde enlaces antiguos conserva posiciones y notas de ítems retirados. El tipo histórico permite distinguir materias de hitos sin adivinar. Los valores iniciales de sincronización son estados vacíos, no estados importados del enlace; esto evita falsos conflictos al abrir un dispositivo limpio. Si una lectura antigua no provee el tipo de un ítem retirado, su progreso permanece local y no se anuncia como guardado en la cuenta.

## Componentes del formulario de creación

`/plans/new` usa Superforms para validación y componentes copiados del registro oficial de shadcn-svelte con CLI 1.6.1. `components.json` registra sus rutas. Los colores semánticos reutilizan la paleta clara y oscura de Plande. Los selectores permiten elegir nombres existentes o agregar uno nuevo; sede y modalidad sólo distinguen variantes académicas.

`bun scripts/test-draft-discussions.ts` comprueba las funciones y permisos en PostgreSQL local y revierte sus fixtures. La prueba de navegador de revisión incluye el recorrido de plantear un error, confirmarlo, editar el contenido y comprobar la corrección.

## Verificación local

La interfaz sigue siendo exploratoria. Conservamos pocos E2E críticos para guardado y recuperación, aislamiento entre cuentas y conflictos sin pérdida de datos. Las reglas y variantes se comprueban en pruebas de dominio; lo visual y el teclado se revisan de forma exploratoria. No agregamos un E2E por interacción ni retiramos pruebas existentes sin revisar qué protección aportan.

`bun run test:draft-editor` comprueba versiones, historial, coautoría, secuencias, ubicaciones y permisos contra la base local, con fixtures dentro de una transacción que revierte.

También comprueba retirar un ítem y recuperarlo desde una revisión histórica con el mismo `id`, `seqId` y ubicación.

Con la app de QA en 5174 y el stack local configurado:

```sh
PLANDE_CONTROLLED_COLLABORATION=1 BASE_URL=http://127.0.0.1:5174 bunx playwright test e2e/collaboration.spec.ts e2e/draft-concurrency-controlled.spec.ts --workers=1
```

`e2e/draft-requirements-controlled.spec.ts` cubre el editor de requisitos con el mismo entorno controlado.

Las pruebas usan identidades temporales. Comprueban metadatos, ubicaciones, retiro con referencias, inserción y orden, móvil y teclado. La prueba de concurrencia cubre cambios compatibles, alternativas de nombre y recuperación tras un retiro, con recarga antes de elegir y después de guardar. Mantienen las trazas desactivadas y eliminan sus fixtures.

No ejecutar pruebas de navegador mientras se modifican módulos compartidos por el cliente y el servidor: la recarga automática de Vite puede interrumpir la interacción. Tampoco ejecutar el wrapper que provisiona credenciales de colaboración mientras la app está usando esas credenciales.
