/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
// Global Variables:
let studentWindow = window;
let totalStudents = document.getElementsByClassName('student-item');

// Builds the student list
const buildStudentLists = (list, page = 1) => {
	let start = page * 10 - 10;
	let finish = page * 10;
	for (let i = 0; i < list.length; i++) {
		if (!(i >= start && i < finish)) {
			list[i].style.display = 'none';
		}
	}
};

// Builds the button strip
const buildButtonStrip = (list) => {
	let totalButtons = Math.ceil(list.length / 10); // total number of buttons

	let pageContainer = document.getElementsByClassName('page')[0]; // Get the 'page' class'
	let buttonContainer = document.createElement('div'); // Create base button strip

	let buttonListItemContainer = document.createElement('ul');
	buttonListItemContainer.className = 'pagination';

	// Create the buttons list inner function for now
	const getli = (buttonNum) => {
		let li = document.createElement('li');
		let link = document.createElement('a');
		link.setAttribute('href', '#');
		link.textContent = `${buttonNum}`;
		li.appendChild(link);
		return li;
	};

	// Now loop through the totalButtons
	for (let i = 0; i < totalButtons; i++) {
		let res = getli(i + 1);
		buttonListItemContainer.appendChild(res);
	}

	buttonContainer.appendChild(buttonListItemContainer);
	pageContainer.appendChild(buttonContainer);
};

// Sets the list to the first 10 items when page is reloaded
studentWindow.addEventListener('DOMContentLoaded', () => {
	buildStudentLists(totalStudents);
	buildButtonStrip(totalStudents);
	setActiveClassOnButton();
});

const resetStudentsList = (list) => {
	for (let i = 0; i < list.length; i++) {
		list[i].style.display = '';
	}
};

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

studentWindow.addEventListener('click', (event) => {
	if (event.target.tagName === 'A') {
		let pageNumber = event.target.innerText;
		setActiveClassOnButton(pageNumber);
		resetStudentsList(totalStudents);
		buildStudentLists(totalStudents, pageNumber);
	}
});

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

// Remember to delete the comments that came with this file, and replace them with your own code comments.
