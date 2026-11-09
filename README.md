# MyPlaylist

**Course:** Web Technologies  
**Project:** Endterm Project  
**Topic:** Music playlist website for browsing songs, artists, and albums  
**Group:** IT-2513

## Team Members

- Yermek Tuzelkhan
- Yerassyl Nauryzgali
- Kaussar Meyrambekkyzy

## Project Overview

MyPlaylist is a responsive music website that brings a collection of songs, artists, and albums together in one place. It has five pages: Home, Songs, Albums, Artists, and About. Visitors can browse the collection, find tracks by song title or artist, and follow listening links from the playlist.

For the endterm, we added JavaScript and jQuery features to the existing website. Visitors can search and filter the playlist without reloading the page, manage songs in a dynamic table, open album images in a lightbox, and try a registration form with live validation.

## Implemented Features

- **Live search and genre filters.** The Songs page updates results as visitors type. Search works with uppercase and lowercase letters and can be combined with the selected genre.
- **Playlist management.** Visitors can add a song, view the playlist, edit an existing entry, and delete a song after confirming the action. The table updates immediately. Playlist changes last until the page is reloaded.
- **Registration form validation.** The About page checks required fields and validates the email format using a regular expression. It also shows password strength as weak, medium, or strong and checks that both passwords match. The form displays feedback as visitors type and blocks invalid submissions.
- **Interactive album gallery.** Clicking an image on the Albums page opens an enlarged view. Previous and Next buttons let visitors move between images, and jQuery fade effects animate the transitions.
- **Responsive layout.** Bootstrap and custom CSS adapt the navigation, cards, forms, and table for different screen sizes.

## Technologies Used

- HTML5 for page structure and forms
- CSS3 and Bootstrap 5 for styling and responsive layouts
- JavaScript and jQuery for search, filters, table updates, form validation, and gallery interactions
- GitHub Pages for publishing the website

## Individual Contributions

- **Yermek Tuzelkhan** developed the dynamic playlist table and the add, edit, and delete actions. He integrated the endterm scripts into the website, tested the playlist workflow, and updated the project documentation.
- **Yerassyl Nauryzgali** developed the live song and artist search and the genre filters. He connected both controls to the playlist table and worked on the responsive layout of the Songs page.
- **Kaussar Meyrambekkyzy** developed the registration form validation, including email checks, password strength, and password confirmation. She also worked on the album lightbox, image navigation, and fade transitions.

## Published Website

[Open MyPlaylist](https://ytuzelkhan.github.io/MyPlaylist-endterm/)