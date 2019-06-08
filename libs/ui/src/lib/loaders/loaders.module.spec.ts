import { async, TestBed } from '@angular/core/testing'
import { LoadersModule } from './loaders.module'

describe('LoadersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LoadersModule],
    }).compileComponents()
  }))

  it('should create', () => {
    expect(LoadersModule).toBeDefined()
  })
})
