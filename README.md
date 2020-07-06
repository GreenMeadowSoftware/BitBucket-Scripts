# BitBucket-Scripts

To use these scripts in bookmarks, create a new bookmark, give it a name and wrap the (ideally minified version of the) script in `javascript:(async function(){ .... })()`

Tested with the following queries -
- {"TaskTypeId", taskTypeId }
- ASSIGNMENT-CHANGE
- new ValidationRepository

Only works where there are less than 1,000 results (at this point you hit a "Server Busy" error from BitBucket)
