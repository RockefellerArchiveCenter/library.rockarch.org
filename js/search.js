 /** Displays search results in the DOM */
 function displaySearchResults(results, displayQuery, searchField) {
   if (results.length) { // Are there any results?
     var appendString = '<ul class="card-list">'

     $.getJSON("/search_data.json", function(documents){
       for (r in results) {  // Iterate over the results
         let item = documents[results[r].ref];
         appendString +=
           `<li class="card">
              <div class="card__body">
                <h2 class="card__title"><a href="${item.url}">${item.title}</a></h2>
                <p class="card__body-text"><span class="text--bold">Call Number</span>: ${item.call_number}</p>
                <p class="card__body-text"><span class="text--bold">Author(s)</span>: ${item.author}</p>
                <p class="card__body-text"><span class="text--bold">Published</span>: ${item.dates}</p>
              </div>
           </li>`;
       }
       appendString += '</ul>'
       $(".results__list").append(appendString);
     });
   }
   $(".results__list").prepend(`
     <h1 class="results__summary">
       ${results.length ? results.length : 0} ${results.length === 1 ? "result" : "results" } for "${displayQuery}" in ${searchField ? searchField : "all fields"}
     </h1>`)
 }

$(document).ready(function() {

  $.getScript("/js/search_helpers.js", function() {

    const query = window.location.search.substring(1);
    const searchTerm = getQueryVariable(query, 'query');
    const searchField = getQueryVariable(query, 'field');

    if (searchTerm) {
      $(".results__list, .results__loading").addClass("is-loading")
      $("#query").attr("value", searchTerm);
      $("#field").val(searchField);

      const queryTerms = searchTerm.trim().toLowerCase().split(" ");
      const parsedQuery = queryTerms.map(t => (
        preProcessQueryTerm(t, searchField)
      )).filter(e => (e != null)).join(" ")

      $.getJSON("/search_index.json", function(data){
        const index = lunr.Index.load(data)
        const results = index.search(parsedQuery);
        displaySearchResults(results, searchTerm, searchField);
        $(".results__list, .results__loading").removeClass("is-loading");
      });
    }

  })

});
