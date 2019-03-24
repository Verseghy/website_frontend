import { RootLoaded } from './root.actions'
import { RootState, Entity, initialState, rootReducer } from './root.reducer'

describe('Root Reducer', () => {
  const getRootId = it => it['id']
  let createRoot

  beforeEach(() => {
    createRoot = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`,
    })
  })

  describe('valid Root actions ', () => {
    it('should return set the list of known Root', () => {
      const roots = [createRoot('PRODUCT-AAA'), createRoot('PRODUCT-zzz')]
      const action = new RootLoaded(roots)
      const result: RootState = rootReducer(initialState, action)
      const selId: string = getRootId(result.list[1])

      expect(result.loaded).toBe(true)
      expect(result.list.length).toBe(2)
      expect(selId).toBe('PRODUCT-zzz')
    })
  })

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any
      const result = rootReducer(initialState, action)

      expect(result).toBe(initialState)
    })
  })
})
