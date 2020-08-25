import React from "react";

export interface Music {
  title: string;
  artist: string;
  link: string;
  duration?: number;
  album?: string;
  icon?: string;
}
export type Musics = Music[];
