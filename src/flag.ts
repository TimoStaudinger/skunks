interface FlagConstructor {
  byName(name: string): Flag;
  findAll(color?: number, secondaryColor?: number): Array<Flag>;
}

Flag.byName = function(name: string): Flag {
  return Game.flags[name];
};
Flag.findAll = function(color?: number, secondaryColor: number | undefined = color): Array<Flag> {
  let flags = Object.keys(Game.flags).map(flag => Game.flags[flag]);

  if (color !== undefined) {
    flags = flags.filter(flag => flag.color === color && flag.secondaryColor === secondaryColor);
  }

  return flags;
};
