/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
Global variables
***/
let studentWindow = window;
let totalStudents = document.getElementsByClassName('student-item');

/***
 * Builds the student list for the page limit passed in
 * defaulting to the first page if none other supplied
 */
const buildStudentLists = (list, page = 1) => {
	let startPageIndex = page * 10 - 10;
	let finishPageIndex = page * 10;

	for (let i = 0; i < list.length; i++) {
		if (!(i >= startPageIndex && i < finishPageIndex)) {
			list[i].style.display = 'none';
		}
	}
};

/***
 * Create the given button link item
 */
const paginationButton = (buttonNum) => {
	let li = document.createElement('li');
	let link = document.createElement('a');
	link.setAttribute('href', '#');
	link.textContent = `${buttonNum}`;
	li.appendChild(link);
	return li;
};

/***
 * Create the button strip for navigation
 */
const appendPageLinks = (list) => {
	let totalButtons = Math.ceil(list.length / 10); // total number of buttons

	let pageContainer = document.getElementsByClassName('page')[0]; // Get the 'page' class'
	let buttonContainer = document.createElement('div'); // Create base button strip

	let buttonListItemContainer = document.createElement('ul');
	buttonListItemContainer.className = 'pagination';

	for (let buttonIndex = 0; buttonIndex < totalButtons; buttonIndex++) {
		let res = paginationButton(buttonIndex + 1);
		buttonListItemContainer.appendChild(res);
	}

	buttonContainer.appendChild(buttonListItemContainer);
	pageContainer.appendChild(buttonContainer);
};

/***
 * Sets the 'active' class to the apprporiate button in the button strip
 * removing the 'active' class from any previous buttons clicked
 */
const setActiveClassOnButton = (buttonIndex = 1) => {
	let pageButtons = document.getElementsByTagName('a');
	let activeButton = pageButtons[buttonIndex - 1];

	for (let i = 0; i < pageButtons.length; i++) {
		if (i !== buttonIndex - 1) {
			pageButtons[i].className = '';
		} else {
			activeButton.className = 'active';
		}
	}
};

/***
 * Resets the display property for each of the students in the list
 */
const resetStudentListToVisible = (list) => {
	for (let i = 0; i < list.length; i++) {
		list[i].style.display = '';
	}
};

/***
 * Main show page functionality, that builds the student list
 */
const showPage = (pageNo) => {
	buildStudentLists(totalStudents);
	appendPageLinks(totalStudents);
	setActiveClassOnButton(pageNo);
};

/***
 * Controls the click event on the bubbled up 'a' event
 * Filters and displays the appropriate students
 * Sets the Active on the button based on the button clicked
 */
studentWindow.addEventListener('click', (event) => {
	if (event.target.tagName === 'A') {
		let pageNumber = event.target.innerText;
		resetStudentListToVisible(totalStudents);
		buildStudentLists(totalStudents, pageNumber);
		setActiveClassOnButton(pageNumber);
	}
});

/**
 * DOM Content Loaded Listener that will create the page, button strip, and buttons
 * sets the default
 * By design the page will load the first 10 students
 */
studentWindow.addEventListener('DOMContentLoaded', () => {
	const defaultActiveButtonIndex = 1;
	showPage(defaultActiveButtonIndex);
});
