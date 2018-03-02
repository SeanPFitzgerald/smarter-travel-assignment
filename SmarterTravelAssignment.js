
// Integration Engineer Take Home Assignment
//
// Tingo.com is one of SmarterTravel’s internal brands where you can shop for and book a hotel. For the exercise, you will be writing JavaScript code to modify the behavior of the tingo.com listings page - this is the page you arrive on when doing a search for a destination with a check in and check out date from the home page. An example URL is:
//
// https://hotels.tingo.travel/search.do?resolved-location=CITY%3A1401516%3A&destination-id=1401516&q-destination=Boston,%20Massachusetts,%20United%20States%20of%20America&q-check-in=2018-03-12&q-check-out=2018-03-14&q-rooms=1&q-room-0-adults=2&q-room-0-children=0
//
// You should develop your solution by writing JavaScript code in your preferred editor, and then pasting it into your browser’s developer tools to execute it.
//
// The solution you submit should be runnable by simply copying and pasting the entire block into the Chrome developer console and running it.
//
// Task 1
// Write JavaScript code that fetches the destination name, check in date, and
// check out date of the page the user is on and prints them to the console. You
// can find these values in the search form near the top of the page.

// Process:
// 1) Right-click -> Inspected each specific search box
// 2) Noted the ID for each
// 3) Found the element using the document’s getElementById() method
// 4) Console logged the value of each

// Solution:
console.log(document.getElementById("q-destination").value);
console.log(document.getElementById("q-localised-check-in").value);
console.log(document.getElementById("q-localised-check-out").value);



// Task 2
// Add a string somewhere on the listing page that reads “Viewing <xx> <city>
// Hotels” where <city> is specifically the city (and not the state or country)
// searched on this page, and <xx> is the number of hotel results currently
// visible. Note that this page uses ‘infinite scrolling’, so as you scroll down
// more hotels are loaded in via AJAX. The number of hotels in this string should
// be updated to reflect this as the user scrolls. You can choose the location
// and styling of this string.

// Process:
// 1) Inspected a hotel’s tile/list element
// 2) Noted the class name defining all desired elements
// 3) Used the document’s getElementsByClassName() method to obtain an
//    HTMLCollection of the tiles/list elements
// 4) Used the Array.from() method to get an array of that HTMLCollection so it
//    can be iterated over
// 5) Went to MDN docs to learn how to access a value from dataset elements
// 6) Iterated over the hotel elements’ using the Array.prototype.forEach()
//    method to console log each hotel id to verify I was capturing the correct
//    data. This is what that loop looked like:

Array.from(document.getElementsByClassName("hotel")).forEach((hotel) => {
  console.log(hotel.dataset.hotelId);
});

// 7) Iterated over the hotel elements’ using the Arrays.prototype.map()
//    method to assign the IDs to an array constant for use in ensuring there
//    aren’t duplicates. This is what that loop looked like:

const hotelIds = Array.from(document.getElementsByClassName("hotel")).map((hotel) => {
  return hotel.dataset.hotelId;
});

// 8) Googled whether there is a JS Array equivalent to Ruby’s “uniq!” method,
//    there is not
// 9) Googled whether the JS Array reduce() method would be appropriate,
//    determined it was not
// 10) Decided to create empty array uniqueIds variable, iterate over the
//     hotelIds array and conditionally push an id to uniqueIds if it did not
//     include the current id. This is what that code looked like:

var uniqueIds = [];
hotelIds.forEach((id) => {
    if (!uniqueIds.includes(id)) {
        uniqueIds.push(id);
    }
});

// 11) Pushed a couple duplicates to the hotelIds array and ran the preceding
//     loop to confirm it removed duplicates
// 12) Parsed the destination value by obtaining it as I did in Task 1 and using
//     the String.prototype.slice and String.prototype.indexOf() methods to
//     create a new string with just the city in it. This is what that code
//     looked like:

const city = document.getElementById("q-destination").value.slice(0,
  document.getElementById("q-destination").value.indexOf(','));

