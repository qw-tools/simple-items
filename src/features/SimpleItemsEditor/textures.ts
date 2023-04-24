import { publicUrl } from "@/pkg/viteUtil";

export const textures = [
  // weapons, ammo
  "simple_sg.png",
  "simple_ssg.png",
  "simple_ng.png",
  "simple_sng.png",
  "shell_01.png",
  "shells_01.png",
  "bullet_01.png",
  "bullets_01.png",
  "nail_01.png",
  "nails_01.png",
  "nails_02.png",
  "grenade_01.png",
  "grenade_02.png",
  "missile_01.png",
  "missile_02.png",
  "bolt_01.png",
  "bolt_02.png",
  "bolt_03.png",
  "bolts_01.png",

  // powerups
  "pent.png",
  "pent_rune.png",
  "pent_scroll.png",
  "quake_logo.png",
  "ring_01.png",
  "ring_02.png",
  "ring_03.png",
  "eye_01.png",
  "ghost_01.png",
  "biohazard_01.png",
  "biohazard_02.png",
  "radioactivity_01.png",

  // health
  "plus_01.png",
  "plus_02.png",
  "plus_03.png",
  "heart_01.png",

  // runes
  "rune_haste.png",
  "run_01.png",
  "rune_regeneration.png",
  "recycle_01.png",
  "rune_resistance.png",
  "rune_strength.png",

  // armors
  "armor_01.png",
  "armor_02.png",
  "armor_03.png",
  "armor_04.png",
  "armor_05.png",
  "armor_05.png",
  "armor_06.png",
  "armor_07.png",
  "armor_08.png",

  // misc
  "backpack_01.png",
  "backpack_02.png",
  "tombstone_01.png",
  "tombstone_02.png",
  "coffin_01.png",
].map((filename) => publicUrl(`/assets/textures/${filename}`));
