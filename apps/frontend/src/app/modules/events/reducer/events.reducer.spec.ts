import { EventsLoaded } from './events.actions'
import { Entity, eventsReducer, EventsState, initialState } from './events.reducer'

describe('Events Reducer', () => {
  const getEventsId = (it) => it.id
  let createEvents

  beforeEach(() => {
    createEvents = (id: number, title = ''): Entity => ({
      id,
      title: title || `name-${id}`,
      date_from: new Date(),
      date_to: new Date(),
      description: '',
      color: '',
    })
  })

  describe('valid Events actions ', () => {
    it('should return set the list of known Events', () => {
      const eventss = [createEvents(0), createEvents(123)]
      const action = new EventsLoaded(eventss)
      const result: EventsState = eventsReducer(initialState, action)
      const selId: number = getEventsId(result.list[1])

      expect(result.loaded).toBe(true)
      expect(result.list.length).toBe(2)
      expect(selId).toBe(123)
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
