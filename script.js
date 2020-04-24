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
  let header = document.getElementById(`header`);
  let form = document.createElement(`form`);
  form.setAttribute(`id`, `form`);
  let input = document.createElement(`input`);
  header.appendChild(form);
  form.appendChild(input);
  input.setAttribute(`type`, `search`);
  input.setAttribute(`id`, `searchInput`);
  input.setAttribute(`class`, `searchInput`);
  input.setAttribute(`placeholder`, `search...`);
  input.setAttribute(`title`, `type here`);
  let searchBar = document.getElementById(`searchInput`);
  let nameSearch = document.querySelectorAll(`.name`).toLowerCase();
  let summaryPSearch = document.querySelectorAll(`.summaryP`).toLowerCase();
  let codeSearch = document.querySelectorAll(`episodeCode`).toLowerCase();
  // let search =searchBar.value.toLowerCase();
  searchBar.addEventListener(`keyup`, (x) => {
    let term = x.target.value.toLowerCase();
    Array.from(nameSearch).forEach((e) => {
      let title = e.firstElementChild.textContent;
      if (title.toLocaleLowerCase().indexOf(term) != -1) {
        e.style.display = `block`;
      } else {
        e.style.display = `none`;
      }
    });
  });
}

window.onload = setup;

