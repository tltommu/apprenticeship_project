# ApprenticeshipProject

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Apprenticeship User Stories Table

### Please refer to this [csv file](https://github.com/tltommu/apprenticeship_project/blob/main/test_cases_v2.csv )  for a more readable version of the table

|  Test Case ID |  User Story ID |  Acceptance Condition |  Preconditions |Test Data|  Steps / Instructions | Expected Results |  Actual Results |  Pass / Fail | Notes |
|:-------|:---|:-----------------------|:--------------------|:---|:------|:----------------|:--------------------------------|:------------------------------|:----|
| TC001 | 1 | User can input name | Page loads | "Tommy Lam" | Enter name in name field | On leaving the field (tab or mouse away) the name field entry box turns green/ pink| Behave as expected | Pass | / |
| TC002 | 2 | User can input email | Page loads | "user@example.com" | Enter email in email field | On leaving the field (tab or mouse away) the email field entry box turns green/ pink| Behave as expected | Pass | / |
| TC003 | 3 | User can input card | Page loads | "4242 4242 4242 4242" | Enter card in card field | On leaving the field (tab or mouse away) the card field entry box turns green/ pink| Behave as expected| Pass | / |
| TC004 | 4 | Name must be valid (letters, space, special) | Page loads | "John Doe", "!Jane Smith" | Enter valid/invalid names |On leaving the field (tab or mouse away) the name field entry box turns green/ pink | Behave as expected  | Pass | / |
| TC005 | 5 | Email must be valid | Page loads | "email@site.com", "bad-email" | Enter valid/invalid emails | On leaving the field (tab or mouse away) the email field entry box turns green/ pink | Behave as expected | Pass | / |
| TC006 | 6 | Card number must be valid (LUHN) | Page loads | "4111 1111 1111 1111", "1234 5678 9012 3456" | Enter valid/invalid card numbers | On leaving the field (tab or mouse away) the card field entry box turns green/ pink| Behave as expected | Maybe Pass | Not sure exactly how LUHN works, but I entered those proxy credit card it has a valid/invalid feedback. Need confirmation |
| TC007 | 7 | Page uses DN brand colors | App styling loaded | — | Inspect colors in UI | Green, Pink, Grey used accordingly | Behave as expected | maybe passed| Color is not contrast enough according to google dev lighthouse |
| TC008 | 8 | Page styling matches brand (font, centered, wireframe) | Page loads | — | Inspect font, layout and alignment | Calibri, centered content, proper padding and spacing | Behave as expected | Maybe pass | Need confirmation on the form size |
| TC009 | 9 | All form validation is client-side | JS enabled | "bad data" | Disable network, enter bad data | Validation occurs before submit | Behave as expected | Pass | / |
| TC010 | 10 | Page is W3C accessible | App loaded | — | Use WAVE/axe tools, keyboard nav | Accessible structure, alt text, focus states | You can Tab out the fields and enter to submit form | Pass | Color is not contrast enough according to google dev lighthouse |
| TC011 | 11 | Real-time feedback on field input | Page loads | "wrong@", "valid@email.com" | Start typing into fields | Green border for valid, pink for invalid | Work as expected| Pass | / |
| TC012 | 12 | No SQL injection allowed | Page loads | "'; DROP TABLE users;" | Validate Input into all fields | Input rejected, warning shown | Work as expected | Pass | / |
| TC013 | 13 | Card number is LUHN validated | Page loads | "4111 1111 1111 1111", "1234" | Enter card numbers | Valid card passes, invalid fails | Tested out with some proxy card number | Not sure | need assistance from client |
| TC014 | 14 | Responsive on all screen sizes | Browser tools open | Resize screen/device | Resize window / use mobile | Layout adapts, no breakage | Responsive on all screen size | Pass | / |
| TC015 | 15 | Send email with correct info | Fields filled | Valid form data | Fill out and submit | Email client opens with prefilled data | Works on my machine(a desktop and a phone) | Not sure yet | / |

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
