//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  search(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  episodeList.forEach((episode) => {
    let eachDiv = document.createElement(`div`);
    let containerDiv = rootElem.appendChild(eachDiv);
    containerDiv.setAttribute(
      `id`,
      `containerS${codeCorrection(episode.season)}E${codeCorrection(
        episode.number
      )}`
    );
    containerDiv.setAttribute(`class`, `container`);

    //take the name of each episode and put it inside containerDiv
    let nameParagraph = document.createElement(`p`);
    containerDiv.appendChild(nameParagraph);
    nameParagraph.setAttribute(
      `id`,
      `nameS${codeCorrection(episode.season)}E${codeCorrection(episode.number)}`
    );
    nameParagraph.setAttribute(`class`, `name`);
    nameParagraph.textContent = `${episode.name}`;

    //take the episode code
    let episodeCodeP = document.createElement(`p`);
    containerDiv.appendChild(episodeCodeP);
    episodeCodeP.setAttribute(
      `id`,
      `episodeCodeS${codeCorrection(episode.season)}E${codeCorrection(
        episode.number
      )}`
    );
    episodeCodeP.setAttribute(`class`, `episodeCode`);
    episodeCodeP.textContent = `Episode Code: S${codeCorrection(
      episode.season
    )}E${codeCorrection(episode.number)}`;

    //take the episode Images
    let episodeImg = document.createElement(`img`);
    let divImg = document.createElement(`div`);
    divImg.appendChild(episodeImg);
    containerDiv.appendChild(divImg);
    divImg.setAttribute(`class`, `divImg`);
    episodeImg.setAttribute(
      `id`,
      `episodeImgS${codeCorrection(episode.season)}E${codeCorrection(
        episode.number
      )}`
    );
    episodeImg.setAttribute(`class`, `episodeImg`);
    episodeImg.src = episode.image.medium;
    episodeImg.alt = `image`;

    //take the summary of each episode
    let episodeSummary = document.createElement(`article`);
    let summaryArticle = containerDiv.appendChild(episodeSummary);
    episodeSummary.setAttribute(
      `id`,
      `summaryS${codeCorrection(episode.season)}E${codeCorrection(
        episode.number
      )}`
    );
    episodeSummary.setAttribute(`class`, `summary`);

    //summary tag inside article
    let summaryTagP = document.createElement(`p`);
    summaryArticle.appendChild(summaryTagP);
    summaryTagP.setAttribute(
      `id`,
      `summaryTagS${codeCorrection(episode.season)}E${codeCorrection(
        episode.number
      )}`
    );
    summaryTagP.setAttribute(`class`, `summaryTag`);
    summaryTagP.textContent = `Summary`;

    //actual summary inside article
    let summary = document.createElement(`p`);
    summaryArticle.appendChild(summary);
    summary.setAttribute(
      `id`,
      `summaryPS${codeCorrection(episode.season)}E${codeCorrection(
        episode.number
      )}`
    );
    summary.setAttribute(`class`, `summaryP`);
    summary.textContent = episode.summary.replace(/(<([^>]+)>)/gi, "");
  });
}
function codeCorrection(x) {
  if (x < 10) {
    return `0${x}`;
  } else {
    return x;
  }
}
function search() {
  //html parts and attributes
  let header = document.getElementById(`header`);
  let form = document.createElement(`form`);
  form.setAttribute(`id`, `searchForm`);
  header.appendChild(form);
  let input = document.createElement(`input`);
  form.appendChild(input);
  input.setAttribute(`type`, `text`);
  input.setAttribute(`id`, `searchInput`);
  input.setAttribute(`class`, `searchInput`);
  input.setAttribute(`placeholder`, `Search...`);
  input.setAttribute(`title`, `Find Your Film Here`);
  let searchBtn = document.createElement(`a`);
  form.appendChild(searchBtn);
  searchBtn.setAttribute(`class`, `search-btn`);
  searchBtn.setAttribute(`href`, `#`);
  searchBtn.textContent = `Search...`;

  //search bar functionality
  let searchBar = document.getElementById(`searchInput`);
  searchBar.addEventListener(`keyup`, (x) => {
    let searchValue = x.target.value.toLowerCase();
    let searchItems = document.getElementsByClassName(`container`);
    Array.from(searchItems).forEach((element) => {
      let title = element.textContent;
      if (title.toLowerCase().indexOf(searchValue) != -1) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  });
}

window.onload = setup;
