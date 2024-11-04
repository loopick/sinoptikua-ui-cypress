export default class BasicFragment {
  constructor({ root }) {
    this.root = typeof root === 'string' ? () => cy.get(root) : root;
  }
}
