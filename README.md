# Forgejo Readme Statistics

## Example

[![Tijn's GitHub stats](https://frs.jonas.zone/langs/tijn)](https://codeberg.org/tijn/forgejo-readme-stats)

## Usage

To implement this feature in your repository, insert the following code into any Markdown file:

```
[![Tijn's GitHub stats](https://frs.jonas.zone/langs/tijn)](https://codeberg.org/tijn/forgejo-readme-stats)
```

This implementation supports custom instances by appending the parameter `?instance=<your_instance_url>` to the URL.

**Note:** Custom instances are supported only if they provide a public API that does not require authentication via bearer token.

## Acknowledgements

This project was inspired by [github-readme-stats](https://github.com/anuraghazra/github-readme-stats), which also served as the source for the card designs implemented in this repository.
