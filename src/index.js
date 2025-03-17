import express from "express";
import { fetchReposByProfile, fetchRepo } from "./helpers/fetch-data.js";
import { generatePercArray, generateSVGBarChart } from "./helpers/bar-chart.js";

console.log();

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

  for (const { name } of repos) {
    const { language } = await fetchRepo(user, name, instance);
    if (!language) break;
    langArr.push(language);
  }

  console.log(langArr);

  const svgChart = generateSVGBarChart(generatePercArray(langArr));
  res.type("svg");
  res.send(svgChart);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