// 13) Looked up the Node.appendChild() method on MDN to better understand how
//     to use it
// 14) Created a test node of type “h3” and an innerText of “hello, world” to
//     help properly visualize appending the test element
// 15) Inspected the search form and found it to be part of the “search-header”
//     div
// 16) Appended the test element. This code looked as so:

var test = document.createElement("h3");
test.innerText = "hello, world";
document.getElementById("search-header").appendChild(test);

// 17) Fiddled with the className of the test element by inspecting elements
//     surrounding it to make it more visually appealing, settled on giving it a
//     class of “resp-row” to bring it in line with the search header
// 18) Removed test child node
// 19) Created new “Viewing <xx> <city> Hotels” element, defined className,
//     defined innerText through string interpolation and appended to search
//     header

var hotelsViewing = document.createElement("h3");
hotelsViewing.className = "resp-row";
hotelsViewing.innerText = `Viewing ${uniqueIds.length} ${city} Hotels`;
document.getElementById("search-header").appendChild(hotelsViewing);

// 20) Combined previous code snippets into the following function to add event
//     listener to and ran it to ensure desired text was being added to DOM:

var hotelsViewing = document.createElement("h3");
hotelsViewing.className = "resp-row";

function modifyHotelsViewing() {
  const hotelIds = Array.from(document.getElementsByClassName("hotel")).map((hotel) => {
    return hotel.dataset.hotelId;
	});

  var uniqueIds = [];

  hotelIds.forEach((id) => {
    if (!uniqueIds.includes(id)) {
      uniqueIds.push(id);
    }
  });

	const city = document.getElementById("q-destination").value.slice(0,
    document.getElementById("q-destination").value.indexOf(','));


	hotelsViewing.innerText = `Viewing ${uniqueIds.length} ${city} Hotels`;
	document.getElementById("search-header").appendChild(hotelsViewing);
}

// 21) Looked up how to determine what events have recently been called to know
//     which event to add a listener to to call my function when user scrolled
//     to bottom of page
//       a) Read that Firefox was better than current browser (Chrome) for that.
//          Installed Firefox, tried to use the “EV” function in the Inspect
//          panel but couldn’t really make out when/what even was firing.
//       b) Went back to Chrome, used the Event Listener Breakpoints panel to
//          check-off and break on likely events. Found the following: load,
//          readystatechange, Request Animation Frame, Cancel Animation Frame,
//          and Animation Frame Fired as all potential candidates. Tried to add
//          this test function as a listener for each one:

var listen = () => {
  console.log("fired");
}

//       c) None of them actually fired. Researched reasons why but couldn’t
//          find adequate explanation/workaround. Considered using a simple
//          scroll listener and refactor the code to only manipulate DOM if
//          the user scrolls near the bottom of the page.
//       d) In the eleventh hour I found that I could add an event listener to
//          “DOMNodeInserted” even though that event was not firing from the
//          event listener breakpoints. This has the added advantage of being
//          able to add an ID to uniqueIds as each one was loaded instead of
//          looping every hotel list element every time. Used a debugger
//          statement inside of a simple alert listener to determine appropriate
//          event values. This is my refactored code:

const city = document.getElementById('q-destination').value.slice(0,
  document.getElementById('q-destination').value.indexOf(','));

const hotelIds = Array.from(document.getElementsByClassName('hotel')).map((hotel) => {
  return hotel.dataset.hotelId;
});

var uniqueIds = [];
hotelIds.forEach((id) => {
	if (!uniqueIds.includes(id)) {
  	uniqueIds.push(id);
	}
})

var hotelsViewing = document.createElement('h3');
hotelsViewing.className = 'resp-row';
hotelsViewing.innerText = `Viewing ${uniqueIds.length} ${city} Hotels`;

document.getElementById('search-header').appendChild(hotelsViewing);

function modifyHotelsViewing(event) {
  if (event.target.className === 'hotel' && !uniqueIds.includes(event.target.dataset.hotelId)) {
  	uniqueIds.push(event.target.dataset.hotelId);
  }

	hotelsViewing.innerText = `Viewing ${uniqueIds.length} ${city} Hotels`;
	document.getElementById('search-header').appendChild(hotelsViewing);
}

