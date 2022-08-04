export interface TrackData {
  name: string,
  sample: string,
  pattern: number[],
  steps: number
}
export function createTrackData(name: string, sample: string, pattern: number[], steps: number = 16): TrackData{
  return { name,sample,pattern,steps};
}
