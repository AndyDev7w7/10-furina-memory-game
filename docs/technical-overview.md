# Technical Overview - Furina Memory Game

## Stack
HTML, CSS, JavaScript modules, Node para tests

## Responsabilidades
- Entrada de datos validada antes de ejecutar operaciones principales.
- Estado de aplicacion mantenido de forma explicita.
- Respuestas de error pensadas para humanos.
- Dependencias externas evitadas salvo cuando aportan valor real.

## Ejecucion local
```bash
Abrir index.html o ejecutar npm test.
```

## APIs y datos
No usa variables de entorno.

## Riesgos conocidos
- Es una demo de portafolio, no un sistema productivo.
- Si usa API externa, incluye fallback o documentacion para evitar bloquear la demo.
- La seguridad de los proyectos auth/backend esta explicada como base educativa.
