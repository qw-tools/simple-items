import { publicUrl } from "@/pkg/viteUtil";

export const textures = [
  // weapons, ammo
  "sg.png",
  "ssg.png",
  "nails_01.png",
  "nails_02.png",
  "sng.png",
  "gl.png",
  "rl.png",
  "lg.png",

  // powerups
  "pent.png",
  "quake_logo.png",
  "ring.png",
  "suit.png",

  // health
  "health_01.png",
  "health_02.png",
  "health_03.png",

  // runes
  "rune_haste.png",
  "rune_regeneration.png",
  "rune_resistance.png",
  "rune_strength.png",

  // armors
  "armor_00.png",
  "armor_01.png",
  "armor_02.png",
  "armor_03.png",
  "armor_04.png",
  "armor_05.png",
  "armor_06.png",
  "armor_07.png",
  "armor_08.png",
  "armor_09.png",
  "armor_10.png",
  "armor_11.png",

  // misc
  "backpack.png",
].map((filename) => publicUrl(`/assets/textures/${filename}`));
