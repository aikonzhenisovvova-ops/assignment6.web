/* ===========================================================
   TASK 1 (part) — Light / dark theme (every page)
   Select:  $('#theme-toggle') and $('body')
   Event:   click, attached with .on()
   Effect:  .toggleClass('dark-theme') on <body>; .text() updates the
            button so it always names the NEXT action; aria-pressed
            mirrors the state. The choice is kept in localStorage.
   =========================================================== */
$(function () {
  'use strict';

  var $button = $('#theme-toggle');
  var $body = $('body');
  var KEY = 'bellure-theme';
  if ($button.length === 0) { return; }

  function render() {
    var isDark = $body.hasClass('dark-theme');
    $button.text(isDark ? 'Switch to light theme' : 'Switch to dark theme')
           .attr('aria-pressed', String(isDark));
  }

  try {
    if (localStorage.getItem(KEY) === 'dark') { $body.addClass('dark-theme'); }
  } catch (e) { /* storage blocked: start light */ }
  render();

  $button.on('click', function () {
    $body.toggleClass('dark-theme');
    render();
    try {
      localStorage.setItem(KEY, $body.hasClass('dark-theme') ? 'dark' : 'light');
    } catch (e) { /* ignore */ }
  });
});
