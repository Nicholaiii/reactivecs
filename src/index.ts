import { interval, map, share, mergeMap, from } from 'rxjs'
import type { Observable } from 'rxjs'
import { IWorld } from 'bitecs'

/**
 * Runs your game-loop of bitecs systems.
 * Subscribe to start the game.
 * Loop will pause when the last subscriber unsubs.
 *
 * @param systems System functions, returning an array of values to emit
 * @param world Your game world, will be passed on to systems
 * @param period interval at which to run the loop
 * @returns Game update Observable
 */
export function reactivecs <W extends IWorld, S extends Array<(world: W) => unknown[]>>
(systems: S, world: W, period: number): Observable<ReturnType<S[number]>[number]> {
  const run = (): Array<ReturnType<S[number]>[number]> => systems.flatMap(s => s(world))

  return interval(period).pipe(
    map(run),
    mergeMap(val => from(val)),
    share()
  )
}
