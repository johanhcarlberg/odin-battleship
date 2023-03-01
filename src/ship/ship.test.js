import {describe, expect, test} from '@jest/globals';
import { ShipFactory } from './ship';

test('can create ship objects', () => {
    expect(ShipFactory()).toBeDefined();
})

test('can create ships with speciefied length', () => {
    const ship = ShipFactory(2);
    expect(ship.length).toBe(2);
})