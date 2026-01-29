# Product Discovery CLI

[![npm version](https://img.shields.io/npm/v/product-discovery-cli.svg)](https://www.npmjs.com/package/product-discovery-cli)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org)

A professional command-line interface to interact with the Product Discovery Agent API. Generate structured product discoveries powered by AI using an intuitive and colorful CLI experience.

## ✨ Features

- 🌐 **Internationalization**: Support for Portuguese (pt-br) and English (en-us)
- 🎨 **Professional UX**: Colorful output, interactive prompts, and loading spinners
- 🏗️ **Clean Architecture**: Built with SOLID principles and layered architecture
- 💾 **Auto-save**: Optional automatic JSON result saving
- 🔄 **Iterative Improvement**: Refine discoveries with additional context
- ⚙️ **Configurable**: CLI flags, config files, and environment variables
- ✅ **Well-tested**: Comprehensive unit tests with 90%+ coverage
- 📦 **Easy to install**: Available as a global npm package

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g product-discovery-cli
```

### Local Installation

```bash
npm install product-discovery-cli
```

## 🚀 Quick Start

After global installation, simply run:

```bash
product-discovery
```

The CLI will guide you through an interactive flow to generate product discoveries.

## 📖 Usage

### Basic Usage

```bash
# Run with default settings (Portuguese)
product-discovery

# Run in English
product-discovery --lang en-us

# Specify API URL
product-discovery --api-url http://localhost:3000/api/v1/discovery

# Auto-save results without prompting
product-discovery --save --output ./results
```

### CLI Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--api-url <url>` | `-u` | API endpoint URL | `http://localhost:3000/api/v1/discovery` |
| `--lang <code>` | `-l` | Language (pt-br, en-us) | `pt-br` |
| `--config <path>` | `-c` | Path to JSON config file | - |
| `--save` | `-s` | Auto-save without prompting | `false` |
| `--output <dir>` | `-o` | Default output directory | - |
| `--file <name>` | `-f` | Default output filename | - |
| `--no-save` | - | Disable saving prompt | - |

### Configuration File

Create a JSON configuration file to set default options:

```json
{
  "apiUrl": "http://localhost:3000/api/v1/discovery",
  "lang": "en-us",
  "autoSave": true,
  "defaultOutputDir": "./discoveries",
  "defaultFileName": "discovery.json"
}
```

Use it with:

```bash
product-discovery --config ./config.json
```

### Environment Variables

Set environment variables for configuration:

```bash
export PRODUCT_DISCOVERY_API_URL=http://localhost:3000/api/v1/discovery
product-discovery
```

## 🌍 Internationalization

The CLI supports multiple languages:

- **Portuguese (pt-br)**: Default language
- **English (en-us)**: Full translation of all messages

Switch languages using the `--lang` flag:

```bash
product-discovery --lang en-us
```

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── application/       # Use cases and business logic
├── domain/           # Domain entities and utilities
├── infrastructure/   # External dependencies (API, storage, i18n)
├── presentation/     # CLI controllers and routes
└── config/          # Configuration and CLI options
```

### Key Principles

- **SOLID**: Single Responsibility, Open/Closed, Dependency Inversion
- **Dependency Injection**: All dependencies injected via constructors
- **Testability**: Easy to mock and test each layer independently

## 🛠️ Development

### Prerequisites

- Node.js >= 20

### Setup

```bash
# Clone the repository
git clone https://github.com/AuronForge/product-discovery-cli.git
cd product-discovery-cli

# Install dependencies
npm install

# Run locally
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Testing

The project includes comprehensive unit tests with Jest:

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage
```

Coverage thresholds are set to 90% for all metrics.

## 📝 Interactive Flow

The CLI guides you through an intuitive workflow:

1. **Welcome**: Display branded banner with metadata
2. **Input**: Describe your idea/problem/application
3. **Processing**: Call the Product Discovery API
4. **Results**: View the generated JSON discovery
5. **Save**: Optionally save results to a file
6. **Improve**: Refine with additional context (optional)
7. **Repeat**: Run discovery for another idea (optional)

## 🎨 Output Example

```
   ╭────────────────────────────────────────────────────────────────────╮
   │                                                                    │
   │    ____                _            _     ____  _                  │
   │   |  _ \ _ __ ___   __| |_   _  ___| |_  |  _ \(_)___  ___ ___    │
   │   | |_) | '__/ _ \ / _ | | | |/ __| __| | | | | / __|/ __/ _ \   │
   │   |  __/| | | (_) | (_| | |_| | (__| |_  | |_| | \__ \ (_| (_) |  │
   │   |_|   |_|  \___/ \__,_|\__,_|\___|\__| |____/|_|___/\___\___/   │
   │                                                                    │
   │   Product Discovery CLI                                            │
   │   Generate a structured product discovery via the API.             │
   │                                                                    │
   │   Author: AuronForge                                               │
   │   Version: 0.0.2                                                   │
   │   License: Apache-2.0                                              │
   │                                                                    │
   ╰────────────────────────────────────────────────────────────────────╯
```

## 📄 License

This project is licensed under the Apache-2.0 License.

## 👤 Author

**José Eduardo Trindade E Marques**

- Company: AuronForge 🚀
- Email: edu.temarques@gmail.com
- LinkedIn: [linkedin.com/in/edu-marques29](https://linkedin.com/in/edu-marques29)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug or have a suggestion? Please open an issue on [GitHub](https://github.com/AuronForge/product-discovery-cli/issues).

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/product-discovery-cli)
- [GitHub Repository](https://github.com/AuronForge/product-discovery-cli)
- [Product Discovery Agent API](https://github.com/AuronForge/product-discovery-agent)

---

Made with ❤️ by AuronForge
