document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#input").addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let input = document.getElementById("input").value;
            document.getElementById("input").value = "";
            let response = compare(input);
            addChatEntry(input, response);
        }
    });
});

// Listen for input event to suggest questions
document.getElementById("input").addEventListener("input", function (e) {
    const inputText = e.target.value.toLowerCase().trim();
    suggestQuestions(inputText);
});

function suggestQuestions(input) {
    console.log("Input:", input); // Check if input is received
    const dropdownContent = document.getElementById("dropdownContent");
    // Clear previous suggestions
    dropdownContent.innerHTML = "";

    // Keywords and corresponding suggested questions
    const suggestions = {
        "wha": [
            "what is bst?",
            "what is verti?",
            "what is anc?"
        ],
        "why": [
            "why does everyone say lite here at bphc??"
        ],
        "wh": [
            "what is verti?",
            "why does everyone say lite here at bphc??",
            "who is a 'ghot'?",
            "what is anc?",
            "what is bst?",
            "who is called dulla?",
        ],
        "who": [
            "who is a 'ghot'?",
            "who is called dulla?"
        ],
        "lit": [
          "why does everyone say lite here at bphc??",
        ],
        "ver": [
          "what is verti?",
        ],
        // Add more keywords and suggestions as needed
    };

    // Check if input contains any keyword
    for (const keyword in suggestions) {
        if (input.includes(keyword)) {
            console.log("Keyword found:", keyword); // Check if keyword is found
            const questions = suggestions[keyword];
            questions.forEach(question => {
                const suggestionDiv = document.createElement("div");
                suggestionDiv.textContent = question;
                suggestionDiv.addEventListener("click", function () {
                    document.getElementById("input").value = question;
                    clearDropdown(); // Clear suggestions after selection
                });
                dropdownContent.appendChild(suggestionDiv);
            });
        }
    }

    // Show or hide the dropdown based on suggestions
    if (dropdownContent.children.length > 0) {
        console.log("Suggestions available:", dropdownContent.children.length); // Check if suggestions are available
        dropdownContent.style.display = "block";
    } else {
        console.log("No suggestions available");
        dropdownContent.style.display = "none";
    }
}

function clearDropdown() {
    document.getElementById("dropdownContent").innerHTML = "";
    document.getElementById("dropdownContent").style.display = "none";
};

function compare(input) {
    input = input.toLowerCase().trim();
    const responses = {
        "why does everyone say lite here at bphc??": [
            "It's a way of life here at BPHC.It means that the issue is 'Light' or doesn't matter which\nisn't always the case."
        ],
        "what is verti?": [
            "The dream that remains a dream for most freshers.  It is the chance to get upgraded to a\nbetter branch awarded to the highly meritorious."
        ],
        "who is a 'ghot'?": [
            "Someone still stuck in their Jee phase who spends all their time studying. It becomes\nimpossible to have a normal conversation with them without talking about academics. But it’s more of a praise than an insult.",
        ],
        "what is anc?": [
            "It stands for all night canteen. You make orders on smart campus and it is the place to\nsatisfy your midnight cravings. Money is spent like monopoly money here. It is one of the best things that our campus has to offer, make the most of it."
        ],
        "what is bst?": [
            "It stands for Bitsian standard time. It varies from IST by minimum 30 minutes. So every\nevent you attend- inauguration, artist’s pro shows, comedy nights and cultural nights, expect it to be delayed by 30 minutes at least."
        ],
        "who is called dulla?": [
          "It refers to all the souls that like to torment themselves by pursuing a dual degree. They\nare constantly lamenting about their falling cg, workload and regrets of not choosing a single degree."
        ],
        // Add more questions and answers as needed
    };

    if (responses.hasOwnProperty(input)) {
        const answers = responses[input];
        return answers[Math.floor(Math.random() * answers.length)];
    } else {
        return "I'm not sure how to respond to that.";
    }
}

function addChatEntry(input, product) {
    const messagesContainer = document.getElementById("messages");
    
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.innerHTML = `${input}`;
    messagesContainer.appendChild(userDiv);
   
    let botDiv = document.createElement("div");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botDiv.className = "bot response";
    botText.innerText = "Typing...";
    botDiv.appendChild(botText);
    messagesContainer.appendChild(botDiv);
   
    setTimeout(() => {
        botText.innerText = `${product}`;
    }, 2000);
}