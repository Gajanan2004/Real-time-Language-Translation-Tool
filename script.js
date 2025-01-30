async function translateText() {
            const sourceLanguage = document.getElementById('sourceLanguage').value;
            const targetLanguage = document.getElementById('targetLanguage').value;
            const sourceText = document.getElementById('sourceText').value;

            if (!sourceText) {
                alert('Please enter text to translate.');
                return;
            }

            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceText)}&langpair=${sourceLanguage}|${targetLanguage}`);
            const data = await response.json();

            if (data.responseData.translatedText) {
                document.getElementById('translatedText').value = data.responseData.translatedText;
            } else {
                document.getElementById('translatedText').value = 'Translation error. Please try again.';
            }
        }

        function speakText() {
            const text = document.getElementById('sourceText').value;
            if (!text) {
                alert('Please enter text to speak.');
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        }

        function startRecognition() {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = document.getElementById('sourceLanguage').value;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                document.getElementById('sourceText').value = transcript;
            };

            recognition.onerror = function(event) {
                alert('Error occurred in recognition: ' + event.error);
            };

            recognition.start();
        }
 