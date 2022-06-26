*** Heroku commit ***
1. Create a new Git repository
Initialize a git repository in a new or existing directory
$ cd my-project/
$ git init
$ heroku git:remote -a vunh-njs-mongo-01

2. Deploy your application
Commit your code to the repository and deploy it to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master

3. Existing Git repository
For existing repositories, simply add the heroku remote

$ heroku git:remote -a vunh-njs-mongo-01