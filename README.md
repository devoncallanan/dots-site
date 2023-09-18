Toy website to practice CI/CD and put to use an image processing script I had laying around.

To use the site, select and immage and a brush and then convert to see your art. The script uses a convolution to calculate pixel weights for a scaled down image. The brush size is then adjusted using the weights and acts as the pixel, with larger strokes being considered "dark" and small strokes as "light". More contrast works better along
with larger, more well defined shapes.

site url: http://dots-site.s3-website-us-east-1.amazonaws.com/

# Development

Developed using NextJS and Tailwind for the static front end and Python3 in a serverless function for the image processing.

`npm run dev` for NextJS's local development server with hot reloading.

Frontend built and depoloyed automatically with GitHub actions and triggered on pull request merges to `main`.

TODO: testing and lammbda autodeploy

