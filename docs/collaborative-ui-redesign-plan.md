# Rediseño de la UI colaborativa

Estado: UI-0 a UI-2 aprobadas para implementación el 10 de septiembre de 2026. UI-3 y UI-4 siguen pendientes de aprobación visual de la primera entrega.

## Resultado esperado

Un estudiante puede reconocer su plan, editarlo en su lugar y revisar cambios sin aprender el esquema interno. El acabado visual parte del código oficial de shadcn-svelte. El plan publicado sirve como referencia de organización académica, no como componente obligatorio del editor.

En alcance: entrada y selección de carrera, borrador, editor, importación, revisión, discusión, propuesta de corrección y sus estados de guardado/conflicto. Fuera: rediseño del catálogo y del plan público completo, nuevas funciones académicas, moderación, SQL, permisos, migración de progreso y cambios en reglas de publicación.

## Fuentes y decisiones de base

- Fuente de componentes: [shadcn-svelte, revisión bc3c2038](https://github.com/huntabyte/shadcn-svelte/tree/bc3c2038f92aca4bd317da0e25180bdb5a4b335d). Usar esa revisión durante este trabajo, no versiones distintas de `latest` por agente.
- Composición: [field-demo.svelte](https://github.com/huntabyte/shadcn-svelte/blob/bc3c2038f92aca4bd317da0e25180bdb5a4b335d/docs/src/lib/registry/examples/field-demo.svelte).
- Componentes distribuibles: [Nova field.json](https://github.com/huntabyte/shadcn-svelte/blob/bc3c2038f92aca4bd317da0e25180bdb5a4b335d/docs/static/registry/styles/nova/field.json). Las fuentes internas actuales contienen clases `cn-*`; copiar únicamente esos archivos sin los estilos correspondientes no reproduce el componente. Usar el registro generado coherente con la revisión.
- Interacción y accesibilidad: [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines). Aplicación acotada más abajo.
- Pruebas: [testing.md](testing.md). Las reglas y variantes permanecen en dominio; pocos E2E protegen los recorridos críticos. La inspección visual no se sustituye con tests.

Usar Svelte, no adaptar ejemplos React. Conservar Noto Sans para mantener continuidad con Plande en esta primera entrega. Conservar elección de tema del usuario. Componentes y tema forman un conjunto: no mezclar presets ni inventar variantes locales por pantalla.

La referencia es el código, no una copia por aproximación de la captura. Las capturas del resultado sirven para revisar nuestra composición.

## Problemas comprobados que debe resolver la base

1. `src/lib/plan-editor/ui/button.svelte` traduce `default` a `lg` y `sm` a `default`. Restaurar significados oficiales cuando se migren sus consumidores. Preservar `type="button"` donde corresponde para no introducir submits accidentales.
2. `src/app.css` redefine las paletas globales en `.dark`. El rediseño debe usar tokens semánticos sin cambiar silenciosamente el aspecto del plan público. No retirar compatibilidad global sin inspeccionar sus consumidores.
3. Los controles oficiales ya existen, pero las pantallas combinan colores directos, agrupación manual y formularios largos. Instalar más controles por sí solo no resuelve esto.
4. El formulario anónimo presenta una búsqueda deshabilitada; el borrador anónimo carece de una entrada clara para colaborar. Diseñar explícitamente ambos estados sin cambiar autoridad ni abrir mutaciones anónimas.

## Contrato visual propuesto

- Un único contenedor de lectura, con ancho inicial `max-w-3xl`, margen automático y padding lateral 16 px en móvil, 24 px desde escritorio. El ancho es una decisión de Plande, no una afirmación sobre el demo oficial.
- Título del plan, identidad secundaria y estado editorial agrupados en el encabezado. Una acción primaria por contexto. Avisos de seguridad visibles cuando importan, no repetidos en cada sección.
- Filas de materias compactas; nombre protagonista, metadatos secundarios y acción de detalles. Los títulos de sección siguen editándose en el lugar. `+ Materia` y `+ Agregar sección` ocupan el ancho de inserción correspondiente.
- Detalles desplegados bajo la materia, sin sucesivas tarjetas anidadas. Formularios compuestos con `Field.Group`, `Field.Set`, `Field.Legend`, `Field.Label`, `Field.Description` y `Field.Error` oficiales según corresponda. Separación y tipografía de esos componentes, sin overrides por campo para simularlos.
- `Input`, `Textarea`, `Select` o `NativeSelect`, `Checkbox`, `Button`, `Dialog`, `AlertDialog`, `DropdownMenu` y `Collapsible` oficiales sólo cuando el comportamiento los necesita. Conservar el combobox existente si cumple el contrato. No construir otro sistema de formularios.
- Tokens semánticos para texto, fondo, borde, foco y error. Portales de menús y diálogos deben recibir el mismo tema que el editor. Preservar claro/oscuro también en los controles nativos.
- Campos relacionados comparten fila sólo si hay espacio legible. En móvil, apilarlos antes que comprimir etiquetas. El número de columnas responde al contenido, no a que una grilla se vea simétrica.
- Acciones de retirar y reordenar en un menú con nombre accesible. La inserción y apertura de detalles permanecen descubribles sin hover. Conservar confirmación y todas las protecciones existentes de retiro.
- Nombres reales y largos, secciones que no son años, un hito sin sección y valores ausentes forman parte de la validación visual. No mostrar UUID de fixture como título de demostración.

## Primera entrega: editor representativo

Construir únicamente esta entrega después de aprobar el plan. No propagar su diseño al resto antes de que el usuario lo vea.

Contenido representativo: dos secciones, Formación básica y Formación profesional; Álgebra, Programación y una materia de nombre largo; un hito de idioma. Una materia con correlativa simple y otra con alternativas. Son ejemplos locales, sin afirmar que correspondan a una carrera real.

Vista cerrada: secciones y materias se leen como plan. No aparece el inventario completo de propiedades ni el constructor lógico. Al abrir una materia:

1. Nombre permanece asociado inequívocamente a sus detalles.
2. Mostrar datos académicos básicos agrupados. Información adicional y ubicaciones múltiples quedan en disclosures explícitos, conservando todos sus valores.
3. Presentar primero el requisito como frase académica. Ejemplo ilustrativo: "Álgebra aprobada o Inglés completado". El texto definitivo debe corresponder exactamente a la expresión existente.
4. Ofrecer edición local de esa condición. Las alternativas se distinguen por `O`; los requisitos simultáneos por `Y`. No aplanar expresiones anidadas ni cambiar su significado.
5. Para cantidades y porcentajes, pedir selección de materias o hitos, estado y objetivo mediante campos etiquetados. Evitar exponer IDs o nombres de tipos del esquema.
6. Una confirmación de diálogo actualiza la copia de edición. Sólo el guardado confirmado por servidor puede anunciar que el borrador quedó guardado. No cambiar el contrato de persistencia.

La pantalla debe mostrar de forma diferenciada cambios pendientes, guardado en curso, guardado confirmado, fallo recuperable y conflicto con cambios de otra persona. Los textos de error existentes que protegen datos se conservan hasta disponer de un reemplazo igualmente explícito.

Aceptación de esta entrega: usuario puede ver escritorio y móvil con una materia desplegada, una alternativa visible y el diálogo de una condición. Root inspecciona además error y conflicto. Se demuestra guardar y recuperar con la prueba crítica existente. La aprobación visual del usuario habilita extender el patrón, no una reescritura adicional del dominio.

## Tareas y propiedad

Los identificadores siguientes son tareas del plan, no nuevos issues de Linear. Antes de despachar, root comprueba el estado real del worktree y entrega la lista exacta de archivos. Los cambios actuales se preservan.

### UI-0: fijar componentes y compatibilidad de tema

Responsable: root. Precede a toda edición paralela.

- Comparar componentes locales con registro oficial fijado, seleccionar un único estilo coherente y registrar las diferencias intencionales en este documento.
- Incorporar sólo componentes necesarios para UI-1. Resolver el tema sin alterar la vista publicada. Inspeccionar estilos calculados si las clases están siendo sobrescritas.
- Propiedad exclusiva de `components.json`, `src/app.css`, `src/lib/components/ui/`, `src/lib/plan-editor/ui/`, dependencias y lockfile. Otros agentes solicitan cambios; no los realizan.
- Conservar wrappers que aportan un contrato real. Retirar o simplificar los demás al migrar consumidores, sin una limpieza general del repositorio.
- Completo cuando controles, foco y portales son coherentes en ambos temas y una comprobación visual del plan público no muestra regresión.

### UI-1: sección y materia representativa

Responsable: un constructor económico, con supervisión de root. Depende de UI-0.

- Archivos iniciales: `structure-editor.svelte`, `course-fields.svelte`, `placement-editor.svelte`, `retire-element.svelte`, dentro de `src/lib/plan-editor/`.
- Root mantiene propiedad de `structure-editor-form.svelte` y `src/routes/draft/[id]/+page.svelte` para conectar encabezado, guardado y composición sin carreras de edición.
- Aplicar contrato visual y detalles progresivos. Mantener props, callbacks, IDs y payloads. Un campo oculto sigue conservado; nunca se elimina del documento al cerrar un panel.
- Requisitos se coordinan con UI-2 antes de presentar la primera entrega. No reestructurar el controlador de guardado por conveniencia de layout.
- Entregar pantalla renderizada, diferencias frente al contrato y comprobaciones realizadas. No marcar terminado sólo por typecheck.

### UI-2: requisitos e hitos legibles

Responsable: segundo constructor económico únicamente después de fijar interfaz y base compartidas. Puede trabajar en paralelo con UI-1 sin tocar sus archivos.

- Archivos: `requirement-editor.svelte`, `requirement-value-editor.svelte`, `requirement-expression-editor.svelte`, `set-threshold-editor.svelte`, `set-threshold-dialog.svelte`, `graduation-editor.svelte`, `graduation-preview.svelte`.
- Preservar esquema y evaluador. Distinguir requisito no comprobado de ausencia comprobada de requisitos. Conservar todos los estados académicos válidos.
- Mostrar frases y agrupación lógica reconocible. Mantener una forma de editar expresiones complejas existentes sin truncarlas o reemplazarlas por un caso simple.
- Si el cambio requiere nuevas reglas de dominio, informar caso concreto a root antes de tocar archivos adicionales.
- Completo cuando casos simple, alternativas, cantidad, porcentaje e hito se entienden y editan sin desbordamiento ni pérdida semántica. Variantes en pruebas de dominio existentes; exploración visual y teclado, sin E2E nuevo por variante.

### UI-3: entrada y datos del plan

Sólo después de aprobación visual de UI-1 + UI-2.

- Archivos: `src/routes/plans/new/+page.svelte`, `offer-combobox.svelte`, `draft-source-form.svelte`, `draft-import-editor.svelte`. Root integra la página del borrador.
- Estado anónimo: explicar y ofrecer ingreso como acción clara. No presentar controles muertos como búsqueda disponible. Conservar lectura pública y contratos actuales.
- Universidad, facultad y carrera mantienen selección o creación contextual y tratamiento de duplicados. Año opcional. Sede y modalidad quedan como distinción adicional, no campos obligatorios.
- Fuentes usan nombre comprensible y URL; importación mantiene validación, vista previa y protección de cambios. No agregar carga de archivos ni IA paga.
- Mantener Superforms y Zod donde ya están. `Field` organiza la presentación, no reemplaza validación ni acciones del servidor.
- Completo con selección existente, entrada nueva, fuente incompleta y recuperación tras error; sin pérdida de valores ni cambios de contrato.

### UI-4: revisión, discusión y correcciones

Puede ejecutarse en paralelo con UI-3 después de aprobación visual, con archivos separados.

- Archivos: `src/routes/draft/[id]/review/+page.svelte`, `review-plan-view.svelte`, `review-invitation.svelte`, `discussion-panel.svelte`, `discussion-form.svelte`, `resolution-form.svelte`, `proposal-comparison.svelte`, `proposal-form.svelte`.
- Revisión utiliza jerarquía visual de plan, no volcado de propiedades. Fuentes accesibles durante comprobación. Se puede recorrer todo el plan y ver progreso de revisión.
- Diferencias identifican antes/después con texto además de color. Argumento y datos académicos tienen prioridad sobre explicaciones de permisos.
- Distinguir guardar revisión, aprobar y publicar sin cambiar umbrales ni autoridad. Mostrar por qué una acción no está disponible y cómo continuar cuando corresponda.
- Root integra sólo el punto de entrada de correcciones en el plan público. No rediseñar su contenido académico ni navegación restante.
- Completo con recorrido autor/revisor/anónimo, objeción y conflicto conservados, más inspección de un plan extenso.

### UI-5: aceptación conjunta

Responsable: root. Ningún agente instala herramientas ni reinicia servicios para facilitar esta revisión sin coordinación.

- Recorrer carga, edición, guardado, recuperación, revisión y propuesta en la app real. Usar fixtures locales existentes y limpieza controlada durante implementación autorizada.
- Verificar a 390 px y 1440 px, tema claro/oscuro; comprobar además 320 px para desbordamiento y zoom de navegador al 200 %. Estos tamaños son criterios del proyecto.
- Conservar los E2E críticos de persistencia, aislamiento y conflictos; ejecutar los afectados al cerrar cada entrega. Suite completa y typecheck una vez al integrar, no simultáneamente por cada agente.
- Entregar URL reproducible, capturas que root efectivamente haya visto, comprobaciones y limitaciones pendientes. Una captura vieja no certifica una interacción actual.

## Aplicación de las guidelines de Vercel

Aplicar a cada pantalla: teclado completo, foco visible y restaurado al cerrar diálogos, objetivos táctiles de 44 px, campos móviles con texto de 16 px, zoom habilitado, etiquetas asociadas, errores junto al campo, estados asíncronos anunciados, navegación mediante enlaces, protección de cambios pendientes y movimiento reducido. Revisar contenido largo y estados vacíos, densos y de error. [Fuente](https://vercel.com/design/guidelines).

Adaptaciones explícitas para Plande:

- Mantener español rioplatense y sentence case. Las preferencias de marca de Vercel no reemplazan la voz de Plande.
- URLs identifican plan y navegación compartible; no introducir contenido privado ni el borrador completo en query strings.
- Una respuesta optimista nunca certifica revisión, publicación o persistencia antes de confirmación. Conservar controles de cuenta y versiones.
- No incorporar React, herramientas de React, virtualización ni infraestructura nueva sin necesidad comprobada.
- No afirmar cumplimiento total de accesibilidad, Safari o rendimiento si no se midió. Registrar lo que queda sin verificar.

## Despacho eficiente de agentes

Root diseña y acepta. Máximo dos constructores simultáneos, sólo con archivos separados y prerrequisitos resueltos. Modelo económico disponible, inicialmente Terra para ediciones acotadas; escalar únicamente un problema concreto si lo necesita. No delegar criterio visual sin referencia aprobada.

Cada encargo contiene: objetivo de su tarea, archivos permitidos, fuente oficial fijada, contrato compartido relevante, comportamiento protegido, comprobación mínima y condición de parada. Enviar la sección pertinente y enlaces, no toda la conversación histórica ni todos los tickets.

Entrega breve: archivos modificados, evidencia, una captura por estado relevante y bloqueos. Root compara con la referencia y devuelve defectos concretos. Si dos intentos fallan en la misma decisión visual, root resuelve la composición antes de pedir otra implementación. No mantener agentes activos sólo para ocupar panes.

## Decisiones pendientes

1. Aprobar la primera pantalla renderizada antes de autorizar UI-3 y UI-4.

No se necesita decidir nuevas reglas académicas ni backend para empezar. Si aparece una necesidad real de ampliación, se documenta por separado y no se incluye silenciosamente en el rediseño.

## Registro de implementación

- Base elegida: Nova. El botón existente coincide con el registro Nova de la revisión fijada. Se mantienen sus tamaños oficiales y se incorporan Field, Label, Separator, Checkbox, DropdownMenu y AlertDialog del mismo estilo, sin dependencias nuevas.
- Adaptación de distribución: aliases de importación resueltos a los del proyecto y placeholders de iconos reemplazados por sus variantes Lucide existentes. Las fuentes del registro están en `docs/static/registry/styles/nova/` del repositorio oficial fijado.
- Tema aislado por `.plan-editor`, también en contenidos portaleados. Los aliases semánticos globales conservan los colores anteriores fuera de ese alcance. La compatibilidad de paletas de la vista publicada no se elimina en esta entrega.
- Adaptaciones de accesibilidad del editor: tamaños táctiles mínimos en móvil, tipografía de campos de 16 px, foco visible y movimiento reducido. El comportamiento de validación, identidad, guardado y conflictos permanece en los controladores existentes.

### Verificación de la primera entrega — 10 de septiembre

- `bun run check`: 0 errores y 0 advertencias. Suite de dominio/aplicación: 390 pruebas verdes. ESLint dirigido y `git diff --check` sin errores.
- E2E existente de concurrencia: verde, incluidas alternativas tras recargar, resolución y recuperación de una materia eliminada. Sólo se adaptó la interacción de retiro al nuevo menú; no se quitaron aserciones. E2E existente de progreso privado: verde, incluido aislamiento de cuentas y planes.
- Inspección real en Chromium a 1440, 390 y 320 px; claro y oscuro; diálogos portaleados. Nombres largos envuelven líneas. A 320 px, ancho de documento y viewport coinciden.
- Comprobado: Escape devuelve foco a «Editar condición»; cancelar retiro devuelve foco a «Acciones de Programación»; las dependencias impiden retirar una materia referenciada. Se corrigió un fallo de hidratación causado por referencias de menús sin inicializar.
- Captura de la vista publicada comparada antes/después: sin diferencias en el viewport inspeccionado. No certifica todas sus variantes.
- Pendiente: aprobación visual del usuario, Safari/Firefox, zoom nativo al 200 %, lector de pantalla y exploración exhaustiva de cantidades/conjuntos anidados. No se declara cumplimiento completo de las guidelines.
- Demo reproducible: `bun scripts/demo-plan-editor.ts`, con la app local ya disponible en 5174. Abre un navegador con cuenta y plan ficticios; permite editar/guardar y elimina esos fixtures al cerrar su pestaña. La autenticación no se comparte con otro navegador. `--smoke` verifica apertura y limpia; `--inspect` permite revisión local por CDP en 9223.

UI-3 y UI-4 no se implementaron en esta entrega. No hubo cambios de SQL, servicios, dependencias ni commits como parte del rediseño.
