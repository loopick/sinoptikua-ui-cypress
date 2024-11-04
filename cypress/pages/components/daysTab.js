import TabFragment from '../../src/reusableFragments/tabFragment';

export default class DaysTab {
  dayTab = new TabFragment({root: () => cy.get('div main div').first().find('a')});
  tabDescription = () => this.dayTab.root().closest('main').children(':nth-child(2)');

  getTabDataByIndex(index) {
    return this.dayTab
      .root()
      .eq(index)
      .then(($el) => {
        const titleDay = $el.find('p').eq(0).text();
        const titleDate = $el.find('p').eq(1).text();
        const titleMonth = $el.find('p').eq(2).text();

        return this.tabDescription().then((descriptionEl) => {
          const descriptionDay = descriptionEl.find('p').eq(0).text();
          const descriptionDate = descriptionEl.find('p').eq(1).text();
          const descriptionMonth = descriptionEl.find('p').eq(2).text();

          return {
            titleDay,
            titleDate,
            titleMonth,
            descriptionDay,
            descriptionDate,
            descriptionMonth,
          };
        });
      });
  }

  assertDateTabsInfo(tabsQuantity, assertionData) {
    this.dayTab.root().then((tabs) => {
      expect(tabs.length).to.eq(tabsQuantity);
      const tabsLength = tabs.length;
      for (let index = tabsLength; index > 0; index--) {
        cy.intercept('**/stats/visit/**').as('changeTab');

        this.dayTab.clickOn(index - 1);
        cy.wait('@changeTab').then((intercept) => {
          expect(intercept.response.statusCode).is.eq(200);
        });

        this.getTabDataByIndex(index - 1).then((tabData) => {
          const expectedData = assertionData[index - 1];
          expect(tabData.titleDay).to.eq(expectedData.day);
          expect(tabData.titleDate).to.eq(expectedData.date);
          expect(tabData.titleMonth).to.eq(expectedData.month);

          if (index > 1) {
            expect(tabData.descriptionDay).to.eq(expectedData.day);
            expect(tabData.descriptionDate).to.eq(expectedData.date);
            expect(tabData.descriptionMonth).to.eq(expectedData.month);
          }
        });
      }
    });
  }
}
