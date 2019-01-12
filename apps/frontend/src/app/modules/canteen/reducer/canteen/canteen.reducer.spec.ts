import { CanteenLoaded } from './canteen.actions'
import { canteenReducer, CanteenState, Entity, initialState } from './canteen.reducer'

describe('Canteen Reducer', () => {
  const getCanteenId = it => it['id']
  let createCanteen

  beforeEach(() => {
    createCanteen = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`,
    })
  })

  describe('valid Canteen actions ', () => {
    it('should return set the list of known Canteen', () => {
      const canteens = [createCanteen('PRODUCT-AAA'), createCanteen('PRODUCT-zzz')]
      const action = new CanteenLoaded(canteens)
      const result: CanteenState = canteenReducer(initialState, action)
      const selId: string = getCanteenId(result.list[1])

      expect(result.loaded).toBe(true)
      expect(result.list.length).toBe(2)
      expect(selId).toBe('PRODUCT-zzz')
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
