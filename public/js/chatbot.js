// Select chatbot window and toggle button
const chatbotWindow = document.querySelector(".chatbot-window");
const chatbotToggle = document.getElementById("chatbot-toggle");

// Show the chatbot window by default
chatbotWindow.style.display = "none";

// List of initial questions related to blog topics
let questions = [
    "Do you want tips on a balanced diet for mental health?",
    "Are you looking for exercise routines suitable for people with disabilities?",
    "Do you need product recommendations for assistive devices?",
    "Would you like advice on managing stress and mental health?",
    "Looking for resources on accessible education?"
];

// Track which questions have been asked
let askedQuestions = [];

// Display chatbot messages
function displayMessage(sender, message) {
    const messages = document.querySelector(".chatbot-messages");
    //messages.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
    messages.scrollTop = messages.scrollHeight;

    // Determine the message class based on sender
    const messageClass = sender === "Chatbot" ? "chatbot-response" : "user-response";
    messages.innerHTML += `<p class="${messageClass}"><strong>${sender}:</strong> ${message}</p>`;
}



// Display list of questions for user to select
// function displayQuestionOptions() {
//     const optionsContainer = document.querySelector(".chatbot-options");
//     optionsContainer.innerHTML = ""; // Clear previous options

//     questions.forEach((question, index) => {
//         const questionButton = document.createElement("button");
//         questionButton.classList.add("question-button");
//         questionButton.textContent = question;
//         questionButton.addEventListener("click", () => handleQuestionSelection(index));
//         optionsContainer.appendChild(questionButton);
//     });
// }

// Handle question selection and provide response
function handleQuestionSelection(selectedIndex) {
    // Show selected question in chatbot
    displayMessage("User", questions[selectedIndex]);

    // Respond based on selected question
    const responses = [
        "Our blogs under 'Diet' covers balanced nutrition tips for mental well-being.",
        "Check out our 'Exercises' blogs for routines suited to various needs.",
        "We have product recommendations for assistive devices under the 'Products' category.",
        "Explore our 'Mental Health' blogs for stress management techniques.",
        "Our 'Schools' page provides resources and school info."
    ];

    // Show chatbot's response
    displayMessage("Chatbot", responses[selectedIndex]);

    // Remove the asked question from the list and update available options
    questions.splice(selectedIndex, 1);
    displayQuestionOptions();
}

// Show initial questions on load
displayMessage("Chatbot", "What would you like to know?");
// displayQuestionOptions();

// Toggle chatbot visibility on button click
chatbotToggle.addEventListener("click", function () {
    chatbotWindow.style.display = chatbotWindow.style.display === "none" ? "block" : "none";
});

document.getElementById('chat').addEventListener('submit', async e => {
    e.preventDefault();

    const input = document.getElementById('chat-input').value;
    displayMessage('User', input);

    const response = await fetch('/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
    });

    const data = await response.json();
    displayMessage('Chatbot', data.message);
})

const blogCategories = ['diet', 'exercises', 'products', 'mental-health'];

blogCategories.forEach(async category => {

    const response = await fetch('/get-blogs/' + category);

    const data = await response.json();
    console.log(data.data)
    populateCategory(category, data.data);

})


function populateCategory(category, blogs) {
    console.log(category)
    const categoryContainer = document.getElementById(category.toLowerCase());
    console.error(categoryContainer)
    blogs.forEach(blog => {
        categoryContainer.innerHTML += `
            <div class="card">
                <h3>${blog.title}</h3>
                <p>${blog.message} </p>
                    <p><strong>Author:</strong> ${blog.name}</p>
            </div>
            `
    });

}