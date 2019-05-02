import { Entity, PopupState } from './popup.reducer'
import { popupQuery } from './popup.selectors'

describe('Popup Selectors', () => {
  const ERROR_MSG = 'No Error Available'
  const getPopupId = it => it['id']

  let storeState

  beforeEach(() => {
    const createPopup = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`,
    })
    storeState = {
      popup: {
        list: [createPopup('PRODUCT-AAA'), createPopup('PRODUCT-BBB'), createPopup('PRODUCT-CCC')],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true,
      },
    }
  })

  describe('Popup Selectors', () => {
    it('getAllPopup() should return the list of Popup', () => {
      const results = popupQuery.getAllPopup(storeState)
      const selId = getPopupId(results[1])

      expect(results.length).toBe(3)
      expect(selId).toBe('PRODUCT-BBB')
    })

    it('getSelectedPopup() should return the selected Entity', () => {
      const result = popupQuery.getSelectedPopup(storeState)
      const selId = getPopupId(result)

      expect(selId).toBe('PRODUCT-BBB')
    })

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = popupQuery.getLoaded(storeState)

      expect(result).toBe(true)
    })

    it("getError() should return the current 'error' storeState", () => {
      const result = popupQuery.getError(storeState)

      expect(result).toBe(ERROR_MSG)
    })
  })
})
