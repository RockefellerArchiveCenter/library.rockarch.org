 /** Displays search results in the DOM */
 function displaySearchResults(results, displayQuery, searchField) {
   if (results.length) { // Are there any results?
     var appendString = '<ul class="tile-list">'

     $.getJSON("/search_data.json", function(documents){
       for (r in results) {  // Iterate over the results
         let item = documents[results[r].ref];
         appendString +=
           `<li class="tile">
             <h2 class="tile__title">
               <a class="tile__link" href="${item.url}">${item.title}</a>
             </h2>
             <p class="tile__callnumber">${item.call_number}</p>
             <p class="tile__authors"><strong>Author(s)</strong>: ${item.author}</p>
             <p class="tile__date"><strong>Published</strong>: ${item.dates}</p>
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
