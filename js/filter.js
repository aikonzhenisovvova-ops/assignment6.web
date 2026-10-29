/* ===========================================================
   TASK 3 — Search + category filter (services.html)
   Select:  #treatment-search, .filter-btn, .treatment-card,
            #search-count, #no-results, #clear-filters
   Events:  input on the search field, click on category buttons
   Effect:  one function, applyFilters(), reads BOTH controls, so the
            search text and the category always work together.
            $.trim() + .toLowerCase() ignore spaces and letter case;
            .toggle(bool) shows / hides cards; .text() writes the
            counter and the "No results found" message.
   =========================================================== */
$(function () {
  'use strict';

  var $input = $('#treatment-search');
  var $cards = $('.treatment-card');
  var $buttons = $('.filter-btn');
  var $count = $('#search-count');
  var $none = $('#no-results');
  var $sections = $('[data-searchable]');
  var $clear = $('#clear-filters');
  if ($input.length === 0) { return; }

  var category = 'all';

  function applyFilters() {
    var query = $.trim($input.val()).toLowerCase();
    var shown = 0;

    $cards.each(function () {
      var $card = $(this);
      var text = ($card.find('h3').text() + ' ' + $card.find('p').first().text()).toLowerCase();
      var matchesText = text.indexOf(query) !== -1;          // '' matches everything
      var matchesCategory = category === 'all' || $card.data('category') === category;
      var visible = matchesText && matchesCategory;
      $card.toggle(visible);
      if (visible) { shown++; }
    });

    // Hide a section when none of its cards match. Show it first, otherwise
    // the cards inside an already-hidden section would never count as visible.
    $sections.show().each(function () {
      var $section = $(this);
      $section.toggle($section.find('.treatment-card:visible').length > 0);
    });

    var filtering = query !== '' || category !== 'all';
    $count.text(filtering
      ? shown + ' of ' + $cards.length + ' treatments match.'
      : 'Showing all ' + $cards.length + ' treatments.');

    $none.toggle(shown === 0);
    if (shown === 0) {
      $none.text('No results found. Try another word, such as “peel” or “laser”, or choose another category.');
    }
    $clear.prop('disabled', !filtering);
  }

  $input.on('input', applyFilters);

  $buttons.on('click', function () {
    var $button = $(this);
    category = $button.data('category');
    $buttons.removeClass('is-active').attr('aria-pressed', 'false');
    $button.addClass('is-active').attr('aria-pressed', 'true');
    applyFilters();
  });

  $clear.on('click', function () {
    $input.val('');
    $buttons.filter('[data-category="all"]').trigger('click');   // resets category and re-filters
    $input.trigger('focus');
  });

  applyFilters();
});
