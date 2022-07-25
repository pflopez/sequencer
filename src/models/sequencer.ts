/**
 * The resolution
 */
export type SequencerResolution = 1 | 2 | 4 | 8 | 16 | 32;

export const SequencerResolutions:Record<SequencerResolution, string> = {
  1: '1',
  2: '1/2',
  4: '1/4',
  8: '1/8',
  16: '1/16',
  32: '1/32',
}
