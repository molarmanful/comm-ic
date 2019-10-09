

// initialize fullpage.js
let f_init = _=>{
  $('.cont').fullpage({
    licenseKey: '0BD90318-FEBE4A0A-AB35E65A-31E4D65D',
    sectionSelector:'.full',
    verticalCentered: false,
    scrollingSpeed: 1000,
    onLeave: (a,b)=>{
      $('.sub').addClass('fadedd')
      n_up(b.index)
      setTimeout(_=>{
        $('.panel').eq(b.index).children('.sub').removeClass('fadedd')
      }, 500)
    }
  })
}

// change active square in nav
let n_up = n=>{
  $('.nav').text('□')
  $('.nav').eq(n).text('■')
}

// handles recursive actions in last panel
let handler = _=>{
  let panes = $('.full')
  let last = panes.last()
  let hand = $('.inf')
  let bg = $('.bg')
  let sub = $('.sub')

  last.addClass('zoomed')
  panes.addClass('fadedt')
  bg.addClass('zoomed fadedt')

  setTimeout(_=>{
    $.fn.fullpage.silentMoveTo(1)

    last.removeClass('zoomed')
    bg.removeClass('zoomed')
    sub.addClass('faded')

    setTimeout(_=>{

      panes.removeClass('fadedt')
      bg.removeClass('fadedt')

      setTimeout(_=>{
        sub.removeClass('faded')
      }, 500)
    }, 1100)
  }, 1000)

  n_up(0)

}

$(_=>{
  f_init()

  // fade in everything
  n_up(0)
  $('.sub').addClass('faded')
  $('body').removeClass('faded')
  setTimeout(_=>{
    $('.sub').removeClass('faded')
  }, 500)

  $('.inf').click(handler)

  $('.nav').click(e=>{
    let ind = $(e.target).index()
    n_up(ind)
    $.fn.fullpage.moveTo(ind + 1)
  })
})
