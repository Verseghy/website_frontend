import { CanteenLoaded } from './canteen.actions'
import { canteenReducer, CanteenState, Entity, initialState, Menu } from './canteen.reducer'
import { setDay } from 'date-fns'

describe('Canteen Reducer', () => {
  const getCanteenId = it => it['id']
  let createCanteen

  beforeEach(() => {
    createCanteen = (
      id: number,
      date,
      menu: [Menu, Menu, Menu?] = [{ id: 0, menu: 'meal1', type: 0 }, { id: 0, menu: 'meal1', type: 0 }]
    ): Entity => ({
      id,
      menu: menu,
      date: date,
    })
  })

  describe('valid Canteen actions ', () => {
    it('should return set the list of known Canteen', () => {
      const date = new Date('01-01-2019')
      const monday = setDay(date, 1)
      const friday = setDay(date, 5)

      const canteens = [[createCanteen(1, friday.toDateString()), createCanteen(2, monday.toDateString())], []]
      const action = new CanteenLoaded(canteens)
      const result: CanteenState = canteenReducer(initialState, action)
      const selId: string = getCanteenId(result.thisWeek[1])

      expect(result.loaded).toBe(true)
      expect(result.thisWeek[1]).toBeTruthy()
      expect(result.thisWeek[5]).toBeTruthy()
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
