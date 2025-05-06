## Talent Standard Task Code Repository

This project I did at as part of MVP Studio internship to understand how ReactJs, C# Web Api, MongoDb is used in Talent Code Architecture for the candidate role.

## Tasks

* Module 1 : Talent profile page
  * LinkedIn url & GitHub url
  * Description
  * User Details Component
  * Address
  * Nationality
  * Languages
  * Skills
  * Work experience
  * Visa status
  * Job seeking status
  * Photo upload

  * Module 2 : Talent Feed page
    * Front-end
      * Design the UI according to the screenshots below and display all talent data as a scrollable list of cards.
      * Display employer profile data as a single card on the left side of the page.
    * Back-end
      * Build action methods in controllers and in services to fetch talent data and current employer profile data from the database.

## Deployed App url
https://talentappwebapp20250209184040.azurewebsites.net/
How to access the feature created in the TaskL
* Module 1: Talent Profile Page. Follow below steps see the feature listes for Module 1
  * Login as Talent.
  * Create the Profile by adding the details.
* Module 2: Login as Employer and checkout the Talent Feed Page.

## Guides to get started

**Note : Make sure that you have Visual Studio 2017 installed in your computer.
Visual Studio 2015 does not work with ReactJS**

### Install react, babel, webpack, js tokens and react tags:
* Find the folder that contains webpack.config.js in the solution explorer
* Right click on the folder and select 'Open Folder in File Explorer'
* Open command prompt (windows + R, type cmd) and go to the folder that contains webpack.config.js (E.g: cd C:\Talent\Talent\Talent.WebApp\Scripts\react)
Install npm util packages:
`npm install`
* Check webpack version (make sure it's 4.5.0):
`webpack -version`

### Launch Talent project
* Get the latest source via Source Control Explorer
* Run webpack:
`cd C:\Talent\Talent\App\Talent.App.WebApp\wwwroot\js\react`
`npm run build`
* Launch Talent.WebApp project in Visual Studio. Register an account using your email address and log in.

### Project Structure  
 - Web Application:
    - `Talent.WebApp` : All frontend files are located here
 - Microservices:
    - `Talent.Services.Identity` : backend functions related to Login/Logout
    - `Talent.Services.Profile` : backend functions related to Profile
    - `Talent.Services.Talent` : backend functions related to Talent Matching, Jobs

### React tips
* Common coding mistakes using jsx
* Class names: class (html) => className (jsx), tabindex (html) => tabIndex (jsx)
* Require closing parent element or fragments: https://reactjs.org/docs/fragments.html
* Jsx Closing tags differ from html tags, you must have a closing tag for images and inputs: `<img></img>, <input</input>`
* Forgetting to turn on webpack : `npm run build`
* Forgetting to clear the cache

