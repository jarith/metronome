# Coding Standards

This document defines coding practices, guidelines, and conventions for the Mindflick project.

## CODING_PRACTICES

### Guidelines for SUPPORT_LEVEL

#### SUPPORT_EXPERT

- Favor elegant, maintainable solutions over verbose code. Assume understanding of language idioms and design patterns.
- Frame solutions within broader architectural contexts and suggest design alternatives when appropriate.
- Focus comments on 'why' not 'what' - assume code readability through well-named functions and variables.
- Proactively address edge cases, race conditions, and security considerations without being prompted.
- When debugging, provide targeted diagnostic approaches rather than shotgun solutions.
- Suggest comprehensive testing strategies rather than just example tests, including considerations for mocking, test organization, and coverage.
- Do not write any comments in the code
- Read the according context7 documentation before implementing a feature

## FUNCTIONAL PROGRAMMING PRINCIPLES

### Core Principles
- **Functional-First Design**: Use pure functions and immutable data structures
- **Arrow Functions**: Always prefer `const functionName = () => {}` over `function functionName() {}`
- **Pure Functions**: All transformations and computations must be pure functions
- **Explicit Data Flow**: Clear, traceable flow of data through the application
- **No Side Effects in View Layer**: React components must be pure render functions

### Function Declaration Standards
```typescript
// ✅ CORRECT - Arrow functions with explicit types
const processData = (data: InputData): OutputData => {
  return transformData(data)
}

const handleClick = (event: MouseEvent): void => {
  dispatch(clickAction(event))
}

// ❌ WRONG - Function declarations
function processData(data: InputData): OutputData {
  return transformData(data)
}
```

## REATOM STATE MANAGEMENT

### Atomization Principles

#### Core Concept
"Mutable properties should be atoms, readonly properties should stay as primitives"

#### Atomization Guidelines
1. **Atom Creation Rules**:
   - Create atoms for all editable/mutable properties
   - Keep primitive types for read-only, stable data
   - Use atoms for properties that change frequently
   - Balance granularity with computational overhead

2. **Data Structure Design**:
   ```typescript
   // ✅ CORRECT - Atomized mutable properties
   type User = {
     id: string                    // Immutable ID stays primitive
     name: Atom<string>           // Mutable name as atom
     email: Atom<string>          // Mutable email as atom
     createdAt: number           // Immutable timestamp stays primitive
   }

   // ❌ WRONG - Everything as atoms or everything as primitives
   type BadUser = {
     id: Atom<string>            // Unnecessary atom for immutable data
     name: string                // Missing atom for mutable data
   }
   ```

3. **Performance Benefits**:
   - O(1) property update complexity instead of O(n) array recreation
   - Granular reactivity - only affected computed values recalculate
   - Explicit cause tracking for debugging
   - Reduced memory allocation and garbage collection

4. **List Management Pattern**:
   ```typescript
   // ✅ CORRECT - Atomized list elements
   const todosAtom = atom<Atom<Todo>[]>([], 'todos')

   const addTodo = action((text: string) => {
     const todoAtom = atom<Todo>({ id: uid(), text, done: false })
     todosAtom(prev => [...prev, todoAtom])
   })

   // Updates specific todo without array recreation
   const toggleTodo = action((todoAtom: Atom<Todo>) => {
     todoAtom(todo => ({ ...todo, done: !todo.done }))
   })
   ```

### Reatom v1000 Best Practices

#### NO Context Parameter Pattern
```typescript
// ✅ CORRECT - v1000 API without ctx
const counterAtom = atom(0, 'counter')
const doubledAtom = computed(() => counterAtom() * 2, 'doubled')

const increment = action(() => {
  counterAtom(prev => prev + 1)
}, 'increment')

// ❌ WRONG - Old v3 API with ctx
const oldAtom = atom((ctx) => ctx.spy(otherAtom))
```

#### Async Operations with wrap()
```typescript
// ✅ CORRECT - Using wrap() for async context preservation
const fetchData = action(async (id: string) => {
  const response = await wrap(fetch(`/api/data/${id}`))
  const data = await wrap(response.json())
  dataAtom(data)
  return data
}, 'fetchData')

// ❌ WRONG - Missing wrap() loses context
const badFetch = action(async (id: string) => {
  const response = await fetch(`/api/data/${id}`)  // Context lost!
  dataAtom(await response.json())
})
```

