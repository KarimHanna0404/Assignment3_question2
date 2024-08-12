const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path'); // Ensure path is required
const app = express();
const port = 4000;

app.use(cookieParser());

function getCurrentDate() {
    const d = new Date();
    const s = d.getSeconds().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    const h = d.getHours().toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    const mm = (d.getMonth() + 1).toString().padStart(2, '0'); 
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy} ${h}:${m}:${s}`;
}

app.get('/', (req, res) => {
    let visits = 0;
    let firstVisit = false;
    let lastVisit = null;

    if (req.cookies.visits) {
        visits = parseInt(req.cookies.visits, 10);
    } else {
        firstVisit = true;
    }

    if (req.cookies.lastVisit) {
        lastVisit = req.cookies.lastVisit;
    }

    visits += 1;
    const currentDate = getCurrentDate();
    res.cookie('visits', visits, { maxAge: 900000, httpOnly: true });
    res.cookie('lastVisit', currentDate, { maxAge: 900000, httpOnly: true });

    let message;
    if (firstVisit) {
        message = 'Welcome to the website for the first time!';
    } else {
        message = `You have visited this page ${visits} times. Your last visit was on ${lastVisit}.`;
    }

    res.send(message);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