document.addEventListener('DOMNodeInserted', modifyHotelsViewing);

// 22) This gave almost the desired result but two issues arose when running
//     this code
//     a) Upon counting the list elements in the console inspector, I noticed
//        that certain hotels actually had a className of 'hotel vip' and thus
//        were not being counted
//     b) More worryingly, I was getting an 'Uncaught RangeError: Maximum call
//        stack size exceeded.' error when scrolling to the bottom of the page
//        due to the appendChild line in the modifyHotelsViewing function
// 23) The first issue was easily rectified by modifying the
//     modifyHotelsViewing() conditional to check for 'hotel vip' like so:

// ...
if ((event.target.className === 'hotel' || event.target.className === 'hotel vip') && !uniqueIds.includes(event.target.dataset.hotelId)) {
  uniqueIds.push(event.target.dataset.hotelId);
}
// ...

// 24) While thinking through the second issue, I realized that I really only
//     wanted the hotelsViewing element to be added if the inserted node had a
//     class name of 'hotel' or 'hotel vip' anways so I moved the two lines
//     outside of the conditional to within it like so:

function modifyHotelsViewing(event) {
  if ((event.target.className === 'hotel' || event.target.className === 'hotel vip') && !uniqueIds.includes(event.target.dataset.hotelId)) {
    uniqueIds.push(event.target.dataset.hotelId);
    hotelsViewing.innerText = `Viewing ${uniqueIds.length} ${city} Hotels`;
    document.getElementById('search-header').appendChild(hotelsViewing);
  }
}

// 25) This fixed that call stack error but I still wanted to know why it was
//     being created so I took the original code and but a debugger before the
//     appendChild method. On first loop I saw that the className was 'hotel' as
//     expected. Then it triggered again, expecting another 'hotel' or
//     'hotel vip' but it was 'resp-row'. Okay, weird but maybe there was a
//     wrapper div with that class name being added or something. Then next
//     trigger and it was 'resp-row' again... and again, and again. Then I
//     noticed that hotelsViewing had a class name of 'resp-row'. Of course!
//     By appending hotelsViewing, I was inserting a new Node into the document,
//     causing the listener to trigger modifyHotelsViewing infinitely! By
//     appending the node only when the class name is 'hotel' or 'hotel vip', it
//     still re-triggers the method but fails the conditional and moves on to
//     whatever next node is attempted to be added.
// 24) Realized that I could add a listener specifically to the ol element that
//     li elements were being added to prevent modifyHotelsViewing() to be
//     called twice per hotel and whenever an unrelated node was being added
//     elsewhere on the page. This is that change:

document.getElementsByClassName('listings infinite-scroll-enabled')[0].addEventListener('DOMNodeInserted', modifyHotelsViewing);

// 25) Then, in testing, I went far enough down the list that a new class name,
//     'hotel expanded-area', popped up and caused my listener to stop counting
//     those. I figure that perhaps there are more types of 'hotel' class names
//     so I assume that no node will be added within the listings with 'hotel'
//     in the class name that aren't supposed to be counted and refactor my code
//     yet again:

function modifyHotelsViewing(event) {
  if (event.target.className.includes('hotel') && !uniqueIds.includes(event.target.dataset.hotelId)) {
    uniqueIds.push(event.target.dataset.hotelId);
    hotelsViewing.innerText = `Viewing ${uniqueIds.length} ${city} Hotels`;
    document.getElementById('search-header').appendChild(hotelsViewing);
  }
}

// 26) Finally, I realize that I don't actually need to append hotelsViewing
//     to the document each time the text changed, so I remove that line. Here
//     is the final code:

const city = document.getElementById('q-destination').value.slice(0,
  document.getElementById('q-destination').value.indexOf(','));

const hotelIds = Array.from(document.getElementsByClassName('hotel')).map((hotel) => {
  return hotel.dataset.hotelId;
})

var uniqueIds = [];
hotelIds.forEach((id) => {
	if (!uniqueIds.includes(id)) {
  	uniqueIds.push(id);
	}
})

