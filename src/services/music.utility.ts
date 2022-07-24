/**
 * calculates time in ms for intervals based on bpm and subdivison ( quarter note, half note etc)
 * @param bpm
 * @param subdivision
 */
export function intervalFromBpm(bpm: number, subdivision: number){
  return ( (60 / bpm) * 1000 / subdivision ) * 4;
}
