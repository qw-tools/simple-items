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
  ...toSettings("armor.svg", { color: "#00cc00" }),
};

const YellowArmor: Item = {
  name: "Yellow Armor",
  textureDirPath: modelsDirPath,
  ...toSettings("armor.svg", { color: "#ffff00" }),
};
const RedArmor: Item = {
  name: "Red Armor",
  textureDirPath: modelsDirPath,
  ...toSettings("armor.svg", { color: "#ff0000" }),
};

export const armors: Item[] = [GreenArmor, YellowArmor, RedArmor];

// weapons
const SuperShotgun: Item = {
  name: "Super Shotgun",
  textureDirPath: modelsDirPath,
  ...toSettings("sshotgun.svg", { color: "#ff9933" }),
};
const Nailgun: Item = {
  name: "Nailgun",
  textureDirPath: modelsDirPath,
  ...toSettings("nails.svg", { color: "#cc00ff" }),
};
const SuperNailgun: Item = {
  name: "Super Nailgun",
  textureDirPath: modelsDirPath,
  ...toSettings("snails.svg", { color: "#0066ff" }),
};
const GrenadeLauncher: Item = {
  name: "Grenade Launcher",
  textureDirPath: modelsDirPath,
  ...toSettings("grenade.svg", { color: "#66ff00" }),
};
const RocketLauncher: Item = {
  name: "Rocket Launcher",
  textureDirPath: modelsDirPath,
  ...toSettings("rocket.svg", { color: "#ff3300" }),
};
const LightningGun: Item = {
  name: "Lightning Gun",
  textureDirPath: modelsDirPath,
  ...toSettings("bolt.svg", { color: "#ffffff" }),
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
  ...toSettings("quad.svg", { color: "#0099ff" }),
};
const Pent: Item = {
  name: "Pent",
  textureDirPath: modelsDirPath,
  ...toSettings("pent.svg", {
    color: "#ff0000",
    primary: { ...ds.primary, scale: 0.8 },
    secondary: {
      ...ds.secondary,
      enabled: true,
      shape: "circle",
      scale: 0.75,
      innerScale: 0.85,
      outerScale: 1,
    },
  }),
};
const Ring: Item = {
  name: "Ring",
  textureDirPath: modelsDirPath,
  ...toSettings("ring.svg", { color: "#ffff00" }),
};

export const powerups = [Quad, Pent, Ring];

// health packs
const HealthSmall: Item = {
  name: "Small health",
  textureDirPath: bmodelsDirPath,
  ...toSettings("cross.svg", {
    color: "#33ff33",
    primary: { ...ds.primary, scale: 0.6 },
    secondary: { ...ds.secondary, enabled: true, shape: "circle", scale: 0.6 },
  }),
};
const HealthLarge: Item = {
  name: "Large health",
  textureDirPath: bmodelsDirPath,
  ...toSettings("cross.svg", {
    color: "#eeee00",
    primary: { ...ds.primary, scale: 0.6 },
    secondary: { ...ds.secondary, enabled: true, shape: "circle", scale: 0.6 },
  }),
};

const MegaHealth: Item = {
  name: "Mega health",
  textureDirPath: bmodelsDirPath,
  ...toSettings("cross.svg", {
    color: "#66ddee",
    primary: { ...ds.primary, scale: 0.8 },
    secondary: { ...ds.secondary, enabled: true, shape: "circle", scale: 0.8 },
  }),
};

export const healthPacks = [HealthSmall, HealthLarge, MegaHealth];

// ammo
const ShellsSmall: Item = {
  name: "Shells (small)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("shotgun.svg", {
    color: "#ffff00",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const ShellsLarge: Item = {
  name: "Shells (large)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("sshotgun.svg", {
    color: "#ff9933",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const NailsSmall: Item = {
  name: "Nails (small)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("nails.svg", {
    color: "#cc00ff",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};

const NailsLarge: Item = {
  name: "Nails (large)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("snails.svg", {
    color: "#0066ff",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const RocketsSmall: Item = {
  name: "Rockets (small)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("grenade.svg", {
    color: "#66ff00",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const RocketsLarge: Item = {
  name: "Rockets (large)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("rocket.svg", {
    color: "#ff3300",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const CellsSmall: Item = {
  name: "Cells (small)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("bolt.svg", {
    color: "#ffffff",
    primary: { ...ds.primary, scale: 0.5 },
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const CellsLarge: Item = {
  name: "Cells (large)",
  textureDirPath: bmodelsDirPath,
  ...toSettings("bolt.svg", {
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
const runeColor = "#cc8899";
const RuneResistance: Item = {
  name: "Resistance",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_end1_0.png", { color: runeColor }),
};
const RuneStrength: Item = {
  name: "Strength",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_end2_0.png", { color: runeColor }),
};
const RuneHaste: Item = {
  name: "Haste",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_end3_0.png", { color: runeColor }),
};
const RuneRegeneration: Item = {
  name: "Regeneration",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_end4_0.png", { color: runeColor }),
};

export const runes = [
  RuneResistance,
  RuneStrength,
  RuneHaste,
  RuneRegeneration,
];
