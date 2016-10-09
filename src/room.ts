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

Room.prototype.isMine = function() {
  return this.controller && this.controller.my;
};

Room.byName = function(name: string): Room {
  return Game.rooms[name];
};

Room.prototype.findMyCreeps = function(): Array<Creep> {
  return <Array<Creep>> this.find(FIND_MY_CREEPS);
};

Room.prototype.findHostileCreeps = function(): Array<Creep> {
  return <Array<Creep>> this.find(FIND_HOSTILE_CREEPS);
};

Room.prototype.findHostileStructures = function(): Array<Structure> {
  return <Array<Structure>> this.find(FIND_HOSTILE_STRUCTURES);
};

Room.prototype.findDamagedStructures = function(maxHitsPerc?: number): Array<Structure> {
  return this.find(FIND_STRUCTURES, {
    filter: (structure: Structure) => structure.hits <= (structure.hitsMax * maxHitsPerc),
  });
};

Room.prototype.findMyInjured = function(): Array<Creep> {
    return <Array<Creep>> this.find(FIND_MY_CREEPS, {
      filter: (creep: Creep) => creep.hits < creep.hitsMax,
    }).sort((l: Creep, r: Creep) => r.hits - l.hits);
};
