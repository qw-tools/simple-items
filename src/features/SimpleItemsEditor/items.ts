// types
import { publicUrl } from "@/pkg/viteUtil";
import { Item, ItemSettings } from "@/features/SimpleItemsEditor/types";
import { ITEM_SETTINGS as ds } from "@/features/SimpleItemsEditor/config";
import deepmerge from "deepmerge";

function toSettings(filename: string, settings: Partial<ItemSettings>) {
  const result: ItemSettings = deepmerge.all([
    ds,
    settings,
    {
      texturePath: publicUrl(`/assets/textures/${filename}`),
    },
  ]) as ItemSettings;

  return {
    filename,
    settings: result,
    defaultSettings: result,
  };
}

const modelsDirPath = "qw/textures/models";
const bmodelsDirPath = "qw/textures/bmodels";

// armors
const GreenArmor: Item = {
  name: "Green Armor",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_armor_0.png", { color: "#00cc00" }),
};

const YellowArmor: Item = {
  name: "Yellow Armor",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_armor_1.png", { color: "#ffff00" }),
};
const RedArmor: Item = {
  name: "Red Armor",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_armor_2.png", { color: "#ff0000" }),
};

export const armors: Item[] = [GreenArmor, YellowArmor, RedArmor];

// weapons
const SuperShotgun: Item = {
  name: "Super Shotgun",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_g_shot_0.png", { color: "#ff9933" }),
};
const Nailgun: Item = {
  name: "Nailgun",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_g_nail_0.png", { color: "#cc00ff" }),
};
const SuperNailgun: Item = {
  name: "Super Nailgun",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_g_nail2_0.png", { color: "#0066ff" }),
};
const GrenadeLauncher: Item = {
  name: "Grenade Launcher",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_g_rock_0.png", { color: "#66ff00" }),
};
const RocketLauncher: Item = {
  name: "Rocket Launcher",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_g_rock2_0.png", { color: "#ff3300" }),
};
const LightningGun: Item = {
  name: "Lightning Gun",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_g_light_0.png", { color: "#ffffff" }),
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
  textureDirPath: modelsDirPath,
  ...toSettings("simple_quaddama_0.png", { color: "#0099ff" }),
};
const Pent: Item = {
  name: "Pent",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_invulner_0.png", { color: "#ff0000" }),
};
const Ring: Item = {
  name: "Ring",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_invisibl_0.png", { color: "#ffff00" }),
};

export const powerups = [Quad, Pent, Ring];

// health packs

const MegaHealth: Item = {
  name: "Mega health",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_bh100_0.png", { color: "#66ddee" }),
};
const HealthLarge: Item = {
  name: "Large health",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_bh25_0.png", { color: "#eeee00" }),
};
const HealthSmall: Item = {
  name: "Small health",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_bh10_0.png", { color: "#33ff33" }),
};

export const healthPacks = [HealthSmall, HealthLarge, MegaHealth];

// ammo
const ShellsSmall: Item = {
  name: "Shells (small)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_shell0_0.png", {
    color: "#ffff00",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const ShellsLarge: Item = {
  name: "Shells (large)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_shell1_0.png", {
    color: "#ff9933",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const NailsSmall: Item = {
  name: "Nails (small)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_nail0_0.png", {
    color: "#cc00ff",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};

const NailsLarge: Item = {
  name: "Nails (large)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_nail1_0.png", {
    color: "#0066ff",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const RocketsSmall: Item = {
  name: "Rockets (small)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_rock0_0.png", {
    color: "#66ff00",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const RocketsLarge: Item = {
  name: "Rockets (large)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_rock1_0.png", {
    color: "#ff3300",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const CellsSmall: Item = {
  name: "Cells (small)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_batt0_0.png", {
    color: "#ffffff",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const CellsLarge: Item = {
  name: "Cells (large)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_batt1_0.png", {
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
const RuneResistance: Item = {
  name: "Resistance",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_end1_0.png", { color: "#cc8899" }),
};
const RuneStrength: Item = {
  name: "Strength",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_end2_0.png", { color: "#cc8899" }),
};
const RuneHaste: Item = {
  name: "Haste",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_end3_0.png", { color: "#cc8899" }),
};
const RuneRegeneration: Item = {
  name: "Regeneration",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_end4_0.png", { color: "#cc8899" }),
};

export const runes = [
  RuneResistance,
  RuneStrength,
  RuneHaste,
  RuneRegeneration,
];
