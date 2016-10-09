function sum(obj: {}) {
  let sum = 0;
  for (const el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat((<any> obj)[el]);
    }
  }
  return sum;
}

interface Creep {
  isNearTo(roomPositon: RoomObject | {pos: RoomPosition}): boolean;
  isNearTo(x: number, y: number): boolean;
  hasFullHealth(): boolean;
  carries(resource: string): boolean;
  carriesNo(resource: string): boolean;
  hasSpareCapacity(): boolean;
}

Creep.prototype.isNearTo = function(roomPositionOrX: RoomObject | {pos: RoomObject} | number, y?: number) {
  return this.pos.isNearTo(roomPositionOrX, y);
};
Creep.prototype.hasFullHealth = function() {
  return this.hits === this.hitsMax;
};
Creep.prototype.carries = function(resource: string) {
  return this.carry[resource] !== 0;
};
Creep.prototype.carriesNo = function(resource: string) {
  return !this.carries(resource);
};
Creep.prototype.hasSpareCapacity = function() {
  return sum(this.carry) < this.carryCapacity;
};
