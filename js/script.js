//FETCH USER DATA

// 1. Create Global Variables
//Displays profile information
const profileInfo = document.querySelector('.overview');
//Username
const username = 'Ray-Xavier-2021';
// 1. Select the Repos List
const repoList = document.querySelector('.repo-list');

// 2. Fetch API JSON Data
// 2a. Create async function to fetch info from GitHub profile
const getUserInfo = async function () {
// 2b. Retrieves user profile information   
    const response = await fetch(`https://api.github.com/users/${username}`);
// 2c. Formats info retrieved into json object    
    const data = await response.json();
    //console.log(data);
// 4. Call the Display Function & View Your Project    
// 4a. Calls the function to display profile info
displayUserInfo(data);    
};
// 2d. Calls the function
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
profileInfo.append(div);
};

//FETCH REPO DATA

// 2. Fetch Your Repos
// 2a. Create async function that fetches repos
const getUserRepo = async function () {
// 2b. Fetch Repo using API and paramters: sort by updated, show 100 repos per page
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated?per_page=100`);
    const repoData = await fetchRepos.json();
// 6. Save and View Your Page
    displayRepos(repoData);
};
//getUserRepo();

// 5. Display Info About Your Repos
// 5a. Create function that displays each repos info
const displayRepos = function (repos) {
//Create a loop for each repo in the repository
    for ( const repo of repos) {
// 5b. Create a list item for each repo        
        const repoItem = document.querySelector('li');
// 5c. Give it a class of "repo"        
        repoItem.classList.add('.repo');
// 5d. Create <h3> element for repo name        
        repo.innerHTML = `<h3>${repo.name}</h3>`;
// 5e. Append repo item so it shows in repo list        
        repoList.append(repoItem);
    }    
};