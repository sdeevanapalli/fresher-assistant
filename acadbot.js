document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    const dropdownContent = document.getElementById("dropdownContent");
    const messagesContainer = document.getElementById("messages");

    // Handle Enter key press for input submission
    inputField.addEventListener("keydown", (e) => {
        if (e.code === "Enter" && inputField.value.trim() !== "") {
            let input = inputField.value.trim();
            inputField.value = "";
            let response = compare(input);
            addChatEntry(input, response);
        }
    });

    // Handle input event for suggestions
    inputField.addEventListener("input", (e) => {
        suggestQuestions(e.target.value.toLowerCase().trim());
    });

    function suggestQuestions(input) {
        dropdownContent.innerHTML = "";

        const suggestions = {
            "cou": ["What courses are offered at BPHC?", "What are standard courses?"],
            "cdcs": ["What are CDCS?"],
            "wh": ["What courses are offered at BPHC?", "What are standard courses?", "What are CDCS?"],
            "how": ["How many electives are there?"],
            "mi": ["What are minor courses?"],
            "elec": ["How many electives are there?"]
        };

        let found = Object.entries(suggestions).some(([keyword, questions]) => {
            if (input.includes(keyword)) {
                questions.forEach((question) => {
                    const suggestionDiv = document.createElement("div");
                    suggestionDiv.textContent = question;
                    suggestionDiv.classList.add("suggestion-item");

                    suggestionDiv.addEventListener("click", () => {
                        inputField.value = question;
                        clearDropdown();
                    });

                    dropdownContent.appendChild(suggestionDiv);
                });
                return true; // Stop checking further keywords once a match is found
            }
        });

        dropdownContent.style.display = found ? "block" : "none";
    }

    function clearDropdown() {
        dropdownContent.innerHTML = "";
        dropdownContent.style.display = "none";
    }

    function compare(input) {
        const responses = {
            "what courses are offered at bphc?": "Mainly three types of courses are offered: Standard Courses, Labs, and Formal Projects.",
            "what are standard courses?": "They make up the majority of coursework, consisting of Lectures, Tutorials, and Practicals.",
            "what are cdcs?": "Core Disciplinary Courses (CDCs) are mandatory courses related to your chosen branch of study. Graduation is not possible without them.",
            "how many electives are there?": "There are three types of electives: Disciplinary Electives (DELs), Humanities Electives (HUELs), and Open Electives (OPELs).",
            "what are minor courses?": "By paying a nominal fee, achieving the CGPA cutoff, and fulfilling the course requirements, you can earn an additional degree.",
            "when can we take up formal projects?": "You usually start formal projects towards the end of your 2nd year, but you can apply earlier if eligible."
        };

        return responses[input.toLowerCase()] || "I'm not sure how to respond to that.";
    }

    function addChatEntry(input, response) {
        let userDiv = document.createElement("div");
        userDiv.className = "user response";
        userDiv.innerHTML = `<span>${input}</span>`;
        messagesContainer.appendChild(userDiv);

        let botDiv = document.createElement("div");
        botDiv.className = "bot response";
        botDiv.innerHTML = `<span class="typing">Typing...</span>`;
        messagesContainer.appendChild(botDiv);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
            botDiv.innerHTML = `<span>${response}</span>`;
        }, 1000);
    }
});
