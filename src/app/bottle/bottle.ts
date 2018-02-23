import {Preservation} from '../preservation/preservation';

export class Bottle {
  constructor (
    id: number,
    name: string,
    analysis?: number,
    filter_volume?: number,
    bottle_prefix?: number,
    description?: string,
    preservation?: Preservation
  ) {}
}
