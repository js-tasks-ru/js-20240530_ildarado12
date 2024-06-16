export default class ColumnChart {
  element;
  chartHeight = 50;
  constructor ({
    data = [],
    label = '',
    link = '',
    value = 0,
    formatHeading = value => value,
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.formatHeading = formatHeading;  
    this.element = this.createElement(this.createTemplate());
  }

  renderLink() {
    if (this.link) {
      return `<a class="column-chart__link" href="${this.link}">View all</a>`;
    }
    return ``;
  }

  createElement(template) {
    const element = document.createElement(`div`);
    element.innerHTML = template;
    return element.firstElementChild;
  }

  getColumnProps() {
    const maxValue = Math.max(...this.data);
    const scale = 50 / maxValue;
  
    return this.data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  createDateScale() {
    return this.getColumnProps().map(({value, percent}) => (`
      <div style="--value: ${value}" data-tooltip="${percent}"></div>`
    )).join(``);
  }

  changeClass() {
    return this.data.length ? `column-chart` : `column-chart column-chart_loading`;
  }

  createTemplate() {
    return (
      `<div class="${this.changeClass()}" style="--chart-height: 50">
        <div class="column-chart__title">
        ${this.label}
        ${this.renderLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
          <div data-element="body" class="column-chart__chart">
          ${this.createDateScale()}
          </div>
        </div>
      </div>`);
  }

  update(newData) {
    this.data = newData;
    this.element.querySelector(`[data-element="body"]`).innerHTML = this.createDateScale();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}