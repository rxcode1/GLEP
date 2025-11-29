# GLEP WORLD ORDER - Meme Website

A meme website for the beloved Glep character, featuring a clean, minimalist design matching the Tuzki website aesthetic.

## Features

- 🎨 Clean, minimalist UI design
- 🖼️ Image gallery section for Glep adventures
- ✨ Meme generator with prompt input
- 📱 Fully responsive design
- 🎯 Easy to integrate with image generation APIs

## Getting Started

Simply open `index.html` in your web browser to view the website. No build process required!

## Meme Generator Integration

The meme generator is currently set up with a placeholder. To connect it to an actual image generation API, you can:

1. **OpenAI DALL-E API**
2. **Stability AI**
3. **Replicate API** (for various models)
4. **Midjourney API** (if available)

Update the `generateMemeWithAPI()` function in `script.js` with your preferred API endpoint and credentials.

### Example Integration

Replace the placeholder code in `script.js` with your API call:

```javascript
async function generateMeme(prompt) {
    // Your API integration code here
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            prompt: `Glep character, ${prompt}`,
            // ... other parameters
        })
    });
    // Handle response and display image
}
```

## Customization

- **Images**: Replace the placeholder divs in the gallery with actual Glep images
- **Colors**: Modify the color scheme in `styles.css` to match your preferences
- **Content**: Update text content in `index.html` to customize descriptions

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge).

## License

Feel free to use and modify as needed!

