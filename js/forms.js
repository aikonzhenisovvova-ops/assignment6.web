/* ===========================================================
   TASK 5 — Form validation with jQuery (contact.html, register.html)
   Select:  form[data-validate], its .form-control / .form-select fields
   Events:  submit (preventDefault), blur, input, change, reset
   Rules:   read from the HTML attributes (required, type="email",
            minlength, maxlength) plus data-match for password confirmation.
   Effect:  .val() + $.trim() read the value; .addClass()/.removeClass()
            toggle Bootstrap's .is-valid / .is-invalid; .text() writes a
            field-specific message; the demonstration message uses
            .fadeIn() / .fadeOut(). Invalid data never shows success.
   Nothing is sent anywhere: the result is labelled as a demonstration.
   =========================================================== */
$(function () {
  'use strict';

  var EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function msg($field, key, fallback) {
    return $field.attr('data-msg-' + key) || fallback;
  }

  // Returns an error text, or '' when the value is acceptable.
  function getError($field) {
    var value = $field.val();
    var trimmed = $.trim(value);
    var el = $field[0];

    if ($field.prop('required') && trimmed === '') {
      return msg($field, 'missing', 'This field is required.');
    }
    if (trimmed === '') { return ''; }

    if ($field.attr('type') === 'email' && !EMAIL_SHAPE.test(value)) {
      return msg($field, 'type', 'Enter an email address like name@example.com.');
    }
    if (el.minLength > 0 && trimmed.length < el.minLength) {
      return msg($field, 'short', 'Enter at least ' + el.minLength + ' characters.');
    }
    if (el.maxLength > 0 && value.length > el.maxLength) {
      return msg($field, 'long', 'Use no more than ' + el.maxLength + ' characters.');
    }
    var otherId = $field.attr('data-match');
    if (otherId && value !== $('#' + otherId).val()) {
      return msg($field, 'match', 'The two values do not match.');
    }
    return '';
  }

  function clearState($field) {
    $field.removeClass('is-valid is-invalid').removeAttr('aria-invalid');
    $field[0].setCustomValidity('');
  }

  // Validates one field, updates its look, returns true when it is fine.
  function check($field) {
    var error = getError($field);
    var $feedback = $field.parent().find('.invalid-feedback').first();
    $field[0].setCustomValidity(error);

    if (!error && $.trim($field.val()) === '' && !$field.prop('required')) {
      clearState($field);                       // optional and empty: neutral
      return true;
    }
    if (error) {
      $field.removeClass('is-valid').addClass('is-invalid').attr('aria-invalid', 'true');
      $feedback.text(error);
    } else {
      $field.removeClass('is-invalid').addClass('is-valid').removeAttr('aria-invalid');
      $feedback.text('');
    }
    return !error;
  }

  function isMarked($field) {
    return $field.hasClass('is-valid') || $field.hasClass('is-invalid');
  }

  $('form[data-validate]').each(function () {
    var $form = $(this);
    var $fields = $form.find('.form-control, .form-select');
    var $success = $form.parent().find('[data-success]').first();
    var $counters = $form.find('[data-count-for]');

    function updateCounters() {
      $counters.each(function () {
        var $counter = $(this);
        var $target = $('#' + $counter.attr('data-count-for'));
        $counter.text($target.val().length + ' / ' + $target[0].maxLength);
      });
    }

    function hideSuccess() {
      if (!$success.hasClass('d-none')) {
        $success.stop(true, true).fadeOut(200, function () { $success.addClass('d-none'); });
      }
    }

    $fields.on('blur change', function () { check($(this)); });

    $fields.on('input', function () {
      var $field = $(this);
      if (isMarked($field)) { check($field); }
      // Re-check a field that depends on this one (password confirmation).
      $fields.filter('[data-match="' + this.id + '"]').each(function () {
        if (isMarked($(this))) { check($(this)); }
      });
      updateCounters();
    });

    $form.on('submit', function (event) {
      event.preventDefault();                   // demo only: never leave the page
      var $firstInvalid = null;

      $fields.each(function () {
        if (!check($(this)) && $firstInvalid === null) { $firstInvalid = $(this); }
      });

      if ($firstInvalid !== null) {
        hideSuccess();
        $firstInvalid.trigger('focus');
        return;                                 // invalid data: no success message
      }

      if ($success.length) {
        $success.find('[data-greet-slot]').text($.trim($form.find('[data-greet]').val()));
        $success.stop(true, true).removeClass('d-none').hide().fadeIn(300).trigger('focus');
      }
    });

    $form.on('reset', function () {
      $fields.each(function () { clearState($(this)); });
      hideSuccess();
      setTimeout(updateCounters, 0);            // values are emptied right after this event
    });

    updateCounters();
  });
});
