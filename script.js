
const API_URL = "http://127.0.0.1:5000/courses"; // Update this if the port or URL changes
 


const courseList = document.getElementById("courseList");                    // DOM Elements
const addCourseForm = document.getElementById("addCourseForm");
const addCourseMessage = document.getElementById("addCourseMessage");

// Fetch and display all courses
async function fetchCourses() {
    const response = await fetch(baseURL);
    const courses = await response.json();
    renderCourses(courses);
}


function renderCourses(courses) {                                 // Display the list of courses
    courseList.innerHTML = ""; // Clear previous entries
    courses.forEach(course => {
        const courseDiv = document.createElement("div");
        courseDiv.className = "course";
        courseDiv.innerHTML = `
            <div class="course-title">${course.title} (${course.duration})</div>
            <div>${course.description}</div>
            <div class="course-actions">
                <button class="edit" onclick="editCourse(${course.id})">Edit</button>
                <button class="delete" onclick="deleteCourse(${course.id})">Delete</button>
            </div>
        `;
        courseList.appendChild(courseDiv);
    });
}

addCourseForm.addEventListener("submit", async (event) => {           // Adding a new course
    event.preventDefault();
    const newCourse = {
        title: document.getElementById("courseTitle").value,
        description: document.getElementById("courseDescription").value,
        duration: document.getElementById("courseDuration").value
    };

    const response = await fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCourse)
    });

    if (response.ok) {
        addCourseMessage.innerText = "Course added successfully!";
        addCourseForm.reset();
        fetchCourses(); // Refresh the list
    }
});


async function deleteCourse(courseId) {         // Deleteing a course by ID
    await fetch(`${baseURL}/${courseId}`, {
        method: "DELETE"
    });
    fetchCourses(); // Refresh the list
}

 
async function editCourse(courseId) {             // Editing a course 
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");
    const newDuration = prompt("Enter new duration:");

    const updatedCourse = {
        title: newTitle,
        description: newDescription,
        duration: newDuration
    };

    await fetch(`${baseURL}/${courseId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedCourse)
    });
    fetchCourses(); // Refresh the list
}


fetchCourses();
