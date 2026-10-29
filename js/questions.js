/* ===========================================================
   TASK 4 (part) — "Questions for your doctor" (about.html)
   Select:  #question-form, #question-input, #question-list, ...
   Events:  submit on the form; DELEGATED click on .remove-item
   Effect:  empty / spaces-only text is rejected with a message;
            otherwise a new <li> is built with .text() and appended;
            Remove deletes only its own item; the counter and the
            empty-state note are recalculated after every change.
   =========================================================== */
$(function () {
  'use strict';

  var $form = $('#question-form');
  var $input = $('#question-input');
  var $list = $('#question-list');
  var $count = $('#list-count');
  var $empty = $('#list-empty');
  var $error = $('#question-error');
  if ($form.length === 0) { return; }

  function refresh() {
    var total = $list.children().length;
    $count.text('Questions in your list: ' + total);
    $empty.toggle(total === 0);
  }

  function showError(text) {
    $error.text(text).show();
    $input.attr('aria-invalid', 'true');
  }

  function clearError() {
    $error.text('').hide();
    $input.removeAttr('aria-invalid');
  }

  $form.on('submit', function (event) {
    event.preventDefault();
    var text = $.trim($input.val());

    if (text === '') {
      showError('Please type a question before adding it.');
      $input.trigger('focus');
      return;
    }

    clearError();
    var $li = $('<li>');
    $('<span>').text(text).appendTo($li);
    $('<button type="button">')
      .addClass('btn btn-outline btn-small remove-item')
      .text('Remove')
      .attr('aria-label', 'Remove question: ' + text)
      .appendTo($li);
    $list.append($li);
    refresh();
    $input.val('').trigger('focus');
  });

  // Delegated: also works for items added after the page loaded.
  $list.on('click', '.remove-item', function () {
    $(this).closest('li').remove();
    refresh();
    $input.trigger('focus');
  });

  $input.on('input', clearError);
  refresh();
});
