import { ColleaguesLoaded } from './colleagues.actions'
import { colleaguesReducer, ColleaguesState, Entity, initialState } from './colleagues.reducer'

describe('Colleagues Reducer', () => {
  const getColleaguesId = (it) => it.id
  let createColleagues

  beforeEach(() => {
    createColleagues = (id: number, name = '', category: number = 0): Entity => ({
      id,
      name: name || `name-${id}`,
      category,
    })
  })

  describe('valid Colleagues actions ', () => {
    it('should return set the list of known Colleagues', () => {
      const colleaguess = [createColleagues(1, 'PRODUCT-AAA', 0), createColleagues(2, 'PRODUCT-zzz', 1)]
      const action = new ColleaguesLoaded(colleaguess)
      const result: ColleaguesState = colleaguesReducer(initialState, action)
      const selId: number = getColleaguesId(result.categories[0][0])

      expect(result.loaded).toBe(true)
      expect(result.categories[0].length).toBe(1)
      expect(selId).toBe(1)
    })
  })

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any
      const result = colleaguesReducer(initialState, action)

      expect(result).toBe(initialState)
    })
  })
})
