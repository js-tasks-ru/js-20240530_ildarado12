export default class NotificationMessage {
  static currentShowComponent;

  constructor(message = ``, {duration = 1000, type = ``}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
  }

  createElem(template) {
    const element = document.createElement(`DIV`);
    element.innerHTML = template;
    return document.body.append(element.firstElementChild);
  }

  createShow() {
    return (`
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
          <div class="timer"></div>
          <div class="inner-wrapper">
              <div class="notification-header">${this.type}</div>
              <div class="notification-body">
              ${this.message}
              </div>
          </div>
      </div>
    `);
  }

  show() {
    if (NotificationMessage.currentShowComponent) {
      NotificationMessage.currentShowComponent.hide();
    }
    NotificationMessage.currentShowComponent = this;

    this.createElem(this.createShow());
    
    const timer = document.querySelector(`.timer`);
    timer.addEventListener(`animationend`, () => this.hide(), {once: true});
  }

  hide() {
    if (document.querySelector(`.notification`)) {
      document.querySelector(`.notification`).remove();
    }
  }

  destroy() {
    this.hide();
  }
}
