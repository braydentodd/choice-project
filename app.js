document.addEventListener('DOMContentLoaded', async () => {
    const appElement = document.getElementById('app');
  
    // Fetch the Bible chapter content
    const chapterResponse = await fetch('http://localhost:3000/api/esv/1+Timothy+1');
    const chapterHtml = await chapterResponse.text();
  
    // Render the Bible chapter in the middle column
    const middleColumn = document.createElement('div');
    middleColumn.id = 'middle-column';
    middleColumn.innerHTML = chapterHtml;
    appElement.appendChild(middleColumn);
  
    // Create the left column for comments
    const leftColumn = document.createElement('div');
    leftColumn.id = 'left-column';
    appElement.appendChild(leftColumn);
  
    // Create the right column for viewing comments
    const rightColumn = document.createElement('div');
    rightColumn.id = 'right-column';
    appElement.appendChild(rightColumn);
  
    // Function to save comments
    const saveComment = async (verse, comment) => {
      const response = await fetch('/api/comments', {
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
      const response = await fetch(`/api/comments/${verse}`);
      const comments = await response.json();
  
      const commentsHtml = comments.map(comment => `<p>${comment.comment}</p>`).join('');
      rightColumn.innerHTML = `<h2>Comments/Reflections for ${verse}</h2>${commentsHtml}`;
    };
  
    // Event listener for highlighting text and adding comments
    middleColumn.addEventListener('mouseup', (event) => {
      const selection = window.getSelection();
      const selectedText = selection.toString().trim();
  
      if (selectedText !== '') {
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
    });
  });
  