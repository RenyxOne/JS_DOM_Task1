class Dropdown {
  #element;

  testelem;

  #lastChoice;

  constructor(element, arr) {
    this.#element = element;
    this.testelem = element;
    this.#initial();
    this.setElements(arr);
  }

  #initial() {
    this.#lastChoice = null;
    this.#element.classList.add('dropdown');

    const inputArea = document.createElement('label');
    inputArea.className = 'dropdown__input-area';
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.classList.add('dropdown__input-field');
    inputArea.appendChild(inputField);

    inputField.addEventListener('input', this.#search.bind(this));

    inputArea.addEventListener('click', () =>
      this.#element
        .querySelector('.dropdown__list')
        .classList.contains('dropdown__list--show')
        ? this.#hideList()
        : this.#showList()
    );

    this.#element.appendChild(inputArea);

    window.addEventListener('click', (event) => {
      const { target } = event;
      event.preventDefault();
      if (target.closest('.dropdown') !== this.#element) {
        this.#hideList();
      }
    });
    window.addEventListener('resize', this.#hideList.bind(this));
    window.addEventListener('scroll', this.#hideList.bind(this));
  }

  setElements(arr) {
    const list = document.createElement('ul');
    list.classList.add('dropdown__list');
    if (this.#element.childElementCount > 1) {
      this.#element.lastChild.remove();
    }
    this.#element.appendChild(list);
    if (arr === undefined) {
      return;
    }
    arr.forEach((item) => {
      const itemList = document.createElement('li');
      itemList.className = 'dropdown__list-item';
      itemList.dataset.id = `${item.id}`;
      itemList.innerHTML = `${item.label}`;
      itemList.addEventListener('click', () => {
        this.#lastChoice = itemList;
        this.#hideList();
      });
      list.appendChild(itemList);
    });
  }

  #showList() {
    const inputField = this.#element.querySelector('.dropdown__input-field');
    inputField.value = '';
    inputField.focus();
    const list = this.#element.querySelector('.dropdown__list');
    const { height, bottom } = this.#element.getBoundingClientRect();
    const windowHeight = document.documentElement.clientHeight;
    const listElementCount =
      list.childElementCount >= 5 ? 5 : list.childElementCount;
    if (windowHeight - bottom < height * listElementCount) {
      list.classList.add('dropdown__list--show-up');
    } else {
      list.classList.add('dropdown__list--show');
    }
  }

  #hideList() {
    if (this.#lastChoice) {
      const inputField = this.#element.querySelector('.dropdown__input-field');
      inputField.dataset.id = this.#lastChoice.dataset.id;
      inputField.value = this.#lastChoice.innerText;
    }
    const list = this.#element.querySelector('.dropdown__list');
    list.classList.remove('dropdown__list--show');
    list.classList.remove('dropdown__list--show-up');
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

const dropdown1 = new Dropdown(document.getElementById('dropdown'));
const dropdown2 = new Dropdown(document.getElementById('dropdown2'));

dropdown1.setElements([
  {
    label: '6',
    id: 1,
  },
  {
    label: '7',
    id: 1,
  },
]);
dropdown2.setElements([
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
