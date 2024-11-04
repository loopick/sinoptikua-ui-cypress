import BasicFragment from './basicFragment';

export default class InputFragment extends BasicFragment {
  constructor({ root }) {
    super({ root });
  }

  sendKeys(inputValue, clear = true) {
    this.root().find('input').should('be.enabled');

    if (clear) {
      return this.root()
        .find('input')
        .clear({ force: true })
        .type(inputValue, { delay: 30 })
        .wait(300)
        .invoke('val')
        .should('not.be.empty');
    } else {
      return this.root().find('input').type(inputValue, { delay: 30 }).wait(300).invoke('val').should('not.be.empty');
    }
  }
}
