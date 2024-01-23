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

    $ bundle exec jekyll serve --skip-initial-build

Once the application starts successfully, you should be able to access the application in your browser at `http://localhost:4000`

When you're done, shut down the application with `ctrl+c`.

### Visual Regression Testing

The repository includes [BackstopJS](https://github.com/garris/BackstopJS) to test visual changes to the site by comparing a set of reference images for different screen sizes. Anytime the CSS styles are changed, use BackstopJS to test locally:

1. Build the site and start the application using `bundle exec jekyll serve`
2. Run [Docker](https://www.docker.com/).
3. In another terminal, run the BackstopJS tests: `npm run backstop-test`.
4. Review the results in the browser and look at the diff of any failed tests.
5. To update the reference image files with the results of the last test images use: `npm run backstop-approve`. Subsequent tests will be compared against these updated reference files.
6. Commit any updated reference images to the repository so that future tests will be compared against the most recent images.

To add or update reference images, edit the scenarios in `backstop.json` and run `npm run backstop-reference`.

## Updating Data

On a periodic basis, it will be necessary to update the data contained in this site. Follow these steps to do that:
1. Create a new branch based on `development`.
2. Move or copy the updated data (which is expected to be in a single JSON file) to the `data/marc` directory.
3. Run the `split_json.py` script in the root of this repository, passing in the filename of the updated data. This will create individual records for each item in the file, and will delete the original file after it has finished.
4. Submit a pull request against the development branch. Request the review of someone on the Digital Strategies team.

## License

This code is released under an [MIT License](LICENSE).
