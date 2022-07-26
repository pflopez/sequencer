/**
 * The resolution
 */
export type SequencerResolution = 1 | 2 | 4 | 8 | 16 | 32;
export type SequencerVelocity = 1 | 2 | 3;

export const SequencerResolutions: Record<SequencerResolution, string> = {
  1: '1',
  2: '1/2',
  4: '1/4',
  8: '1/8',
  16: '1/16',
  32: '1/32',
}

export const SequencerVelocities: Record<SequencerVelocity, string> = {
  1: 'High',
  2: 'Mid',
  3: 'Low',
}
