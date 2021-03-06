### Filtering Matches Web

The Filtering Matches Web provides web app to find and filter matches using `filtering-matches-api`.

#### Build Commands

- `./build.sh` build application and docker images.
- `./build.sh clean` delete build files and docker images.

#### Tests

- `./build.sh test` run unit tests.
- `./build.sh e2e` run end-to-end tests.

Note: Frontend/UI tests don't work yet.

#### API Commands

- `./build.sh start` start the app. After starting open http://localhost:4200/ in your favorite browser.
- `./build.sh stop` stop the app.
- `docker-compose logs --follow` follow the logs.

#### ToDo

- "See Location" button on the bottom of each match will open a map showing the location of the contact, instead of the actual coordinates.
- The UX of the match card in the results has to be improved.
- The results could be implemented as a map showing the location of all matches and show the details when click on it.
