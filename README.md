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

<table border="1" cellspacing="0" cellpadding="6">
  <thead>
    <tr>
      <th style="width: 80px;">Test Case ID</th>
      <th style="width: 80px;">User Story ID</th>
      <th style="width: 80px;">Acceptance Condition</th>
      <th style="width: 20px;">Preconditions</th>
      <th style="width: 60px;">Test Data</th>
      <th style="width: 100px;">Steps / Instructions</th>
      <th style="width: 200px;">Expected Results</th>
      <th style="width: 150px;">Actual Results</th>
      <th style="width: 80px;">Pass / Fail</th>
      <th style="width: 250px;">Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TC001</td>
      <td>1</td>
      <td>User can input name</td>
      <td>Page loads</td>
      <td>"Tommy Lam"</td>
      <td>Enter name in name field</td>
      <td>On leaving the field (tab or mouse away), the name field entry box turns green/pink</td>
      <td>Behave as expected</td>
      <td>Pass</td>
      <td>/</td>
    </tr>
    <tr>
      <td>TC002</td>
      <td>2</td>
      <td>User can input email</td>
      <td>Page loads</td>
      <td>"user@example.com"</td>
      <td>Enter email in email field</td>
      <td>On leaving the field (tab or mouse away), the email field entry box turns green/pink</td>
      <td>Behave as expected</td>
      <td>Pass</td>
      <td>/</td>
    </tr>
    <tr>
      <td>TC003</td>
      <td>3</td>
      <td>User can input card</td>
      <td>Page loads</td>
      <td>"4242 4242 4242 4242"</td>
      <td>Enter card in card field</td>
      <td>On leaving the field (tab or mouse away), the card field entry box turns green/pink</td>
      <td>Behave as expected</td>
      <td>Pass</td>
      <td>/</td>
    </tr>
    <tr>
      <td>TC004</td>
      <td>4</td>
      <td>Name must be valid (letters, space, special)</td>
      <td>Page loads</td>
      <td>"John Doe", "!Jane Smith"</td>
      <td>Enter valid/invalid names</td>
      <td>Valid names accepted, invalid rejected</td>
      <td>/</td>
      <td>/</td>
      <td>/</td>
    </tr>
    <tr>
      <td>TC005</td>
      <td>5</td>
      <td>Email must be valid</td>
      <td>Page loads</td>
      <td>"email@site.com", "bad-email"</td>
      <td>Enter valid/invalid emails</td>
      <td>Valid emails accepted, invalid rejected</td>
      <td>/</td>
      <td>/</td>
      <td>/</td>
    </tr>
    <tr>
      <td>TC006</td>
      <td>6</td>
      <td>Card number must be valid (LUHN)</td>
      <td>Page loads</td>
      <td>"4111 1111 1111 1111", "1234 5678 9012 3456"</td>
      <td>Enter valid/invalid card numbers</td>
      <td>Valid cards accepted, invalid rejected</td>
      <td>/</td>
      <td>/</td>
      <td>/</td>
    </tr>
    <tr>
      <td>TC007</td>
      <td>6</td>
      <td>Page uses DN brand colors</td>
      <td>App styling loaded</td>
      <td>—</td>
      <td>Inspect colors in UI</td>
      <td>Green, Pink, Grey used accordingly</td>
      <td>/</td>
      <td>/</td>
      <td>/</td>
    </tr>
    <tr>
      <td>TC008</td>
      <td>7</td>
      <td>Page styling matches brand (font, centered, wireframe)</td>
      <td>Page loads</td>
      <td>—</td>
      <td>Inspect font, layout and alignment</td>
      <td>Calibri, centered content, proper padding and spacing</td>
      <td>/</td>
      <td>/</td>
      <td>/</td>
    </tr>
    <tr>
      <td>TC009</td>
      <td>8</td>
      <td>All form validation is client-side</td>
      <td>JS enabled</td>
      <td>"bad data"</td>
      <td>Disable network, enter bad data</td>
      <td>Validation occurs before submit</td>
      <td>/</td>
      <td>/</td>
      <td>/</td>
    </tr>
    <tr>
      <td>TC010</td>
      <td>9</td>
      <td>Page is W3C accessible</td>
      <td>App loaded</td>
      <td>—</td>
      <td>Use WAVE/axe tools, keyboard nav</td>
      <td>Accessible structure, alt text, focus states</td>
      <td>/</td>
      <td>/</td>
      <td>Color is not contrast enough according to Google Dev Lighthouse</td>
    </tr>
    <tr>
      <td>TC011</td>
      <td>10</td>
      <td>Real-time feedback on field input</td>
      <td>Page loads</td>
      <td>"wrong@", "valid@email.com"</td>
      <td>Start typing into fields</td>
      <td>Green border for valid, pink for invalid</td>
      <td>Work as expected</td>
      <td>Pass</td>
      <td>/</td>
    </tr>
    <tr>
      <td>TC012</td>
      <td>11</td>
      <td>No SQL injection allowed</td>
      <td>Page loads</td>
      <td>"'; DROP TABLE users;"</td>
      <td>Validate Input into all fields</td>
      <td>Input rejected, warning shown</td>
      <td>Work as expected</td>
      <td>Pass</td>
      <td>/</td>
    </tr>
    <tr>
      <td>TC013</td>
      <td>12</td>
      <td>Card number is LUHN validated</td>
      <td>Page loads</td>
      <td>"4111 1111 1111 1111", "1234"</td>
      <td>Enter card numbers</td>
      <td>Valid card passes, invalid fails</td>
      <td>Tested out with some proxy card number</td>
      <td>Not sure</td>
      <td>Need assistance from client</td>
    </tr>
    <tr>
      <td>TC014</td>
      <td>13</td>
      <td>Responsive on all screen sizes</td>
      <td>Browser tools open</td>
      <td>—</td>
      <td>Resize window / use mobile</td>
      <td>Layout adapts, no breakage</td>
      <td>Responsive on all screen size</td>
      <td>Pass</td>
      <td>/</td>
    </tr>
    <tr>
      <td>TC015</td>
      <td>14</td>
      <td>Send email with correct info</td>
      <td>Fields filled</td>
      <td>Valid form data</td>
      <td>Fill out and submit</td>
      <td>Email client opens with prefilled data</td>
      <td>Works on my machine (a desktop and a phone)</td>
      <td>Not sure yet</td>
      <td>/</td>
    </tr>
  </tbody>
</table>



## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
