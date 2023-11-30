document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired!');

    // Get references to the left and right columns
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');

    // Include Disqus script (replace 'your-disqus-shortname' with your Disqus shortname)
    const disqusScript = document.createElement('script');
    disqusScript.src = 'https://choice-project.disqus.com/embed.js';
    disqusScript.setAttribute('data-timestamp', +new Date());
    document.head.appendChild(disqusScript);

    // Display Disqus comments section
    const disqusContainer = document.createElement('div');
    disqusContainer.id = 'disqus_thread';
    rightColumn.appendChild(disqusContainer);

    // Event listener for highlighting text and adding comments
    const handleSelection = () => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selectedText !== '') {
            console.log('Selected Text:', selectedText);
            // If text is selected, show Disqus container
            disqusContainer.style.display = 'block';
          } else {
            // If no text is selected, hide Disqus container
            disqusContainer.style.display = 'none';
          }
    };

    // Function to load Disqus comments for a specific verse
    const loadDisqusComments = (selectedBook, selectedChapter) => {
        const identifier = `${selectedBook}-${selectedChapter}`;
        
        DISQUS.reset({
        reload: true,
        config: function () {
            this.page.identifier = identifier;
            this.page.url = `https://braydentodd.github.io/choice-project/${selectedBook}/${selectedChapter}`;
        }
        });
    };

    // Event listener for verse selection
    document.getElementById('left-column').addEventListener('click', (event) => {
        const selectedVerse = event.target.getAttribute('data-verse');
        if (selectedVerse) {
        console.log(`Selected Verse: ${selectedVerse}`);
        loadDisqusComments(selectedVerse);
        }
    });

    // Event listener for book and chapter selection
    const bookSelector = document.getElementById('book-selector');
    const chapterSelector = document.getElementById('chapter-selector');

    bookSelector.addEventListener('change', updateBibleText);
    chapterSelector.addEventListener('change', updateBibleText);

    // Function to update the displayed Bible text based on the selected book and chapter
    function updateBibleText() {
        const selectedBook = bookSelector.value;
        const selectedChapter = chapterSelector.value;
        const selectedChapterData = bibleText[selectedBook][selectedChapter];
        disqusContainer.style.display = 'none';
        displayBibleText(selectedChapterData);
        loadDisqusComments(selectedBook, selectedChapter);
    }

    function displayBibleText(chapterData) {
        const leftColumn = document.getElementById('left-column');
        
        // Clear existing content in the left column
        leftColumn.innerHTML = '';
      
        // Iterate through verses and add them to the left column
        for (const verseNumber in chapterData) {
          const verseText = chapterData[verseNumber];
          const verseElement = document.createElement('p');
          verseElement.setAttribute('data-verse', verseNumber);
          verseElement.textContent = `${verseNumber} ${verseText}`;
          leftColumn.appendChild(verseElement);
        }
      }

    leftColumn.addEventListener('mouseup', handleSelection);
    leftColumn.addEventListener('touchend', handleSelection);

    // Initialize Disqus after Bible text is loaded
    if (typeof DISQUS !== 'undefined') {
        DISQUS.reset({
            reload: true,
            config: disqus_config,
        });
    }
});


