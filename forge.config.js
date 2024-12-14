module.exports = {
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'ProgrammerBassam',
                    name: 'seraj-soft-client'
                },
                prerelease: false,
                draft: true,
                generateReleaseNotes: true
            }
        }
    ]
}