var hotelsViewing = document.createElement('h3');
hotelsViewing.className = 'resp-row';
hotelsViewing.innerText = `Viewing ${uniqueIds.length} ${city} Hotels`;

document.getElementById('search-header').appendChild(hotelsViewing);

function modifyHotelsViewing(event) {
  if (event.target.className.includes('hotel') && !uniqueIds.includes(event.target.dataset.hotelId)) {
    uniqueIds.push(event.target.dataset.hotelId);
    hotelsViewing.innerText = `Viewing ${uniqueIds.length} ${city} Hotels`;
  }
}

document.getElementsByClassName('listings infinite-scroll-enabled')[0].addEventListener('DOMNodeInserted', modifyHotelsViewing);

// 27) BUT WAIT, THERE'S MORE! I awoke on Tuesday to continue work on Task 3 to
//     find that my code was suddenly breaking! It appears that the event
//     parameter being passed in from a 'DOMNodeInserted' event had changed and
//     began causing event.target to act differently than before. Upon checking
//     the code for Task 2, that that change had indeed caused errors for it as
//     well. I had to refactor my listener to loop through its event.path until
//     it found the desirable HTML tag and then pull hotelIds from the dataset.
//     Here is the FINAL Final code with that consideration:

const city = document.getElementById('q-destination').value.slice(0,
  document.getElementById('q-destination').value.indexOf(','));

const hotelIds = Array.from(document.getElementsByClassName('hotel')).map((hotel) => {
  return hotel.dataset.hotelId;
})

var uniqueIds = [];
hotelIds.forEach((id) => {
	if (!uniqueIds.includes(id)) {
  	uniqueIds.push(id);
	}
})

var hotelsViewing = document.createElement('h3');
hotelsViewing.className = 'resp-row';
hotelsViewing.innerText = `Viewing ${uniqueIds.length} ${city} Hotels`;

document.getElementById('search-header').appendChild(hotelsViewing);

function modifyHotelsViewing(event) {
  for (pathIndex = 0; pathIndex < event.path.length; pathIndex++) {
    if (event.path[pathIndex].tagName === 'LI' && event.path[pathIndex].className.includes('hotel') && !uniqueIds.includes(event.path[pathIndex].dataset.hotelId)) {
      uniqueIds.push(event.path[pathIndex].dataset.hotelId);
      hotelsViewing.innerText = `Viewing ${uniqueIds.length} ${city} Hotels`;
      break;
    }
  }
}

document.getElementsByClassName('listings infinite-scroll-enabled')[0].addEventListener('DOMNodeInserted', modifyHotelsViewing);

// Final Notes: This code has the unfortunate inneficiency of calling the
// modifyHotelsViewing() method per hotel and therefore re-inserts the
// hotelsViewing for each hotel as well. However, it is much more efficient than
// a scroll event listener and in leiu of some other event that only fires once
// or twice per batch of hotels being added that actually triggers a listener
// (window.addEventListener('load') and document.addEventListener('load'), I'm
// looking at you), this is the best I can do.



// Task 3
// Each hotel in the listing has a ‘Select’ button that when clicked takes the
// user to a detail page about that specific hotel. Write JavaScript code that
// additionally does the following when the ‘Select’ button is clicked:
//
// Add both the name of the hotel chosen as well as its price to a new list
// entitled “Selected Hotels” somewhere on the hotel listing page. You can
// choose where this list is displayed and how it is styled, but it must be
// visible on the hotel listings page. The list of hotels should be sorted by
// their prices from low to high. Note that If the user chooses the same hotel
// twice, the name should not be duplicated in the list of ‘Selected hotels’.

// 1) Inspected a hotel's 'Select' button to gather info
//    a) Contained in an anchor tag with className 'cta', note that many other
//       buttons on the page have that in there class name
//    b) Note that the anchor tag in enclosed within a div tag with className
//       'cta-wrap' and using the code from Task 2 in conjunction with
//       getElementsByClassName(), they do indeed represent a one-to-one
//       relationship with a hotel
//    c) Realize that I can add a click event listener to each 'Select' button
//       as they are created by modifying code from Task 2 like so (I re-use
//       the 'listen' function from Task 2 as well to confirm the listener is
//       attached where I want it):

