// types
import { publicUrl } from "@/pkg/viteUtil";
import { Item, ItemSettings } from "@/features/SimpleItemsEditor/types";
import { ITEM_SETTINGS as ds } from "@/features/SimpleItemsEditor/config";
import deepmerge from "deepmerge";

function toSettings(textureFilename: string, settings: Partial<ItemSettings>) {
  const result: ItemSettings = deepmerge.all([
    ds,
    settings,
    {
      texturePath: publicUrl(`/assets/textures/${textureFilename}`),
    },
  ]) as ItemSettings;

  return {
    settings: result,
    defaultSettings: result,
  };
}

const modelsDirPath = "qw/textures/models";
const bmodelsDirPath = "qw/textures/bmodels";

// armors
const GreenArmor: Item = {
  name: "Green Armor",
  filename: "simple_armor_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("armor_01.png", {
    color: "#00cc00",
    primary: { ...ds.primary, scale: 0.75 },
  }),
};

const YellowArmor: Item = {
  name: "Yellow Armor",
  filename: "simple_armor_1.png",
  textureDirPath: modelsDirPath,
  ...toSettings("armor_01.png", {
    color: "#ffff00",
    primary: { ...ds.primary, scale: 0.75 },
  }),
};
const RedArmor: Item = {
  name: "Red Armor",
  filename: "simple_armor_2.png",
  textureDirPath: modelsDirPath,
  ...toSettings("armor_01.png", {
    color: "#ff0000",
    primary: { ...ds.primary, scale: 0.75 },
  }),
};

export const armors: Item[] = [GreenArmor, YellowArmor, RedArmor];

// weapons
const SuperShotgun: Item = {
  name: "Super Shotgun",
  filename: "simple_shot_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_ssg.png", {
    color: "#ff9933",
    primary: { ...ds.primary, scale: 0.6 },
  }),
};
const Nailgun: Item = {
  name: "Nailgun",
  filename: "simple_g_nail_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_ng.png", {
    color: "#cc00ff",
    primary: { ...ds.primary, scale: 0.6 },
  }),
};
const SuperNailgun: Item = {
  name: "Super Nailgun",
  filename: "simple_g_nail2_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_sng.png", {
    color: "#0066ff",
    primary: { ...ds.primary, scale: 0.6 },
  }),
};
const GrenadeLauncher: Item = {
  name: "Grenade Launcher",
  filename: "simple_g_rock_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("grenade_01.png", {
    color: "#66ff00",
    primary: { ...ds.primary, scale: 0.6 },
  }),
};
const RocketLauncher: Item = {
  name: "Rocket Launcher",
  filename: "simple_g_rock2_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("missile_01.png", {
    color: "#ff3300",
    primary: { ...ds.primary, scale: 0.6 },
  }),
};
const LightningGun: Item = {
  name: "Lightning Gun",
  filename: "simple_g_light_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("bolt_01.png", {
    color: "#ffffff",
    primary: { ...ds.primary, scale: 0.6 },
  }),
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
  textureDirPath: modelsDirPath,
  ...toSettings("quake_logo.png", { color: "#0099ff" }),
};
const Pent: Item = {
  name: "Pent",
  filename: "simple_invulner_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("pent.png", {
    color: "#ff0000",
    primary: { ...ds.primary, scale: 0.7 },
    secondary: {
      ...ds.secondary,
      enabled: true,
      shape: "circle",
      scale: 0.8,
      innerScale: 0.85,
      outerScale: 1,
    },
  }),
};
const Ring: Item = {
  name: "Ring",
  filename: "simple_invisibl_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("ring_01.png", {
    color: "#ffff00",
    primary: { ...ds.primary, scale: 0.6 },
  }),
};

const Suit: Item = {
  name: "Suit",
  filename: "simple_suit_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("biohazard_01.png", { color: "#66ff00" }),
};

export const powerups = [Quad, Pent, Ring, Suit];

// health packs
const HealthSmall: Item = {
  name: "Small health",
  filename: "simple_b_bh10_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("plus_01.png", {
    color: "#33ff33",
    primary: { ...ds.primary, scale: 0.45 },
    secondary: { ...ds.secondary, enabled: true, shape: "circle", scale: 0.6 },
  }),
};
const HealthLarge: Item = {
  name: "Large health",
  filename: "simple_b_bh25_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("plus_01.png", {
    color: "#eeee00",
    primary: { ...ds.primary, scale: 0.45 },
    secondary: { ...ds.secondary, enabled: true, shape: "circle", scale: 0.6 },
  }),
};

const MegaHealth: Item = {
  name: "Mega health",
  filename: "simple_b_bh100_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("plus_01.png", {
    color: "#66ddee",
    primary: { ...ds.primary, scale: 0.6 },
    secondary: { ...ds.secondary, enabled: true, shape: "circle", scale: 0.8 },
  }),
};

export const healthPacks = [HealthSmall, HealthLarge, MegaHealth];

// ammo
const ShellsSmall: Item = {
  name: "Shells (small)",
  filename: "simple_b_shell0_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_sg.png", {
    color: "#ffff00",
    primary: { ...ds.primary, scale: 0.35 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const ShellsLarge: Item = {
  name: "Shells (large)",
  filename: "simple_b_shell1_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_ssg.png", {
    color: "#ff9933",
    primary: { ...ds.primary, scale: 0.35 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const NailsSmall: Item = {
  name: "Nails (small)",
  filename: "simple_b_nail0_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_ng.png", {
    color: "#cc00ff",
    primary: { ...ds.primary, scale: 0.35 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};

const NailsLarge: Item = {
  name: "Nails (large)",
  filename: "simple_b_nail1_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_sng.png", {
    color: "#0066ff",
    primary: { ...ds.primary, scale: 0.35 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const RocketsSmall: Item = {
  name: "Rockets (small)",
  filename: "simple_b_rock0_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("grenade_01.png", {
    color: "#66ff00",
    primary: { ...ds.primary, scale: 0.4 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const RocketsLarge: Item = {
  name: "Rockets (large)",
  filename: "simple_b_rock1_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("missile_01.png", {
    color: "#ff3300",
    primary: { ...ds.primary, scale: 0.4 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const CellsSmall: Item = {
  name: "Cells (small)",
  filename: "simple_b_batt0_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("bolt_01.png", {
    color: "#ffffff",
    primary: { ...ds.primary, scale: 0.4 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const CellsLarge: Item = {
  name: "Cells (large)",
  filename: "simple_b_batt1_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("bolts_01.png", {
    color: "#ffffff",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
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
const runePrimary = { ...ds.primary, scale: 0.7 };

const RuneResistance: Item = {
  name: "Resistance",
  filename: "simple_end1_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("rune_resistance.png", {
    color: "#00ff00",
    primary: runePrimary,
  }),
};
const RuneStrength: Item = {
  name: "Strength",
  filename: "simple_end2_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("rune_strength.png", {
    color: "#ff0000",
    primary: runePrimary,
  }),
};
const RuneHaste: Item = {
  name: "Haste",
  filename: "simple_end3_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("rune_haste.png", {
    color: "#ffff00",
    primary: runePrimary,
  }),
};
const RuneRegeneration: Item = {
  name: "Regeneration",
  filename: "simple_end4_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("rune_regeneration.png", {
    color: "#00ffff",
    primary: runePrimary,
  }),
};

export const runes = [
  RuneHaste,
  RuneRegeneration,
  RuneResistance,
  RuneStrength,
];

// misc
const Backpack: Item = {
  name: "Backpack",
  filename: "simple_backpack_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("backpack_01.png", { color: "#ff9900" }),
};

export const misc = [Backpack];
