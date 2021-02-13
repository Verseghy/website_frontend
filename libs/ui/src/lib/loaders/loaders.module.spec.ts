import { TestBed, waitForAsync } from '@angular/core/testing'
import { LoadersModule } from './loaders.module'

describe('LoadersModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [LoadersModule],
      }).compileComponents()
    })
  )

  it('should create', () => {
    expect(LoadersModule).toBeDefined()
  })
})
