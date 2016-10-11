/// <reference path="typings/index.d.ts"/>

interface Creep {
  isNearTo(roomPositon: RoomObject | {pos: RoomPosition}): boolean;
  isNearTo(x: number, y: number): boolean;
  hasFullHealth(): boolean;
  carries(resource: string): boolean;
  carriesNo(resource: string): boolean;
  hasSpareCapacity(): boolean;
}

interface FlagConstructor {
  byName(name: string): Flag;
  findAll(color?: number, secondaryColor?: number): Array<Flag>;
}

interface Room {
  isMine(): boolean;
  findMyCreeps(): Array<Creep>;
  findHostileCreeps(): Array<Creep>;
  findHostileStructures(): Array<Structure>;
  findDamagedStructures(maxHitsPerc?: number): Array<Structure>;
  findMyInjured(): Array<Creep>;
}

interface RoomConstructor {
  byName(name: string): Room;
}

interface SourceConstructor {
  byId(id: string): Source | undefined;
}

interface StructureConstructor {
  byId(id: string): Structure | undefined;
}
