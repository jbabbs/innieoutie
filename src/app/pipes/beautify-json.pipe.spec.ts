import { BeautifyJsonPipe } from './beautify-json.pipe';

describe('BeautifyJsonPipe', () => {
  it('create an instance', () => {
    const pipe = new BeautifyJsonPipe();
    expect(pipe).toBeTruthy();
  });
});
