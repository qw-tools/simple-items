// types
import { publicUrl } from "@/pkg/viteUtil";
import { Item, ItemSettings } from "@/features/SimpleItemsEditor/types";
import { ITEM_SETTINGS as ds } from "@/features/SimpleItemsEditor/config";

const toSettings = (
  filename: string,
  settings: Partial<ItemSettings>
): { settings: ItemSettings; defaultSettings: ItemSettings } => {
  const result: ItemSettings = {
    ...ds,
    ...settings,
    texturePath: publicUrl(`/assets/textures/${filename}`),
  };

  return {
    settings: result,
    defaultSettings: result,
  };
};

const modelsDirPath = "qw/textures/models";
const bmodelsDirPath = "qw/textures/bmodels";

// armors
const GreenArmor: Item = {
  name: "Green Armor",
  filename: "simple_armor_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_armor_0.png", { color: "#00cc00" }),
};

console.log(GreenArmor);

const YellowArmor: Item = {
  name: "Yellow Armor",
  filename: "simple_armor_1.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_armor_1.png", { color: "#ffff00" }),
};
const RedArmor: Item = {
  name: "Red Armor",
  filename: "simple_armor_2.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_armor_2.png", { color: "#ff0000" }),
};

export const armors: Item[] = [GreenArmor, YellowArmor, RedArmor];

// weapons
const SuperShotgun: Item = {
  name: "Super Shotgun",
  filename: "simple_g_shot_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_g_shot_0.png", { color: "#ff9933" }),
};
const Nailgun: Item = {
  name: "Nailgun",
  filename: "simple_g_nail_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_g_nail_0.png", { color: "#cc00ff" }),
};
const SuperNailgun: Item = {
  name: "Super Nailgun",
  filename: "simple_g_nail2_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_g_nail2_0.png", { color: "#0066ff" }),
};
const GrenadeLauncher: Item = {
  name: "Grenade Launcher",
  filename: "simple_g_rock_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_g_rock_0.png", { color: "#66ff00" }),
};
const RocketLauncher: Item = {
  name: "Rocket Launcher",
  filename: "simple_g_rock2_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_g_rock2_0.png", { color: "#ff3300" }),
};
const LightningGun: Item = {
  name: "Lightning Gun",
  filename: "simple_g_light_0.png",
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
  filename: "simple_quaddama_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_quaddama_0.png", { color: "#0099ff" }),
};
const Pent: Item = {
  name: "Pent",
  filename: "simple_invulner_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_invulner_0.png", { color: "#ff0000" }),
};
const Ring: Item = {
  name: "Ring",
  filename: "simple_invisibl_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_invisibl_0.png", { color: "#ffff00" }),
};

export const powerups = [Quad, Pent, Ring];

// health packs

const MegaHealth: Item = {
  name: "Mega health",
  filename: "simple_b_bh100_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_bh100_0.png", { color: "#66ddee" }),
};
const HealthLarge: Item = {
  name: "Large health",
  filename: "simple_b_bh25_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_bh25_0.png", { color: "#eeee00" }),
};
const HealthSmall: Item = {
  name: "Small health",
  filename: "simple_b_bh10_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_bh10_0.png", { color: "#33ff33" }),
};

export const healthPacks = [HealthSmall, HealthLarge, MegaHealth];

// ammo
const ShellsSmall: Item = {
  name: "Shells (small)",
  filename: "simple_b_shell0_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_shell0_0.png", {
    outline: undefined,
    primary: { rotation: 0, scale: 0 },
    texturePath: "",
    color: "#ffff00",
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const ShellsLarge: Item = {
  name: "Shells (large)",
  filename: "simple_b_shell1_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_shell1_0.png", {
    color: "#ff9933",
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const NailsSmall: Item = {
  name: "Nails (small)",
  filename: "simple_b_nail0_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_nail0_0.png", {
    color: "#cc00ff",
    secondary: { ...ds.secondary, enabled: true },
  }),
};

const NailsLarge: Item = {
  name: "Nails (large)",
  filename: "simple_b_nail1_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_nail1_0.png", {
    color: "#0066ff",
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const RocketsSmall: Item = {
  name: "Rockets (small)",
  filename: "simple_b_rock0_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_rock0_0.png", {
    color: "#66ff00",
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const RocketsLarge: Item = {
  name: "Rockets (large)",
  filename: "simple_b_rock1_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_rock1_0.png", {
    color: "#ff3300",
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const CellsSmall: Item = {
  name: "Cells (small)",
  filename: "simple_b_batt0_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_batt0_0.png", {
    color: "#ffffff",
    secondary: { ...ds.secondary, enabled: true },
  }),
};
const CellsLarge: Item = {
  name: "Cells (large)",
  filename: "simple_b_batt1_0.png",
  textureDirPath: bmodelsDirPath,
  ...toSettings("simple_b_batt1_0.png", {
    color: "#ffffff",
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
  filename: "simple_end1_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_end1_0.png", { color: "#cc8899" }),
};
const RuneStrength: Item = {
  name: "Strength",
  filename: "simple_end2_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_end2_0.png", { color: "#cc8899" }),
};
const RuneHaste: Item = {
  name: "Haste",
  filename: "simple_end3_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_end3_0.png", { color: "#cc8899" }),
};
const RuneRegeneration: Item = {
  name: "Regeneration",
  filename: "simple_end4_0.png",
  textureDirPath: modelsDirPath,
  ...toSettings("simple_end4_0.png", { color: "#cc8899" }),
};

export const runes = [
  RuneResistance,
  RuneStrength,
  RuneHaste,
  RuneRegeneration,
];