function addListenerToSelects(event) {
  if (event.target.className.includes('hotel')) {
    event.target.getElementsByClassName('cta-wrap')[0].getElementsByTagName('a')[0].addEventListener('click', listen);
  }
}

document.getElementsByClassName('listings infinite-scroll-enabled')[0].addEventListener('DOMNodeInserted', addListenerToSelects);

// 2) This will get me a listener for hotels that are added to the page, but
//    need to get them on the hotels that are initially loaded on the page so
//    I loop through the array of HTMLCollection of 'cta-wrap' classes to add
//    listeners to their enclosed anchor tags

Array.from(document.getElementsByClassName('cta-wrap')).forEach((wrap) => {
  wrap.getElementsByTagName('a')[0].addEventListener('click', listen);
});

// 3) Now that I've confimed I have added listeners to all the Select buttons
//    by attaching my test listener to them, now I put a debugger within that
//    test listener to get an idea of how to access the information in its
//    parentNode
// 4) There are two promising leads from this. The first, event.target.pathname,
//    gives me a string that contains the hotel's id. The second is event.path,
//    which gives me an HTMLCollection of parent elements, including the
//    'li.hotel' element containing all pertinent information. Although I could
//    use either, parsing the event.target.pathname string for just the hotel id
//    is messy and would just lead me to the same 'li.hotel' element I have
//    access to with event.path while also having to loop through all 'li.hotel'
//    elements so I choose to use event.path
// 5) Now, I can loop through the HTMLCollection as an array and look for a
//    tagName of 'LI', then confirm that its className contains 'hotel' to
//    ensure that I am looking at the appropriate element. Here is that loop
//    where I console log the dataset:

Array.from(event.path).forEach((element) => {
  if (element.tagName === 'LI' && element.className.includes('hotel')) {
    console.log(element.dataset);
  }
});

// 6) I see that the hotel name is stored in dataset.title and that the price
//    is stored after the fifth, or last, pipe character in dataset.info
// 7) Since the price is stored after the last pipe character, I decide to loop
//    backwards through the info string until I hit a pipe and then slice the
//    string from there to get the price. Here is that loop:

var price;
for (i = info.length; i > 0; i--) {
  if (info[i] === '|') {
    price = info.slice(i + 1);
    break;
  }
}

// 8) Now that I have identification of the proper list element and access to
//    the relevant name, price info and hotel id (for tracking duplicates), it's
//    time to combine those code snippets into the listener. I'll store my data
//    in a nested object where the hotel's id serves as the key

var selectedHotels = {}

function addToSelectedList(event) {
  Array.from(event.path).forEach((element) => {
    if (element.tagName === 'LI' && element.className.includes('hotel') && selectedHotels[element.dataset.hotelId] === undefined) {
      var data = element.dataset

      for (i = data.info.length; i > 0; i--) {
        if (data.info[i] === '|') {
          selectedHotels[data.hotelId] = {
            name: data.title,
            price: data.info.slice(i + 1)
          }
          break;
        }
      }
    }
  });
}

// 9) Now I add the listener to the 'Select' buttons and confirm in the console
//    that selectedHotels is being populated appropriately

Array.from(document.getElementsByClassName('cta-wrap')).forEach((wrap) => {
  wrap.getElementsByTagName('a')[0].addEventListener('click', addToSelectedList);
});

function addListenerToSelects(event) {
  if (event.target.className.includes('hotel')) {
    event.target.getElementsByClassName('cta-wrap')[0].getElementsByTagName('a')[0].addEventListener('click', addToSelectedList);
  }
}

document.getElementsByClassName('listings infinite-scroll-enabled')[0].addEventListener('DOMNodeInserted', addListenerToSelects);

