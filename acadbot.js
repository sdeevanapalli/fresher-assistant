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
        "cou": [
            "what courses are offered at bphc?",
            "what are standard courses?",
        ],
        "cdcs": [
            "what are cdcs?"
        ],
        "wh": [
            "what courses are offered at bphc?",
            "what are standard courses?",
            "what are cdcs?"
        ],
        "how": [
            "how many electives are there?",
        ],
        "mi": [
          "what are minor courses?",
        ],
        "elec": [
          "how many electives are there?",
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
        "what courses are offered at bphc?": [
            "Mainly three types of courses are offered: Standard Courses, Labs and Formal Projects"
        ],
        "what are standard courses?": [
            "Make up majority of coursework.They consist of three components: Lectures, Tutorials and\nPracticals."
        ],
        "what are cdcs?": [
            "Core Disciplinary Courses are mandatory courses related to your choses branch of study.\nGraduation is not possible without these courses",
        ],
        "how many electives are there?": [
            "Three electives: Disciplinary electives(del), Humanities Electives(huel) and\nOpen Electives(opels)."
        ],
        "what are minor courses?": [
            "By paying a nominal fee, achieving the CGPA cutoff, and fulfulling the course requirement\nyoucan earn an additional degree."
        ],
        "when can we take up formal projects?": [
          "You don't need to worry about these until the end of 2nd year, but you can also apply for these\nprojexts earlier."
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
  
  // function compare(utterancesArray, answersArray, string) {
  //   let reply;
  //   let replyFound = false;
  //   for (let x = 0; x < utterancesArray.length; x++) {
  //     for (let y = 0; y < utterancesArray[x].length; y++) {
  //       if (utterancesArray[x][y] === string) {
  //         let replies = answersArray[x];
  //         reply = replies[Math.floor(Math.random() * replies.length)];
  //         replyFound = true;
  //         break;
  //       }
  //     }
  //     if (replyFound) {
  //       break;
  //     }
  //   }
  //   return reply;
  // }
  
  // function addChatEntry(input, product) {
  //   const messagesContainer = document.getElementById("messages");
  //   let userDiv = document.createElement("div");
  //   userDiv.id = "user";
  //   userDiv.className = "user response";
  //   userDiv.innerHTML = <span>${input}</span>;
  //   messagesContainer.appendChild(userDiv);
  
  //   let botDiv = document.createElement("div");
  //   let botText = document.createElement("span");
  //   botDiv.id = "bot";
  //   botDiv.className = "bot response";
  //   botText.innerText = "Typing...";
  //   botDiv.appendChild(botText);
  //   messagesContainer.appendChild(botDiv);
  
  //   messagesContainer.scrollTop =
  //     messagesContainer.scrollHeight - messagesContainer.clientHeight;
  
  //   setTimeout(() => {
  //     botText.innerText = ${product};
  //   }, 2000);
  // }