// types
import { slugify } from "../stringUtil";

export interface SimpleItem {
  name: string;
  filename: string;
  texturePath: string;
}

export function itemToId(item: SimpleItem): string {
  return slugify(item.filename.replaceAll(".png", ""));
}

// armors
export const GreenArmor: SimpleItem = {
  name: "Green Armor",
  filename: "simple_armor_0.png",
  texturePath: "qw/textures/models",
};
export const YellowArmor: SimpleItem = {
  name: "Yellow Armor",
  filename: "simple_armor_1.png",
  texturePath: "qw/textures/models",
};
export const RedArmor: SimpleItem = {
  name: "Red Armor",
  filename: "simple_armor_2.png",
  texturePath: "qw/textures/models",
};

// weapons
export const SuperShotgun: SimpleItem = {
  name: "Super Shotgun",
  filename: "simple_g_shot_0.png",
  texturePath: "qw/textures/models",
};
export const Nailgun: SimpleItem = {
  name: "Nailgun",
  filename: "simple_g_nail_0.png",
  texturePath: "qw/textures/models",
};
export const SuperNailgun: SimpleItem = {
  name: "Super Nailgun",
  filename: "simple_g_nail2_0.png",
  texturePath: "qw/textures/models",
};
export const GrenadeLauncher: SimpleItem = {
  name: "Grenade Launcher",
  filename: "simple_g_rock_0.png",
  texturePath: "qw/textures/models",
};
export const RocketLauncher: SimpleItem = {
  name: "Rocket Launcher",
  filename: "simple_g_rock2_0.png",
  texturePath: "qw/textures/models",
};
export const LightningGun: SimpleItem = {
  name: "Lightning Gun",
  filename: "simple_g_light_0.png",
  texturePath: "qw/textures/models",
};

// powerups
export const Quad: SimpleItem = {
  name: "Quad",
  filename: "simple_quaddama_0.png",
  texturePath: "qw/textures/models",
};
export const Pent: SimpleItem = {
  name: "Pent",
  filename: "simple_invulner_0.png",
  texturePath: "qw/textures/models",
};
export const Ring: SimpleItem = {
  name: "Ring",
  filename: "simple_invisibl_0.png",
  texturePath: "qw/textures/models",
};

// health packs
export const MegaHealth: SimpleItem = {
  name: "Mega health",
  filename: "simple_bh100_0.png",
  texturePath: "qw/textures/bmodels",
};
export const HealthLarge: SimpleItem = {
  name: "Large health",
  filename: "simple_bh25_0.png",
  texturePath: "qw/textures/bmodels",
};
export const HealthSmall: SimpleItem = {
  name: "Small health",
  filename: "simple_bh10_0.png",
  texturePath: "qw/textures/bmodels",
};

// ammo
export const ShellsSmall: SimpleItem = {
  name: "Shells (small)",
  filename: "simple_shell0_0.png",
  texturePath: "qw/textures/bmodels",
};
export const ShellsLarge: SimpleItem = {
  name: "Shells (large)",
  filename: "simple_shell1_0.png",
  texturePath: "qw/textures/bmodels",
};
export const NailsSmall: SimpleItem = {
  name: "Nails (small)",
  filename: "simple_nail_0.png",
  texturePath: "qw/textures/bmodels",
};
export const NailsLarge: SimpleItem = {
  name: "Nails (large)",
  filename: "simple_nail_0.png",
  texturePath: "qw/textures/bmodels",
};
export const RocketsSmall: SimpleItem = {
  name: "Rockets (small)",
  filename: "simple_rock_0.png",
  texturePath: "qw/textures/bmodels",
};
export const RocketsLarge: SimpleItem = {
  name: "Rockets (large)",
  filename: "simple_rock_0.png",
  texturePath: "qw/textures/bmodels",
};
export const CellsSmall: SimpleItem = {
  name: "Cells (small)",
  filename: "simple_batt_0.png",
  texturePath: "qw/textures/bmodels",
};
export const CellsLarge: SimpleItem = {
  name: "Cells (large)",
  filename: "simple_batt_0.png",
  texturePath: "qw/textures/bmodels",
};

// Runes
export const RuneResistance: SimpleItem = {
  name: "Resistance",
  filename: "end1_0.png",
  texturePath: "qw/textures/models",
};
export const RuneStrength: SimpleItem = {
  name: "Strength",
  filename: "end2_0.png",
  texturePath: "qw/textures/models",
};
export const RuneHaste: SimpleItem = {
  name: "Haste",
  filename: "end3_0.png",
  texturePath: "qw/textures/models",
};
export const RuneRegeneration: SimpleItem = {
  name: "Regeneration",
  filename: "end4_0.png",
  texturePath: "qw/textures/models",
};
