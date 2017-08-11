# What is this project for?

It's a really quick start for **LOCAL** development of ReactJS (with Server Side Rendering) + Drupal 8 applications.

As the result of configuration, you'll get:
- Working and ready for development ReactJS application
- Working and ready for development Drupal 8 application
- UI to access Drupal database
- UI to access all emails rerouted from php (apart from emails sent through SMTP)

# Advantages of this project

- You don't need to have `composer`, `npm` or `yarn` installed locally. Everything is being done though Docker containers.
- You don't depend on versions of `composer`, `npm` or `yarn` installed at dev environments of your team members.
- Docker configuration for Drupal is based on [docker4drupal](http://docker4drupal.org) containers. It provides very good flexibility for Docker-based local development. If you need more containers (i.e. for `memcached`, `redis`, `solr`, etc) - just check out what they offer.
- Drupal configuration is based on [drupal-composer/drupal-project](https://github.com/drupal-composer/drupal-project) project which provides best dev experience in working with Drupal through `composer`.
- ReactJS application created based on [Next.js 3.0](https://zeit.co/blog/next3).
- Human readable local host names. No more ugly `localhost:PORT` stuff.

# Dependencies

All you need to have is [Docker](https://docs.docker.com/engine/installation/) and [Docker Compose](https://docs.docker.com/compose/install/) installed. That's it.

# Hosts

At the end of configuration journey you'll get the following hosts available:

| URL                                    | Name                |
| -------------------------------------- | ------------------- |
| http://app.docker.localhost            | ReactJS application |
| http://drupal.docker.localhost         | Drupal 8            |
| http://pma.drupal.docker.localhost     | PhpMyAdmin          |
| http://mailhog.drupal.docker.localhost | Mailhog             |

# Getting started

1. Download this repo to your local machine:

    ```
    git clone git@github.com:bigbox-dev/development-quickstart.git
    ```

2. Bootstrap Docker containers listed in `docker-compose.yml` file:

    ```
    docker-compose up -d
    ```

    During the process all necessary containers will be downloaded.
    As well as that, `yarn install` will be invoked to build ReactJS dependencies inside of Docker container.
    This process may take 1-2 minutes.
    It means that `http://app.docker.localhost/` will not be reachable until that (you'll see nginx error).

    You DON'T need to have `npm` or `yarn` installed locally.

3. Version of Drupal core and modules may be outdated by the time you clone this repo.
   So execute the following command to bring the core and modules up to date:

    ```
    docker-compose run php composer update --with-dependencies --verbose
    ```

    Drupal was initialized based on [Drupal Project](https://github.com/drupal-composer/drupal-project).
    Check it out for development guideline.

    You DON'T need to have `composer` installed locally.
    
4. Version of npm packages may be outdated by the time you clone this repo.
   You should bring them all up to date with this command:
   
   ```
   docker-compose run node yarn upgrade
   ```

5. It's all done now! You may try accessing any host listed in the `Hosts` section of this manual. 

6. As the final step you'd probably want to commit everything to your own repository.
    Feel free to drop `.git` folder in the project root and initialize it with your git settings. 

    As soon as this is done it's safe to run `git add -A` and commit everything what's been added.
    All files which should be ignored by git already specified in proper `.gitignore` files.

## CLI to work with ReactJS application

To access all `npm` and `yarn` commands you can simply run shell inside of `node` Docker container:

```
docker-compose run node sh
```

Then use `npm` or `yarn` CLI as usual. For example, add a new package:

```
yarn add lodash
```

All you'll need to commit is the change to `package.json` and `package.json` files.

## CLI to work with Drupal application

To access CLI to manage Drupal, run shell inside of `php` Docker container:

```
docker-compose run php sh
```

Then run any command you need. It's possible to use `composer`, `drush`, `drupal`.

If you want to run a single command inside of the container then you don't have to run shell first. Just do it this way:

```
docker-compose run php composer require drupal/devel:~1.0
```

After that commit resulting `composer.json` and `composer.lock` files.

Note that Drush and Drupal Console have to be invoked inside of `web` folder, so you'll have to `cd web` first.

Alternatively, you might use the following command to run `drush` or `drupal` CLI outside of Docker container:
 
```
docker-compose run php drush --root="./web/" <COMMAND>
```

If this command seems to be too long to type every time, consider adding it to the list of your bash aliases:
 
```
alias dockerdrush=docker-compose run php drush --root="./web/"
```

Then you'll be able to do something like this:

```
dockerdrush cr
```
