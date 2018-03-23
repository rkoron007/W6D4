class DOMNodeCollection {
  constructor(el){
    this.el = el;

  }


  html(string){
    if(!string){
      string = this.el[0];
    }

    for (var i = 0; i < this.el.length; i++) {
      this.el[i].innerHTML = string;
    }
  }

  empty(){
    for (var i = 0; i < this.el.length; i++) {
      this.el[i].innerHTML = "";
    }
  }

  append(child){
    for (var i = 0; i < this.el.length; i++) {
      this.el[i].appendChild(child);
    }
  }

  attr(name, value){
    for (var i = 0; i < this.el.length; i++) {
      this.el[i].setAttribute(name,value);
    }
  }

  addClass(string){
    for (var i = 0; i < this.el.length; i++) {
      this.el[i].classList.add(string);
    }
  }

  removeClass(string){
    for (var i = 0; i < this.el.length; i++) {
      this.el[i].classList.remove(string);
    }
  }

  children(){

    let childrensList = [];

    for (var i = 0; i < this.el.length; i++) {
      let child = this.el[i].children;
      childrensList.push(child);
    }
    return new DOMNodeCollection(childrensList);
  }

  parent(){

    let parentList = [];

    for(let i = 0; i < this.el.length; i++){
      let parent = this.el[i].parentNode;
      parentList.push(parent);
    }

    return new DOMNodeCollection(parentList);
  }

  find(selector){
    let nodeList = [];

    this.el.forEach(node => {
      nodeList = nodeList.concat(node.querySelectorAll(selector));
    });

    return new DOMNodeCollection(nodeList);
  }

  remove(){
    this.el.forEach(node =>{
      node.remove();
    });
  }

  on(type,callback){

    for (var i = 0; i < this.el.length; i++) {
      this.el[i].addEventListener(type, callback);
      this.el[i][type] = callback;
    }
  }

  off(type){
    for (var i = 0; i < this.el.length; i++) {
      let callback = this.el[i][type];
      this.el[i].removeEventListener(type);
    }
  }


}

module.exports = DOMNodeCollection;
