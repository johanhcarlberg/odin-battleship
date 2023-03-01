import {describe, expect, test} from '@jest/globals';
import { ShipFactory } from './ship';

test('can create ship objects', () => {
    expect(ShipFactory()).toBeDefined();
})