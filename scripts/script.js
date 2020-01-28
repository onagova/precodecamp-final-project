function isOverflow(el) {
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
}

function fitText(el) {
  let n = 0;

  do {
    $(el).css('font-size', ++n);
  } while (!isOverflow(el));

  $(el).css('font-size', --n);

  // console.log(el + ' fit at: ' + n + 'px');
}

function promptTextNode(message, node) {
  let txt = prompt(message);
  
  if (!txt || !txt.trim()) {
    return false;
  }

  node.nodeValue = txt;
  return true;
}

function log() {
  console.log('log');
}

window.onload = function() {
  // Names Scaling
  let fullname = document.getElementById('fullname');
  let nickname = document.getElementById('nickname');

  fitText(fullname);
  fitText(nickname);

  window.addEventListener('resize', function() {
    fitText(fullname);
    fitText(nickname);
  });

  // Names Changing
  fullname.getElementsByTagName('button')[0].addEventListener('click', function() {
    let changed = promptTextNode('Please enter a new fullname', fullname.getElementsByClassName('changeable')[0].firstChild);

    if (changed) {
      fitText(fullname);
    }
  });

  nickname.getElementsByTagName('button')[0].addEventListener('click', function() {
    let changed = promptTextNode('Please enter a new nickname', nickname.getElementsByClassName('changeable')[0].firstChild);

    if (changed) {
      fitText(nickname);
    }
  });

  // List Removing & Adding
  let ul = document.getElementById('talent').getElementsByTagName('ul')[0];
  let lis = ul.getElementsByTagName('li');

  for (let li of lis) {
    li.getElementsByTagName('button')[0].addEventListener('click', function() {
      li.parentNode.removeChild(li);
    });
  }

  let baseLi = lis[0].cloneNode(true);
  baseLi.getElementsByTagName('div')[0].firstChild.nodeValue = '';

  document.getElementById('add-button').addEventListener('click', function() {
    let clone = baseLi.cloneNode(true);
    let changed = promptTextNode('Please enter a new talent', clone.getElementsByTagName('div')[0].firstChild);

    if (changed) {
      clone.getElementsByTagName('button')[0].addEventListener('click', function() {
        clone.parentNode.removeChild(clone);
      });

      ul.appendChild(clone);
    }
  });

  // Background Color Picking
  let picker = document.getElementsByClassName('background-color-picker')[0].getElementsByTagName('input')[0];
  picker.addEventListener('change', function() {
    let main = document.getElementsByTagName('main')[0];
    $(main).css('background-color', picker.value);
  });
}