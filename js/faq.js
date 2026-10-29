/* ===========================================================
   TASK 2 — Accordion with slide effects (contact.html, FAQ)
   Select:  $('.faq-button'), the answer named by aria-controls
   Event:   click (a <button> also reacts to Enter and Space)
   Effect:  .slideDown() / .slideUp(); .stop(true, true) finishes any
            running animation first, so quick repeated clicks never
            build a long queue. aria-expanded always matches the state.
   =========================================================== */
$(function () {
  'use strict';

  var $buttons = $('.faq-button');
  if ($buttons.length === 0) { return; }

  // Without JavaScript the answers stay visible; with it they start closed.
  $('.faq-answer').removeAttr('hidden').hide();

  $buttons.on('click', function () {
    var $button = $(this);
    var $answer = $('#' + $button.attr('aria-controls'));
    var willOpen = $button.attr('aria-expanded') !== 'true';

    $button.attr('aria-expanded', String(willOpen));
    $answer.stop(true, true);
    if (willOpen) { $answer.slideDown(250); } else { $answer.slideUp(250); }
  });
});
