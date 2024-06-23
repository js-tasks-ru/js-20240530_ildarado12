export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemlate());
  }

  createElement(template) {
    const element = document.createElement(`DIV`);
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createElementHeader() {
    const header = document.createElement(`DIV`);    
    header.dataset.element = `header`;
    header.classList = `sortable-table__header sortable-table__row`;

    for (const objHeader of this.headerConfig) {
      const {id, title, sortable, sortType} = objHeader;
      header.insertAdjacentHTML(`beforeend`, 
        `<div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="">
          <span>${title}</span>
        </div>`);
    }

    return header.outerHTML;
  }


  createElementProduct() {
    const productBody = document.createElement(`DIV`);
    productBody.dataset.element = `body`;
    productBody.classList = `sortable-table__body`;

    for (const objProduct of this.data) {
      const {id, title, description, quantity, subcategory, status, images, price, discount, sales} = objProduct;

      productBody.insertAdjacentHTML(`beforeend`, 
        `<a href="/products/${id}" class="sortable-table__row">
          <div class="sortable-table__cell">
            <img class="sortable-table-image" alt="Image" src=${images?.url || 'https://via.placeholder.com/32'}>
          </div>
          <div class="sortable-table__cell">${title}</div>

          <div class="sortable-table__cell">${quantity}</div>
          <div class="sortable-table__cell">${price}</div>
          <div class="sortable-table__cell">${sales}</div>
        </a>`);
    }

    return productBody.outerHTML;
  }

  sort(fielValue = ``, orderValue = ``) {

    let sortTypeStr;

    for (const objHeader of this.headerConfig) {
      if (fielValue == objHeader.id) {
        sortTypeStr = objHeader.sortType;
      }
    }

    if (sortTypeStr == `string`) {
      if (orderValue == `desc`) {
        this.data.sort((b, a) => a[fielValue].localeCompare(b[fielValue], [`ru`, `en`], {sensitivity: 'case', caseFirst: 'upper'}));
      } else {
        this.data.sort((a, b) => a[fielValue].localeCompare(b[fielValue], [`ru`, `en`], {sensitivity: 'case', caseFirst: 'upper'}));
      }
    }
    if (sortTypeStr == `number`) {
      if (orderValue == `desc`) {
        this.data.sort((a, b) => b[fielValue] - a[fielValue]);
      } else {
        this.data.sort((a, b) => a[fielValue] - b[fielValue]);
      }
    }

    this.remove();
    document.getElementById(`root`).append(this.createElement(this.createTemlate()));

    const arrowColumns = document.querySelector(`[data-id="${fielValue}"]`);
    arrowColumns.insertAdjacentHTML(`beforeend`, `        
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`);
  }

  createTemlate() {
    return (`
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
        ${this.createElementHeader()}
        ${this.createElementProduct()}

          <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

          <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
            <div>
              <p>No products satisfies your filter criteria</p>
              <button type="button" class="button-primary-outline">Reset all filters</button>
            </div>
          </div>

        </div>
      </div>
      `);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}