export default class Element {
  constructor({ type, position, board }) {
    this.element = document.createElement("div");
    this.element.classList.add("snake-element");
    this.element.classList.add(type);
    this.position = { ...position };
    this.render();
    board.append(this.element);
  }

  render() {
    this.element.style.setProperty("--grid-column-start", this.position.x);
    this.element.style.setProperty("--grid-row-start", this.position.y);
  }
}
