# Getting Started with Retro Cinema (server side)

Clone the project (client side) from [GitHub](https://github.com/thTs0ustas/groupProjectTeam2s.git).\
Start with `npm install`.
Create a .env file in the root directory with the following contents:

    NODE_ENV=development
    ACCESS_TOKEN_SECRET=adbeac3d07bfa5317dd668ddd875b73ae1a41b9c5f5aa4340eb347947cd3642dfec38b83e8a7b01a183830d0a38ff4ec6523e47156cb6ade65e7f55ae0d9a1c5
    REFRESH_TOKEN_SECRET=06a25d76a98d08c188e9788e0f59378ad39af1a4644193b4861c1183c016d82dc52efeb47611880bb9cf178e67b299a0043f8a3a6c70ecaca507e9b832c1ec2a
    STRIPE_PRIVATE_KEY=sk_test_51KjJZgDnQQ5V5FrVxXS3YBnJz5yjEZyZKzSVijvQq84KlOBafGeL9Emh84VUulrYKWMZFHvjKYzHzEXTgKkF7Ul200LrTX5V62

Then run `npm start`.\

And prepare to be amazed again by the awesomeness of the project.

## Database

Change the `config.json` file in the config folder to use your own database.

`npx sequelize db:create retro_cinema` to create the database.\
`npx sequelize db:migrate` to run the migrations.\

cd into the `data` directory and run `node migrateMovieTable.js`.\

Import the moviesOfTheMonth csv file from the `data/moviesOfTheMonth.csv` file to MySQL workbench.\

Import the screenings csv file from the `data/screenings.csv` file to MySQL workbench.

Create your own tables for cinemas, auditoriums, user and seats. (for seats you can use the seats.json file in the data folder).

## Modules and Packages

1. [express](https://expressjs.com/en/api.html)
2. [body-parser](https://www.npmjs.com/package/body-parser)
3. [morgan](https://www.npmjs.com/package/morgan)
4. [moment](https://www.npmjs.com/package/moment)
5. [dotenv](https://www.npmjs.com/package/dotenv)
6. [axios](http://www.axios-js.com/)
7. [stripe](https://stripe.com/docs/api)
8. [lodash](https://lodash.com/)
9. [bcrypt](https://www.npmjs.com/package/bcrypt)
10. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
11. [cors](https://www.npmjs.com/package/cors)
12. [sequelize](https://sequelize.org/)
13. [mysql2](https://www.npmjs.com/package/mysql2)
14. [nodemon](https://www.npmjs.com/package/nodemon)

## Endpoints

    /admin
        /:username/getUsers -- authenticate, isAdminCheck
        /:username/getMovies -- authenticate, isAdminCheck
        /:username/getMoviesNotPlaying -- authenticate, isAdminCheck
        /:username/getMoviesOfTheMonth -- authenticate, isAdminCheck
        /:username/getScreenings -- authenticate, isAdminCheck
        /update/movie/:id -- authenticate, isAdminCheck
        /update/user/:id -- authenticate, isAdminCheck
        /update/screening/:id -- authenticate, isAdminCheck
        /:username/screening/create -- authenticate, isAdminCheck
        /:username/movie/create -- authenticate, isAdminCheck
        /:username/movieOfTheMonth/create -- authenticate, isAdminCheck
        /:username/screening/delete/:id -- authenticate, isAdminCheck
        /:username/movieOfTheMonth/delete/:id -- authenticate, isAdminCheck
        /:username/user/delete/:id -- authenticate, isAdminCheck
    /movies
        /
        /:title
        /genre/:genre
        /moviepage/:id
    /moviesOfTheMonth
        /
        /homepageLayout
        /upcoming
        /showingNow
        /reservation/:id
    /users
        / -- authenticate, isAdminCheck
        /:id -- authenticate
        /create
        /logout -- authenticate
        /guest
        /login
        /create/check
        /update/:id
    /screening
        /
        /:id
        /:movieTitle
        /add
    /reservations
        /users/:id
        /users/:id/all
        /screenings/:id
        /users/:username/new
        /users/:username/ticket/:reservationId
        /history/:id
    /cinema
        /
        /add
        /:id/update
    /auditorium
        /
        /add
    /seat
        /:auditorium_id"
        /add/:aud_id
    /reservedSeat
        /:screening_id
        /add
    /payments
        /create-checkout - authenticated
        /create-subscription

Enjoy!
