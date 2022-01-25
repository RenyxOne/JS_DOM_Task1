if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function(search, rawPos) {
      var pos = rawPos > 0 ? rawPos|0 : 0;
      return this.substring(pos, pos + search.length) === search;
    }
  });
}
(function() {
  // helpers
  var regExp = function(name) {
    return new RegExp('(^| )'+ name +'( |$)');
  };
  var forEach = function(list, fn, scope) {
    for (var i = 0; i < list.length; i++) {
      fn.call(scope, list[i]);
    }
  };

  // class list object with basic methods
  function ClassList(element) {
    this.element = element;
  }

  ClassList.prototype = {
    add: function() {
      forEach(arguments, function(name) {
        if (!this.contains(name)) {
          this.element.className += ' '+ name;
        }
      }, this);
    },
    remove: function() {
      forEach(arguments, function(name) {
        this.element.className =
          this.element.className.replace(regExp(name), '');
      }, this);
    },
    toggle: function(name) {
      return this.contains(name)
        ? (this.remove(name), false) : (this.add(name), true);
    },
    contains: function(name) {
      return regExp(name).test(this.element.className);
    },
    // bonus..
    replace: function(oldName, newName) {
      this.remove(oldName), this.add(newName);
    }
  };

  // IE8/9, Safari
  if (!('classList' in Element.prototype)) {
    Object.defineProperty(Element.prototype, 'classList', {
      get: function() {
        return new ClassList(this);
      }
    });
  }

  // replace() support for others
  if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
    DOMTokenList.prototype.replace = ClassList.prototype.replace;
  }
})();

function Dropdown (element, initArr) {
  var element = element;
  var lastChoice = null;
  this.setElements = setElements;

  /* INITIAL */
  element.classList.add('dropdown');

  var inputArea = document.createElement('label');

  inputArea.className = 'dropdown__input-area';

  var inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.classList.add('dropdown__input-field');
  inputArea.appendChild(inputField);

  var list = document.createElement('ul');
  list.classList.add('dropdown__list');
  element.appendChild(list);

  inputField.addEventListener('input', search);

  inputArea.addEventListener('click',function (event) {
    element.querySelector('.dropdown__list').classList.contains('dropdown__list--show') ||
    element.querySelector('.dropdown__list').classList.contains('dropdown__list--show-up')
      ? hideList() : showList()
    console.log('test');
  });

  element.appendChild(inputArea);

  function outsideClick(event) {
      if (!element.contains(event.target)){
        hideList();
      }
  }

  function outsideEventAdd(){
    window.addEventListener('click', outsideClick);
    window.addEventListener('resize', hideList);
    window.addEventListener('scroll', hideList);
  }

  function outsideEventRemove(){
    window.removeEventListener('click', outsideClick);
    window.addEventListener('resize', hideList);
    window.addEventListener('scroll', hideList);
  }

  if (initArr) {
    setElements(initArr);
  }

  /* Functions */

  function setElements (arr) {
    clearList();
    if (!arr) return;
    for (var i = 0; i < arr.length; i++) {
      var listItem = document.createElement('li');
      listItem.className = 'dropdown__list-item';
      listItem.setAttribute( 'data-id', arr[i].id);
      listItem.innerHTML = arr[i].label;
      listItem.addEventListener('click', function () {
        lastChoice = listItem;
        hideList();
      });
      list.appendChild(listItem);
    }
  }

  function showList () {
    inputField.value = '';
    inputField.focus();
    var height = element.getBoundingClientRect().bottom - element.getBoundingClientRect().top;
    var bottom = element.getBoundingClientRect().bottom;
    var windowHeight = document.documentElement.clientHeight;
    var listElementCount =
      list.childElementCount >= 5 ? 5 : list.childElementCount;
    if (windowHeight - bottom < height * listElementCount) {
      list.classList.add('dropdown__list--show-up');
    } else {
      list.classList.add('dropdown__list--show');
    }
    var listItems = list.querySelectorAll('.dropdown__list-item');
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].classList.remove('dropdown__list-item--hide');
    }

    outsideEventAdd();
  }

  function hideList () {
    if (lastChoice) {
      var inputField = element.querySelector('.dropdown__input-field');
      inputField.setAttribute('data-id', lastChoice.getAttribute('data-id'));
      inputField.value = lastChoice.innerText;
    }
    var list = element.querySelector('.dropdown__list');
    list.classList.remove('dropdown__list--show');
    list.classList.remove('dropdown__list--show-up');
    outsideEventRemove();
  }

  function clearList() {
    while (list.childElementCount) {
      list.removeChild(list.firstChild);
    }
  }

  function search () {
    var value = element
      .querySelector('.dropdown__input-field')
      .value.trim();

    var listItems = list.querySelectorAll('.dropdown__list-item');
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].innerText.startsWith(value)
        ? listItems[i].classList.remove('dropdown__list-item--hide')
        : listItems[i].classList.add('dropdown__list-item--hide')
    }
  }
}
