# JSherlock-cli

> Find usernames across social networks

[![npm version][npm-version]][npm-url]
[![npm downloads][npm-download]][npm-dl-url]
[![install size][package-size]][package-size-url]
[![code style: prettier][prettier]][prettier-url]
[![License: MIT][license]][license-url]

A command-line tool to hunt down usernames across social networks. Perfect for OSINT (Open Source Intelligence) research and checking username availability.

## Features

- Check username availability across multiple social networks
- Export results to CSV format
- Real-time progress display
- Color-coded output for easy reading

## Install

```shell
npm install -g jsherlock-cli
```

## Usage

```shell
Usage
  $ jsherlock <username>

Options
  --export-csv    Export results to a CSV file

Examples
  $ jsherlock zuck
  $ jsherlock zuck --export-csv='results.csv'
```

### Example Output

```
   ___      _               _            _
  |_  |    | |             | |          | |
    | | ___| |__   ___ _ __| | ___   ___| | __
    | |/ __| '_ \ / _ \ '__| |/ _ \ / __| |/ /
/\__/ /\__ \ | | |  __/ |  | | (_) | (__|   <
\____/ |___/_| |_|\___|_|  |_|\___/ \___|_\_\

[+] facebook: https://facebook.com/zuck
[+] twitter: https://twitter.com/zuck
[-] instagram: Not Found
```

### asciinema

[![asciicast](https://asciinema.org/a/226330.svg)](https://asciinema.org/a/226330)

## API

This CLI is built on top of the [jsherlock][jsherlock] library. You can also use the API directly in your Node.js applications.

## Development

```shell
# Clone the repository
git clone https://github.com/AungMyoKyaw/jsherlock-cli.git
cd jsherlock-cli

# Install dependencies
npm install

# Build
npm run build

# Run locally
npm run demo
```

## Related

- [jsherlock][jsherlock] - API for this module

## Inspired by

- [sherlock][inspired-by] - Python implementation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Aung Myo Kyaw](https://github.com/AungMyoKyaw)

<!-- Badges -->

[inspired-by]: https://github.com/TheYahya/sherlock
[jsherlock]: https://github.com/AungMyoKyaw/jsherlock
[npm-version]: https://img.shields.io/npm/v/jsherlock-cli.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/jsherlock-cli
[npm-download]: https://img.shields.io/npm/dt/jsherlock-cli.svg?style=flat-square
[npm-dl-url]: https://www.npmjs.com/package/jsherlock-cli
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT
[prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[package-size]: https://packagephobia.now.sh/badge?p=jsherlock-cli
[package-size-url]: https://packagephobia.now.sh/result?p=jsherlock-cli
