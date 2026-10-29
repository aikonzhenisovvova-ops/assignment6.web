/* ===========================================================
   TASK 4 (part) — Treatment shortlist (services.html)
   Select:  .shortlist-btn on every card, #shortlist (the list),
            #shortlist-count, #shortlist-empty, #shortlist-status
   Events:  DELEGATED click handlers: .on('click', selector, fn) on a
            fixed parent, so buttons on items added later also work.
   Effect:  items are built with $('<li>') and .text() (no raw HTML),
            the count is recalculated after every change, an empty-state
            message appears when the list is empty, and a status message
            uses .fadeIn() / .delay() / .fadeOut() (Task 2, second effect).
            The list is kept in localStorage so contact.html can show it.
   =========================================================== */
$(function () {
  'use strict';

  var $list = $('#shortlist');
  if ($list.length === 0) { return; }

  var $count = $('#shortlist-count');
  var $empty = $('#shortlist-empty');
  var $status = $('#shortlist-status');
  var $actions = $('#shortlist-actions');
  var KEY = 'bellure-shortlist';
  var names = [];

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(names)); } catch (e) { /* ignore */ }
  }

  function say(text) {
    // The text stays in a live region; it fades out only after being shown.
    $status.stop(true, true).text(text).fadeIn(200).delay(2200).fadeOut(400);
  }

  function refresh() {
    $count.text('Treatments in your shortlist: ' + names.length);
    $empty.toggle(names.length === 0);
    $actions.toggle(names.length > 0);
    $('.shortlist-btn').each(function () {
      var $btn = $(this);
      var name = $btn.closest('.treatment-card').find('h3').text();
      var added = $.inArray(name, names) !== -1;
      $btn.text(added ? 'Added ✓' : 'Add to shortlist')
          .attr('aria-pressed', String(added))
          .toggleClass('is-added', added);
    });
  }

  function addItem(name) {
    var $li = $('<li>').attr('data-name', name);
    $('<span>').text(name).appendTo($li);                       // .text(): safe
    $('<button type="button">')
      .addClass('btn btn-outline btn-small remove-item')
      .text('Remove')
      .attr('aria-label', 'Remove ' + name + ' from shortlist')
      .appendTo($li);
    $list.append($li);
  }

  function remove(name) {
    var index = $.inArray(name, names);
    if (index === -1) { return; }
    names.splice(index, 1);
    $list.children().filter(function () { return $(this).attr('data-name') === name; }).remove();
    save();
    refresh();
  }

  // Delegated: works for items created after page load.
  $list.on('click', '.remove-item', function () {
    var name = $(this).closest('li').attr('data-name');
    remove(name);
    say('Removed ' + name + ' from your shortlist.');
    $('#shortlist-heading').trigger('focus');
  });

  $(document).on('click', '.shortlist-btn', function () {
    var name = $(this).closest('.treatment-card').find('h3').text();
    if ($.inArray(name, names) !== -1) {
      remove(name);
      say('Removed ' + name + ' from your shortlist.');
      return;
    }
    names.push(name);
    addItem(name);
    save();
    refresh();
    say('Added ' + name + ' to your shortlist.');
  });

  $('#shortlist-clear').on('click', function () {
    names = [];
    $list.empty();
    save();
    refresh();
    say('Shortlist cleared.');
  });

  // Restore a saved list.
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || '[]');
    if ($.isArray(saved)) {
      $.each(saved, function (i, name) {
        if (typeof name === 'string' && $.inArray(name, names) === -1) {
          names.push(name);
          addItem(name);
        }
      });
    }
  } catch (e) { /* ignore a damaged value */ }
  refresh();
});
