// types
export interface SimpleItem {
  name: string;
  backgroundColor: string;
  filename: string;
  texturePath: string;
}

// armors
const GreenArmor: SimpleItem = {
  name: "Green Armor",
  filename: "simple_armor_0.png",
  backgroundColor: "#008800",
  texturePath: "qw/textures/models",
};
const YellowArmor: SimpleItem = {
  name: "Yellow Armor",
  filename: "simple_armor_1.png",
  backgroundColor: "#ffff00",
  texturePath: "qw/textures/models",
};
const RedArmor: SimpleItem = {
  name: "Red Armor",
  filename: "simple_armor_2.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};

export const armors: SimpleItem[] = [GreenArmor, YellowArmor, RedArmor];

// weapons
const SuperShotgun: SimpleItem = {
  name: "Super Shotgun",
  filename: "simple_g_shot_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};
const Nailgun: SimpleItem = {
  name: "Nailgun",
  filename: "simple_g_nail_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};
const SuperNailgun: SimpleItem = {
  name: "Super Nailgun",
  filename: "simple_g_nail2_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};
const GrenadeLauncher: SimpleItem = {
  name: "Grenade Launcher",
  filename: "simple_g_rock_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};
const RocketLauncher: SimpleItem = {
  name: "Rocket Launcher",
  filename: "simple_g_rock2_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};
const LightningGun: SimpleItem = {
  name: "Lightning Gun",
  filename: "simple_g_light_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
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
const Quad: SimpleItem = {
  name: "Quad",
  filename: "simple_quaddama_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};
const Pent: SimpleItem = {
  name: "Pent",
  filename: "simple_invulner_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};
const Ring: SimpleItem = {
  name: "Ring",
  filename: "simple_invisibl_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};

export const powerups = [Quad, Pent, Ring];

// health packs
const MegaHealth: SimpleItem = {
  name: "Mega health",
  filename: "simple_bh100_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/bmodels",
};
const HealthLarge: SimpleItem = {
  name: "Large health",
  filename: "simple_bh25_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/bmodels",
};
const HealthSmall: SimpleItem = {
  name: "Small health",
  filename: "simple_bh10_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/bmodels",
};

export const healthPacks = [HealthSmall, HealthLarge, MegaHealth];

// ammo
const ShellsSmall: SimpleItem = {
  name: "Shells (small)",
  filename: "simple_shell0_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/bmodels",
};
const ShellsLarge: SimpleItem = {
  name: "Shells (large)",
  filename: "simple_shell1_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/bmodels",
};
const NailsSmall: SimpleItem = {
  name: "Nails (small)",
  filename: "simple_nail0_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/bmodels",
};
const NailsLarge: SimpleItem = {
  name: "Nails (large)",
  filename: "simple_nail1_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/bmodels",
};
const RocketsSmall: SimpleItem = {
  name: "Rockets (small)",
  filename: "simple_rock0_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/bmodels",
};
const RocketsLarge: SimpleItem = {
  name: "Rockets (large)",
  filename: "simple_rock1_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/bmodels",
};
const CellsSmall: SimpleItem = {
  name: "Cells (small)",
  filename: "simple_batt0_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/bmodels",
};
const CellsLarge: SimpleItem = {
  name: "Cells (large)",
  filename: "simple_batt1_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/bmodels",
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
const RuneResistance: SimpleItem = {
  name: "Resistance",
  filename: "end1_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};
const RuneStrength: SimpleItem = {
  name: "Strength",
  filename: "end2_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};
const RuneHaste: SimpleItem = {
  name: "Haste",
  filename: "end3_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};
const RuneRegeneration: SimpleItem = {
  name: "Regeneration",
  filename: "end4_0.png",
  backgroundColor: "#ff0000",
  texturePath: "qw/textures/models",
};

export const runes = [
  RuneResistance,
  RuneStrength,
  RuneHaste,
  RuneRegeneration,
];
