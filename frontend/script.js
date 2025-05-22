document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    // Handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected page, hide others
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === pageId) {
                    page.classList.add('active');
                }
            });
        });
    });
    
    // Chat functionality
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    
    // Send message when button is clicked
    sendButton.addEventListener('click', sendMessage);
    
    // Send message when Enter key is pressed (but allow Shift+Enter for new lines)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message to chat
            addMessageToChat('user', message);
            
            // Clear input
            chatInput.value = '';
            
            // Simulate AI response (would connect to backend in real app)
            setTimeout(() => {
                simulateAIResponse(message);
            }, 1000);
        }
    }
    
    function addMessageToChat(sender, text) {
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-time">${time}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function simulateAIResponse(userMessage) {
        // This is a placeholder for actual AI response
        // In a real app, you would call your Flask backend with the Gemini API
        let response = "I understand how you feel. Would you like to talk more about that?";
        
        // Simple response logic based on user message
        if (userMessage.toLowerCase().includes('sad') || userMessage.toLowerCase().includes('depressed')) {
            response = "I'm sorry to hear you're feeling down. Remember that it's okay to not be okay sometimes. Would you like to explore some coping strategies?";
        } else if (userMessage.toLowerCase().includes('happy') || userMessage.toLowerCase().includes('good')) {
            response = "I'm glad to hear you're doing well! What's been contributing to your positive mood?";
        } else if (userMessage.toLowerCase().includes('anxious') || userMessage.toLowerCase().includes('worried')) {
            response = "Anxiety can be challenging. Have you tried any relaxation techniques like deep breathing or mindfulness?";
        } else if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
            response = "Hello! How are you feeling today?";
        }
        
        // Add AI response to chat
        addMessageToChat('ai', response);
    }
    
    // Mood Tracker functionality
    const moodButtons = document.querySelectorAll('.mood-btn');
    const moodNote = document.getElementById('mood-note');
    const saveMoodButton = document.getElementById('save-mood');
    const moodHistoryTable = document.getElementById('mood-history-table');
    
    // Store moods in localStorage
    let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
    
    // Display existing mood history
    renderMoodHistory();
    
    // Handle mood button selection
    let selectedMood = null;
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedMood = this.getAttribute('data-mood');
        });
    });
    
    // Save mood entry
    saveMoodButton.addEventListener('click', function() {
        if (selectedMood) {
            const note = moodNote.value.trim();
            const timestamp = new Date();
            
            // Create new mood entry
            const moodEntry = {
                mood: selectedMood,
                note: note,
                date: timestamp.toLocaleDateString(),
                time: timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
            
            // Add to history and save to localStorage
            moodHistory.unshift(moodEntry); // Add to beginning of array
            localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
            
            // Update display
            renderMoodHistory();
            
            // Reset form
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            moodNote.value = '';
            selectedMood = null;
            
            // Show confirmation
            alert('Mood saved successfully!');
        } else {
            alert('Please select a mood first.');
        }
    });
    
    function renderMoodHistory() {
        if (!moodHistoryTable) return;
        
        moodHistoryTable.innerHTML = '';
        
        if (moodHistory.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = '<td colspan="4" class="empty-history">No mood entries yet</td>';
            moodHistoryTable.appendChild(emptyRow);
            return;
        }
        
        // Display most recent 10 entries
        const recentEntries = moodHistory.slice(0, 10);
        
        recentEntries.forEach(entry => {
            const row = document.createElement('tr');
            
            // Get emoji for mood
            let moodEmoji = '😐';
            switch(entry.mood) {
                case 'happy': moodEmoji = '😀'; break;
                case 'neutral': moodEmoji = '😐'; break;
                case 'sad': moodEmoji = '😔'; break;
                case 'crying': moodEmoji = '😢'; break;
                case 'angry': moodEmoji = '😠'; break;
            }
            
            row.innerHTML = `
                <td>${entry.date}</td>
                <td>${entry.time}</td>
                <td>${moodEmoji} ${entry.mood}</td>
                <td>${entry.note || '-'}</td>
            `;
            
            moodHistoryTable.appendChild(row);
        });
    }
    
    // Journal functionality
    const journalTitle = document.getElementById('journal-title');
    const journalContent = document.getElementById('journal-content');
    const saveJournalButton = document.getElementById('save-journal');
    const journalList = document.getElementById('journal-list');
    
    // Store journal entries in localStorage
    let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    
    // Display existing journal entries
    renderJournalEntries();
    
    // Save journal entry
    saveJournalButton.addEventListener('click', function() {
        const title = journalTitle.value.trim();
        const content = journalContent.value.trim();
        
        if (title && content) {
            const timestamp = new Date();
            
            // Create new journal entry
            const journalEntry = {
                id: Date.now(), // Unique ID based on timestamp
                title: title,
                content: content,
                date: timestamp.toLocaleDateString(),
                time: timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
            
            // Add to entries and save to localStorage
            journalEntries.unshift(journalEntry); // Add to beginning of array
            localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
            
            // Update display
            renderJournalEntries();
            
            // Reset form
            journalTitle.value = '';
            journalContent.value = '';
            
            // Show confirmation
            alert('Journal entry saved successfully!');
        } else {
            alert('Please enter both a title and content for your journal entry.');
        }
    });
    
    function renderJournalEntries() {
        if (!journalList) return;
        
        journalList.innerHTML = '';
        
        if (journalEntries.length === 0) {
            journalList.innerHTML = '<div class="empty-journal">No journal entries yet</div>';
            return;
        }
        
        journalEntries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'journal-entry';
            entryDiv.innerHTML = `
                <div class="journal-entry-header">
                    <h4>${entry.title}</h4>
                    <div class="journal-entry-date">${entry.date} at ${entry.time}</div>
                </div>
                <div class="journal-entry-content">${entry.content}</div>
                <div class="journal-entry-actions">
                    <button class="journal-view-btn" data-id="${entry.id}">View</button>
                    <button class="journal-delete-btn" data-id="${entry.id}">Delete</button>
                </div>
            `;
            
            journalList.appendChild(entryDiv);
        });
        
        // Add event listeners to view/delete buttons
        document.querySelectorAll('.journal-view-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const entry = journalEntries.find(entry => entry.id === id);
                if (entry) {
                    alert(`${entry.title}\n\n${entry.content}`);
                    // In a real app, you might show this in a modal instead
                }
            });
        });
        
        document.querySelectorAll('.journal-delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                if (confirm('Are you sure you want to delete this journal entry?')) {
                    journalEntries = journalEntries.filter(entry => entry.id !== id);
                    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
                    renderJournalEntries();
                }
            });
        });
    }
    
    // Handle "Start Chatting" button on home page
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Find the chat nav item and trigger a click on it
            const chatNavItem = document.querySelector('.nav-item[data-page="chat"]');
            if (chatNavItem) {
                chatNavItem.click();
            }
        });
    }
});
