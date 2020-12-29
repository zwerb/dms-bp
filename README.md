# DMS - BP

_A prototype data management system for machine learning_

## Setup

## Customize

Now that you've got the code, follow these steps to get acclimated:

* `git clone https://github.com/zwerb/dms-bp.git`
* `cd dms-bp`
* `npm install`

## Create Databases

* Postgres: start Postgres Docker or install Postgres local

```
export MY_APP_NAME=dms-bp
  createdb $MY_APP_NAME
  createdb $MY_APP_NAME-test

  psql -c 'create database "dms-bp";' -U $USER postgres
```

* Create a file `secrets.js` in the project root
  * `touch secrets.js`

## OAuth

* In secrets.js:

```
process.env.GOOGLE_CLIENT_ID = 'hush hush'
process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```

## Linting

* current linter: `eslint-config-fullstack`)
* to adjust, edit: `.eslintrc.json`
  * [Standard style guide](https://standardjs.com/)
  * [Airbnb style guide](https://github.com/airbnb/javascript)
  * [Google style guide](https://google.github.io/styleguide/jsguide.html)

## Start

Running:

* `npm run start-dev` Or run wepack and server, separately:
  * `npm run build-client`
  * `npm run start-server`

## Deployment

* Edit script in `bash/deploy`

1.  To run the script:

* `git branch -d deploy`
* `npm run deploy`

## Tests and Pre-commit

Husky is installed to apply hooks to git

* before commit is executed, husky will run all scripts in:

  * client/_.spec_
  * server/_.spec_
  * script/_.spec_

* this can be edited in `.git/` hooks
