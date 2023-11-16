document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded event fired!');
    const appElement = document.getElementById('app');
  
    // Load Bible text from the JSON file
    const bibleTextResponse = await fetch('./bibleText.json');
    const bibleText = await bibleTextResponse.json();
  
    // Fetch the Bible chapter content for 1st Timothy chapter 1
    const chapter1Text = bibleText["1Timothy"]["chapter1"];
  
    // Render the Bible chapter in the middle column
    const middleColumn = document.getElementById('middle-column');
    middleColumn.innerHTML = chapter1Text.join('<br>');
  
    // Create the left column for comments
    const leftColumn = document.getElementById('left-column');
  
    // Create the right column for viewing comments
    const rightColumn = document.getElementById('right-column');
  
    // Function to save comments
    const saveComment = async (verse, comment) => {
        const response = await fetch('https://choice-project-0d60278c0263.herokuapp.com/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ verse, comment }),
        });
        const newComment = await response.json();
        renderComments(verse);
        return newComment;
    };
  
    // Function to render comments for a specific verse
    const renderComments = async (verse) => {
        const response = await fetch(`https://choice-project-0d60278c0263.herokuapp.com/api/comments/${verse}`);
        const comments = await response.json();
  
        const commentsHtml = comments.map(comment => `<p>${comment.comment}</p>`).join('');
        rightColumn.innerHTML = `<h2>Comments/Reflections for ${verse}</h2>${commentsHtml}`;
    };
  
    // Event listener for highlighting text and adding comments
    const handleSelection = () => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
  
        if (selectedText !== '') {
            console.log('Selected Text:', selectedText);
  
            const commentInput = document.createElement('textarea');
            commentInput.id = 'comment-input';
            leftColumn.innerHTML = '<h2>Add Comment/Reflection</h2>';
            leftColumn.appendChild(commentInput);
  
            const commentButton = document.createElement('button');
            commentButton.id = 'comment-button';
            commentButton.textContent = 'Save Comment';
            commentButton.addEventListener('click', async () => {
                const comment = commentInput.value.trim();
                if (comment !== '') {
                    await saveComment(selectedText, comment);
                }
            });
            leftColumn.appendChild(commentButton);
        }
    };
  
    middleColumn.addEventListener('mouseup', handleSelection);
    middleColumn.addEventListener('touchend', handleSelection);
  });
  