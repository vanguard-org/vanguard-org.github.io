// vanguaurdbot.xyz
// Do not use this script without explicit permission.

const hx = {
    load: async page => {
        const main = document.querySelector('main')
        const res = await fetch(`pages/${page}.html`)
        if (res.status == 404) {
            main.innerHTML = `<div class="bg-dark text-center text-white" style="height: 100vh !important">
            <h1>흠... 이 페이지를 찾을 수 없네요</h1>
            <h3>그래도 서버의 보안은 VANGUARD에서 찾을 수 있어요!</h3>
            <h3>VANGUARD 봇 소개를 확인해 보세요.</h3>
            </div>`
            return
        }
        location.hash = page
        window.scrollTo(0, 0)
        const html = await res.text()
        main.innerHTML = html

        hx.ev(main)
    },
    ev: document => {
        document.querySelectorAll('[hx-open]').forEach(e => e.addEventListener('click', () => {
            window.open(e.getAttribute('hx-open'))
        }))

        document.querySelectorAll('[hx-scroll]').forEach(e => e.addEventListener('click', () => {
            const target = document.querySelector(e.getAttribute('hx-scroll'))
            target?.scrollIntoView({ behavior: 'smooth' })
        }))

        document.querySelectorAll('[hx-page]').forEach(e => e.addEventListener('click', () => {
            const page = e.getAttribute('hx-page')
            if (page) hx.load(page)
        }))
    },
    onload: fn => window.addEventListener('load', fn)
}
hx.onload(() => {
    const page = location.hash.replace('#', '') || 'main'
    hx.load(page)
    hx.ev(document)
})

document.addEventListener('mousedown', e => e.preventDefault())
document.addEventListener('contextmenu', e => e.preventDefault())