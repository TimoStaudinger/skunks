interface StructureConstructor {
  byId(id: string): Structure | undefined;
}

Structure.byId = function(id: string) {
  return <Structure | undefined> Game.getObjectById(id);
};
