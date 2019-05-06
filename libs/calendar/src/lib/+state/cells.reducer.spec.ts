import { CellsLoaded } from './cells.actions'
import { CellsState, Entity, initialState, cellsReducer } from './cells.reducer'

describe('Cells Reducer', () => {
  const getCellsId = it => it['id']
  let createCells

  beforeEach(() => {
    createCells = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`,
    })
  })

  describe('valid Cells actions ', () => {
    it('should return set the list of known Cells', () => {
      const cellss = [createCells('PRODUCT-AAA'), createCells('PRODUCT-zzz')]
      const action = new CellsLoaded(cellss)
      const result: CellsState = cellsReducer(initialState, action)
      const selId: string = getCellsId(result.list[1])

      expect(result.loaded).toBe(true)
      expect(result.list.length).toBe(2)
      expect(selId).toBe('PRODUCT-zzz')
    })
  })

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any
      const result = cellsReducer(initialState, action)

      expect(result).toBe(initialState)
    })
  })
})
