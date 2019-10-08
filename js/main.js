// initialize fullpage.js
let f_init = _=>{
  $('.cont').fullpage({
    licenseKey: '0BD90318-FEBE4A0A-AB35E65A-31E4D65D',
    sectionSelector:'.full',
    verticalCentered: false,
    scrollingSpeed: 1000,
    onLeave: (a,b)=>{
      n_up(b.index)
    }
  })
}

// change active square in nav
let n_up = n=>{
  $('.nav').text('□')
  $('.nav').eq(n).text('■')
}

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
  n_up(0)

  f_init()
  $('.scaled').click(handler)
}

$(_=>{
  f_init()
  n_up(0)
  $('body').removeClass('faded')
  $('.scaled').click(handler)
  $('.nav').click(e=>{
    let ind = $(e.target).index()
    n_up(ind)
    $.fn.fullpage.moveTo(ind + 1)
  })
})
