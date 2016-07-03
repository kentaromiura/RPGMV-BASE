'use strict';
const identity = require('../identity');

describe('identity', () => {
    it('returns an unique identifier for a given object', () => {
        const zero = {},
              one = {}
        
        expect(identity(zero)).toEqual('0')
        expect(identity(one)).toEqual('1')
        expect(identity(zero)).toEqual('0')
    })
})