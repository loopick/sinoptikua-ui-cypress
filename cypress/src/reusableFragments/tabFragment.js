import BasicFragment from './basicFragment';

export default class TabFragment extends BasicFragment {
  constructor({ root }) {
    super({ root });
  }

  clickOn(index = 0) {
    return this.root().eq(index).should('exist').click();
  }
}
