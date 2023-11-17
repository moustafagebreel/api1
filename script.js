const api = process.env.API_KEY;
const inp = document.getElementById('inp');
const images = document.querySelector('.images');

const getImages = async () => {
  const promptText = inp.value.trim(); // Remove leading/trailing whitespace
  if (!promptText) {
    console.error('Prompt cannot be empty');
    return;
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api}`
    },
    body: JSON.stringify({
      "model": "dall-e-3",
      "prompt": inp.value,
      "n": 1,
      "size": "1024x1024"
    })
  };

  try {
    
    const res = await fetch('https://api.openai.com/v1/images/generations', requestOptions);
    const data = await res.json();
   const lastImages=data.data
   images.innerHTML = '';
   lastImages.map(photo =>{
    const container=document.createElement("div");
    images.append(container)
    const img =document.createElement("img");
    container.append(img)
    
    img.src=photo.url
   })
        console.log(data)
  } catch (error) {
    
    // Handle errors here
  }
};

const generateButton = document.getElementById('generateButton');
generateButton.addEventListener('click', getImages);
