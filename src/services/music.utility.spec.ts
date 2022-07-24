import {intervalFromBpm} from "./music.utility";


describe('intervalFromBpm', () => {
  it('should correctly return ms based on bpm and subdivision', () => {
    // using https://www.omnicalculator.com/other/bpm for reference
    let interval = 0;
    [1, 4, 8, 16].forEach(x => {
      interval = intervalFromBpm(60, x);
      expect(interval).toBe(4000 / x);
    });

    [1, 4, 8, 16].forEach(x => {
      interval = intervalFromBpm(150, x);
      expect(interval).toBe(1600 / x);
    });

    [1, 4, 8, 16].forEach(x => {
      interval = intervalFromBpm(30, x);
      expect(interval).toBe(8000 / x);
    });
  });
});
