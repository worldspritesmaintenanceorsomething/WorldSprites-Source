//* Motion.js Library

function runAnim(anim) {
    //* Assign Starting Values
    let previousStyle = anim.__el.getAttribute('style')
    if (!previousStyle.toString().endsWith(';')) {
        previousStyle = previousStyle.toString() + ';'
    }
    anim.__el.setAttribute('style', previousStyle.toString() + '/**/' + anim.__from + '/**/')

    //* Assign Ending Values With A Delay To Make It Smoother

    //* Add Motion Transition Properties
    anim.__el.style.transitionTimingFunction = anim.__transitionFunction;
    anim.__el.style.transitionDuration = anim.__transitionDuration.toString() + 's';
    anim.__el.style.transitionDelay = '0s';

    setTimeout(function () {
        anim.__el.setAttribute('style', anim.__el.getAttribute('style').toString() + anim.__to)
    }, anim.__transitionDelay * 1000)

    setTimeout(function () {
        anim.__el.setAttribute('style', previousStyle)
    }, (anim.__transitionDelay + anim.__transitionDuration) * 1000)
}

function º(q) {
    return document.querySelector(q)
}

function anim(el) {
    return {
        __el: el,
        __from: '',
        __to: '',
        __transitionFunction: 'ease-in-out',
        __transitionDuration: .2,
        __transitionDelay: 0,

        from(a) {
            const current = this
            current.__from = a
            return current
        },

        to(a) {
            const current = this
            current.__to = a
            return current
        },

        function (a) {
            const current = this
            current.__transitionFunction = a
            return current
        },

        duration(a) {
            const current = this
            current.__transitionDuration = a
            return current
        },

        delay(a) {
            const current = this
            current.__transitionDelay = a
            return current
        },

        run() {
            runAnim(this)
        }
    }
}