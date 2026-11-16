(function ($) {
  if (!$ || !window.jQuery) return;

  $(document).ready(function () {
    const $container = $("#faq");

    $container.find(".faq-answer").hide();

    $container.on("click", ".faq-question", function () {
      const $question = $(this);
      const expanded = $question.attr("aria-expanded") === "true";

      $question.attr("aria-expanded", !expanded);
      $question.find(".faq-indicator").text(expanded ? "+" : "−");

      const speed = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220;
      
      const targetId = $question.attr("aria-controls");
      $("#" + targetId).stop(true, true).slideToggle(speed);
    });
  });
})(window.jQuery);
