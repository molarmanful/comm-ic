// initialize fullpage.js
let f_init = _=>{
  $('.cont').fullpage({
    licenseKey: '0BD90318-FEBE4A0A-AB35E65A-31E4D65D',
    sectionSelector:'.full',
    verticalCentered: false,
    scrollingSpeed: 1000
  })
}

$(_=>{

  // handles recursive action in last panel
  // turns off fullpage.js temporarily to allow DOM changes
  let handler = _=>{
    let panes = $('.cont > .full')
    let hand = $('.scaled')
    let cpane = $('.scaled').parents('.full').clone()

    $.fn.fullpage.destroy('all')

    panes.first().remove()
    hand.first().removeClass('scaled').off('click')
    cpane.removeClass('active')
    hand.addClass('active')
    $('.cont').append(panes.slice(1, -1), cpane)

    f_init()
    $('.scaled').click(handler)
  }

  f_init()
  $('body').removeClass('faded')
  $('.scaled').click(handler)
})
