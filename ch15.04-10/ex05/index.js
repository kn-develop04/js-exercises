class InlineCircle extends HTMLElement {
  static get observedAttributes() {
    return ["diameter", "color", "border-color"];
  }

  connectedCallback() {
    this.style.display = "inline-block";
    this.style.borderRadius = "50%";
    this.style.transform = "translateY(10%)";

    if (!this.style.width) {
      this.style.width = "0.8em";
      this.style.height = "0.8em";
    }

    this.updateBorder();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "diameter":
        this.style.width = newValue;
        this.style.height = newValue;
        break;
      case "color":
        this.style.backgroundColor = newValue;
        break;
      case "border-color":
        this.updateBorder();
        break;
    }
  }

  updateBorder() {
    const borderColor = this.getAttribute("border-color") || "white";
    this.style.border = `solid ${borderColor} 5px`;
  }

  get diameter() {
    return this.getAttribute("diameter");
  }

  set diameter(diameter) {
    this.setAttribute("diameter", diameter);
  }

  get color() {
    return this.getAttribute("color");
  }

  set color(color) {
    this.setAttribute("color", color);
  }

  get borderColor() {
    return this.getAttribute("border-color");
  }

  set borderColor(color) {
    this.setAttribute("border-color", color);
  }
}

customElements.define("inline-circle", InlineCircle);
