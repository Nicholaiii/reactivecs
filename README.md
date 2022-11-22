# reactivecs

Control bitecs system flow with rxjs

## Usage

```ts
import { reactivecs } from 'reactivecs'

const updates = reactivecs([
  SomeSystem,
  AnotherSystem
], world, 1000/60)

updates.subscribe(v => console.log(v))
```

## API

### reactivecs(systems, world, period)

Returns an Observable that starts the system loop as soon as it is subscribed to, and pauses it again when the last subscriber unsubscribes.

#### systems

type: `((world) => any[])[]`

Array of systems.

Systems expressed as functions that return an array of values to push to the update Observable.

#### world

type: `IWorld`

Game world.

This world is passed as the first parameter to all systems.

#### period

type: `number`

Loop period.

The time in ms between each execution of the system loop.
