/* ===========================================================
   TASK 1 (part) — Personalised welcome message (index.html)
   Select:  #welcome-form, #visitor-name, #welcome-message
   Events:  submit (button or Enter) and input (typing)
   Effect:  .val() reads the name, $.trim() removes outer spaces,
            .text() writes the greeting (never .html(), so typed
            HTML is shown as plain text), .addClass()/.removeClass()
            switch the error state.
   =========================================================== */
$(function () {
  'use strict';

  var $form = $('#welcome-form');
  var $input = $('#visitor-name');
  var $message = $('#welcome-message');
  if ($form.length === 0) { return; }

  $form.on('submit', function (event) {
    event.preventDefault();
    var name = $.trim($input.val());

    if (name === '') {
      $message.text('Please type your name first, for example “Aigerim”.')
              .addClass('is-error');
      $input.attr('aria-invalid', 'true').trigger('focus');
      return;
    }

    $message.text('Welcome to Bellure Clinic, ' + name + '! We are glad you are here.')
            .removeClass('is-error');
    $input.removeAttr('aria-invalid');
  });

  // Typing again clears an old error so the page never shows stale state.
  $input.on('input', function () {
    if ($message.hasClass('is-error')) {
      $message.text('').removeClass('is-error');
      $input.removeAttr('aria-invalid');
    }
  });
});
