/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
Global variables
***/
const studentWindow = window;
const totalStudents = document.getElementsByClassName('student-item');
const studentHeader = document.querySelector('.page-header');

let _globalFilter = false; // The global control for the filter
let _globalFilterList = [];
/***
 * Builds the search container elements
 */
const createSearchContainer = () => {
	// first create the div container for all the search elements
	let searchContainer = document.createElement('div');
	searchContainer.className = 'student-search';

	let searchInput = document.createElement('input');
	searchInput.setAttribute('placeholder', 'Search for students...');

	let searchButton = document.createElement('button');
	searchButton.textContent = 'Search';

	searchContainer.appendChild(searchInput);
	searchContainer.append(searchButton);
	studentHeader.append(searchContainer);
};

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
 * Sets the display properties for each list item to none
 */
const setStudentsListToInvisible = (list) => {
	for (let i = 0; i < list.length; i++) {
		list[i].style.display = 'none';
	}
};

/***
 * Function to reset the filter results
 */
const resetFilterResults = () => {
	if (_globalFilter === true) {
		setCurrentFilterState(false);
		[...totalStudents].forEach((student) => student.classList.remove('filtered'));
		let errorContainer = document.querySelector('.error_message');
		if (errorContainer) {
			errorContainer.remove();
		}
	}
};

/***
 * Shows error message
 */
const showNoValuesFoundMessage = (searchText) => {
	let docSearchContainer = document.querySelector('.student-list');

	let mainMessageContainer = document.createElement('div');
	mainMessageContainer.classList.add('error_message');

	let messageSpan = document.createElement('span');
	messageSpan.innerText = `No students found with: ${searchText} `;

	mainMessageContainer.appendChild(messageSpan);
	docSearchContainer.appendChild(mainMessageContainer);
};

/***
 * Filters the student list based on the text provided
 */
const filterStudentList = (searchText) => {
	let studentNames = document.querySelectorAll('h3');

	for (let i = 0; i < studentNames.length; i++) {
		if (studentNames[i].innerText.toLowerCase().includes(searchText.toLowerCase())) {
			studentNames[i].parentNode.parentNode.classList.add('filtered');
		}
	}
};

/***
 * Main show page functionality, that builds the student list
 */
const showPage = (pageNo) => {
	createSearchContainer();
	buildStudentLists(totalStudents);
	appendPageLinks(totalStudents);
	setActiveClassOnButton(pageNo);
};

/***
 * Controls events for application level functionality
 */
studentWindow.addEventListener('click', (event) => {
	if (event.target.tagName === 'A' && _globalFilter === false) {
		let pageNumber = event.target.innerText;
		resetStudentListToVisible(totalStudents);
		buildStudentLists(totalStudents, pageNumber);
		setActiveClassOnButton(pageNumber);
	}

	if (event.target.tagName === 'A' && _globalFilter === true) {
		let pageNumber = event.target.innerText;
		resetStudentListToVisible(_globalFilterList);
		buildStudentLists(_globalFilterList, pageNumber);
		setActiveClassOnButton(pageNumber);
	}

	if (event.target.tagName === 'BUTTON') {
		resetFilterResults(); // will reset the filter results if needed

		let searchText = document.querySelector('input').value;
		filterStudentList(searchText);

		setStudentsListToInvisible(totalStudents);
		setCurrentFilterState(true);

		_globalFilterList = document.querySelectorAll('.filtered');

		if (_globalFilterList.length === 0) {
			showNoValuesFoundMessage(searchText);
		}

		resetStudentListToVisible(_globalFilterList);
		buildStudentLists(_globalFilterList);

		// delete the ul and rebuild
		buildFilterPaginationBar();
	}
});

/***
 * Helper to set the Global current state of the Filter
 */
const setCurrentFilterState = (state) => {
	if (typeof state === 'boolean') {
		_globalFilter = state;
	}
};

/***
 * Builds filtered pagination bar
 */
const buildFilterPaginationBar = () => {
	document.querySelector('.pagination').remove();
	appendPageLinks(_globalFilterList);
	setActiveClassOnButton();
};

/**
 * DOM Content Loaded Listener that will create the page, button strip, and buttons
 * sets the default
 * By design the page will load the first 10 students
 */
studentWindow.addEventListener('DOMContentLoaded', () => {
	const defaultActiveButtonIndex = 1;
	showPage(defaultActiveButtonIndex);
});
