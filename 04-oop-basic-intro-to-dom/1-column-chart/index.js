export default class ColumnChart {
  constructor (objInput) {
    this.objInput = objInput;
    this.render();
    //update();    
  }

  render() {
    let dataElem;
    let labelElem;
    let valueElem;

    for (const key in this.objInput) {
      if (key == `data`) {
        dataElem = this.objInput[key];
      }
      if (key == `label`) {
        labelElem = this.objInput[key];
      }
      if (key == `value`) {
        valueElem = this.objInput[key];
      }
    }

    this.elem = document.createElement(`div`);
    this.elem.className = `column-chart`;
    this.elem.style = `--chart-height: 50`;

    this.elem.insertAdjacentHTML(`afterbegin`, `
        <div class="column-chart__title">Total ${labelElem}</div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${valueElem}</div>
          <div data-element="body" class="column-chart__chart">
          <!--Данные-->
          </div>
        </div>`);

    let dataBody = this.elem.querySelector(`.column-chart__chart`);
    const maxValue = Math.max(...dataElem);

    if (!dataElem.length) {
      dataBody.insertAdjacentHTML(`beforeend`, `
        <img src="\charts-skeleton.svg">
        `);
    } else {
      for (const item of dataElem) {
        dataBody.insertAdjacentHTML(`beforeend`, `
          <div style="--value: ${item}" data-tooltip="${Math.round(item * 100 / maxValue)}%"></div>
          `);
      }
    }

    console.log(this.elem);

    return this.elem;
  }
}

/*    const salesChart = new ColumnChart({
        data: salesData,
        label: 'sales',
        value: 243437,
        formatHeading: data => `$${data}`
      });
      
      const ordersChart = new ColumnChart({
        data: ordersData,
        label: 'orders',
        value: 344,
        link: '#'
      }); */