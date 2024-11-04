import BasicFragment from './basicFragment';

export default class DropdownFragment extends BasicFragment {
  constructor({ root }) {
    super({ root });
    this.dropdownElementsList = () => cy.get('menu a');
  }

  selectOptions(value) {
    return this.dropdownElementsList().contains(value).scrollIntoView().click();
  }
}
