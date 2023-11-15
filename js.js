const APIURL = 'https://api.github.com/users/';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

function getUser(username) {
    axios.get(APIURL + username)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

// Alternative:
async function getUserAlternative(username) {
    try {
        const { data } = await axios(APIURL + username);
        addReposToCard(data);
    } catch(error) {
        if(error.response.status === 404) {
            createErrorCard('No Profile with Username');
        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos');
        addReposToCard(username);
    } catch(error) {
        createErrorCard('Problem Fetching Repos');
    }
}

function createUserCard(user) {
    const cardHTML = 
    `
    <div class="card">
            <div>
                <img src="${user.avatar_url} alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul>
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following} <strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>

                <div id="repos">
                    <a href="#" class="repo">Repo 1</a>
                    <a href="#" class="repo">Repo 2</a>
                    <a href="#" class="repo">Repo 3</a>
                </div>
            </div>
        </div>
    `;
    
    main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
    const cardHTML = 
    `
    <div class="card">
        <h1>${msg}</h1>
    </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposElement = document.getElementById('repos');

    repos
    .forEach(repo => {
        const repoElement = document.createElement('a');
        repoElement.classList.add('repo');
        repoElement.href = repo.html_url;
        repoElement.target = '_blank';
        repoElement.innerText = repo.name;

        reposElement.appendChild(repoElement);
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if(user) {
        getUserAlternative(user);
        search.value = '';
    }
})