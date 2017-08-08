import { FootbookingPage } from './app.po';

describe('footbooking App', function() {
  let page: FootbookingPage;

  beforeEach(() => {
    page = new FootbookingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
