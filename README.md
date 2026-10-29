# Bellure Clinic — Team Website (final version)

**Assignment #6 — jQuery and Completed Website** · Group MT-2504

**Purpose:** website of a fictional medical cosmetology clinic in Astana: browse treatments, filter them, shortlist the ones you like, and send a validated (demonstration) enquiry.
**Live website:** https://aikonzhenisovvova-ops.github.io/bellure.clinic3/
**Repository:** https://github.com/aikonzhenisovvova-ops/bellure.clinic3

## Team

| Member | GitHub | Main pages |
|---|---|---|
| Nurakysheva Ayaulym | `aikonzhenisovvova-ops` | `index.html`, `register.html` |
| Bekbolat Adina | `adinabek` | `services.html` |
| Nazymkyzy Aizada | `Aizzadamsn` | `about.html` |
| Khabibullina Aigerim | `aigerim-kh` | `contact.html` |

## How to open

Extract the ZIP and open `index.html` in any browser (or publish the folder with GitHub Pages). No server, build step or internet is needed: jQuery 3.7.1 and Bootstrap 5.3.3 CSS are stored in `vendor/`.

## jQuery feature map

jQuery is loaded first (`vendor/jquery/jquery-3.7.1.min.js`), then the project scripts, all with `defer`. Every script starts with `$(function () { ... })`, uses `.on()` only, and there are no inline event attributes.

| Task | Page | Script | Events | Main jQuery methods |
|---|---|---|---|---|
| 1 Welcome message | `index.html` | `js/welcome.js` | `submit`, `input` | `.val()`, `$.trim()`, `.text()`, `.addClass()`, `.removeClass()` |
| 1 Light / dark theme | every page | `js/theme.js` | `click` | `.toggleClass()`, `.hasClass()`, `.text()`, `.attr()` |
| 2 FAQ accordion | `contact.html` | `js/faq.js` | `click` (Enter / Space) | `.slideDown()`, `.slideUp()`, `.stop(true, true)`, `.attr('aria-expanded')` |
| 2 Fading status message | `services.html` | `js/shortlist.js` | `click` | `.fadeIn()`, `.delay()`, `.fadeOut()` |
| 3 Search + category filter | `services.html` | `js/filter.js` | `input`, `click` | `.each()`, `.data()`, `.toggle()`, `.text()`, `.prop()` |
| 4 Treatment shortlist | `services.html` | `js/shortlist.js` | delegated `click` | `.on('click', selector, fn)`, `$('<li>')`, `.append()`, `.remove()`, `.text()` |
| 4 Questions for the doctor | `about.html` | `js/questions.js` | `submit`, delegated `click` | same as above |
| 5 Form validation | `contact.html`, `register.html` | `js/forms.js` | `submit`, `blur`, `input`, `change`, `reset` | `.val()`, `.addClass()`, `.removeClass()`, `.text()`, `.fadeIn()`, `.fadeOut()` |

## User journey

`index.html` → **Services**: search, pick a category, press "Add to shortlist" → **Contact**: the shortlist is shown above the form → fill in the enquiry; invalid data shows field errors, valid data shows a confirmation.

## Frontend-only limits

No backend exists. The contact and registration forms only check the entries in the browser and are labelled as demonstrations; nothing is sent, booked or stored. The shortlist is saved only in this browser (`localStorage`).

## Structure

```
index.html  services.html  about.html  contact.html  register.html
css/     style.css  responsive.css  forms.css  features.css
js/      theme.js  welcome.js  faq.js  filter.js  shortlist.js  questions.js  shortlist-note.js  forms.js
vendor/  jquery/  bootstrap/
images/  fonts/
```

## Contributions

Fill in before submission from the repository history (`git shortlog -sn`): see the contribution table in the report.
