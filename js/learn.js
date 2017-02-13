$('#checkWord').click(function() {
wordDraw();

});

countWords();
wordDraw();

function wordDraw(){
  chrome.storage.local.get(function(data) {
    $('#learnTranslation').text();
  });
}

function countWords() {
  var counter = 0;
  chrome.storage.local.get(function(data) {
    for (x in data) {
      counter++;
    }

    return counter;
  });
}
