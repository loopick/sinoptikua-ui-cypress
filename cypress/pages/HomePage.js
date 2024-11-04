import ButtonFragment from '../src/reusableFragments/buttonFragment';
import DropdownFragment from '../src/reusableFragments/dropdownFragment';
import InputFragment from '../src/reusableFragments/InputFragment';
import DaysTab from './components/daysTab';

export default class HomePage {
  daysTab = new DaysTab();

  tenDaysButton = new ButtonFragment({ root: () => cy.get('a').contains('10 днів') });
  searchInput = new InputFragment({ root: () => cy.get('input[type="search"]').parent() });
  citiesDropdown = new DropdownFragment({ root: () => cy.get('menu a') });
}
