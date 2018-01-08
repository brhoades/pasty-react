# Contributing

## What needs to be done?
Take a look at [active issues](https://github.com/brhoades/pasty-react/issues) for this
project. These outstanding items may be large in scope; if you're interested in assisting,
ask for a better description.

Alternatively add features you think are missing. Open an issue before doing
a lot of work; I would hate to encourage forking because of difference in vision.

## Developing
Follow installation instructions on the [README](README.md). You can run a devserver
with:

```
yarn run devserver
```

Which can then be accessed by following the link it provides. It will automatically
update with changes you make.

## Submitting a Pull Request

Fork, then clone the repo:

    $ git clone git@github.com:yourusername/pasty-react.git

Set up your machine:

    $ yarn install
    $ cp config.example.ts config.ts

Make sure the linting passes:

    $ yarn lint

Make your change. Test your change. Check linting again. Afterwards, update
[CHANGELOG](CHANGELOG.md). If a NEXT heading doesn't exist, add one.

Squash your commits and push to your fork, [submit a pull request][https://github.com/brhoades/pasty-react/compare]. Make sure tests pass on your PR; if they do not, fix them before the PR will be considered.
