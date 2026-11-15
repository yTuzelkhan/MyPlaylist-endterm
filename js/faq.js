(() => {
  if (!window.jQuery) return;
  const $ = window.jQuery;
  $(".faq-answer").hide();
  $("#faq").on("click", ".faq-question", function () {
    const expanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", String(!expanded));
    $(this).find(".faq-indicator").text(expanded ? "+" : "−");
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220;
    $("#" + this.getAttribute("aria-controls")).stop(true, true).slideToggle(duration);
  });
})();
