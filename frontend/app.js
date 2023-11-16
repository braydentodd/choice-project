document.addEventListener('DOMContentLoaded', async () => {
  const appElement = document.getElementById('app');

  // Load Bible text from the JSON file
  const bibleTextResponse = await fetch('./bibleText.json');
  const bibleText = await bibleTextResponse.json();

  // Fetch the Bible chapter content for 1st Timothy chapter 1
  const chapter1Text = bibleText["1Timothy"]["chapter1"];

  const versesElement = document.getElementById('verses');
  versesElement.innerHTML = chapter1Text.join('<br>');

  // Render the Bible chapter in the middle column
  const middleColumn = document.getElementById('middle-column');
  middleColumn.innerHTML = chapter1Text.join('<br>');

  // Create the left column for comments
  const leftColumn = document.getElementById('left-column');

  // Create the right column for viewing comments
  const rightColumn = document.getElementById('right-column');

  // Function to save comments
  const saveComment = async (verse, comment) => {
      // Mock API endpoint for saving comments (replace with your actual API endpoint)
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
      // Mock API endpoint for fetching comments (replace with your actual API endpoint)
      const response = await fetch(`/api/comments/${verse}`);
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