#### Separation of Concerns
1. **Atoms**: State containers only
2. **Actions**: Business logic and state updates
3. **Computed**: Derived state calculations
4. **Effects**: Side effects and external interactions
5. **Components**: Pure render templates

### React Integration Rules

#### React Import Restrictions
```typescript
// ❌ FORBIDDEN - Direct React imports
import React from 'react'
import { useState, useEffect } from 'react'

// ✅ ALLOWED - Type imports only
import type { ComponentProps, ReactNode, MouseEvent } from 'react'
```

#### Forbidden React Hooks
```typescript
// ❌ ABSOLUTELY FORBIDDEN in components
useState()      // Use Reatom atoms instead
useEffect()     // Use Reatom effects instead
useReducer()    // Use Reatom actions instead
useMemo()       // Use Reatom computed atoms instead
useCallback()   // Define handlers as Reatom actions

// ✅ ALLOWED React hooks
useAction()     // For dispatching Reatom actions
Custom hooks that only compose Reatom atoms
```

#### Component Pattern
```typescript
// ✅ CORRECT - Pure template component
import { reatomComponent } from '@reatom/react'
import { userAtom, updateUser } from '../atoms/user'

export const UserProfile = reatomComponent(() => {
  const user = userAtom()

  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={wrap(() => updateUser({ name: 'New Name' }))}>
        Update
      </button>
    </div>
  )
}, 'UserProfile')

// ❌ WRONG - Component with internal state
export const BadComponent = () => {
  const [name, setName] = useState('')  // FORBIDDEN!
  useEffect(() => {}, [])               // FORBIDDEN!

  return <input value={name} onChange={e => setName(e.target.value)} />
}
```

## STYLING AND CLASSNAMES

### Using clsx for Conditional ClassNames

**MANDATORY**: use the `clsx` utility for combining multiple className strings, especially when applying conditional classes.

**IMPORTANT**: always use `styles` name on importing css:

```typescript
// ✅ CORRECT
import styles from './Button.module.css'

// ❌ WRONG
import classes from './Button.module.css'
```

#### Usage Patterns
```typescript
// ✅ CORRECT - Using clsx for conditional classes
import { clsx } from 'clx'
import styles from './Button.module.css'

export const Button = reatomComponent<ButtonProps>(({ variant, size, disabled }) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled
      )}
    >
      Click me
    </button>
  )
}, 'Button')

// ✅ CORRECT - Combining static and dynamic classes
const className = clsx(
  'base-class',
  isActive && 'active',
  isDisabled && 'disabled',
  customClass
)

// ✅ CORRECT - Using with objects for conditional classes
const className = clsx(
  styles.card,
  {
    [styles.featured]: isFeatured,
    [styles.compact]: isCompact,
    [styles.loading]: isLoading
  }
)

// ✅ CORRECT - Mixing arrays, objects, and strings
const className = clsx(
  styles.base,
  [
    isActive && styles.active,
    isDisabled && styles.disabled
  ],
  {
    [styles.highlighted]: isHighlighted
  },
  additionalClasses
)

// ❌ WRONG - Manual string concatenation
const className = `${styles.button} ${isActive ? styles.active : ''} ${styles[variant]}`

// ❌ WRONG - Template literals without clsx
const className = `base-class ${isActive ? 'active' : ''}`

// ❌ WRONG - Array join
const className = [styles.button, isActive && styles.active].filter(Boolean).join(' ')

// ❌ WRONG - Using clsx for a single class
const className = clsx(styles.button)
```

Use kebab-case for naming CSS classes in .css files and camelCase for using them in React components.

```CSS
/* ✅ CORRECT - Using kebab-case for CSS class names */
.button-container {
  background-color: blue;
}

import styles from './Button.module.css'

const Button = () => {
  /* ✅ CORRECT - Using camelCase for CSS class names in React components */
  return <button className={styles.buttonContainer}>Click me</button>
}
```

## FRONTEND

## TypeScript Standards

### Strict Configuration Requirements
- Use strict type checking with ALL strict flags enabled
- No implicit any, strict null checks, unused variable detection
- ESNext target with ES2022 modules
- Exact optional property types enforced
- No unchecked indexed access allowed
- No property access from index signature

