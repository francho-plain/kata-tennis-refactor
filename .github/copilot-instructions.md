# Copilot Instructions - Tennis Refactoring Kata

## Contexto
Este es un ejercicio de refactoring para practicar la detección y eliminación de code smells siguiendo los principios de:
- "Clean Code" de Robert C. Martin
- "Refactoring" de Martin Fowler

## Reglas Fundamentales
1. **NO MODIFICAR LOS TESTS**: Los tests son sagrados y no se pueden tocar
2. **Baby Steps**: Cambios pequeños e incrementales
3. Ejecutar tests después de cada cambio
4. Un refactor a la vez
5. **Conventional Commits**: Usar formato de commits convencionales
6. **Idioma**: Código y commits siempre en inglés

## Guías de Refactoring

### Code Smells a Detectar
- Long Method
- Magic Numbers
- Primitive Obsession
- Feature Envy
- Duplicated Code
- Large Class
- Long Parameter List
- Comments (que explican código malo)

### Técnicas de Refactoring Preferidas
- Extract Method
- Replace Magic Number with Symbolic Constant
- Introduce Parameter Object
- Replace Conditional with Polymorphism
- Extract Class
- Rename Variable/Method

### Al Sugerir Refactorings
1. Identifica el code smell específico
2. Explica qué refactoring aplicar
3. Muestra el código paso a paso
4. Recuerda ejecutar tests entre pasos
5. Sugiere nombres descriptivos y significativos

### Principios SOLID
Aplicar cuando sea apropiado:
- Single Responsibility Principle
- Open/Closed Principle
- Dependency Inversion

## Comandos Útiles
- Tests: `npm test`
- Build: `npm run build`

## Estilo de Respuestas
- Pedagógico: explica el "por qué"
- Incremental: un paso cada vez
- Validable: siempre verificable con tests

## Conventional Commits
Usar el formato estándar para mensajes de commit **en inglés**:
- `refactor: descripción del cambio` - Para refactorings
- `test: descripción` - Para cambios en tests (aunque no deberían modificarse)
- `docs: descripción` - Para documentación
- `chore: descripción` - Para tareas de mantenimiento

Ejemplos:
```
refactor: extract magic number to constant
refactor: rename variable m_score1 to player1Score
refactor: extract method getScoreName
```

**Importante**: Nombres de variables, métodos, clases y comentarios también en inglés.