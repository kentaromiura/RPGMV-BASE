'use strict'
import identity from '../identity'

describe('identity', () => {
  it('returns an unique identifier for a given object', () => {
    const zero = {},
      one = {}

    expect(identity.get(zero)).toEqual('0')
    expect(identity.get(one)).toEqual('1')
    expect(identity.get(zero)).toEqual('0')
  })
})