### Type Declaration Patterns
```typescript
// ✅ CORRECT - Explicit, strict typing
export const processUser = (id: string): Promise<UserData | null> => {
  return fetchUser(id)
}

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Error }

// ❌ WRONG - Implicit or loose typing
export const processUser = (id) => fetchUser(id)  // Missing types
export const getData = (id: string): any => {}     // Using any
```

### Union Types and Type Guards
```typescript
// ✅ CORRECT - Discriminated unions with type guards
type Status = 'idle' | 'loading' | 'success' | 'error'

const isSuccessStatus = (status: Status): status is 'success' => {
  return status === 'success'
}

// Use const assertions for literal types
const config = {
  mode: 'production',
  debug: false
} as const
```

### Error Handling Patterns
```typescript
// ✅ CORRECT - Typed, domain-specific errors
class ValidationError extends Error {
  constructor(
    public readonly field: string,
    message: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

// Result type pattern for explicit error handling
const parseData = (input: unknown): Result<ParsedData> => {
  try {
    return { success: true, data: parse(input) }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}
```

## NAMING CONVENTIONS

### Atoms and State Management
```typescript
// Atoms: suffix with 'Atom'
const userAtom = atom<User | null>(null, 'userAtom')
const todosAtom = atom<Todo[]>([], 'todosAtom')

// Computed atoms: descriptive names without 'Atom' suffix
const activeTodos = computed(() =>
  todosAtom().filter(todo => !todo.completed)
, 'activeTodos')

// Actions: verb phrases
const updateUser = action((data: Partial<User>) => {
  userAtom(prev => ({ ...prev, ...data }))
}, 'updateUser')

const fetchTodos = action(async () => {
  const todos = await wrap(api.getTodos())
  todosAtom(todos)
}, 'fetchTodos')
```

### Component Naming
```typescript
// Components: PascalCase, descriptive names
export const UserProfile = reatomComponent(() => {}, 'UserProfile')
export const TodoList = reatomComponent(() => {}, 'TodoList')

// Component props: explicit interface with 'Props' suffix
interface UserCardProps {
  readonly userId: string
  readonly compact?: boolean
}
```

### File Naming Conventions
- **Component Files**: Must start with capital letter (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Non-component Files**: Use lowercase with hyphens (e.g., `use-toast.ts`, `user-service.ts`)
- **Index Files**: Only for directory exports, not for barrel exports

## CODE ORGANIZATION

### Module Structure
```typescript
// ✅ CORRECT - Well-organized module
// user.model.ts
import { atom, action, computed } from '@reatom/core'
import type { User } from '../types'

// State atoms
export const userAtom = atom<User | null>(null, 'userAtom')
export const loadingAtom = atom(false, 'userLoadingAtom')

// Computed values
export const isAuthenticated = computed(() =>
  userAtom() !== null
, 'isAuthenticated')

// Actions
export const login = action(async (credentials: Credentials) => {
  loadingAtom(true)
  try {
    const user = await wrap(api.login(credentials))
    userAtom(user)
  } finally {
    loadingAtom(false)
  }
}, 'login')
```

### Import and Export Rules

#### Import Order
```typescript
// 1. External imports
import { atom, action, computed } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

// 2. Absolute imports
import { api } from '@/services/api'
import type { User } from '@/types'

// 3. Relative imports
import { userAtom } from '../atoms/user'
import { Button } from './Button'
```

#### Import Restrictions
```typescript
// ❌ FORBIDDEN - Barrel imports (wildcard imports)
import * as Icons from './icons'
import * from '@radix-ui/react-dialog'

// ✅ CORRECT - Direct imports from specific files
import { ChevronIcon } from './icons/ChevronIcon'
import { Root, Trigger, Content } from '@radix-ui/react-dialog'
```

#### Export Patterns
```typescript
// ❌ FORBIDDEN - Export blocks
export { UserProfile, UserAvatar, UserSettings }

// ✅ CORRECT - Individual exports
export const UserProfile = reatomComponent(() => {}, 'UserProfile')
export const UserAvatar = reatomComponent(() => {}, 'UserAvatar')
export const UserSettings = reatomComponent(() => {}, 'UserSettings')
```

## Security Standards

- Never commit secrets or API keys to repository
- Validate all user inputs
- Use type-safe APIs and avoid dynamic evaluation
- Implement proper error handling without exposing internal details
- Follow principle of least privilege for access controls
