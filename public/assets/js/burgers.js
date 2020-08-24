const $burgerText = $(".burger-textarea");
const $submitBtn = $("#submit-burger");
const $burgersReadyList = $(".list-container .burgers-ready");
const $burgersEatenList = $(".list-container .burgers-eaten");

// A function for getting all burgers from the db
const getBurgers = () => {
  return $.ajax({
    url: "/api/burgers",
    method: "GET",
  });
};

// A function for saving a burger to the db
const saveBurger = (burger) => {
  return $.ajax({
    url: "/api/burgers",
    data: burger,
    method: "POST",
  });
};

// A function for updating a burger in the db
const updateBurger = (burger) => {
  return $.ajax({
    url: "/api/burgers" + burger.id,
    data: burger,
    method: "UPDATE",
  });
};

// Devour the clicked burger
const handleDevour = function (event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  const burger = $(this).parent(".li-burger-ready").data();

  burger.devoured = true;
  updateBurger(burger).then(() => {
    getAndRenderBurgers();
    renderActiveBurger();
  });
};

// Just clear the submitted burger text
const renderActiveBurger = () => {
  $burgerText.val(""),
};

// Get the burger data from the inputs, save it to the db and update the view
const handleSubmit = () => {
  const newBurger = {
    description: $burgerText.val(),
  };

  saveBurger(newNote).then(() => {
    getAndRenderBurgers();
    renderActiveBurger();
  });
};

// Render's the list of burgers
const renderBurgerLists = (burgers) => {
  $burgersReadyList.empty();
  $burgersEatenList.empty();

  const burgerReadyListItems = [];
  const burgerEatenListItems = [];

  // Returns jquery object for li with given text and delete button
  // unless withDevourButton argument is provided as false
  const create_li = (desc, classId) => {
    const $li = $(`<li class='${classId}'>`);
    const $span = $("<span>").text(desc);
    $li.append($span);

    if (classId == "li-burger-ready") {
      const $delBtn = $(
        "<button class='float-right text-danger devour-burger'>Devour it.</button>"
      );
      $li.append($delBtn);
    }
    return $li;
  };

  /* {{{ **
  ** if (burgers.length === 0) {
  **   burgerReadyListItems.push(create_li("No burgers ready", false));
  ** }
  ** }}} */

  burgers.forEach((burger) => {
    if (burger.devoured) {
      const $li = create_li(burger.description,"li-burger-eaten");
      burgerReadyListItems.push($li);
    } else {
      const $li = create_li(burger.description,"li-burger-ready");
      burgerEatenListItems.push($li);
    }
  });

  $burgersReadyList.append(burgerReadyListItems);
  $burgersEatenList.append(burgerEatenListItems);
};

// Gets burgers from the db and renders them to the sidebar
const getAndRenderBurgers = () => {
  return getBurgers()
    .then(renderBurgerLists);
};

$submitBtn.on("click", handleSubmit);
/* {{{ **
** $burgersReadyList.on("click", ".li-burger-ready", handleBurgerView);
** $burgersEatenList.on("click", ".li-burger-eaten", handleBurgerView);
** $newBurgerBtn.on("click", handleNewBurgerView);
** }}} */
$burgersReadyList.on("click", ".li-burger-ready", handleDevour);

// Gets and renders the initial list of burgers
getAndRenderBurgers();
