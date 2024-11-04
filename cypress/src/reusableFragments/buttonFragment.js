import BasicFragment from './basicFragment';

export default class ButtonFragment extends BasicFragment {
  constructor({ root }) {
    super({ root });
  }

  clickOn() {
    return this.root().should('exist').click();
  }
}
