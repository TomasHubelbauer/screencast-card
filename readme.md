[![pages-build-deployment](https://github.com/TomasHubelbauer/screencast-card/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/TomasHubelbauer/screencast-card/actions/workflows/pages/pages-build-deployment)

# Screencast Card

This is a small utility web app for displaying notes while doing screencasts or
screen recordings without A/V.

The basic idea is that this web app can be bookmarked or pinned as a tab and
whenever the tab is made visible, it becomes editable and whatever title, tip or
comment can be jotted down.

Whenever the tab becomes invisible, the current note gets archived and the note
archive is stamped and displayed below on the page for historical reference and
callbacks as needed.

## Online Demo

https://tomashubelbauer.github.io/screencast-card


## Features

- Records the draft entry when the tab is left and becomes invisible
- Allows recalling archive entries for quick new drafts based off them
- Allows deleting archive entries
- Allows editing archive entries and keeps update history
- Allows deleting update history entries
- Allows exporting the whole archive as JSON

## Local Development

Open `index.html` in your browser and ensure you have your browser configured
such that ESM is usable on the `file:` protocol without giving you CORS errors.

## To-Do

### Consider storing the items in IndexedDB instead of browser local storage

I feel as though IndexedDB will be a bit more "stable"/"reliable" and will have
better performance when the number of the items grows large.

### Add multi-select `input[type=checkbox]` and mass action buttons

Add the checkbox next to the entry container to the left.

Display additional buttons next to Export Archive as multi-selection is made or
reset.
The current Export Archive button will need to be wrapped in a container to make
this possible.

Display buttons for exporting and copying just the selection, for deleting the
selected entries and for canceling the selection.

### Add Playwright E2E UI tests and run them on pre-commit and in CI

Use GitHub Actions to run Playwright in the CI.

### Add tabs for scopes to the top bar with the logo

Right now all entries are collected into a single feed / archive.
By introducing tabs for scopes, it will be possible to compartmentalize the
entries per user-defined scopes, like personal and work stuff.
The scopes should work as suffixes on the local storage key so that each scope
has its own storage.

### Make the font gradually smaller as the draft gets longer

I don't necessarily want to force the update to always be on one line, but after
certain length, it makes sense to make the font smaller.
