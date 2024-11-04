import HomePage from '../pages/HomePage';
import DateHelpers from '../support/helpers/dateHelpers';
import { Log } from '../utils/Log';
import { SinoptikUAUrls } from '../fixtures/urls';

const home = new HomePage();
const dateHelpers = new DateHelpers();

const testData = {
  city: {
    uk: 'Київ',
    en: 'kyiv',
  },
  daysList: null,
};

describe('SinoptikUA - UI', () => {
  before(() => {
    Log.msg('Block ads - full-page overlays in 20-40% test runs');
    cy.intercept('GET', 'https://securepubads.g.doubleclick.net/**', {
      statusCode: 200,
      body: {},
    }).as('blockAds');
  });

  beforeEach(() => {
    testData.daysList = dateHelpers.getDaysArray(10);
    cy.intercept({
      method: 'POST',
      url: 'https://ua.sinoptik.ua/api/weather/location/list/by_id',
    }).as('interceptCities');
  });

  it('01 - Test task for Yellow Media', () => {
    Log.msg('Step 1 - Visit https://ua.sinoptik.ua/');
    cy.visit(SinoptikUAUrls.home);

    Log.msg(`Step 2 - Input ${testData.city.uk} into the Search Field`);
    home.searchInput.sendKeys(testData.city.uk);

    Log.msg(`Step 3 - Select ${testData.city.uk} value from list`);
    home.citiesDropdown.selectOptions(testData.city.uk);

    Log.msg(`Assertion - Verify response status code is 200 and ${testData.city.en} presents in response body`);
    cy.wait('@interceptCities').then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
      expect(intercept.response.body.locations.some((item) => item.id === testData.city.en)).to.be.true;
    });

    Log.msg('Steps 4,5 - Click on 7 tabs one by one');
    Log.msg('Assertion - Verify response Status code is 200, Date on the Tab Title and at Tab Description');
    home.daysTab.assertDateTabsInfo(7, testData.daysList);

    Log.msg(`Step 6 - Click on the '10 days' button`);
    home.tenDaysButton.clickOn();
    Log.msg(`Assertion - Verify Response Status Code is 200`);
    cy.wait('@changeTab').then((intercept) => {
      expect(intercept.response.statusCode).is.eq(200);
    });

    Log.msg('Step 7 - Click on 10 tabs one by one');
    Log.msg('Assertion - Verify response Status code is 200, Date on the Tab Title + Tab Description');
    home.daysTab.assertDateTabsInfo(10, testData.daysList);
  });
});
