import { PopupLoaded } from './popup.actions'
import { PopupState, Entity, initialState, popupReducer } from './popup.reducer'

describe('Popup Reducer', () => {
  const getPopupId = it => it['id']
  let createPopup

  beforeEach(() => {
    createPopup = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`,
    })
  })

  describe('valid Popup actions ', () => {
    it('should return set the list of known Popup', () => {
      const popups = [createPopup('PRODUCT-AAA'), createPopup('PRODUCT-zzz')]
      const action = new PopupLoaded(popups)
      const result: PopupState = popupReducer(initialState, action)
      const selId: string = getPopupId(result.list[1])

      expect(result.loaded).toBe(true)
      expect(result.list.length).toBe(2)
      expect(selId).toBe('PRODUCT-zzz')
    })
  })

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any
      const result = popupReducer(initialState, action)

      expect(result).toBe(initialState)
    })
  })
})
