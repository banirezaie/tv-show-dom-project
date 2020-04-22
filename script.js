//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  namesOfEpisodes(allEpisodes);
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

function namesOfEpisodes(param) {
  let div = document.getElementById("root");
  for (let i = 0; i < param.length; i++) {
    let nameOfMovie = param[i].name;
    console.log(div);
    let paragraph = document.createElement(`p`);
    paragraph.textContent = "names" + nameOfMovie;
    div.appendChild(paragraph);
  }
}

window.onload = setup;
