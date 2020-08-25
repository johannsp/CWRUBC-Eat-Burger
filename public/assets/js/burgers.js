// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    const newBurger = {
      description: $("#desc").val().trim(),
      devoured: 0
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".devour-burger").on("click", function(event) {
    const id = $(this).data("id");

    const updatedBurger = {
      // Extract only the description, not the inner button text
      description: $(this).parent()[0].firstChild.nodeValue.trim(),
      devoured: 1
    };

    // Send the UPDATE request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: updatedBurger
    }).then(
      function() {
        console.log("updated burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
