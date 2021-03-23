const fortune = require('./fortune')

exports.home = (req, res) => res.render('home', {
  ipAddress: req.ip, userAgent: req.get('User-Agent')
})

exports.about = (req, res) => 
  res.render('about', { fortune: fortune.getFortune() })

exports.apiFortunes = (req, res) => res.json(fortune.getAllFortunes())

//-----------------------------------------------------------------------------

exports.newsletterSignup = (req, res) => {
  // for now we just provide a dummy value for csrf token
  res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}

exports.newsletterSignupProcess = (req, res) => {
  console.log('Form (from querystring): ' + req.query.form)
  console.log('CSRF token (from hidden form field): ' + req.body._csrf)
  console.log('Name (from visible form field): ' + req.body.name)
  console.log('E-mail (from visible form): ' + req.body.email)
  res.redirect(303, '/newsletter-signup/thank-you')
}

exports.newsletterSignupThankYou = (req, res) => 
  res.render('newsletter-signup-thank-you')

//-----------------------------------------------------------------------------

exports.newsletterSignupViaFetchAPI = (req, res) => {
  // for now we just provide a dummy value for csrf token
  res.render('newsletter-fetchapi-signup', { csrf: 'CSRF token goes here' })
}

exports.api = {
  newsletterSignup: (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.send({ result: 'success' })
  },
}

//-----------------------------------------------------------------------------

exports.vacationPhoto = (req, res) => 
  res.render('contest/vacation-photo', {
    year: new Date().getFullYear(), month: new Date().toLocaleString("default", {month: "long"})
  })

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log('field data: ', fields)
  console.log('files: ', files)
  console.log("Year: " + req.params.year)
  console.log("Month: " + req.params.month)
  res.redirect(303, '/contest/vacation-photo-thank-you')
}

exports.vacationPhotoThankYou = (req, res) => 
  res.render('contest/vacation-photo-thank-you')

//-----------------------------------------------------------------------------

exports.notFound = (req, res) => res.render('404')

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500', {
  message: "500 error!"
})
/* eslint-enable no-unused-vars */
