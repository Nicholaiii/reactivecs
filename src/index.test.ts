import { createWorld } from 'bitecs'
import { Observable, firstValueFrom, lastValueFrom, take, toArray } from 'rxjs'

import { reactivecs } from '.'

const world = createWorld()

describe('reactivecs', () => {
  it('returns an observable', () => {
    const s = reactivecs([() => [1]], world, 16)
    expect(s).toBeInstanceOf(Observable)
  })

  it('pushes values from systems', async () => {
    const ret = { status: 'okay' }
    const s = reactivecs([
      (world) => ([ret, 1])
    ], world, 16)

    await expect(
      firstValueFrom(s)
    ).resolves.toEqual(ret)

    await expect(
      firstValueFrom(s.pipe(
        take(2),
        toArray()
      ))
    ).resolves.toContain(1)
  })

  it('continues to run the loop', async () => {
    const s = reactivecs([
      (world) => ([1])
    ], world, 16)

    await expect(
      firstValueFrom(s.pipe(
        take(5),
        toArray()
      ))
    ).resolves.toHaveLength(5)
  })

  it('pushes values in order', async () => {
    const s = reactivecs([
      (world) => ([1, 42])
    ], world, 16)

    await expect(
      lastValueFrom(s.pipe(
        take(2)
      ))
    ).resolves.toBe(42)
  })
})
