'use strict'
import slice from '../slice'

describe('slice', () => {
  it('slices an array', () => {
    expect(slice([1, 2, 3], 1)).toEqual([2, 3])
  })
})
