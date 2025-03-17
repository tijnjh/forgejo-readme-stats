import { instances } from "../instances.js";

const defaultInstance = instances[0];

function getInstance(domain) {
  const foundInstance = instances.find(
    (instance) => instance.domain === domain,
  );
  return foundInstance || defaultInstance;
}

export async function fetchReposByProfile(user, instance) {
  const { domain, accessToken } = getInstance(instance);

  const url = `https://${domain}/api/v1/users/${user}/repos`;

  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response;
  response = await fetch(url, { headers: headers });
  response = response.json();

  return response;
}

export async function fetchRepo(user, repo, instance) {
  const { domain, accessToken } = getInstance(instance);

  const url = `https://${domain}/api/v1/repos/${user}/${repo}`;

  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response;
  response = await fetch(url, { headers: headers });
  response = response.json();

  return response;
}

export async function fetchLanguagesByRepo(user, repo, instance) {
  const { domain, accessToken } = getInstance(instance);

  const url = `https://${domain}/api/v1/repos/${user}/${repo}/languages`;

  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response;
  response = await fetch(url, { headers: headers });
  response = response.json();

  return response;
}
