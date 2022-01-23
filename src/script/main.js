class Dropdown {
  #element;

  constructor(element, arr) {
    this.#element = element;
    this.#initial();
    if (arr) {
      this.setElements(arr);
    }
  }

  #initial() {
    this.#element.classList.add('dropdown');

    let inputArea = this.#element.querySelector('.dropdown__input-area');
    let inputField = this.#element.querySelector('.dropdown__input-field');

    if (inputArea === null) {
      inputArea = document.createElement('label');
      inputArea.className = 'dropdown__input-area';

      inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.classList.add('dropdown__input-field');

      inputArea.appendChild(inputField);
    }

    inputField.addEventListener('input', this.#search.bind(this));

    inputArea.addEventListener('click', () => {
      this.#element
        .querySelector('.dropdown__list')
        .classList.toggle('dropdown__list--show');
    });

    this.#element.appendChild(inputArea);

    window.addEventListener('click', (event) => {
      const { target } = event;
      event.preventDefault();
      if (target.closest('.dropdown') !== this.#element) {
        this.#element
          .querySelector('.dropdown__list')
          .classList.remove('dropdown__list--show');
      }
    });
  }

  setElements(arr) {
    const list = document.createElement('ul');
    list.classList.add('dropdown__list');
    if (this.#element.childElementCount > 1) {
      this.#element.lastChild.remove();
    }
    this.#element.appendChild(list);

    arr.forEach((item) => {
      const itemList = document.createElement('li');
      itemList.className = 'dropdown__list-item';
      itemList.dataset.id = `${item.id}`;
      itemList.innerHTML = `${item.label}`;
      list.appendChild(itemList);
    });
  }

  #search() {
    const value = this.#element
      .querySelector('.dropdown__input-field')
      .value.trim();
    const list = this.#element.querySelectorAll('.dropdown__list-item');
    list.forEach((item) =>
      item.innerText.startsWith(value)
        ? item.classList.remove('dropdown__list-item--hide')
        : item.classList.add('dropdown__list-item--hide')
    );
  }
}

const dropdown1 = new Dropdown(document.getElementById('dropdown2'));

dropdown1.setElements([
  {
    label:
      '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
    id: 0,
  },
  {
    label: '2',
    id: 0,
  },
  {
    label: '3',
    id: 0,
  },
  {
    label: '4',
    id: 0,
  },
  {
    label: '5',
    id: 0,
  },
  {
    label: '6',
    id: 1,
  },
  {
    label: '7',
    id: 1,
  },
]);
