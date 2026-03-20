module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.js'],
    verbose: true,
    testTimeout: 30000,
    reporters: [
        "default",
        [
            "jest-html-reporter",
            {
                outputPath: "reports/test-report.html"
            }
        ],
        [
            "jest-junit",
            {
                outputDirectory: "reports",
                outputName: "jest-report.xml",
                addFileAttribute: "true"
            }
        ]
    ]
};