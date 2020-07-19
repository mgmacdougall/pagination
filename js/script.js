/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/***
 * Temp Test Code here - when the page loads the 1st 10 students are displayed
 */
const buildStudentLists = (list, page = 1) => {
	let start = page * 10 - 10;
	let finish = page * 10;
	for (let i = 0; i < list.length; i++) {
		if (!(i >= start && i < finish)) {
			list[i].style.display = 'none';
		}
	}
};

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
window.addEventListener('DOMContentLoaded', (event) => {
	let totalStudents = document.getElementsByClassName('student-item');
	buildStudentLists(totalStudents);
	buildButtonStrip(totalStudents);
});

const resetStudentsList = (list, page = 1) => {
	let start = page * 10 - 10;
	let finish = page * 10;
	for (let i = 0; i < list.length; i++) {
		list[i].style.display = '';
	}
};
const resetAllStudentsToVisible = () => {
	let totalStudents = document.getElementsByClassName('student-item');
	resetStudentsList(totalStudents);
};
window.addEventListener('click', (event) => {
	// console.log(event.target.tagName);
	if (event.target.tagName === 'A') {
		console.log(event.target.innerText);
		let pageNumber = event.target.innerText;
		// now we know what the value is to pass to the buildStudentList
		let totalStudents = document.getElementsByClassName('student-item');
		resetAllStudentsToVisible(totalStudents);
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
