this is to note all problems I found during development, and how to fix it

1. when deploy code to firebase host, I could not access backoffice page (to add article), firebase keep saying that "This file does not exist and there was no index.html found in the current directory"

solution is here https://stackoverflow.com/questions/28247450/firebase-deploy-404-cant-find-index-html

where you need to make firebase.json to look like this

{
  "hosting": {
    "public": "./public",
    "ignore": [
      "firebase.json",
      "PROBLEM.md",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}


2. firebase hosting problem with SPA app

solution is to add "rewrites" as below to firebase.json.
{
  "hosting": {
    "public": "./public",
    "ignore": [
      "firebase.json",
      "PROBLEM.md",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

3. run stackblitz in local

Click on that button with the arrow pointing down
cd into you project cd "your app name"
npm install
npm start

=============
prod build command
npm run build

==================
copy file from "build" folder to firebase folder (also put them in "public" folder) in your PC
go to that folder, run "firebase deploy" command.

4. 

5. 

