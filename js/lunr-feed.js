$(document).ready(function() {

  function displaySearchResults(results, query, category) {
    $('#results').empty().hide();
    if (results.length) { // Are there any results?
      // return unordered list instead of table
      var appendString = '<ul class="list--unstyled">'

      $.getJSON("search_data.json", function(documents){
        for (r in results) {  // Iterate over the results
          let item = documents[results[r].ref];
          appendString += `<li><p class="lead mb-1"><a href="${item.url}">${item.title}</a><small>${item.call_numbers}</small><p><small>${item.agents}</small></p></li>`;
        }
        appendString += '</ul>'
        $('#results').append(appendString);
      });
    }
    $('#results').prepend(`<p><span class="badge badge-secondary">${results.length}</span> result(s) for <span class="badge badge-secondary">${query}</span> in ${searchType}</p>`).fadeIn(200);
  }

  function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  let searchTerm = getQueryVariable('query');
  let searchType = getQueryVariable('type');

  if (searchTerm) {
    $('#results').empty().append('<img class="mx-auto d-block" src="/img/loading.gif" />')
    $('#query').attr("value", searchTerm);

    $.getJSON("search_index.json", function(data){
      let index = lunr.Index.load(data)

      let results = index.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, searchTerm);

    });

  }

});
