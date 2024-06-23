export default class NotificationMessage {
  static currentShowComponent;

  constructor(message = ``, {duration, type} = {duration: 0, type: ``}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.element = this.createElement(this.createShow());
  }

  createElement(template) {
    const container = document.createElement(`DIV`);
    container.innerHTML = template;
    return container.firstElementChild;
  }

  createShow() {
    return (
      `<div class="notification ${this.type}" style="--value:${this.duration / 1_000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>`);
  }

  show(container = document.body) {
    if (NotificationMessage.currentShowComponent) {
      NotificationMessage.currentShowComponent.remove();
    }
    NotificationMessage.currentShowComponent = this;

    container.append(this.element);
    this.timerId = setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    clearTimeout(this.timerId);
  }
}
