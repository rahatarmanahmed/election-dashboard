document.addEventListener('DOMContentLoaded', () => {
    const $doc = $(document)
    console.log($doc)

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
            position: 'relative'
        }).appendTo(container)
    }

    var pages = [
        [
            '#cardsets > div.cardset.current > div > div.cards > div.card.card-winprob.card-winprob-us.winprob-bar',
            '#cardsets > div.cardset.current > div > div.cards > div.card.card-has-bottom-key',
            '#cardsets > div.cardset.current > div > div.cards > div.card.card-winprob.card-natl-tables'
        ],
        [
            '#cardsets > div.cardset.current > div > div.cards > div.card.winning'
        ],
        [
            '#cardsets > div.cardset.current > div > div.cards > div:nth-child(7)'
        ],
        [
            '#cardsets > div.cardset.current > div > div.cards > div:nth-child(8)'
        ]
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

    waitForSelector(pages[0][1])
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
