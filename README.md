# RAC Library Discovery Catalog System

A web application which provides the front-end user interface for the online discovery of bibliographic materials at the Rockefeller Archive Center.

## Dependencies

* [Python](https://www.python.org/downloads/) (Tested on 3.7.)
* [Ruby 2.5.0](https://www.ruby-lang.org/en/) or higher
* [Jekyll 4.1.1](https://jekyllrb.com/) or higher
* [Node.js 12.18.3](https://nodejs.org/en/) or higher

## Local Development

Install [git](https://git-scm.com/) and clone the repository

    $ git clone https://github.com/RockefellerArchiveCenter/library_discovery.git

Install Node.js dependencies listed in `package.json`. From the project's root run

    $ npm install

Build the site. From the project's root directory run

    $ ./script/build

The `build` script bundles four commands into a single bash script
  * `script/make_pages.py` takes ArchivesSpace `json` files from `_data/resources` and makes corresponding items pages.
  * `bundle exec jekyll build` builds the initial Jekyll `_site` directory which can be served
  * `node js/create-index.js` creates an initial search index based on the data currently in the site. Users will have to recreate the search index on every new build, as rebuilding will destroy the old search index.
  * `bundle exec htmlproofer ./_site` will only run automatically in TravisCI builds. Validates HTML output with [htmlproofer](https://www.rubydoc.info/gems/html-proofer/1.3.0).

Start the application locally from the project's root with

    $ bundle exec jekyll serve

Once the application starts successfully, you should be able to access the application in your browser at `http://localhost:4000`

When you're done, shut down the application with `ctrl+c`.

## License

This code is released under an [MIT License](LICENSE).
