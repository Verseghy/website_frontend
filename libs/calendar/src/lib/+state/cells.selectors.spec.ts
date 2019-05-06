import { Entity, CellsState } from './cells.reducer'
import { cellsQuery } from './cells.selectors'

describe('Cells Selectors', () => {
  const ERROR_MSG = 'No Error Available'
  const getCellsId = it => it['id']

  let storeState

  beforeEach(() => {
    const createCells = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`,
    })
    storeState = {
      cells: {
        list: [createCells('PRODUCT-AAA'), createCells('PRODUCT-BBB'), createCells('PRODUCT-CCC')],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true,
      },
    }
  })

  describe('Cells Selectors', () => {
    it('getAllCells() should return the list of Cells', () => {
      const results = cellsQuery.getAllCells(storeState)
      const selId = getCellsId(results[1])

      expect(results.length).toBe(3)
      expect(selId).toBe('PRODUCT-BBB')
    })

    it('getSelectedCells() should return the selected Entity', () => {
      const result = cellsQuery.getSelectedCells(storeState)
      const selId = getCellsId(result)

      expect(selId).toBe('PRODUCT-BBB')
    })

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = cellsQuery.getLoaded(storeState)

      expect(result).toBe(true)
    })

    it("getError() should return the current 'error' storeState", () => {
      const result = cellsQuery.getError(storeState)

      expect(result).toBe(ERROR_MSG)
    })
  })
})
