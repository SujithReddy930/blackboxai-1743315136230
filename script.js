document.getElementById('promptForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const topic = document.getElementById('topic').value;
    const style = document.getElementById('style').value;
    const mood = document.getElementById('mood').value;
    const details = document.getElementById('details').value;
    
    if (!topic) {
        alert('Please enter a main subject');
        return;
    }
    
    const prompt = generatePrompt(topic, style, mood, details);
    displayPrompt(prompt);
    savePromptToHistory(prompt);
});

function generatePrompt(topic, style, mood, details) {
    let prompt = `${topic}, ${style} style, ${mood} mood`;
    if (details) {
        prompt += `, ${details}`;
    }
    return prompt;
}

function displayPrompt(prompt) {
    const resultContainer = document.getElementById('resultContainer');
    const generatedPrompt = document.getElementById('generatedPrompt');
    
    generatedPrompt.textContent = prompt;
    resultContainer.classList.remove('hidden');
    
    // Set up copy button
    document.getElementById('copyButton').addEventListener('click', function() {
        navigator.clipboard.writeText(prompt)
            .then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
    });
}

function savePromptToHistory(prompt) {
    let history = JSON.parse(localStorage.getItem('promptHistory') || '[]');
    history.push({
        prompt: prompt,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('promptHistory', JSON.stringify(history));
}