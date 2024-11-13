//THESE ARE THE PACKAGES THAT WE HAVE JUST INSTALLED//
const express = require('express');
const bodyParser = require('body-Parser');
const app = express();
// All the routes that lead to each file of routes
const StaffRoute = require('./Routes/StaffRoute');
const SponsorRoute = require('./Routes/SponsorRoute');
const OrphanRoute = require('./Routes/OrphanRoute');
const CourseRoute = require('./Routes/CourseRoute');
const DonationRoute = require('./Routes/DonationRoute');
const FeedbackRoute = require('./Routes/FeedbackRoute');
const LoginRoute = require('./Routes/LoginRoute');

app.use(bodyParser.json());

app.get ('/', (req, res) => {
    res.send('Backend is working!'); //THE RESPONSE SENDS A MESSAGE TO TELL ME THAT EVERYTHING IS RUNNING SMOOTHLY//
});

const PORT = process.env.PORT || 3000; // WHERE WE CHANGE THE PORT...
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// -----------------------------------------------------"STAFF"-SECTION------------------------------------------------------ //
app.use(StaffRoute);

// -----------------------------------------------------"SPONSOR"SECTION------------------------------------------------------ //
app.use(SponsorRoute);

// -----------------------------------------------------"DONATION"SECTION------------------------------------------------------ //
app.use(DonationRoute);

// -----------------------------------------------------"ORPHAN" SECTION------------------------------------------------------ //
app.use(OrphanRoute);

// -----------------------------------------------------"COURSE"SECTION------------------------------------------------------ //
app.use(CourseRoute);

// -----------------------------------------------------"FEEDBACK"SECTION------------------------------------------------------ //
app.use(FeedbackRoute);

// -----------------------------------------------------"LOGIN"SECTION------------------------------------------------------ //
app.use(LoginRoute);
