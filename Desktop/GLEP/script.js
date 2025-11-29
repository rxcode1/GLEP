// Copy contract address to clipboard
const caButton = document.getElementById('ca-button');
const contractAddress = '9ihgmbtnBgA5KyCE1fwGHGCBeE5B5jtfmFh8daRSpump';

caButton.addEventListener('click', async () => {
    try {
        // Copy to clipboard
        await navigator.clipboard.writeText(contractAddress);
        
        // Visual feedback - temporarily change text
        const originalText = caButton.textContent;
        caButton.textContent = 'Copied!';
        caButton.style.background = '#00ff88';
        caButton.style.color = '#000';
        
        // Reset after 2 seconds
        setTimeout(() => {
            caButton.textContent = originalText;
            caButton.style.background = '#ffffff';
            caButton.style.color = '#000000';
        }, 2000);
        
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = contractAddress;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            const originalText = caButton.textContent;
            caButton.textContent = 'Copied!';
            caButton.style.background = '#00ff88';
            caButton.style.color = '#000';
            
            setTimeout(() => {
                caButton.textContent = originalText;
                caButton.style.background = '#ffffff';
                caButton.style.color = '#000000';
            }, 2000);
        } catch (fallbackErr) {
            console.error('Failed to copy:', fallbackErr);
            alert('Failed to copy. Please copy manually: ' + contractAddress);
        }
        
        document.body.removeChild(textArea);
    }
});

