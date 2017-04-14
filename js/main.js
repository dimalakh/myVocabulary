var currentEntry = null;

function init(entry) {
  $('#write').click(write);
  $('#diction').click(diction);
  $('#learn').click(learn);
  chrome.runtime.getBackgroundPage(function(bg) {
    if (bg.entryToLoad)
      loadEntry(bg.entryToLoad);
  });
  output();
}


function output(){
  chrome.storage.sync.get(function(data) {
    var counter = 0;
    for(x in data){
      counter++;
      $('tbody').append("<tr><td>" + counter + "</td><td>"+ data[x].word + "</td><td>" + data[x].translation + "</td></tr>")
    }
  });

}

var Word = {
  word: 'text',
  translation: 'text'
}

function diction(){
  chrome.runtime.sendMessage({page: 'diction'});
}
function learn(){
  chrome.runtime.sendMessage({page: 'learn'});
}

function write(){
  var item = {};
  var obj = Object.create(Word);
  var word = $('#word').val();
  var translation = $('#translation').val();
  obj.word = word;
  obj.translation = translation;
  item[word] =  obj;

  chrome.storage.sync.set(item, function() {
    $('tbody').empty();
    output();
    $('.cookie.nag')
      .nag('show')
    ;
  });
}

$(document).ready(init);
