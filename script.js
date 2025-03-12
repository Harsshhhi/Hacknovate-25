document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let score = 0;
    let totalQuestions = 8;
    let feedback = [];

    // Loop through each question and calculate score, as well as provide feedback for each selection
    for (let i = 1; i <= totalQuestions; i++) {
        let question = document.querySelector(`input[name="q${i}"]:checked`);
        if (question) {
            // Add feedback for the selected answer
            let selectedAnswer = question.value;
            let questionFeedback = "";

            if (selectedAnswer === 'often') {
                questionFeedback = "You are experiencing this issue frequently. Consider taking steps to manage it.";
                score += 4;
            } else if (selectedAnswer === 'sometimes') {
                questionFeedback = "You sometimes feel this way, which indicates a moderate level of impact.";
                score += 3;
            } else if (selectedAnswer === 'rarely') {
                questionFeedback = "It rarely affects you, which is a good sign. Keep maintaining a healthy balance!";
                score += 2;
            } else if (selectedAnswer === 'never') {
                questionFeedback = "That's great! It shows you're managing this aspect of your mental health well.";
                score += 1;
            }

            // Store feedback for each question
            feedback.push({
                question: `Question ${i}`,
                feedback: questionFeedback
            });
        }
    }

    // Calculate overall result
    let resultMessage = "";
    if (score >= 30) {
        resultMessage = "Your score indicates high levels of stress or anxiety. It may be helpful to reach out to a professional.";
    } else if (score >= 20) {
        resultMessage = "You're showing some signs of stress or discomfort. Consider speaking to someone for support.";
    } else {
        resultMessage = "Great job! Your mental health seems to be in a good place. Keep it up!";
    }

    // Display the feedback
    let feedbackHtml = '<h2>Your Quiz Feedback</h2>';
    feedback.forEach(item => {
        feedbackHtml += `
            <div class="feedback-item">
                <h3>${item.question}</h3>
                <p>${item.feedback}</p>
            </div>
        `;
    });

    // Add the overall result at the end
    feedbackHtml += `<h3>Overall Result: ${resultMessage}</h3>`;

    // Show the feedback and result to the user
    document.querySelector('.main-content').innerHTML = feedbackHtml;
});


