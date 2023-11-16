document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired!');
  
    // Load Bible text from the JSON file
    fetch('./bibleText.json')
        .then(response => response.json())
        .then(bibleText => {
            // Fetch the Bible chapter content for 1st Timothy chapter 1
            const chapter1Text = bibleText["1Timothy"]["chapter1"];
  
            // Render the Bible chapter in the middle column
            const middleColumn = document.getElementById('middle-column');
            middleColumn.innerHTML = chapter1Text.join('<br>');
  
            // Include Disqus script (replace 'your-disqus-shortname' with your Disqus shortname)
            const disqusScript = document.createElement('script');
            disqusScript.src = 'https://choice-project.disqus.com/embed.js';
            disqusScript.setAttribute('data-timestamp', +new Date());
            document.head.appendChild(disqusScript);
  
            // Display Disqus comments section
            const disqusContainer = document.createElement('div');
            disqusContainer.id = 'disqus_thread';
            middleColumn.appendChild(disqusContainer);
  
            // Event listener for highlighting text and adding comments
            const handleSelection = () => {
                const selection = window.getSelection();
                const selectedText = selection.toString().trim();
  
                if (selectedText !== '') {
                    console.log('Selected Text:', selectedText);
                }
            };
  
            middleColumn.addEventListener('mouseup', handleSelection);
            middleColumn.addEventListener('touchend', handleSelection);

            // Initialize Disqus after Bible text is loaded
            if (typeof DISQUS !== 'undefined') {
                DISQUS.reset({
                    reload: true,
                    config: disqusConfig,
                });
             }
        })
        .catch(error => console.error('Error fetching Bible text:', error));
});
