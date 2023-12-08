export interface Gif {
  name: string;
  file: string;
  mal_id: number;
  width: number;
  height: number;
  applicable_to: string[];
}

export interface AnimeDetail {
  title: string;
  link_to_watch: string;
}

export default interface GifsJson {
  gifs: Gif[];
  anime_details: Record<string, AnimeDetail>;
}
