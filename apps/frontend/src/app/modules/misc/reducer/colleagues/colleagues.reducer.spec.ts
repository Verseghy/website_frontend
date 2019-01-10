import { ColleaguesLoaded } from './colleagues.actions'
import { colleaguesReducer, ColleaguesState, Entity, initialState } from './colleagues.reducer'

describe('Colleagues Reducer', () => {
  const getColleaguesId = it => it['id']
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
      const colleaguess = [createColleagues('PRODUCT-AAA'), createColleagues('PRODUCT-zzz')]
      const action = new ColleaguesLoaded(colleaguess)
      const result: ColleaguesState = colleaguesReducer(initialState, action)
      const selId: string = getColleaguesId(result.list[1])

      expect(result.loaded).toBe(true)
      expect(result.list.length).toBe(2)
      expect(selId).toBe('PRODUCT-zzz')
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
