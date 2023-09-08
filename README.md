# Digital NewsPaper Advertisement Analyzer

![version](https://img.shields.io/badge/version-1.0-blue.svg) 


![Image](src/assets/images/bg-sign-in-basic.jpeg)

The **Newspaper Ad Analyzer** is a powerful tool designed to simplify the process of extracting valuable information from newspaper advertisements. It uses state-of-the-art technologies including Optical Character Recognition (OCR), Natural Language Processing (NLP), and data visualization to transform unstructured newspaper ads into structured data for analysis and insight.

## Key Features

- **Advertisement Categorization**: Automatically categorizes advertisements into various types such as land sale, house sale, wedding proposals, and more, making it easier to find relevant information.

- **Data Extraction**: Extracts key details from advertisements, including dates, locations, contact information, and other important information, storing them in a structured database.

- **Geospatial Visualization**: Visualizes the geographic locations of advertisements on an interactive map, allowing users to explore ads by location and view additional details by clicking on map markers.

- **Interactive Data Analysis**: Provides powerful data analysis tools, including interactive graphs and search facilities, enabling users to gain insights from the collected data.

- **User-Friendly Interface**: A user-friendly dashboard allows easy access to all the system's functionalities, making it accessible to a wide range of users.

## Getting Started

To get started with the Newspaper Ad Analyzer, follow the installation instructions in the [documentation](link-to-documentation) and explore its capabilities. Feel free to contribute to the project and make it even more powerful!

## Technologies Used

- Frontend: React.js, Material-UI
- Backend: Python Flask, MongoDB
- Data Processing: OCR/Tesseract, NLP (Natural Language Processing)
- Visualization: Leaflet.js, Chart.js

## Contributors

- [Your Name](link-to-your-profile) - Project Lead
- [Contributor 1 Name](link-to-contributor1-profile) - Backend Developer
- [Contributor 2 Name](link-to-contributor2-profile) - Frontend Developer

## License

This project is licensed under the [MIT License](link-to-license-file).

#### Special thanks

During the development of this dashboard, we have used many existing resources from awesome developers. We want to thank them for providing their tools open source:

- [MUI](https://mui.com/) - The React UI library for faster and easier web development.
- [React ChartJS 2](http://reactchartjs.github.io/react-chartjs-2/#/) - Simple yet flexible React charting for designers & developers.
- [ChromaJS](https://gka.github.io/chroma.js/) - A small-ish zero-dependency JavaScript library for all kinds of color conversions and color scales.

Let us know your thoughts below. And good luck with development!

## Table of Contents

- [Versions](#versions)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [File Structure](#file-structure)
- [Browser Support](#browser-support)
- [Resources](#resources)
- [Reporting Issues](#reporting-issues)
- [Technical Support or Questions](#technical-support-or-questions)
- [Licensing](#licensing)
- [Useful Links](#useful-links)

## Versions

[<img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react-logo.png?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/material-dashboard-react?ref=readme-mdr)

| React |
| ----- |

| [![Material Dashboard React](https://s3.amazonaws.com/creativetim_bucket/products/71/thumb/material-dashboard-react.jpg?1638950990)](http://demos.creative-tim.com/material-dashboard-react/#/dashboard?ref=readme-mdr)

## Demo

- [Dashboard](http://demos.creative-tim.com/material-dashboard-react/#/dashboard?ref=readme-sudr)
- [Profile](https://demos.creative-tim.com/material-dashboard-react/#/profile?ref=readme-sudr)
- [RTL](https://demos.creative-tim.com/material-dashboard-react/#/rtl?ref=readme-sudr)
- [Sign In](https://demos.creative-tim.com/material-dashboard-react/#/authentication/sign-in?ref=readme-sudr)
- [Sign Up](https://demos.creative-tim.com/material-dashboard-react/#/authentication/sign-up?ref=readme-sudr)

[View More](https://demos.creative-tim.com/material-dashboard-react/#/dashboard?ref=readme-mdr).

## Quick start

Quick start options:

- Download from [Creative Tim](https://www.creative-tim.com/product/material-dashboard-react?ref=readme-mdr).

## Terminal Commands

1. Download and Install NodeJs LTS version from [NodeJs Official Page](https://nodejs.org/en/download/).
2. Navigate to the root ./ directory of the product and run `yarn install` or `npm install` to install our local dependencies.

## Documentation

The documentation for the Material Dashboard is hosted at our [website](https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/?ref=readme-mdr).

### What's included

Within the download you'll find the following directories and files:

```
material-dashboard-react
    ├── public
    │   ├── apple-icon.png
    │   ├── favicon.png
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── assets
    │   │   ├── images
    │   │   └── theme
    │   │       ├── base
    │   │       ├── components
    │   │       ├── functions
    │   │       ├── index.js
    │   │       └── theme-rtl.js
    │   │   └── theme-dark
    │   │       ├── base
    │   │       ├── components
    │   │       ├── functions
    │   │       ├── index.js
    │   │       └── theme-rtl.js
    │   ├── components
    │   │   ├── MDAlert
    │   │   ├── MDAvatar
    │   │   ├── MDBadge
    │   │   ├── MDBox
    │   │   ├── MDButton
    │   │   ├── MDInput
    │   │   ├── MDPagination
    │   │   ├── MDProgress
    │   │   ├── MDSnackbar
    │   │   └── MDTypography
    │   ├── context
    │   ├── examples
    │   │   ├── Breadcrumbs
    │   │   ├── Cards
    │   │   ├── Charts
    │   │   ├── Configurator
    │   │   ├── Footer
    │   │   ├── Items
    │   │   ├── LayoutContainers
    │   │   ├── Lists
    │   │   ├── Navbars
    │   │   ├── Sidenav
    │   │   ├── Tables
    │   │   └── Timeline
    │   ├── layouts
    │   │   ├── authentication
    │   │   ├── billing
    │   │   ├── dashboard
    │   │   ├── notifications
    │   │   ├── profile
    │   │   ├── rtl
    │   │   └── tables
    │   ├── App.js
    │   ├── index.js
    │   └── routes.js
    ├── .eslintrc.json
    ├── .prettierrc.json
    ├── CHANGELOG.md
    ├── ISSUE_TEMPLATE.md
    ├── jsconfig.json
    ├── LICENSE.md
    ├── package.json
    └── README.md
```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">

## Resources

- [Live Preview](https://demos.creative-tim.com/material-dashboard-react/#/dashboard?ref=readme-mdr)
- [Download Page](https://www.creative-tim.com/product/material-dashboard-react?ref=readme-mdr)
- Documentation is [here](https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/?ref=readme-mdr)
- [License Agreement](https://www.creative-tim.com/license?ref=readme-mdr)
- [Support](https://www.creative-tim.com/contact-us?ref=readme-mdr)
- Issues: [Github Issues Page](https://github.com/creativetimofficial/material-dashboard-react/issues)
- [Nepcha Analytics](https://nepcha.com?ref=readme) - Analytics tool for your website

## Reporting Issues

We use GitHub Issues as the official bug tracker for the Material Dashboard React. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the Material Dashboard React. Check the CHANGELOG from your dashboard on our [website](https://www.creative-tim.com/product/material-dashboard-react?ref=readme-mdr).
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Technical Support or Questions

If you have questions or need help integrating the product please [contact us](https://www.creative-tim.com/contact-us?ref=readme-mdr) instead of opening an issue.

## Licensing

- Copyright 2023 [Creative Tim](https://www.creative-tim.com?ref=readme-mdr)
- Creative Tim [license](https://www.creative-tim.com/license?ref=readme-mdr)

## Useful Links

- [More products](https://www.creative-tim.com/templates?ref=readme-mdr) from Creative Tim

- [Tutorials](https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w)

- [Freebies](https://www.creative-tim.com/bootstrap-themes/free?ref=readme-mdr) from Creative Tim

- [Affiliate Program](https://www.creative-tim.com/affiliates/new?ref=readme-mdr) (earn money)

##### Social Media

Twitter: <https://twitter.com/CreativeTim>

Facebook: <https://www.facebook.com/CreativeTim>

Dribbble: <https://dribbble.com/creativetim>

Google+: <https://plus.google.com/+CreativetimPage>

Instagram: <https://instagram.com/creativetimofficial>

This is the anoiyng prettierrc.json
{
"printWidth": 100,
"trailingComma": "es5",
"tabWidth": 2,
"semi": true,
"singleQuote": false,
"endOfLine": "auto"

}
