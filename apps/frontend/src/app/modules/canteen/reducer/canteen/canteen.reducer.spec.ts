import { CanteenLoaded } from './canteen.actions'
import { canteenReducer, CanteenState, Entity, initialState } from './canteen.reducer'
import { setDay } from 'date-fns'

describe('Canteen Reducer', () => {
  const getCanteenId = it => it['id']
  let createCanteen

  beforeEach(() => {
    createCanteen = (id: number, date, menu = []): Entity => ({
      id,
      menu: menu || [],
      date: date,
    })
  })

  describe('valid Canteen actions ', () => {
    it('should return set the list of known Canteen', () => {
      const now = new Date()
      const monday = setDay(now, 1)
      const friday = setDay(now, 5)

      const canteens = [[createCanteen(1, friday.toDateString()), createCanteen(2, monday.toDateString())], []]
      const action = new CanteenLoaded(canteens)
      const result: CanteenState = canteenReducer(initialState, action)
      const selId: string = getCanteenId(result.canteen[0][1])

      expect(result.loaded).toBe(true)
      expect(result.canteen.length).toBe(2)
      expect(selId).toBe(2)
    })
  })

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any
      const result = canteenReducer(initialState, action)

      expect(result).toBe(initialState)
    })
  })
})
