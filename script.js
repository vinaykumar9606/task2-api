// JavaScript to handle course CRUD operations
const API_URL = "http://127.0.0.1:5000/courses"; // Update this if the port or URL changes
 

// DOM Elements
const courseList = document.getElementById("courseList");
const addCourseForm = document.getElementById("addCourseForm");
const addCourseMessage = document.getElementById("addCourseMessage");

// Fetch and display all courses
async function fetchCourses() {
    const response = await fetch(baseURL);
    const courses = await response.json();
    renderCourses(courses);
}

// Display the list of courses
function renderCourses(courses) {
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

// Add a new course
addCourseForm.addEventListener("submit", async (event) => {
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

// Delete a course by ID
async function deleteCourse(courseId) {
    await fetch(`${baseURL}/${courseId}`, {
        method: "DELETE"
    });
    fetchCourses(); // Refresh the list
}

// Edit a course (Prompt-based for simplicity)
async function editCourse(courseId) {
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

// Initial fetch to load courses
fetchCourses();
