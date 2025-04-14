# Forgejo Readme Statistics

## Example

[![Codeberg's stats](https://frs.tijn.dev/langs/codeberg)](https://frs.tijn.dev)

## Usage

To add this feature to your profile, insert the following code into your `.profile/README.md`:

(replace `codeberg` with your username of course)

```
[![Codebergs's stats](https://frs.tijn.dev/langs/codeberg)](https://frs.tijn.dev)
```

This implementation supports custom instances by appending the parameter `?instance=<your_instance_url>` to the URL.

**Note:** Custom instances are supported only if they provide a public API that does not require authentication via bearer token.

## Acknowledgements

This project was inspired by [github-readme-stats](https://github.com/anuraghazra/github-readme-stats), which also served as the source for the card designs implemented in this repository.
