let songs = [
  {
    "title": "The Less I Know The Better",
    "artist": "Tame Impala",
    "category": "Psychedelic pop",
    "url": "https://www.youtube.com/watch?v=sBzrzS1Ag_g"
  },
  {
    "title": "Let It Happen",
    "artist": "Tame Impala",
    "category": "Psychedelic pop",
    "url": "https://www.youtube.com/watch?v=pFptt7Cargc"
  },
  {
    "title": "Borderline",
    "artist": "Tame Impala",
    "category": "Psychedelic pop",
    "url": "https://www.youtube.com/watch?v=2g5xkLqIElU"
  },
  {
    "title": "sybyrlaiyn",
    "artist": "Ayau",
    "category": "Kazakh pop",
    "url": "https://www.youtube.com/watch?v=cM3u7-tEa8k"
  },
  {
    "title": "jañbyr astynda",
    "artist": "Ayau",
    "category": "Kazakh pop",
    "url": "https://www.youtube.com/watch?v=WjB1rJkWaX4"
  },
  {
    "title": "tartady",
    "artist": "Ayau",
    "category": "Kazakh pop",
    "url": "https://www.youtube.com/watch?v=Jm-s5aTf1k8"
  },
  {
    "title": "Ауырмайды жүрек",
    "artist": "Kairat Nurtas",
    "category": "Kazakh pop",
    "url": "https://www.youtube.com/watch?v=pY5U4a4J_8U"
  },
  {
    "title": "Blinding Lights",
    "artist": "The Weeknd",
    "category": "Pop",
    "url": "https://www.youtube.com/watch?v=4NRXx6U8ABQ"
  },
  {
    "title": "Save Your Tears",
    "artist": "The Weeknd",
    "category": "Pop",
    "url": "https://www.youtube.com/watch?v=XXYlFuWEuKI"
  },
  {
    "title": "Starboy",
    "artist": "The Weeknd",
    "category": "Pop",
    "url": "https://www.youtube.com/watch?v=34Na4j8AVgA"
  },
  {
    "title": "Levitating",
    "artist": "Dua Lipa",
    "category": "Pop",
    "url": "https://www.youtube.com/watch?v=TUVcZfQe-Kw"
  },
  {
    "title": "Don’t Start Now",
    "artist": "Dua Lipa",
    "category": "Pop",
    "url": "https://www.youtube.com/watch?v=oygrmJFKYZY"
  },
  {
    "title": "Houdini",
    "artist": "Dua Lipa",
    "category": "Pop",
    "url": "https://www.youtube.com/watch?v=suAR1PYFNYA"
  },
  {
    "title": "bad guy",
    "artist": "Billie Eilish",
    "category": "Pop",
    "url": "https://www.youtube.com/watch?v=DyDfgMOUjCI"
  },
  {
    "title": "BIRDS OF A FEATHER",
    "artist": "Billie Eilish",
    "category": "Pop",
    "url": "https://www.youtube.com/watch?v=d5gf9dXbPi0"
  },
  {
    "title": "ocean eyes",
    "artist": "Billie Eilish",
    "category": "Pop",
    "url": "https://www.youtube.com/watch?v=viimfQi_pDA"
  }
];
$(document).ready(function () {
  let selectedCategory = "All";
  let editIndex = -1;

  function showSongs() {
    let search = $("#song-search").val().trim().toLowerCase();
    let count = 0;
    $("#song-rows").empty();

    for (let i = 0; i < songs.length; i++) {
      let song = songs[i];
      let text = (song.title + " " + song.artist).toLowerCase();
      if (!text.includes(search)) continue;
      if (selectedCategory !== "All" && song.category !== selectedCategory) continue;

      count++;
      let row = $("<tr>");
      $("<td>").text(count).appendTo(row);
      $("<th scope='row'>").text(song.title).appendTo(row);
      $("<td>").text(song.artist).appendTo(row);
      $("<td>").text(song.category).appendTo(row);

      let linkCell = $("<td>").appendTo(row);
      if (song.url) {
        $("<a class='btn music-btn'>").text("Listen")
          .attr({href: song.url, target: "_blank", rel: "noopener noreferrer"})
          .appendTo(linkCell);
      } else {
        linkCell.text("No link");
      }

      let actions = $("<td class='table-actions'>").appendTo(row);
      $("<button type='button' class='btn second-btn'>")
        .text("Edit").attr("data-edit", i).appendTo(actions);
      $("<button type='button' class='btn delete-btn'>")
        .text("Delete").attr("data-delete", i).appendTo(actions);
      $("#song-rows").append(row);
    }

    $("#result-count").text(count + " of " + songs.length + " songs");
    if (count === 0) {
      $("#song-rows").append("<tr><td colspan='6'>No songs match your search.</td></tr>");
    }
  }

  function resetSongForm() {
    editIndex = -1;
    $("#song-form")[0].reset();
    $("#editor-heading").text("Add a song");
    $("#save-song").text("Add song");
    $("#cancel-edit").prop("hidden", true);
    $("#song-error").text("");
  }

  $("#song-search").on("input", showSongs);

  $("#category-filters button").on("click", function () {
    selectedCategory = $(this).attr("data-category");
    $("#category-filters button").removeClass("music-btn").addClass("second-btn")
      .attr("aria-pressed", "false");
    $(this).removeClass("second-btn").addClass("music-btn").attr("aria-pressed", "true");
    showSongs();
  });

  $("#song-form").on("submit", function (event) {
    event.preventDefault();
    let title = $("#song-title").val().trim();
    let artist = $("#song-artist").val().trim();
    let url = $("#song-url").val().trim();

    if (title === "" || artist === "" || title.length > 120 || artist.length > 100) {
      $("#song-error").text("Enter a song title and artist within the field limits.");
      return;
    }
    if (url !== "" && (!url.startsWith("https://") || !$("#song-url")[0].checkValidity())) {
      $("#song-error").text("Enter a valid HTTPS listening link, or leave it empty.");
      return;
    }

    let song = {title: title, artist: artist, category: $("#song-category").val(), url: url};
    if (editIndex === -1) {
      songs.push(song);
      $("#playlist-status").text("Song added. Select All and clear search to see every song.");
    } else {
      songs[editIndex] = song;
      $("#playlist-status").text("Song updated.");
    }
    resetSongForm();
    showSongs();
  });

  $("#song-rows").on("click", "[data-edit]", function () {
    editIndex = Number($(this).attr("data-edit"));
    let song = songs[editIndex];
    $("#song-title").val(song.title);
    $("#song-artist").val(song.artist);
    $("#song-category").val(song.category);
    $("#song-url").val(song.url);
    $("#editor-heading").text("Edit song");
    $("#save-song").text("Save changes");
    $("#cancel-edit").prop("hidden", false);
    $("#song-title").trigger("focus");
  });

  $("#song-rows").on("click", "[data-delete]", function () {
    let index = Number($(this).attr("data-delete"));
    if (confirm('Delete "' + songs[index].title + '"?')) {
      songs.splice(index, 1);
      resetSongForm();
      showSongs();
      $("#playlist-status").text("Song deleted.");
      $("#song-search").trigger("focus");
    }
  });

  $("#cancel-edit").on("click", resetSongForm);
  if ($("#song-rows").length) showSongs();
  function checkField(field) {
    let input = $("#reg-" + field);
    let value = input.val();
    let message = "";
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value.trim() === "") {
      message = "This field is required.";
    } else if (field === "email" && !emailPattern.test(value.trim())) {
      message = "Enter a valid email address.";
    } else if (field === "password" && value.length < 8) {
      message = "Use at least 8 characters.";
    } else if (field === "confirm" && value !== $("#reg-password").val()) {
      message = "Passwords do not match.";
    }

    input.toggleClass("is-invalid", message !== "");
    input.toggleClass("is-valid", message === "");
    input.attr("aria-invalid", message !== "");
    $("#" + field + "-feedback").text(message || "Looks good.")
      .toggleClass("error-text", message !== "");
    return message === "";
  }

  function showStrength() {
    let password = $("#reg-password").val();
    let score = 0;
    let label = "not entered";
    if (password.length > 0) {
      score = 1;
      label = "weak";
    }
    if (password.length >= 8) {
      score = 2;
      label = "medium";
    }
    if (password.length >= 12 && /[a-z]/.test(password) &&
        /[A-Z]/.test(password) && /[0-9]/.test(password) &&
        /[^a-zA-Z0-9]/.test(password)) {
      score = 3;
      label = "strong";
    }
    $("#password-meter").val(score);
    $("#password-strength").text("Password strength: " + label);
  }

  $("#registration-form input").on("input", function () {
    checkField(this.name);
    $("#registration-status").text("");
    if (this.name === "password") {
      showStrength();
      if ($("#reg-confirm").val() !== "") checkField("confirm");
    }
  });

  $("#registration-form").on("submit", function (event) {
    event.preventDefault();
    let valid = true;
    let fields = ["name", "email", "password", "confirm"];
    for (let i = 0; i < fields.length; i++) {
      if (!checkField(fields[i])) valid = false;
    }
    if (valid) {
      this.reset();
      $("#registration-status").text("Registration details are valid. This demo does not create an account.");
    } else {
      $("#registration-status").text("Please correct the highlighted fields.");
      $(this).find(".is-invalid").first().trigger("focus");
    }
  });

  $("#registration-form").on("reset", function () {
    $(this).find("input").removeClass("is-valid is-invalid").removeAttr("aria-invalid");
    $(".field-feedback, #registration-status").text("");
    $("#password-meter").val(0);
    $("#password-strength").text("Password strength: not entered");
  });
  let cards = $("#album-gallery .music-card");
  let currentImage = 0;
  let opener;
  let lightbox = $("#lightbox")[0];

  function showImage() {
    let card = cards.eq(currentImage);
    $("#lightbox-image").attr("src", card.find("img").attr("src"));
    $("#lightbox-image").attr("alt", card.find("h2").text());
    $("#lightbox-caption").text(card.find("h2").text() +
      " (" + (currentImage + 1) + " of " + cards.length + ")");
  }

  function changeImage(direction) {
    currentImage += direction;
    if (currentImage < 0) currentImage = cards.length - 1;
    if (currentImage >= cards.length) currentImage = 0;
    $("#lightbox-image").stop(true, true).fadeOut(150, function () {
      showImage();
      $(this).fadeIn(150);
    });
  }

  function closeGallery() {
    $("#lightbox").stop(true, true).fadeOut(150, function () {
      lightbox.close();
      $("body").removeClass("gallery-open");
      opener.focus();
    });
  }

  cards.each(function (index) {
    let image = $(this).find("img");
    let title = $(this).find("h2").text();
    image.attr("alt", title);
    image.wrap("<button type='button' class='gallery-trigger'></button>");
    image.parent().attr("aria-label", "Enlarge image for " + title);
    image.parent().on("click", function () {
      currentImage = index;
      opener = this;
      showImage();
      lightbox.showModal();
      $("body").addClass("gallery-open");
      $("#lightbox").hide().fadeIn(150);
      $("#close-lightbox").trigger("focus");
    });
  });

  $("#next-image").on("click", function () { changeImage(1); });
  $("#previous-image").on("click", function () { changeImage(-1); });
  $("#close-lightbox").on("click", closeGallery);
  $("#lightbox").on("cancel", function (event) {
    event.preventDefault();
    closeGallery();
  });
  $("#lightbox").on("click", function (event) {
    if (event.target === lightbox) closeGallery();
  });
  $("#lightbox").on("keydown", function (event) {
    if (event.key === "ArrowLeft") changeImage(-1);
    if (event.key === "ArrowRight") changeImage(1);
  });
  $("#lightbox-image").on("error", function () {
    if (!this.src.endsWith("music-placeholder.svg")) this.src = "images/music-placeholder.svg";
  });
});