// 10) Given the object of selected hotels, I need to format them for output
//     into the DOM. I realize though that since I need to print the list of
//     hotels priced low to high, that perhaps I should refactor my
//     selectedHotels nested object to an array of objects where I insert hotels
//     into it ordered by price. However, if I do this, then I'll have to search
//     through the whole array of selected hotels for each new hotel added to
//     the list to check for duplicates. The third option is to keep both an
//     object of selected hotels tracking duplicates and a seperate array of
//     objects sorted by price for easy output. This comes with the drawback of
//     needing to maintain two lists though, which can get messy, and are
//     essentailly storing some duplicate data. To avoid that mess, and since
//     searching is faster than sorting, I will go with the second option. Here
//     is that refactored code along with helper functions to check for
//     duplicate hotels and search for the position in selectedHotels to insert
//     a new hotel:

var selectedHotels = []

function isHotelDuplicate(hotelId) {
  for (i = 0; i < selectedHotels.length; i++) {
    if (selectedHotels[i].id === hotelId) {
      return true;
    }
  }
  return false;
}

function findHotelListIndex(price, low = 0, high = selectedHotels.length - 1) {
  var mid = low + Math.floor((high - low) / 2);
	var priceCompare = selectedHotels[mid].price;

  if (low === high) {
    return mid;
  }

  if (price > priceCompare) {
		return findHotelListIndex(price, mid + 1, high);
	}

	if (price < priceCompare) {
		return findHotelListIndex(price, low, mid);
	}

	return mid;
}

function addToSelectedList(event) {
  for (pathIndex = 0; pathIndex < event.path.length; pathIndex++) {
    if (event.path[pathIndex].tagName === 'LI' && event.path[pathIndex].className.includes('hotel') && !isHotelDuplicate(event.path[pathIndex].dataset.hotelId)) {
      var data = event.path[pathIndex].dataset

      for (i = data.info.length - 1; i > 0; i--) {
        if (data.info[i] === '|') {
          const hotel = {
            id: data.hotelId,
            name: data.title,
            price: Math.round(parseFloat(data.info.slice(i + 1)))
          }

          if (selectedHotels.length > 0) {
            var newIndex = findHotelListIndex(hotel.price);
            selectedHotels = selectedHotels.slice(0, newIndex).concat(hotel).concat(selectedHotels.slice(newIndex));
          } else {
            selectedHotels.push(hotel)
          }
          break;
        }
      }
      break;
    }
  }
}

Array.from(document.getElementsByClassName('cta-wrap')).forEach((wrap) => {
  wrap.getElementsByTagName('a')[0].addEventListener('click', addToSelectedList);
});

function addListenerToSelects(event) {
  if (event.target.className.includes('hotel')) {
    event.target.getElementsByClassName('cta-wrap')[0].getElementsByTagName('a')[0].addEventListener('click', addToSelectedList);
  }
}

document.getElementsByClassName('listings infinite-scroll-enabled')[0].addEventListener('DOMNodeInserted', addListenerToSelects);


// 11) As mentioned in step 27 of Task 2, I awoke on Tuesday to find that my
//     code was suddenly breaking. It appears that the event parameter being
//     passed in from a 'DOMNodeInserted' event had changed and began causing
//     event.target to act differently than before. I had to refactor the
//     addListenerToSelects method to look through the event's path for the
//     appropriate <li> tag. This is that new method:

function addListenerToSelects(event) {
  for (pathIndex = 0; pathIndex < event.path.length; pathIndex++) {
    if (event.path[pathIndex].tagName === 'LI' && event.path[pathIndex].className.includes('hotel')) {
      event.path[pathIndex].getElementsByClassName('cta-wrap')[0].getElementsByTagName('a')[0].addEventListener('click', addToSelectedList);
      break;
    }
  }
}

// 12) In testing I also realized that if a new hotel had the highest price
//     in selectedHotels, that it was being added to the penultimate position
//     in the array so I had to refactor a portion of the addToSelectedList
//     method to push highest prices to the end like so:

// ...
if (selectedHotels.length > 0 && hotel.price < selectedHotels[selectedHotels.length - 1].price) {
  var newIndex = findHotelListIndex(hotel.price);
  selectedHotels = selectedHotels.slice(0, newIndex).concat(hotel).concat(selectedHotels.slice(newIndex));
} else {
  selectedHotels.push(hotel)
}
// ...

// 13) Now that I have everything I need to track selected hotels and
//     populate a sorted list of them, I can create the desired formatted list
//     node of hotels selected by the user and append it to the document. Here
//     is that function:

