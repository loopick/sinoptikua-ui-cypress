export default class Element {
  constructor(selector) {
    this.selector = selector;
  }

  root() {
    return cy.get(this.selector);
  }
}
