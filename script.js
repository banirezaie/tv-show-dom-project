//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  search();
  select(allEpisodes);
  result();
  home();
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  episodeList.forEach((episode) => {
    let eachDiv = document.createElement(`div`);
    let containerDiv = rootElem.appendChild(eachDiv);
    containerDiv.setAttribute(`id`, `${episode.id}`);
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
  // let header = document.getElementById(`header`);
  //I don't know why it doesn't matter to be, but I'll put this here to come back for it later
  // console.log(header);
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
  searchBtn.setAttribute(`title`, `Find Your Film Here`);
  searchBtn.textContent = `Search...`;

  //search bar functionality
  let searchBar = document.getElementById(`searchInput`);
  searchBar.addEventListener(`keyup`, (x) => {
    let searchValue = x.target.value.toLowerCase();
    let searchItems = document.getElementsByClassName(`container`);
    Array.from(searchItems).forEach((element) => {
      let title = element.textContent;
      if (title.toLowerCase().indexOf(searchValue) != -1) {
        element.style.display = "initial";
      } else {
        element.style.display = "none";
      }
    });
  });
}

//result counter
function result() {
  let resultDiv = document.createElement(`div`);
  header.appendChild(resultDiv);
  resultDiv.setAttribute(`id`, `resultDiv`);
  resultDiv.setAttribute(`class`, `resultDiv`);
  let resultParagraph = document.createElement(`p`);
  resultDiv.appendChild(resultParagraph);
  resultParagraph.setAttribute(`id`, `result`);
  resultParagraph.setAttribute(`class`, `result`);
  resultDiv.setAttribute(`title`, `Result / Total`);
  let containerDiv = document.getElementsByClassName(`container`);
  let container = Array.from(containerDiv);
  let searchBar = document.getElementById(`searchInput`);

  //main function of counting after and before keyup
  resultParagraph.innerHTML = `${codeCorrection(
    container.length
  )} / ${codeCorrection(container.length)}`;
  searchBar.addEventListener(`keyup`, () => {
    resultParagraph.innerHTML = `${codeCorrection(
      container.filter((x) => x.style.display === `initial`).length
    )} / ${codeCorrection(container.length)}`;
  });
}

// select option part
function select(episode) {
  let select = document.createElement(`select`);
  header.appendChild(select);
  select.setAttribute(`id`, `episodeSelect`);
  select.setAttribute(`class`, `select`);
  let firstOption = document.createElement(`option`);
  select.appendChild(firstOption);
  firstOption.setAttribute(`value`, `select an option`);
  firstOption.textContent = `Episode Selector:`;
  episode.forEach((x) => {
    let option = document.createElement(`option`);
    option.setAttribute(`value`, x.id);
    option.setAttribute(`class`, `option`);
    select.appendChild(option);
    option.textContent = `S${codeCorrection(x.season)}E${codeCorrection(
      x.number
    )} - ${x.name}`;
  });

  select.addEventListener(`change`, (e) => {
    let targetDiv = document.getElementById(`${e.target.value}`);
    let containerDiv = document.getElementsByClassName("container");
    container = Array.from(containerDiv);
    let resultCounter = document.getElementById(`result`);
    if (select.value === e.target.value) {
      container.map((x) => (x.style.display = `none`));
      targetDiv.style.display = `initial`;
      resultCounter.textContent = `01 / ${codeCorrection(container.length)}`;
    }
  });
}

//to reload the main page:
function home() {
  let anchor = document.createElement(`a`);
  header.appendChild(anchor);
  anchor.setAttribute(`href`, `/`);
  anchor.setAttribute(`class`, `button`);
  anchor.textContent = `..Home`;
}

window.onload = setup;
