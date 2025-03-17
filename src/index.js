import express from "express";
import {
  fetchReposByProfile,
  fetchLanguagesByRepo,
} from "./helpers/fetch-data.js";
import { generatePercArray, generateSVGBarChart } from "./helpers/bar-chart.js";

const app = express();
const port = 3000;

app.get("/langs/:user", async (req, res) => {
  const { instance } = req.query;
  const user = req.params.user;

  const repos = await fetchReposByProfile(user, instance);

  const langArr = [];

  if (!repos.length) {
    res.send("this user doesnt have any publicly available repos");
    return;
  }

  for (const repo of repos) {
    const lang = await fetchLanguagesByRepo(user, repo.name, instance);
    if (!lang) break;

    langArr.push(lang);
  }
  const svgChart = generateSVGBarChart(generatePercArray(langArr));
  res.type("svg");
  res.send(svgChart);
});

app.get("/", (req, res) => {
  res.redirect("https://codeberg.org/tijn/forgejo-readme-stats");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
