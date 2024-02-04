export default class Element {
  constructor({ type, position, board }) {
    this.element = document.createElement("div");
    this.element.classList.add("snake-element");
    this.element.classList.add(type);
    // eyes
    if (type === "head") {
      let eyetl = document.createElement("div");
      eyetl.classList.add("snake-eye");
      eyetl.classList.add("eyetl");
      this.element.append(eyetl);
      let eyetr = document.createElement("div");
      eyetr.classList.add("snake-eye");
      eyetr.classList.add("eyetr");
      this.element.append(eyetr);
      let eyebl = document.createElement("div");
      eyebl.classList.add("snake-eye");
      eyebl.classList.add("eyebl");
      this.element.append(eyebl);
      let eyebr = document.createElement("div");
      eyebr.classList.add("snake-eye");
      eyebr.classList.add("eyebr");
      this.element.append(eyebr);
    }

    this.position = { ...position };
    this.render();
    board.append(this.element);
  }

  render() {
    this.element.style.setProperty("--grid-column-start", this.position.x);
    this.element.style.setProperty("--grid-row-start", this.position.y);
  }
}
