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
        }
    };

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
