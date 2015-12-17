# WDI_finalProject
#TED Chat
TED Chat is an app based on the TED talks, where a user can search the TED Talks that are currently available via the Youtube API.  The talks can either be viewed in browser, or a user may create an account to store their favourite talks for reference.

http://charlieallen.github.io/wdi_final_front_end/?#/

* A user can view a video
* Search the currently available videos via keywords of their choice
* Create/update/delete an account
* Save a video to their profile
* Only save a video to a profile if there is a user account logged in
* Remove a video from their profile
* Comment on a video
* Only comment on a video if they are logged in

<img src="http://i.imgur.com/vjFaESy.png">

###Tech Used
* MongoDB 
* ExpressJS v4.13.3
* AngularJS 
* NodeJS 
* BCrypt v0.8.5
* JWT v5.4.1
* Bootswatch template 'Simplex' and Bootstrap components


###Database Model

<img src="http://i.imgur.com/u0ybYCl.png">

###Wireframes

<img src="http://imgur.com/JW29K4q.png">

<img src="http://imgur.com/w95sfeQ.png">


##What was a win
* Using ng-show/ng-hide on select elements depending on the user login state (e.g. hide login button if a user is already logged in, hide logout button if no user is logged in, hide 'save to favourites' button on videos if there is no user logged in).
* Successfully navigating the sometimes confusing components of a CSS framework to successfully style using Bootstrap and Bootswatch elements.
* Using tech I wasn't hugely confident with (in particular the MEAN stack) and getting a working product.

##What was tough
* Combining BCrypt and JWT for login and authentication.
* Navigating the Youtube API documentation to understand how to set it up for my app.

##Going forward..
* A comments controller was written but not implemented due to time constraints, this will hopefully be implemented soon as it was intended to provide one of the core functionalities of the site.
* Ideally it would be good to have a social aspect to the site, perhaps using a Facebook or Twitter login.
* Gravatars for user profiles?
* There is no form validation implemented yet and this would be beneficial for signup to clarify to a user what the required fields are.
* There is also not yet any notification to a user that a video has been added to their favourites, some form of confirmation should be provided for this.
