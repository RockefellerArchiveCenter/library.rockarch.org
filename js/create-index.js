const path = require("path");
var lunr = require('lunr')
var fs = require('fs');
var data;

buildIndex();

function buildIndex() {
  /** Constructs a lunr index from search_data.json and saves it as search_index.json */
  fs.readFile(path.resolve(__dirname, '../_site/search_data.json'), 'utf8', function(err, data) {
      if (err) throw err;
      documents = JSON.parse(data);

      var idx = lunr(function() {
          this.ref('ref')
          this.field('url')
          this.field('title')
          this.field('author')
          this.field('subject')
          this.field('notes')
          this.field('call_number')

          for (doc in documents) {
              this.add(documents[doc])
          }
      })

      fs.writeFile(path.resolve(__dirname, '../_site/search_index.json'), JSON.stringify(idx), (err) => {
          if (err) throw err;
          console.log('New index file created.');
      });

  });

}
