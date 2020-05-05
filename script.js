//You can edit ALL of the code here

function getData(URL) {
  fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      makeShowPage(json);
      selectShow(json);
      search();
      result();
      home();
      updateResult();
      selectEpisode(json);
    });
}

function setup(URL) {
  fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      makeEpisodePage(json);
      selectEpisode(json);
    });
}

function makeEpisodePage(list) {
  const rootElem = document.getElementById("root");
  list.forEach((episode) => {
    let eachDiv = document.createElement(`div`);
    let containerDiv = rootElem.appendChild(eachDiv);
    containerDiv.setAttribute(`id`, `${episode.id}`);
    containerDiv.setAttribute(`class`, `container episode`);
    containerDiv.setAttribute(`style`, `display: initial;`);

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

function makeShowPage(list) {
  const rootElem = document.getElementById("root");
  list.forEach((show) => {
    let eachDiv = document.createElement(`div`);
    let containerDiv = rootElem.appendChild(eachDiv);
    containerDiv.setAttribute(`id`, `${show.id}`);
    containerDiv.setAttribute(`class`, `container show`);
    containerDiv.setAttribute(`style`, `display: initial;`);

    //jump to episodes
    containerDiv.addEventListener(`click`, () => {
      let containerDiv = document.getElementsByClassName("container");
      container = Array.from(containerDiv);
      container.map((x) => (x.style.display = `none`));
      setup(`https://api.tvmaze.com/shows/${show.id}/episodes`);
      updateResult();
    });

    //take the name of each show and put it inside containerDiv
    let nameParagraph = document.createElement(`p`);
    containerDiv.appendChild(nameParagraph);
    nameParagraph.setAttribute(`class`, `name`);
    nameParagraph.textContent = `${show.name}`;

    //film rating and runtime
    let ratingP = paragraph();
    containerDiv.appendChild(ratingP);
    ratingP.setAttribute(`class`, `episodeCode rating`);
    ratingP.textContent = `Average Rate:   ${show.rating.average}`;

    //film runtime
    let runtimeP = paragraph();
    containerDiv.appendChild(runtimeP);
    runtimeP.setAttribute(`class`, `episodeCode runtime`);
    runtimeP.textContent = `Runtime:  ${show.runtime}`;

    //film's genre
    let genreP = paragraph();
    containerDiv.appendChild(genreP);
    genreP.setAttribute(`class`, `episodeCode runtime`);
    genreP.id = `genre`;
    genreP.textContent = `Genres:  ${show.genres}`;

    //to fix positioning
    let br = document.createElement(`br`);
    let br2 = document.createElement(`br`);
    containerDiv.appendChild(br2);

    //take the show Images
    let showImg = document.createElement(`img`);
    let divImg = document.createElement(`div`);
    divImg.appendChild(showImg);
    containerDiv.appendChild(divImg);
    divImg.setAttribute(`class`, `divImg`);
    showImg.setAttribute(`class`, `showImg`);
    showImg.src = show.image.medium;
    showImg.alt = `image`;
    containerDiv.appendChild(br);

    //take the summary of each show
    let showSummary = document.createElement(`article`);
    let summaryArticle = containerDiv.appendChild(showSummary);
    showSummary.setAttribute(`class`, `summary`);

    //summary tag inside article
    let summaryTagP = document.createElement(`p`);
    summaryArticle.appendChild(summaryTagP);
    summaryTagP.setAttribute(`class`, `summaryTag`);
    summaryTagP.textContent = `About ${show.name}`;

    //actual summary inside article
    let summary = document.createElement(`p`);
    summaryArticle.appendChild(summary);
    summary.setAttribute(
      `id`,
      `summaryPS${codeCorrection(show.season)}E${codeCorrection(show.number)}`
    );
    summary.setAttribute(`class`, `summaryP`);
    summary.textContent = show.summary.replace(/(<([^>]+)>)/gi, "");

    //features div
    let br3 = document.createElement(`br`);
    let br4 = document.createElement(`br`);
    let br5 = document.createElement(`br`);
    containerDiv.appendChild(br3);
    containerDiv.appendChild(br4);
    containerDiv.appendChild(br5);
    let features = document.createElement(`div`);
    containerDiv.appendChild(features);
    features.setAttribute(`class`, `features`);

    //film status
    let statusP = paragraph();
    features.appendChild(statusP);
    statusP.setAttribute(`class`, `bottomDiv`);
    statusP.textContent = `Status:  ${show.status}`;

    //film language
    let languageP = paragraph();
    features.appendChild(languageP);
    languageP.setAttribute(`class`, `bottomDiv`);
    languageP.textContent = `Language:  ${show.language}`;
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
      let appearsOnText = title.toLowerCase().indexOf(searchValue) != -1;
      if (appearsOnText && element.className === `container episode`) {
        element.style.display = "initial";
      } else {
        element.style.display = "none";
      }
    });
  });
  // result();
}

//counter result
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

//for up date result out of searchbar
function updateResult() {
  setTimeout(function () {
    let containerDiv = document.getElementsByClassName(`container`);
    let container = Array.from(containerDiv);
    let resultParagraph = document.getElementById(`result`);
    // console.log(container.filter((x) => x.style.display != `none`));
    // console.log(container);
    resultParagraph.innerHTML = `${codeCorrection(
      container.filter((x) => x.style.cssText === `display: initial;`).length
    )} / ${codeCorrection(
      container.filter((x) => x.style.cssText !== `display: none;`).length
    )}`;
    // console.log(container.filter((x) => x.style.cssText === `display: initial;`));
  }, 400);
}

// select option part
function selectEpisode(episode) {
  let select = document.createElement(`select`);
  header.appendChild(select);
  select.setAttribute(`id`, `episodeSelect`);
  select.setAttribute(`class`, `select`);
  let firstOption = document.createElement(`option`);
  select.appendChild(firstOption);
  firstOption.setAttribute(`id`, `firstEpisode`);
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
    container.map((x) => (x.style.display = `none`));
    targetDiv.style.display = `initial`;
    updateResult();
  });
}

function selectShow(show) {
  let select = document.createElement(`select`);
  header.appendChild(select);
  select.setAttribute(`id`, `showSelect`);
  select.setAttribute(`class`, `select`);
  let firstOption = document.createElement(`option`);
  select.appendChild(firstOption);
  firstOption.setAttribute(`id`, `firstShow`);
  firstOption.setAttribute(`value`, `select an option`);
  firstOption.textContent = `Show Selector:`;

  //sorting  in alphabetical order case-insensitive
  let showArray = Array.from(show);
  let sort = showArray.sort(function (a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  sort.forEach((x) => {
    let option = document.createElement(`option`);
    option.setAttribute(`value`, x.id);
    option.setAttribute(`class`, `option`);
    select.appendChild(option);
    option.textContent = `${x.name} - Type: ${x.type}`;
  });

  //changes after select a show on show selector
  select.addEventListener(`change`, () => {
    let containerDiv = document.getElementsByClassName("container");
    container = Array.from(containerDiv);
    container.map((x) => (x.style.display = `none`));
    setup(`https://api.tvmaze.com/shows/${select.value}/episodes`);
    updateResult();
  });
}

//to reload the main page:
function home() {
  let anchor = document.createElement(`a`);
  header.appendChild(anchor);
  anchor.setAttribute(`href`, `/`);
  anchor.setAttribute(`class`, `home`);
  anchor.textContent = `..Home`;
}

// make paragraphs
function paragraph() {
  return document.createElement(`p`);
}

function onLoad() {
  getData(`https://api.tvmaze.com/shows`);
}

window.onload = onLoad;
