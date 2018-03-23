const DOMNodeCollection = require('./dom_node_collection.js');

let queue = [];

document.addEventListener("DOMContentLoaded", function () {
  let func;
  for (let i = 0; i < queue.length; i++) {
    func = queue[i];
    func();
  }
});

window.$l = function (arg1) {
  if (typeof arg1 === "function") {
    queue.push(arg1);
  }
  else if (arg1 instanceof HTMLElement) {
    return new DOMNodeCollection([arg1]);
  }
  else {
    const element = document.querySelectorAll(arg1);
    return new DOMNodeCollection(element);
  }
};


$l.extend = (base, ...otherObjs) => {
  otherObjs.forEach((obj) => {
    for (const el in obj) {
      base[el] = obj[el];
    }
  });
  return base;
};

$l.ajax(options){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b');

  xhr.onload = function () {
    console.log(xhr.status)
    console.log(xhr.responseType)
    console.log(xhr.response)
  }

  const optionalData = { name: "User1", password : "123456" };
  xhr.send(optionalData);
}
