//FETCH USER DATA

// 1. Create Global Variables
// 1a. Displays profile information
const profileInfoOverview = document.querySelector('.overview');
// 1b. Username
const username = 'Ray-Xavier-2021';
// 8a. Select the Repos List
const repoList = document.querySelector('.repo-list');
// 7a. Create two global variables for displaying repo info
const reposArea = document.querySelector('.repos');
const reposDataArea = document.querySelector('.repo-data');
// 12a-1. Selects the back to repo button
const repoBtn = document.querySelector('.view-repos');
// 12a-2. Search bar filter input 
const filterInput = document.querySelector('.filter-repos');

// 2. Fetch API JSON Data
// 2a. Create async function to fetch info from GitHub profile
const getUserInfo = async function () {
// 2b. Retrieves user profile information   
    const response = await fetch(`https://api.github.com/users/${username}`);
// 2c. Formats info retrieved into json object    
    const data = await response.json();
    console.log(data);
// 4. Call the Display Function & View Your Project    
// 4a. Calls the function to display profile info
displayUserInfo(data);    
};
// 2d. Calls the get user info function
getUserInfo();

// 3. Fetch & Display User Information
// 3a. Create function to display user information
const displayUserInfo = function (data) {
// 3b. Create a new div    
    const div = document.createElement('div');
// 3c. Give the div a class name    
    div.classList.add('user-info');
// 3d. Span innerHTML with the following elements: figure, img, p
    div.innerHTML = 
// 3e. Display info with temp literals and relevant key.value properties using dot notation
    `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
    <p><strong>Name:</strong> ${data.name}</p
    ><p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;    
// 3f. Displays profile overview section
    profileInfoOverview.append(div);
//Displays repos from github
    getUserRepos();
    //console.log(profileInfoOverview);
};

//FETCH REPO DATA

// 2. Fetch Your Repos
// 2a. Create async function that fetches repos
const getUserRepos = async function () {
// 2b. Fetch Repo using API and paramters: sort by updated, show 100 repos per page
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
// 6. Save and View Your Page
    displayRepos(repoData);
};

// 5. Display Info About Your Repos
// 5a. Create function that displays each repos info
const displayRepos = function (repos) {
//Create a loop for each repo in the repository
    for (const repo of repos) {
// 5b. Create a list item for each repo        
        const repoItem = document.createElement('li');
// 5c. Give it a class of "repo"        
        repoItem.classList.add('repo');
// 5d. Create <h3> element for repo name        
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
// 5e. Append repo item so it shows in repo list        
        repoList.append(repoItem);
    }    
};

// DISPLAY REPO INFO

// 7. Declare Two New Global Variables
//At the top of code
  
// 8. Add a Click Event
// 8b. Event listener for repoList
repoList.addEventListener('click', function (e) {
// 8c. Check 'if' event target that was clicked matches the <h3> element
    if (e.target.matches('h3')) {
        const repoName = e.target.innerText;
        //console.log(repoName);
// 9b. Displays specific repo info
        getRepoInfo(repoName);        
    }      
});

// 9. Create a Function to Get Specific Repo Info
const getRepoInfo = async function (repoName) {
// 9a.Fetch info about specific repo
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
// 10. Create an Array of Languages
// 10a. Create variable that fetches data from the language_url property of repoInfo
    const fetchLanguages = await fetch(repoInfo.languages_url);
// 10b. Variable to hold json parse
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
// 10c. Create an empty array to list languages
    const languages = [];
// 10d. Loop through the languageData object 'for' languages
    for (const language in languageData) {
// 10e. Add language to the end of the array
        languages.push(language);
    }        
    //console.log(languages);
// 12. Call Your Function & View Your Work
    displayRepoInfo(repoInfo, languages);
};

// 11. Create a Function to Display Specific Repo Info
const displayRepoInfo = function (repoInfo, languages) {
// 11a. Empty repo-data innerHTML    
    reposDataArea.innerHTML = '';
// 11b. Create div element with repo: name, description, default branch and github link
    const div = document.createElement('div');
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
// 11c. Append div with class of 'repo-data'
    reposDataArea.append(div);
// 11d. Remove hide class from 'repo-data' element
    reposDataArea.classList.remove('hide');
// 11e. Hide element with class of 'repos'    
    reposArea.classList.add('hide');
// 13d. Remove 'hide' class from repo back button
    repoBtn.classList.remove('hide');      
};

// 12. CREATE A DYNAMIC SEARCH
// 12a. Create Global Variables to Select a Button and Input
//At the top of code

// 13. Add a Click 'input' Event to the Back Button
repoBtn.addEventListener('click', function () {
// 13a. Unhide class of 'repos' to show where all info is displayed    
    reposArea.classList.remove('hide');
// 13b. Add hide class to 'repo-data' section
    reposDataArea.classList.add('hide');
// 13c. Add class of 'hide' to repo button
    repoBtn.classList.add('hide');
});
