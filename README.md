An AngularJS-powered paycheck history/summary page.

To view, run `python -m SimpleHTTPServer` in the root directory.
View at http://localhost:8000/dashboard.html
By default, it will pull data from a remote Stage server.
To use the local test data instead,
set `mockServiceData` to true in `js/ng-app-paycheck-history/services.js`.

To build, run `cd build; ant clean build`.
The minified version will be in the `publish` directory.
View at http://localhost:8000/publish/dashboard.html
