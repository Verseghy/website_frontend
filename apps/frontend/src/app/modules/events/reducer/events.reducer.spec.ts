import { EventsLoaded } from './events.actions'
import { Entity, eventsReducer, EventsState, initialState } from './events.reducer'

describe('Events Reducer', () => {
  const getEventsId = it => it['id']
  let createEvents

  beforeEach(() => {
    createEvents = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`,
    })
  })

  describe('valid Events actions ', () => {
    it('should return set the list of known Events', () => {
      const eventss = [createEvents('PRODUCT-AAA'), createEvents('PRODUCT-zzz')]
      const action = new EventsLoaded(eventss)
      const result: EventsState = eventsReducer(initialState, action)
      const selId: string = getEventsId(result.list[1])

      expect(result.loaded).toBe(true)
      expect(result.list.length).toBe(2)
      expect(selId).toBe('PRODUCT-zzz')
    })
  })

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any
      const result = eventsReducer(initialState, action)

      expect(result).toBe(initialState)
    })
  })
})
