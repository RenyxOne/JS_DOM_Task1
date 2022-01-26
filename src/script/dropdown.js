function Dropdown (element, initArr) {
  var element = element;
  var lastChoice = null;
  var show = false;
  var arr = null;
  this.setElements = setElements;

  /* INITIAL */
  var inputArea = document.createElement('div');
  var inputField = document.createElement('input');
  var list = document.createElement('ul');

  addCssClass(element, 'dropdown');
  addCssClass(inputArea,'dropdown__input-area');
  addCssClass(inputField,'dropdown__input-field');
  addCssClass(list, 'dropdown__list');

  inputArea.addEventListener('click',function (event) {
    show ? hideList() : showList();
  });
  inputArea.appendChild(inputField);

  inputField.type = 'text';
  inputField.addEventListener('input', search);

  element.appendChild(inputArea);
  element.appendChild(list);

  if (initArr) {
    setElements(initArr);
  }

  /* Functions */

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
    window.removeEventListener('resize', hideList);
    window.removeEventListener('scroll', hideList);
  }

  function setElements (arrElements) {
    clearList();
    arr = arrElements;
    lastChoice = null;
    if (!arr) return;
    for (var i = 0; i < arr.length; i++) {
      var listItem = document.createElement('li');
      listItem.className = 'dropdown__list-item';
      listItem.innerHTML = arr[i].label;
      listItem.addEventListener('click', {handleEvent: function () {
          lastChoice = this.item;
          hideList();
        }, item: arr[i]} );
      list.appendChild(listItem);
    }
  }

  function removeCssClass(element, cssClass){
    var cssList = element.className.split(' ');
    var indexToRemove = cssList.indexOf(cssClass);
    if (indexToRemove === -1) {
      return;
    }
    delete cssList[indexToRemove];
    element.className = '';
    for (var i = 0; i < cssList.length; i++){
      if (cssList[i])
        element.className += ' ' + cssList[i];
    }
    element.className = element.className.trim();
  }

  function addCssClass(element, cssClass){
    var cssList = element.className.split(' ');
    var index = cssList.indexOf(cssClass);
    if (index !== -1) {
      return;
    }
    element.className += ' ' + cssClass;
    element.className = element.className.trim();
  }

  function showList () {
    show = true;
    inputField.value = '';
    inputField.focus();
    var height = element.getBoundingClientRect().bottom - element.getBoundingClientRect().top;
    var bottom = element.getBoundingClientRect().bottom;
    var windowHeight = document.documentElement.clientHeight;
    var listElementCount =
      list.childElementCount >= 5 ? 5 : list.childElementCount;
    if (windowHeight - bottom < height * listElementCount) {
      addCssClass(list,'dropdown__list--show-up');
    } else {
      addCssClass(list,'dropdown__list--show');
    }
    var listItems = list.querySelectorAll('.dropdown__list-item');
    for (var i = 0; i < listItems.length; i++) {
      removeCssClass(listItems[i], 'dropdown__list-item--hide')
    }

    outsideEventAdd();
  }

  function hideList () {
    show = false;
    if (lastChoice) {
      var inputField = element.querySelector('.dropdown__input-field');
      inputField.value = lastChoice.label;
    }
    var list = element.querySelector('.dropdown__list');
    removeCssClass(list,'dropdown__list--show');
    removeCssClass(list,'dropdown__list--show-up');
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
      value === '' || listItems[i].innerText.indexOf(value) === 0
        ? removeCssClass(listItems[i],'dropdown__list-item--hide')
        : addCssClass(listItems[i],'dropdown__list-item--hide')
    }
  }
}
