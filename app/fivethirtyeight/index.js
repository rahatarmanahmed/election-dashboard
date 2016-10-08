document.addEventListener('DOMContentLoaded', () => {
    const $doc = $(document)

    let container

    const focus = (selector) => {
        const body = $doc.find('body')
        // Initialize container
        if (!container) {
            container = $($doc[0].createElement('div'))

            container.css({
                width: '100vw',
                height: '100vh',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            })

            body.css({
                width: '100vw',
                height: '100vh',
                maxWidth: 'none',
                maxHeight: 'none'
            })

            body.children().hide()

            body.append(container)
            const innerContainer = $($doc[0].createElement('div'))
            innerContainer.css('width', '95%')
            container.append(innerContainer)
            container = innerContainer
        }

        container.empty()

        $doc.find(selector).clone(true).css({
            margin: 'auto',
            position: 'relative',
            textAlign: 'center'
        })
        .appendTo(container)

    }

    var pages = [
        [
            '[data-card-id="US-winprob-sentence"]',
            '[data-card-id="US-racemap"]',
            '[data-card-id="US-national-tables"]',
        ],
        [
            '[data-card-id="US-winprob"]',
        ],
        [
            '[data-card-id="US-evmap"]',
        ],
        [
            '[data-card-id="US-stateorder"]',
        ]
    ]

    var waitForGraphs = [
        '[data-card-id="US-racemap"] svg',
        '[data-card-id="US-winprob"] svg',
        '[data-card-id="US-evmap"] svg',
        '[data-card-id="US-stateorder"] svg',

    ]

    const focusPage = (page) => focus(page.join())

    const waitForSelector = (selector) => new Promise(resolve => {
        var id = setInterval(() => {
            if($doc.find(selector).length) {
                clearInterval(id)
                resolve()
            }
        }, 50)
    })

    Promise.all(waitForGraphs.map(waitForSelector))
    .then(() => {
        let i = 0;
        setInterval(() => {
            focusPage(pages[i++ % pages.length])
        }, process.env.FIVETHIRTYEIGHT_PAGE_DURATION || 15000)
        focusPage(pages[i++])

        setTimeout(
            () => location.reload(),
            process.env.FIVETHIRTYEIGHT_REFRESH_FREQUENCY || 1800000
        )
    })
})
