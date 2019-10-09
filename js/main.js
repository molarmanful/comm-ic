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

let chars = ['brains', 'fluff', 'floof', 'paint', 'spikes']
let cur = 'brains'

// preload images
let preload = _=>{
  chars.map(a=>{
    [...new Array(6)].map((_,b)=>{
      $('<img>')[0].src = `./media/${a}/${a + ++b}.png`
    })
  })
}

preload()

// change to random character
let change_c = (x=chars.filter(a=> a != cur)[Math.random() * (chars.length - 1) | 0])=>{
  $('.chars, .ch').each((_,a)=>{
    $(a).css('background-image', $(a).css('background-image').replace(RegExp(cur, 'g'), x))
  })
  cur = x
}

// change active square in nav
let n_up = n=>{
  $('.nav').text('□')
  $('.nav').eq(n).text('■')
  if(n == 5){
    $('.bottom p').removeClass('fadedd')
  } else {
    $('.bottom p').addClass('fadedd')
  }
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

  n_up(0)

  setTimeout(_=>{
    $.fn.fullpage.silentMoveTo(1)

    last.removeClass('zoomed')
    bg.removeClass('zoomed')
    sub.addClass('faded')

    setTimeout(_=>{
      change_c()

      panes.removeClass('fadedt')
      bg.removeClass('fadedt')

      setTimeout(_=>{
        sub.removeClass('faded')
      }, 500)
    }, 1100)
  }, 1000)
}

$(window).on('load', _=>{
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
