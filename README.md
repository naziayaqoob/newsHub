# News Aggregator

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run the application: `npm run dev`.

## Docker

To run the application using Docker, follow these steps:

1. Build the Docker image: `docker build -t newsHub .`
2. Run the Docker container: `docker run -p 3000:3000 newsHub`
3. Access the application at `http://localhost:3000`

## Usage

- Enter keywords in the search bar to search for articles.
- Use the filter panel to filter articles by date, category, and source.
