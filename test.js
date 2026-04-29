// Node 18+ has fetch global
fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCDvqxhWqHl5j8g22c2lKjI1CO-t3HF3gc", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: "Hi" }]}] })
}).then(res => res.json()).then(console.log).catch(console.error);