var formattedHotelList = document.createElement('h3');
formattedHotelList.className = 'resp-row';
document.getElementById('search-header').appendChild(formattedHotelList);

function formatSelectedHotels() {
  formattedHotelList.innerText = 'Selected Hotels';
  selectedHotels.forEach((hotel) => {
    formattedHotelList.innerText += `\n£${hotel.price} - ${hotel.name}`;
  });
}

// 14) Lastly, I have to add a call to formatSelectedHotels from the
//     addToSelectedList function to update the 'Selected Hotels' list upon
//     after every selection. Here is the final code:


var selectedHotels = []

var formattedHotelList = document.createElement('h3');
formattedHotelList.className = 'resp-row';
document.getElementById('search-header').appendChild(formattedHotelList);

function formatSelectedHotels() {
  formattedHotelList.innerText = 'Selected Hotels';
  selectedHotels.forEach((hotel) => {
    formattedHotelList.innerText += `\n£${hotel.price} - ${hotel.name}`;
  });
}

function isHotelDuplicate(hotelId) {
  for (i = 0; i < selectedHotels.length; i++) {
    if (selectedHotels[i].id === hotelId) {
      return true;
    }
  }
  return false;
}

function findHotelListIndex(price, low = 0, high = selectedHotels.length - 1) {
  var mid = low + Math.floor((high - low) / 2);
	var priceCompare = selectedHotels[mid].price;

  if (low === high) {
    return mid;
  }

  if (price > priceCompare) {
		return findHotelListIndex(price, mid + 1, high);
	}

	if (price < priceCompare) {
		return findHotelListIndex(price, low, mid);
	}

	return mid;
}

function addToSelectedList(event) {
  for (pathIndex = 0; pathIndex < event.path.length; pathIndex++) {
    if (event.path[pathIndex].tagName === 'LI' && event.path[pathIndex].className.includes('hotel') && !isHotelDuplicate(event.path[pathIndex].dataset.hotelId)) {
      var data = event.path[pathIndex].dataset

      for (i = data.info.length - 1; i > 0; i--) {
        if (data.info[i] === '|') {
          const hotel = {
            id: data.hotelId,
            name: data.title,
            price: Math.round(parseFloat(data.info.slice(i + 1)))
          }

          if (selectedHotels.length > 0 && hotel.price < selectedHotels[selectedHotels.length - 1].price) {
            var newIndex = findHotelListIndex(hotel.price);
            selectedHotels = selectedHotels.slice(0, newIndex).concat(hotel).concat(selectedHotels.slice(newIndex));
          } else {
            selectedHotels.push(hotel)
          }
          break;
        }
      }
      formatSelectedHotels()
      break;
    }
  }
}

Array.from(document.getElementsByClassName('cta-wrap')).forEach((wrap) => {
  wrap.getElementsByTagName('a')[0].addEventListener('click', addToSelectedList);
});

function addListenerToSelects(event) {
  for (pathIndex = 0; pathIndex < event.path.length; pathIndex++) {
    if (event.path[pathIndex].tagName === 'LI' && event.path[pathIndex].className.includes('hotel')) {
      event.path[pathIndex].getElementsByClassName('cta-wrap')[0].getElementsByTagName('a')[0].addEventListener('click', addToSelectedList);
      break;
    }
  }
}

document.getElementsByClassName('listings infinite-scroll-enabled')[0].addEventListener('DOMNodeInserted', addListenerToSelects);

// Final Notes: The change in the event parameter really through me for a loop
// and I don't know if it will be changed back and if it is, whether it will
// rebreak the code again but without a proper test environment for that
// situation, I can't say for sure either way how it will behave. In scenarios
// where I would not necessarily need to loop through a whole structure, I used
// a for loop as the forEach() array method doesn't support the break statement
// and the for(var iterator in array), which does support break statements, was
// introduced in ES2015 and I was trying to keep the code compatible with older
// standards for maximum coverage (within reason).

// All code has been developed and tested in Google Chrome v64. No compatability
// for other browsers is guaranteed.
