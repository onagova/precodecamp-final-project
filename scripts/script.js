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

window.onload = function() {
  this.fitText(document.getElementById('fullname'));
  this.fitText(document.getElementById('nickname'));
}

window.addEventListener('resize', function() {
  this.fitText(document.getElementById('fullname'));
  this.fitText(document.getElementById('nickname'));
});