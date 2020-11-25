#Fetch-Favicon Tests

##Adding a new test case

Upon finding a website that does not return the desired results:

1.  Copy the source of the website into a file in the `./test/unit/icon/` folder.
1.  Add a record to `.test/unit/icon/test-cases.json`:

    ```javascript
    [
        {
            "fileName": "" //Name of the source file under test
            "response": "http://example.com/myicon.png" //The desired result image url
        }
    ]
    ```

1.  Run `npm run test` to see the test fail.
1.  Reduce the source of the website for simplicity, while not changing the nature of the failure. Usually you can:
    - Remove the entire `<body>`
    - Remove all `<script>` tags
    - Remove/obfuscate all of the text content.
1.  Fix the the test.
1.  Re-run tests.