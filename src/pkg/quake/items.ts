// types
export interface Item {
  name: string;
  backgroundColor: string;
  filename: string;
  textureDirPath: string;
}

// armors
const GreenArmor: Item = {
  name: "Green Armor",
  filename: "simple_armor_0.png",
  backgroundColor: "#00AA00",
  textureDirPath: "qw/textures/models",
};
const YellowArmor: Item = {
  name: "Yellow Armor",
  filename: "simple_armor_1.png",
  backgroundColor: "#ffff00",
  textureDirPath: "qw/textures/models",
};
const RedArmor: Item = {
  name: "Red Armor",
  filename: "simple_armor_2.png",
  backgroundColor: "#ff0000",
  textureDirPath: "qw/textures/models",
};

export const armors: Item[] = [GreenArmor, YellowArmor, RedArmor];

// weapons
const SuperShotgun: Item = {
  name: "Super Shotgun",
  filename: "simple_g_shot_0.png",
  backgroundColor: "#ff9933",
  textureDirPath: "qw/textures/models",
};
const Nailgun: Item = {
  name: "Nailgun",
  filename: "simple_g_nail_0.png",
  backgroundColor: "#cc00ff",
  textureDirPath: "qw/textures/models",
};
const SuperNailgun: Item = {
  name: "Super Nailgun",
  filename: "simple_g_nail2_0.png",
  backgroundColor: "#0066ff",
  textureDirPath: "qw/textures/models",
};
const GrenadeLauncher: Item = {
  name: "Grenade Launcher",
  filename: "simple_g_rock_0.png",
  backgroundColor: "#66ff00",
  textureDirPath: "qw/textures/models",
};
const RocketLauncher: Item = {
  name: "Rocket Launcher",
  filename: "simple_g_rock2_0.png",
  backgroundColor: "#ff3300",
  textureDirPath: "qw/textures/models",
};
const LightningGun: Item = {
  name: "Lightning Gun",
  filename: "simple_g_light_0.png",
  backgroundColor: "#ffffff",
  textureDirPath: "qw/textures/models",
};

export const weapons = [
  SuperShotgun,
  Nailgun,
  SuperNailgun,
  GrenadeLauncher,
  RocketLauncher,
  LightningGun,
];

// powerups
const Quad: Item = {
  name: "Quad",
  filename: "simple_quaddama_0.png",
  backgroundColor: "#0099ff",
  textureDirPath: "qw/textures/models",
};
const Pent: Item = {
  name: "Pent",
  filename: "simple_invulner_0.png",
  backgroundColor: "#ff0000",
  textureDirPath: "qw/textures/models",
};
const Ring: Item = {
  name: "Ring",
  filename: "simple_invisibl_0.png",
  backgroundColor: "#ffff00",
  textureDirPath: "qw/textures/models",
};

export const powerups = [Quad, Pent, Ring];

// health packs
const MegaHealth: Item = {
  name: "Mega health",
  filename: "simple_b_bh100_0.png",
  backgroundColor: "#66ddee",
  textureDirPath: "qw/textures/bmodels",
};
const HealthLarge: Item = {
  name: "Large health",
  filename: "simple_b_bh25_0.png",
  backgroundColor: "#eeee00",
  textureDirPath: "qw/textures/bmodels",
};
const HealthSmall: Item = {
  name: "Small health",
  filename: "simple_b_bh10_0.png",
  backgroundColor: "#33ff33",
  textureDirPath: "qw/textures/bmodels",
};

export const healthPacks = [HealthSmall, HealthLarge, MegaHealth];

// ammo
const ShellsSmall: Item = {
  name: "Shells (small)",
  filename: "simple_b_shell0_0.png",
  backgroundColor: "#ffff00",
  textureDirPath: "qw/textures/bmodels",
};
const ShellsLarge: Item = {
  name: "Shells (large)",
  filename: "simple_b_shell1_0.png",
  backgroundColor: "#ff9933",
  textureDirPath: "qw/textures/bmodels",
};
const NailsSmall: Item = {
  name: "Nails (small)",
  filename: "simple_b_nail0_0.png",
  backgroundColor: "#cc00ff",
  textureDirPath: "qw/textures/bmodels",
};
const NailsLarge: Item = {
  name: "Nails (large)",
  filename: "simple_b_nail1_0.png",
  backgroundColor: "#0066ff",
  textureDirPath: "qw/textures/bmodels",
};
const RocketsSmall: Item = {
  name: "Rockets (small)",
  filename: "simple_b_rock0_0.png",
  backgroundColor: "#66ff00",
  textureDirPath: "qw/textures/bmodels",
};
const RocketsLarge: Item = {
  name: "Rockets (large)",
  filename: "simple_b_rock1_0.png",
  backgroundColor: "#ff3300",
  textureDirPath: "qw/textures/bmodels",
};
const CellsSmall: Item = {
  name: "Cells (small)",
  filename: "simple_b_batt0_0.png",
  backgroundColor: "#ffffff",
  textureDirPath: "qw/textures/bmodels",
};
const CellsLarge: Item = {
  name: "Cells (large)",
  filename: "simple_b_batt1_0.png",
  backgroundColor: "#ffffff",
  textureDirPath: "qw/textures/bmodels",
};

export const ammo = [
  ShellsSmall,
  ShellsLarge,
  NailsSmall,
  NailsLarge,
  RocketsSmall,
  RocketsLarge,
  CellsSmall,
  CellsLarge,
];

// Runes
const RuneResistance: Item = {
  name: "Resistance",
  filename: "simple_end1_0.png",
  backgroundColor: "#ff0000",
  textureDirPath: "qw/textures/models",
};
const RuneStrength: Item = {
  name: "Strength",
  filename: "simple_end2_0.png",
  backgroundColor: "#ff0000",
  textureDirPath: "qw/textures/models",
};
const RuneHaste: Item = {
  name: "Haste",
  filename: "simple_end3_0.png",
  backgroundColor: "#ff0000",
  textureDirPath: "qw/textures/models",
};
const RuneRegeneration: Item = {
  name: "Regeneration",
  filename: "simple_end4_0.png",
  backgroundColor: "#ff0000",
  textureDirPath: "qw/textures/models",
};

export const runes = [
  RuneResistance,
  RuneStrength,
  RuneHaste,
  RuneRegeneration,
];
