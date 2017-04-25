import { CitasV2Page } from './app.po';

describe('citasv2 App', () => {
  let page: CitasV2Page;

  beforeEach(() => {
    page = new CitasV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
