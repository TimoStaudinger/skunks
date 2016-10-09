interface SourceConstructor {
  byId(id: string): Source | undefined;
}

Source.byId = function(id: string): Source | undefined {
  return <Source> Game.getObjectById(id);
};
