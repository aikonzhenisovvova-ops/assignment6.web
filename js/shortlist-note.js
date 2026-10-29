/* ===========================================================
   User journey link (contact.html): shows the treatments chosen on
   the Services page next to the enquiry form.
   Select:  #shortlist-note;  Effect: .text() + .fadeIn()
   =========================================================== */
$(function () {
  'use strict';

  var $note = $('#shortlist-note');
  if ($note.length === 0) { return; }

  var names = [];
  try { names = JSON.parse(localStorage.getItem('bellure-shortlist') || '[]'); } catch (e) { names = []; }
  if (!$.isArray(names) || names.length === 0) { return; }

  $('#shortlist-note-list').text(names.join(', '));
  $note.fadeIn(300);
});
