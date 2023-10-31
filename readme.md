# Screencast Card

This is a small utility web app for displaying notes while doing screencasts or
screen recordings without A/V.

The basic idea is that this web app can be bookmarked or pinned as a tab and
whenever the tab is made visible, it becomes editable and whatever title, tip or
comment can be jotted down.

Whenever the tab becomes invisible, the current note gets archived and the note
archive is stamped and displayed below on the page for historical reference and
callbacks as needed.

The web app offers the ability to recall or delete individual entries or to
export the whole archive as JSON.

## Online Demo

The application is not live anywhere, yet.

## Local Development

Open `index.html` in your browser and ensure you have your browser configured
such that ESM is usable on the `file:` protocol without giving you CORS errors.

## To-Do

### Deploy the application to GitHub Pages and update the repo and readme URLs

Also add proper repository description and clean up the other metadata.

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
