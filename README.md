# Coding Quiz

## Requirements

* GIVEN I am taking a code quiz
* WHEN I click the start button
* THEN a timer starts and I am presented with a question
* WHEN I answer a question
* THEN I am presented with another question
* WHEN I answer a question incorrectly
* THEN time is subtracted from the clock
* WHEN all questions are answered or the timer reaches 0
* THEN the game is over
* WHEN the game is over
* THEN I can save my initials and score

## Code Example
```
function buildQuiz() {
    var quizQuestion = questions[currentQuestionIndex].question;
    quizQuestionEl.textContent = quizQuestion;
    // use for loop to create a list of answers with clickable buttons for selected question
    var quizChoices = questions[currentQuestionIndex].choices;
    for (var i = 0; i < quizChoices.length; i++) {
        var quizChoice = quizChoices[i];
        var listItemEl = document.createElement("li");
        listItemEl.className = "list-choice";
        var selectButton = document.createElement("button");
        selectButton.className = "button-choice";
        selectButton.textContent = quizChoice;
        // give each answer a unique index so answer can be compared to correct answer
        selectButton.setAttribute("selectedIndex", i);
        // selected button will generate a click event
        selectButton.addEventListener("click", choiceClicked);
        listItemEl.appendChild(selectButton);
        // display all the answer buttons on the page
        quizAnswersEl.appendChild(listItemEl);
    }
}
```

## Screenshots
![](assets\images\codeQuiz_sreenshot1.png)
![](assets\images\codeQuiz_screenshot2.png)
![](assets\images\codeQuiz_screenshot3.png)

https://essennejaye.github.io/coding-quiz/